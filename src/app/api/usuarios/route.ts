import { NextResponse } from 'next/server';
import { query } from '@/lib/database';
import { uploadImage } from '@/lib/uploadImage';
import { WelcomeEmailService } from '@/lib/email/welcome-email-service';

const isValidEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
	SUCCESS_CREATED: 'Usuário criado com sucesso',
	SUCCESS_FETCHED: 'Usuários obtidos com sucesso',
	INVALID_NAME: 'Nome é obrigatório e deve ter pelo menos 2 caracteres',
	INVALID_EMAIL: 'E-mail inválido',
	INVALID_PASSWORD: 'Senha é obrigatória e deve ter pelo menos 6 caracteres',
	EMAIL_EXISTS: 'E-mail já cadastrado',
	INVALID_AVATAR: 'Falha ao processar avatar',
	SERVER_ERROR: 'Erro interno do servidor',
	EMAIL_SUCCESS: 'E-mail enviado com sucesso!',
} as const;


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
		const result = await query(
			'SELECT id, name, email, created_at, avatar_url, bio FROM users ORDER BY created_at DESC'
		);

		const users = result.rows.map((u: DatabaseUser) => ({
			id: u.id,
			name: u.name,
			email: u.email,
			createdAt: u.created_at,
			avatarUrl: u.avatar_url || null,
			bio: u.bio || null,
		}));

		return json({ success: true, message: MSG.SUCCESS_FETCHED, data: users });
	} catch (err) {
		console.error('Erro na rota GET /api/usuarios:', err);
		return json({ success: false, message: MSG.SERVER_ERROR }, 500);
	}
}

async function parseRequest(request: Request) {
	const contentType = request.headers.get('content-type') || '';

	if (contentType.includes('multipart/form-data')) {
		const form = await request.formData();
		const file = form.get('avatar') as File | null;
		return {
			name: String(form.get('name') || '').trim(),
			email: String(form.get('email') || '').trim().toLowerCase(),
			password: String(form.get('password') || ''),
			avatarFile: file && file.size > 0 ? file : null,
		};
	}

	const body = await request.json().catch(() => ({}));
	return {
		name: String(body.name || '').trim(),
		email: String(body.email || '').trim().toLowerCase(),
		password: String(body.password || ''),
		avatarFile: null,
	};
}

export async function POST(request: Request) {
	try {
		const { name, email, password, avatarFile } = await parseRequest(request);

		if (!name || name.length < 2) {
			return json({ success: false, message: MSG.INVALID_NAME }, 400);
		}
		if (!email || !isValidEmail(email)) {
			return json({ success: false, message: MSG.INVALID_EMAIL }, 400);
		}
		if (!password || password.length < 6) {
			return json({ success: false, message: MSG.INVALID_PASSWORD }, 400);
		}

		const exists = await query('SELECT id FROM users WHERE email = $1', [email]);
		if (exists.rows.length > 0) {
			return json({ success: false, message: MSG.EMAIL_EXISTS }, 409);
		}

		let avatarUrl: string | null = null;
		if (avatarFile) {
			try {
				avatarUrl = await uploadImage(avatarFile, "imagens-de-perfil");
			} catch (err) {
				console.error('Erro ao fazer upload do avatar:', err);
				return json({ success: false, message: MSG.INVALID_AVATAR }, 400);
			}
		}

		const res = await query(
			'INSERT INTO users (name, email, password, avatar_url, bio) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, created_at, avatar_url, bio',
			[name, email, password, avatarUrl, null]
		);

		const u: DatabaseUser = res.rows[0];
		const safeUser = {
			id: u.id,
			name: u.name,
			email: u.email,
			createdAt: u.created_at,
			avatarUrl: u.avatar_url || null,
			bio: u.bio || null,
		};

		const welcomeData = {
			name: safeUser.name,
			email: safeUser.email,
		};

		const emailService = new WelcomeEmailService();
		emailService.sendWelcomeEmail(welcomeData).catch((err) => {
			console.error('Erro ao enviar e-mail de boas-vindas:', err);
		});

		return json({ success: true, message: MSG.SUCCESS_CREATED, data: safeUser }, 201);
	} catch (err) {
		console.error('Erro na rota POST /api/usuarios:', err);
		return json({ success: false, message: MSG.SERVER_ERROR }, 500);
	}
}
