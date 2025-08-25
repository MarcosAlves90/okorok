import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS: 'Receitas marcadas obtidas com sucesso',
    INVALID_USER_ID: 'ID do usuário é obrigatório',
    USER_NOT_FOUND: 'Usuário não encontrado',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

interface DatabaseRecipe {
    id: number | string;
    titulo: string;
    ingredientes: string;
    modo: string;
    tempo?: string | null;
    rendimento?: string | null;
    categoria?: string | null;
    observacoes?: string | null;
    imagem_url?: string | null;
    author_id?: string | null;
    created_at?: string;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return json({ success: false, message: MSG.INVALID_USER_ID }, 400);
        }

        // Verificar se o usuário existe
        const userCheck = await query('SELECT id FROM users WHERE id = $1', [userId]);
        if (!userCheck.rows || userCheck.rows.length === 0) {
            return json({ success: false, message: MSG.USER_NOT_FOUND }, 404);
        }

        // Buscar receitas marcadas pelo usuário
        const queryText = `
            SELECT 
                r.id, r.titulo, r.ingredientes, r.modo, r.tempo, 
                r.rendimento, r.categoria, r.observacoes, r.imagem_url, 
                r.author_id, r.created_at
            FROM receitas r
            INNER JOIN marcados m ON r.id = m.receita_id
            WHERE m.user_id = $1
            ORDER BY m.created_at DESC
        `;

        const result = await query(queryText, [userId]);

        const receitas = result.rows.map((r: DatabaseRecipe) => ({
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
            createdAt: r.created_at || null,
        }));

        return json({ 
            success: true, 
            message: MSG.SUCCESS,
            data: receitas 
        });

    } catch (error) {
        console.error('Erro na rota GET /api/receitas/marcadas:', error);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}
