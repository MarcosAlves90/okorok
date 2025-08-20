'use client'

import React, { useState, FormEvent } from 'react';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type FormState = { email: string; password: string };

export default function LoginForm() {
    const [form, setForm] = useState<FormState>({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const json = await res.json().catch(() => null);
            if (!res.ok) {
                setError(json?.message ?? 'Erro ao autenticar');
                return;
            }
            localStorage.setItem('user', JSON.stringify(json));
            router.push('/perfil');
        } catch {
            setError('Erro de rede');
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none';

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
                <label htmlFor="email" className="flex flex-col text-left">
                    <span className="text-sm text-foreground mb-1 font-semibold">E-mail</span>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@exemplo.com"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </label>

                <label htmlFor="password" className="flex flex-col text-left">
                    <span className="text-sm text-foreground mb-1 font-semibold">Senha</span>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Insira sua senha"
                        autoComplete="current-password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </label>

                {error && (
                    <div role="alert" className="text-sm text-red-500 mt-1" aria-live="polite">
                        {error}
                    </div>
                )}

                <div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-foreground hover:bg-foreground-dark text-white font-bold py-3 rounded-xl"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </div>

                <div className="text-sm text-foreground/90 mt-2">
                    <span>Ainda não tem conta? </span>
                    <Link href="/cadastro" aria-label="Criar nova conta" className="font-semibold underline-offset-2 hover:underline">
                        Cadastre-se
                    </Link>
                </div>
            </div>
        </form>
    );
}
