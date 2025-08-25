import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS_BOOKMARK: 'Receita marcada como favorita com sucesso',
    SUCCESS_UNBOOKMARK: 'Receita removida dos favoritos com sucesso',
    SUCCESS_GET: 'Marcados obtidos com sucesso',
    ALREADY_BOOKMARKED: 'Receita já foi marcada como favorita por este usuário',
    NOT_BOOKMARKED: 'Receita não foi marcada como favorita por este usuário',
    INVALID_USER_ID: 'ID do usuário é obrigatório',
    INVALID_RECIPE_ID: 'ID da receita é obrigatório',
    USER_NOT_FOUND: 'Usuário não encontrado',
    RECIPE_NOT_FOUND: 'Receita não encontrada',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

// Obter marcados de uma receita ou verificar se usuário marcou
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
            const userBookmark = await query(
                'SELECT id FROM marcados WHERE user_id = $1 AND receita_id = $2',
                [userId, receitaId]
            );
            
            const hasBookmarked = userBookmark.rows && userBookmark.rows.length > 0;
            
            return json({ 
                success: true, 
                message: MSG.SUCCESS_GET,
                data: { hasBookmarked }
            });
        }

        // Obter total de marcados da receita
        const totalBookmarks = await query(
            'SELECT COUNT(*) as total FROM marcados WHERE receita_id = $1',
            [receitaId]
        );

        const total = parseInt(totalBookmarks.rows[0].total) || 0;

        return json({ 
            success: true, 
            message: MSG.SUCCESS_GET,
            data: { total }
        });

    } catch (error) {
        console.error('Erro na rota GET /api/marcados:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

// Marcar receita como favorita
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

        // Verificar se já marcou
        const existingBookmark = await query(
            'SELECT id FROM marcados WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        if (existingBookmark.rows && existingBookmark.rows.length > 0) {
            return json({ success: false, message: MSG.ALREADY_BOOKMARKED }, 409);
        }

        // Criar marcado
        await query(
            'INSERT INTO marcados (user_id, receita_id) VALUES ($1, $2)',
            [userId, receitaId]
        );

        return json({ success: true, message: MSG.SUCCESS_BOOKMARK });

    } catch (error) {
        console.error('Erro na rota POST /api/marcados:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

// Desmarcar receita dos favoritos
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

        // Verificar se realmente marcou
        const existingBookmark = await query(
            'SELECT id FROM marcados WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        if (!existingBookmark.rows || existingBookmark.rows.length === 0) {
            return json({ success: false, message: MSG.NOT_BOOKMARKED }, 404);
        }

        // Remover marcado
        await query(
            'DELETE FROM marcados WHERE user_id = $1 AND receita_id = $2',
            [userId, receitaId]
        );

        return json({ success: true, message: MSG.SUCCESS_UNBOOKMARK });

    } catch (error) {
        console.error('Erro na rota DELETE /api/marcados:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}
