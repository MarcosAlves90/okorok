import { NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { v2 as cloudinary } from 'cloudinary';

const validateEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

// Respostas JSON
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

// Configuração do Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
	api_key: process.env.CLOUDINARY_API_KEY || '',
	api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5 MB

// Função para fazer upload do avatar
async function uploadAvatar(file: File): Promise<string | null> {
	try {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Validar tamanho
		if (buffer.length > MAX_AVATAR_SIZE) {
			throw new Error('Avatar muito grande (max 5MB)');
		}

		// Validar tipo
		if (!file.type.startsWith('image/')) {
			throw new Error('Tipo de arquivo inválido');
		}

		if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
			throw new Error('Chaves do Cloudinary ausentes');
		}

		// Converter para base64
		const base64 = buffer.toString('base64');
		const dataUri = `data:${file.type};base64,${base64}`;

		const uploadResult = await cloudinary.uploader.upload(dataUri, {
			folder: 'okorok/avatars',
			resource_type: 'image',
		});

		return uploadResult.secure_url || uploadResult.url || null;
	} catch (error) {
		console.error('Erro no upload do avatar:', error);
		throw error;
	}
}

interface DatabaseUser {
	id: number;
	name: string;
	email: string;
	created_at: string;
	avatar_url?: string;
	bio?: string;
}

export async function GET() {
	try {
		const result = await query('SELECT id, name, email, created_at, avatar_url, bio FROM users ORDER BY created_at DESC');
		
		const users = result.rows.map((user: DatabaseUser) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.created_at,
			avatarUrl: user.avatar_url || null,
			bio: user.bio || null,
		}));

		return json(users);
	} catch (error) {
		console.error('Erro ao buscar usuários:', error);
		return json({ message: 'Erro interno do servidor' }, 500);
	}
}

export async function POST(request: Request) {
	try {
		const contentType = request.headers.get('content-type') || '';
		
		let name: string;
		let email: string;
		let password: string;
		let avatarUrl: string | null = null;

		if (contentType.includes('multipart/form-data')) {
			const formData = await request.formData();
			
			name = String(formData.get('name') || '').trim();
			email = String(formData.get('email') || '').trim().toLowerCase();
			password = String(formData.get('password') || '');

			const avatarFile = formData.get('avatar') as File | null;
			if (avatarFile && avatarFile.size > 0) {
				try {
					avatarUrl = await uploadAvatar(avatarFile);
				} catch (avatarError) {
					console.error('Erro no upload do avatar:', avatarError);
					return json({ message: 'Falha ao enviar avatar' }, 400);
				}
			}
		} else {
			const body = await request.json();
			name = String(body.name || '').trim();
			email = String(body.email || '').trim().toLowerCase();
			password = String(body.password || '');
		}

		// Validações
		if (!name || name.length < 2) {
			return json({ message: 'Nome deve ter pelo menos 2 caracteres' }, 400);
		}

		if (!email || !validateEmail(email)) {
			return json({ message: 'E-mail inválido' }, 400);
		}

		if (!password || password.length < 6) {
			return json({ message: 'Senha deve ter pelo menos 6 caracteres' }, 400);
		}

		// Verificar se email já existe
		const existingUser = await query('SELECT id FROM users WHERE email = $1', [email]);
		if (existingUser.rows.length > 0) {
			return json({ message: 'E-mail já cadastrado' }, 409);
		}

		// Criar usuário
		const result = await query(
			'INSERT INTO users (name, email, password, avatar_url, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, created_at, avatar_url, bio',
			[name, email, password, avatarUrl, null]
		);

		const user = result.rows[0];
		const safeUser = {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.created_at,
			avatarUrl: user.avatar_url || null,
			bio: user.bio || null
		};

		return json({ message: 'Usuário criado com sucesso', user: safeUser }, 201);

	} catch (error) {
		console.error('Erro ao criar usuário:', error);
		return json({ message: 'Erro interno do servidor' }, 500);
	}
}
