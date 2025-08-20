import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

// Respostas JSON
const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();
        const { bio } = body;

        // Validação do ID
        if (!id) {
            return json({ message: 'ID do usuário é obrigatório' }, 400);
        }

        // Buscar usuário
        const existingUser = await query(
            'SELECT id, name, email, avatar_url, bio FROM users WHERE id = $1',
            [id]
        );

        if (!existingUser.rows || existingUser.rows.length === 0) {
            return json({ message: 'Usuário não encontrado' }, 404);
        }

        const updatedBio = bio !== undefined ? (bio ? String(bio).trim() : null) : null;

        // Atualizar apenas a bio
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
            message: 'Usuário atualizado com sucesso',
            user: safeUser
        });

    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return json({ message: 'Erro interno do servidor' }, 500);
    }
}
