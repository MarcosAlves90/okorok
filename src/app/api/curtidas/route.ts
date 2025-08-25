import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS_LIKE: 'Receita curtida com sucesso',
    SUCCESS_UNLIKE: 'Curtida removida com sucesso',
    SUCCESS_GET: 'Curtidas obtidas com sucesso',
    ALREADY_LIKED: 'Receita já foi curtida por este usuário',
    NOT_LIKED: 'Receita não foi curtida por este usuário',
    INVALID_USER_ID: 'ID do usuário é obrigatório',
    INVALID_RECIPE_ID: 'ID da receita é obrigatório',
    USER_NOT_FOUND: 'Usuário não encontrado',
    RECIPE_NOT_FOUND: 'Receita não encontrada',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const receitaId = searchParams.get('receitaId');
        const userId = searchParams.get('userId');

        if (!receitaId) {
            return json({ success: false, message: MSG.INVALID_RECIPE_ID }, 400);
        }

        // Verificar se a receita existe
        const recipeCheck = await query('SELECT id FROM receitas WHERE id = $1', [receitaId]);
        if (!recipeCheck.rows || recipeCheck.rows.length === 0) {
            return json({ success: false, message: MSG.RECIPE_NOT_FOUND }, 404);
        }

        if (userId) {
            const userLike = await query(
                'SELECT id FROM curtidas WHERE user_id = $1 AND receita_id = $2',
                [userId, receitaId]
            );
            
            const hasLiked = userLike.rows && userLike.rows.length > 0;
            
            return json({ 
                success: true, 
                message: MSG.SUCCESS_GET,
                data: { hasLiked }
            });
        }

        const totalLikes = await query(
            'SELECT COUNT(*) as total FROM curtidas WHERE receita_id = $1',
            [receitaId]
        );

        const total = parseInt(totalLikes.rows[0].total) || 0;

        return json({ 
            success: true, 
            message: MSG.SUCCESS_GET,
            data: { total }
        });

    } catch (error) {
        console.error('Erro na rota GET /api/curtidas:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

// Curtir receita
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, receitaId } = body;

        // Validações
        if (!userId || typeof userId !== 'string') {
            return json({ success: false, message: MSG.INVALID_USER_ID }, 400);
        }

        if (!receitaId || typeof receitaId !== 'string') {
            return json({ success: false, message: MSG.INVALID_RECIPE_ID }, 400);
        }

        // Verificar se o usuário existe
        const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
        if (!userCheck.rows || userCheck.rows.length === 0) {
            return json({ success: false, message: MSG.USER_NOT_FOUND }, 404);
        }

        // Verificar se a receita existe
        const recipeCheck = await query('SELECT id FROM receitas WHERE id = $1', [receitaId]);
        if (!recipeCheck.rows || recipeCheck.rows.length === 0) {
            return json({ success: false, message: MSG.RECIPE_NOT_FOUND }, 404);
        }

        // Verificar se já curtiu
        const existingLike = await query(
            'SELECT id FROM curtidas WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        if (existingLike.rows && existingLike.rows.length > 0) {
            return json({ success: false, message: MSG.ALREADY_LIKED }, 409);
        }

        // Criar curtida
        await query(
            'INSERT INTO curtidas (user_id, receita_id) VALUES ($1, $2)',
            [userId, receitaId]
        );

        return json({ success: true, message: MSG.SUCCESS_LIKE });

    } catch (error) {
        console.error('Erro na rota POST /api/curtidas:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

// Descurtir receita
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { userId, receitaId } = body;

        // Validações
        if (!userId || typeof userId !== 'string') {
            return json({ success: false, message: MSG.INVALID_USER_ID }, 400);
        }

        if (!receitaId || typeof receitaId !== 'string') {
            return json({ success: false, message: MSG.INVALID_RECIPE_ID }, 400);
        }

        // Verificar se o usuário existe
        const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
        if (!userCheck.rows || userCheck.rows.length === 0) {
            return json({ success: false, message: MSG.USER_NOT_FOUND }, 404);
        }

        // Verificar se a receita existe
        const recipeCheck = await query('SELECT id FROM receitas WHERE id = $1', [receitaId]);
        if (!recipeCheck.rows || recipeCheck.rows.length === 0) {
            return json({ success: false, message: MSG.RECIPE_NOT_FOUND }, 404);
        }

        // Verificar se realmente curtiu
        const existingLike = await query(
            'SELECT id FROM curtidas WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        if (!existingLike.rows || existingLike.rows.length === 0) {
            return json({ success: false, message: MSG.NOT_LIKED }, 404);
        }

        // Remover curtida
        await query(
            'DELETE FROM curtidas WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        return json({ success: true, message: MSG.SUCCESS_UNLIKE });

    } catch (error) {
        console.error('Erro na rota DELETE /api/curtidas:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

