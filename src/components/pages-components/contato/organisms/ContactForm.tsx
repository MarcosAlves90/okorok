'use client'

import React from 'react'

import Button from "@/components/atoms/Button"
import FormField from "@/components/pages-components/contato/molecules/FormField"
import StatusMessage from "@/components/pages-components/contato/atoms/StatusMessage"
import { useContactForm } from "@/hooks/useContactForm"

export default function ContactForm() {
    const { loading, error, success, handleSubmit } = useContactForm()

    return (
        <form
            className="w-full"
            onSubmit={handleSubmit}
            acceptCharset="UTF-8"
            role="form"
            aria-label="Formulário de contato"
            aria-busy={loading}
        >
            <p id="contact-instructions" className="sr-only">
                Campos obrigatórios estão marcados. Forneça um e-mail válido para que possamos responder.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    id="nome"
                    name="nome"
                    label="Nome"
                    placeholder="Insira seu nome"
                    required
                    autoComplete="name"
                    disabled={loading}
                />

                <FormField
                    id="email"
                    name="email"
                    label="E-mail"
                    placeholder="Insira seu e-mail"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    disabled={loading}
                />

                <FormField
                    id="assunto"
                    name="assunto"
                    label="Assunto"
                    placeholder="Insira o motivo do contato"
                    className="md:col-span-2"
                    disabled={loading}
                />

                <FormField
                    id="mensagem"
                    name="mensagem"
                    label="Mensagem"
                    placeholder="Insira a mensagem"
                    type="textarea"
                    rows={6}
                    minLength={10}
                    required
                    className="md:col-span-2"
                    disabled={loading}
                />

                {error && <StatusMessage type="error" message={error} />}
                {success && <StatusMessage type="success" message={success} />}

                <div className="pt-2 md:col-span-2">
                    <Button
                        type="submit"
                        loading={loading}
                        loadingText="Enviando..."
                        className="w-full bg-foreground hover:bg-[#7f2f0f] text-white font-bold py-3 rounded-xl"
                    >
                        Enviar mensagem
                    </Button>
                </div>
            </div>
        </form>
    )
}
