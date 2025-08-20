import type { Metadata } from "next";

import Button from "@/components/atoms/Button";

export const metadata: Metadata = {
    title: "Contato",
};

export default function Contact() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-20 py-17 max-w-6xl w-full flex flex-col gap-6 rounded-xl h-full text-center text-foreground">
                <h2 className="text-4xl md:text-5xl font-bold font-protest-strike leading-tight mb-6 text-center">Formulário de contato</h2>

                <form
                    className="w-full"
                    action="#"
                    method="POST"
                    acceptCharset="UTF-8"
                    role="form"
                    aria-label="Formulário de contato"
                >
                    <p id="contact-instructions" className="sr-only">Campos obrigatórios estão marcados. Forneça um e-mail válido para que possamos responder.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label htmlFor="nome" className="flex flex-col text-left">
                            <span className="text-sm text-foreground mb-1 font-semibold">Nome</span>
                            <input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Insira seu nome"
                                autoComplete="name"
                                required
                                aria-required="true"
                                aria-describedby="nome-help"
                                className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                            />
                            <span id="nome-help" className="sr-only">Informe seu nome completo.</span>
                        </label>

                        <label htmlFor="email" className="flex flex-col text-left">
                            <span className="text-sm text-foreground mb-1 font-semibold">E-mail</span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Insira seu e-mail"
                                autoComplete="email"
                                inputMode="email"
                                required
                                aria-required="true"
                                aria-describedby="email-help"
                                className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                            />
                            <span id="email-help" className="sr-only">Forneça um endereço de e-mail válido para contato.</span>
                        </label>

                        <label htmlFor="assunto" className="flex flex-col text-left md:col-span-2">
                            <span className="text-sm text-foreground mb-1 font-semibold">Assunto</span>
                            <input
                                id="assunto"
                                name="assunto"
                                type="text"
                                placeholder="Insira o motivo do contato"
                                autoComplete="off"
                                className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 focus:outline-none"
                            />
                        </label>

                        <label htmlFor="mensagem" className="flex flex-col text-left md:col-span-2">
                            <span className="text-sm text-foreground mb-1 font-semibold">Mensagem</span>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                placeholder="Insira a mensagem"
                                rows={6}
                                minLength={10}
                                required
                                aria-required="true"
                                aria-describedby="mensagem-help"
                                className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-xl px-4 py-3 resize-vertical focus:outline-none"
                            />
                            <span id="mensagem-help" className="sr-only">Escreva sua mensagem. Mínimo de 10 caracteres.</span>
                        </label>

                        <div className="pt-2 md:col-span-2">
                            <Button
                                type="submit"
                                className="w-full bg-foreground hover:bg-[#7f2f0f] text-white font-bold py-3 rounded-xl"
                            >
                                Enviar mensagem
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
