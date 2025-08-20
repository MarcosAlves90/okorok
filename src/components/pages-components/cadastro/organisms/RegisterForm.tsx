'use client'

import { useState } from "react";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import AvatarInput from "./AvatarInput";

export default function RegisterForm() {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") ?? "");
        const pwd = String(form.get("password") ?? "");
        const pwdConfirm = String(form.get("passwordConfirm") ?? "");

        if (pwd !== pwdConfirm) {
            setError("As senhas não coincidem");
            return;
        }

        setError("");
        console.log("Cadastrar:", { email, pwd });
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (passwordConfirm && value !== passwordConfirm) setError("As senhas não coincidem");
        else setError("");
    };

    const handlePasswordConfirmChange = (value: string) => {
        setPasswordConfirm(value);
        if (password && value !== password) setError("As senhas não coincidem");
        else setError("");
    };

    return (
        <form
            className="w-full"
            action="#"
            method="POST"
            acceptCharset="UTF-8"
            role="form"
            aria-label="Formulário de cadastro"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-4">
                <AvatarInput />
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
                        aria-required="true"
                        className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                    />
                </label>

                <label htmlFor="password" className="flex flex-col text-left">
                    <span className="text-sm text-foreground mb-1 font-semibold">Senha</span>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Insira sua senha"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        aria-invalid={!!error}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                    />
                </label>

                <label htmlFor="passwordConfirm" className="flex flex-col text-left">
                    <span className="text-sm text-foreground mb-1 font-semibold">Confirme a senha</span>
                    <input
                        id="passwordConfirm"
                        name="passwordConfirm"
                        type="password"
                        placeholder="Repita sua senha"
                        autoComplete="new-password"
                        required
                        aria-required="true"
                        aria-invalid={!!error}
                        value={passwordConfirm}
                        onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                        className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
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
                        className="w-full bg-foreground hover:bg-foreground-dark text-white font-bold py-3 rounded-xl"
                    >
                        Cadastrar
                    </Button>
                </div>
                <div className="text-sm text-foreground/90 mt-2">
                    <span>Já tem conta? </span>
                    <Link href="/login" aria-label="Fazer login" className="font-semibold underline-offset-2 hover:underline">
                        Entrar
                    </Link>
                </div>
            </div>
        </form>
    );
}
