import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS: 'Receitas mais votadas obtidas com sucesso',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

interface MostVotedRecipe {
    id: string;
    title: string;
    image: string;
    likes_count: number;
}

export async function GET() {
    try {
        const queryText = `
            SELECT
                r.id,
                r.titulo,
                r.imagem_url,
                COUNT(c.id) as likes_count
            FROM receitas r
            LEFT JOIN curtidas c ON r.id = c.receita_id
            GROUP BY r.id, r.titulo, r.imagem_url
            ORDER BY likes_count DESC, r.created_at DESC
            LIMIT 6
        `;

        const result = await query(queryText);

interface DatabaseRow {
    id: string;
    titulo: string;
    imagem_url?: string | null;
    likes_count: string;
}

        const recipes: MostVotedRecipe[] = result.rows.map((row: DatabaseRow) => ({
            id: row.id,
            title: row.titulo,
            image: row.imagem_url || '/local-images/linguica.png', // fallback image
            likes_count: parseInt(row.likes_count) || 0,
        }));

        return json({
            success: true,
            message: MSG.SUCCESS,
            data: recipes
        });
    } catch (err) {
        console.error('Erro na rota GET /api/receitas/most-voted:', err);
        return json({ success: false, message: MSG.SERVER_ERROR }, 500);
    }
}
