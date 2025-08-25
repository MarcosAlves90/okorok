import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS_UPDATED: 'Usuário atualizado com sucesso',
    SUCCESS_FETCHED: 'Usuário encontrado com sucesso',
    INVALID_ID: 'ID do usuário é obrigatório',
    USER_NOT_FOUND: 'Usuário não encontrado',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { bio } = body;

        // Validação do ID
        if (!id) {
            return json({ success: false, message: MSG.INVALID_ID }, 400);
        }

        const existingUser = await query(
            'SELECT id, name, email, avatar_url, bio FROM users WHERE id = $1',
            [id]
        );

        if (!existingUser.rows || existingUser.rows.length === 0) {
            return json({ success: false, message: MSG.USER_NOT_FOUND }, 404);
        }

        const updatedBio = bio !== undefined ? (bio ? String(bio).trim() : null) : null;

        const result = await query(
            'UPDATE users SET bio = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, name, email, avatar_url, bio, created_at, updated_at',
            [updatedBio, id]
        );

        const updatedUser = result.rows[0];
        const safeUser = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatarUrl: updatedUser.avatar_url || null,
            bio: updatedUser.bio || null,
            createdAt: updatedUser.created_at,
            updatedAt: updatedUser.updated_at,
        };

        return json({
            success: true,
            message: MSG.SUCCESS_UPDATED,
            data: safeUser
        });

    } catch (error) {
        console.error('Erro na rota PUT /api/usuarios/[id]:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        if (!id) {
            return json({ success: false, message: MSG.INVALID_ID }, 400);
        }

        const result = await query(
            'SELECT id, name, email, avatar_url, bio, created_at, updated_at FROM users WHERE id = $1',
            [id]
        );

        if (!result.rows || result.rows.length === 0) {
            return json({ success: false, message: MSG.USER_NOT_FOUND }, 404);
        }

        const user = result.rows[0];
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url || null,
            bio: user.bio || null,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        };

        return json({
            success: true,
            message: MSG.SUCCESS_FETCHED,
            data: safeUser
        });

    } catch (error) {
        console.error('Erro na rota GET /api/usuarios/[id]:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}
