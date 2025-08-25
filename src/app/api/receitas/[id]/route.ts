import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS: 'Receita deletada com sucesso',
    NOT_FOUND: 'Receita não encontrada',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return json({ success: false, message: 'ID da receita é obrigatório' }, 400);
        }

        // Verificar se a receita existe
        const existingRecipe = await query(
            'SELECT id FROM receitas WHERE id = $1',
            [id]
        );

        if (!existingRecipe.rows || existingRecipe.rows.length === 0) {
            return json({ success: false, message: MSG.NOT_FOUND }, 404);
        }

        await query('DELETE FROM curtidas WHERE receita_id = $1', [id]);
        await query('DELETE FROM marcados WHERE receita_id = $1', [id]);
        
        await query('DELETE FROM receitas WHERE id = $1', [id]);

        return json({ success: true, message: MSG.SUCCESS });
    } catch (err) {
        console.error('Erro na rota DELETE /api/receitas/[id]:', err);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return json({ success: false, message: 'ID da receita é obrigatório' }, 400);
        }

        const result = await query(
            `SELECT 
                r.id, r.titulo, r.ingredientes, r.modo, r.tempo, r.rendimento, 
                r.categoria, r.observacoes, r.imagem_url, r.author_id, r.created_at,
                u.name as author_name
                FROM receitas r 
                LEFT JOIN users u ON r.author_id = u.id 
                WHERE r.id = $1`,
            [id]
        );

        if (!result.rows || result.rows.length === 0) {
            return json({ success: false, message: MSG.NOT_FOUND }, 404);
        }

        const r = result.rows[0];
        const receita = {
            id: r.id,
            titulo: r.titulo,
            ingredientes: r.ingredientes,
            modo: r.modo,
            tempo: r.tempo || null,
            rendimento: r.rendimento || null,
            categoria: r.categoria || null,
            observacoes: r.observacoes || null,
            imagemUrl: r.imagem_url || null,
            authorId: r.author_id || null,
            authorName: r.author_name || null,
            createdAt: r.created_at || null,
        };

        return json({ success: true, data: receita });
    } catch (err) {
        console.error('Erro na rota GET /api/receitas/[id]:', err);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}
