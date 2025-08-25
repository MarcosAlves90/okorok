"use client"
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/UserContext'

export default function CreateRecipeClient() {
    const fileRef = useRef<HTMLInputElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const router = useRouter()
    const { user } = useUser()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    const openFile = () => fileRef.current?.click()

    const onFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (preview) URL.revokeObjectURL(preview)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async () => {
        if (loading) return
        
        const form = formRef.current
        if (!form) return
        
        if (!user?.id) {
            setError('Usuário não identificado. Faça login novamente.')
            return
        }
        
        const formData = new FormData(form)
        
        // Adicionar o ID do usuário
        formData.append('authorId', String(user.id))
        
        const imageFile = fileRef.current?.files?.[0]
        if (imageFile) {
            formData.append('imagem', imageFile)
        }
        
        setLoading(true)
        setError('')
        
        try {
            const response = await fetch('/api/receitas', {
                method: 'POST',
                body: formData
            })
            
            const result = await response.json()
            
            if (!response.ok) {
                setError(result.message || 'Erro ao criar receita')
                return
            }
            
            router.push('/')
        } catch (err) {
            setError('Erro de rede. Tente novamente.')
            console.error('Falha na criação da receita:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview) }
    }, [preview])

    if (!user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-foreground">
                    <p className="text-lg">Redirecionando para o login...</p>
                </div>
            </div>
        )
    }

    return (
        <form ref={formRef} className="w-full h-full flex gap-4">
            <div className="grid grid-cols-1 grid-rows-2 w-full h-full gap-4">
                <div
                    id="bloco-1"
                    className="h-full rounded-xl overflow-hidden relative bg-placeholder"
                >
                    <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
                    
                    {preview && (
                        <div className="absolute inset-0">
                            <Image
                                src={preview}
                                alt="Pré-visualização da receita"
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/85" />
                        </div>
                    )}

                    <div className="relative z-10 h-full flex flex-col p-5">
                        <div className="flex-1 flex items-center justify-center">
                            <div className="mb-3 bg-background/30 rounded-xl">
                                <Button variant="icon" size="md" onClick={openFile} className="inline-flex items-center gap-2">
                                    <Upload className="h-6 w-6" />
                                    {preview ? 'Trocar imagem' : 'Enviar imagem'}
                                </Button>
                            </div>
                        </div>

                        <div className="w-full mt-auto">
                            <input
                                id="titulo-receita"
                                name="titulo"
                                type="text"
                                placeholder="Digite o título da receita"
                                className="w-full rounded-md bg-transparent text-xl text-background border-0 ring-0 focus:outline-none focus:ring-0"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div id="bloco-2" className="h-full bg-foreground rounded-xl flex flex-col p-5">
                    <div className="w-full flex flex-col items-start gap-4 h-full">
                        <h3 className="text-sm font-medium">Categoria</h3>
                        <input
                            name="categoria"
                            placeholder="Ex: Sobremesa, Principal, Entrada"
                            className="w-full rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-2 focus:outline-none focus:ring-0"
                        />

                        <h3 className="text-sm font-medium">Observações</h3>
                        <textarea
                            name="observacoes"
                            placeholder="Dicas, substituições ou notas adicionais"
                            className="w-full h-20 rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-3 resize-vertical focus:outline-none focus:ring-0"
                        />

                        {error && (
                            <div className="w-full p-3 bg-red-500/20 border border-red-500 rounded-xl">
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        <Button
                            variant="primary"
                            size="md"
                            className="w-full mt-auto"
                            loading={loading}
                            loadingText={"Enviando..."}
                            onClick={handleSubmit}
                            type="button"
                        >
                            Enviar receita
                        </Button>
                    </div>
                </div>
            </div>

            <div id="bloco-3" className="h-full bg-foreground w-full rounded-xl flex flex-col items-start gap-4 p-5 overflow-auto">
                <h3 className="text-lg font-semibold">Ingredientes *</h3>
                <textarea
                    name="ingredientes"
                    placeholder="Liste os ingredientes, um por linha"
                    className="w-full h-28 rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-3 resize-vertical focus:outline-none focus:ring-0"
                    required
                />

                <h3 className="text-lg font-semibold">Modo de preparo *</h3>
                <textarea
                    name="modo"
                    placeholder="Descreva o passo a passo"
                    className="w-full h-70 rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-3 resize-vertical focus:outline-none focus:ring-0"
                    required
                />

                <div className="w-full grid grid-cols-2 gap-3">
                    <div>
                        <h3 className="text-sm font-medium">Tempo de preparo</h3>
                        <input
                            name="tempo"
                            placeholder="Ex: 30 min"
                            className="w-full rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium">Rendimento</h3>
                        <input
                            name="rendimento"
                            placeholder="Ex: 4 porções"
                            className="w-full rounded-xl bg-foreground-dark text-sm text-background border-0 ring-0 p-2 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>

            </div>
        </form>
    )
}
