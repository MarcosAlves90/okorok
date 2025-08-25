import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const isValidEmail = (email: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS: 'Login realizado com sucesso',
    INVALID_EMAIL: 'E-mail é obrigatório e deve ser válido',
    INVALID_PASSWORD: 'Senha é obrigatória',
    USER_NOT_FOUND: 'Usuário não encontrado',
    WRONG_PASSWORD: 'Senha incorreta',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string') {
      return json({ success: false, message: MSG.INVALID_EMAIL }, 400);
    }

    if (!password || typeof password !== 'string') {
      return json({ success: false, message: MSG.INVALID_PASSWORD }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ success: false, message: MSG.INVALID_EMAIL }, 400);
    }

    const result = await query(
      'SELECT id, name, email, password, avatar_url, bio, created_at FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (!result.rows || result.rows.length === 0) {
      return json({ success: false, message: MSG.USER_NOT_FOUND }, 401);
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return json({ success: false, message: MSG.WRONG_PASSWORD }, 401);
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatar_url || null,
      bio: user.bio || null,
      createdAt: user.created_at,
    };

    return json({ 
      success: true,
      message: MSG.SUCCESS, 
      data: safeUser 
    });

  } catch (error) {
    console.error('Erro na rota POST /api/usuarios/login:', error);
    return json({ success: false, message: MSG.SERVER_ERROR }, 500);
  }
}
