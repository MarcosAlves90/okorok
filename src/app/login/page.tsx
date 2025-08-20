import type { Metadata } from "next";
import Link from 'next/link';

import Button from "@/components/atoms/Button";

export const metadata: Metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-0 py-0 max-w-6xl w-full grid grid-cols-2 rounded-xl h-full overflow-hidden text-foreground">
                <div className="w-full h-full bg-foreground" aria-hidden />
                <div className="w-full h-full px-12 py-17 min-h-170 flex items-center justify-center text-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-4xl md:text-5xl font-bold font-protest-strike leading-tight mb-12 text-center">Entre em sua conta</h2>

                        <form
                            className="w-full"
                            action="#"
                            method="POST"
                            acceptCharset="UTF-8"
                            role="form"
                            aria-label="Formulário de login"
                        >
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
                                        autoComplete="current-password"
                                        required
                                        aria-required="true"
                                        className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                                    />
                                </label>

                                <label className="flex items-center gap-2 text-foreground">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="accent-foreground bg-back w-4 h-4"
                                    />
                                    <span className="text-sm">Lembrar de mim</span>
                                </label>


                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-foreground hover:bg-foreground-dark text-white font-bold py-3 rounded-xl"
                                    >
                                        Entrar
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
                    </div>
                </div>
            </div>
        </main>
  )
}
