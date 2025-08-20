import { Pool, PoolConfig } from 'pg';

export const dbConfig = {
    connectionString: process.env.DATABASE_URL,
};

export function validateDatabaseConfig() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL não está definida nas variáveis de ambiente');
    }

    return {
        isValid: true,
        url: process.env.DATABASE_URL,
    };
}

export function parseDatabaseUrl(url: string) {
    try {
        const parsed = new URL(url);
        return {
            host: parsed.hostname,
            port: parsed.port || '5432',
            database: parsed.pathname.slice(1), // Remove a '/' inicial
            username: parsed.username,
            ssl: parsed.searchParams.get('sslmode') === 'require',
        };
    } catch {
        throw new Error('URL do banco inválida');
    }
}

const poolConfig: PoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

let pool: Pool | null = null;

export function getPool(): Pool {
    if (!pool) {
        validateDatabaseConfig();
        pool = new Pool(poolConfig);
        
        pool.on('error', (err) => {
            console.error('Erro inesperado no pool de conexões:', err);
        });
    }
    return pool;
}

export async function query(text: string, params?: unknown[]) {
    const client = getPool();
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error) {
        console.error('Erro ao executar query:', error);
        throw error;
    }
}

export async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}
