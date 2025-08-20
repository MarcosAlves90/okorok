import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

// Respostas JSON
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const validateEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validações
    if (!email || typeof email !== 'string') {
      return json({ message: 'E-mail é obrigatório' }, 400);
    }

    if (!password || typeof password !== 'string') {
      return json({ message: 'Senha é obrigatória' }, 400);
    }

    if (!validateEmail(email)) {
      return json({ message: 'E-mail inválido' }, 400);
    }

    // Buscar usuário no banco
    const result = await query(
      'SELECT id, name, email, password, avatar_url, bio, created_at FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (!result.rows || result.rows.length === 0) {
      return json({ message: 'Usuário não encontrado' }, 401);
    }

    const user = result.rows[0];

    // Verificar senha
    if (user.password !== password) {
      return json({ message: 'Senha incorreta' }, 401);
    }

    // Retornar dados sem a senha
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url || null,
      bio: user.bio || null,
      createdAt: user.created_at,
    };

    return json({ 
      message: 'Login realizado com sucesso', 
      user: safeUser 
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return json({ message: 'Erro interno do servidor' }, 500);
  }
}
