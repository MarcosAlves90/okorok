'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Clock, Users } from 'lucide-react'
import RecipeViewSkeleton from '../molecules/RecipeViewSkeleton'
import LikeButton from '../molecules/LikeButton'
import BookmarkButton from '../molecules/BookmarkButton'

interface Recipe {
    id: number
    titulo: string
    ingredientes: string
    modo: string
    tempo?: string | null
    rendimento?: string | null
    categoria?: string | null
    observacoes?: string | null
    imagemUrl?: string | null
    authorId: number | null
    authorName?: string
    createdAt: string | null
}

export default function RecipeViewClient() {
    const params = useParams()
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`/api/receitas/${params.id}`)

                if (!response.ok) {
                    setError('Receita não encontrada')
                    return
                }

                const result = await response.json()

                if (!result.success) {
                    setError(result.message || 'Receita não encontrada')
                    return
                }

                setRecipe(result.data)
            } catch (err) {
                setError('Erro ao carregar receita')
                console.error('Erro ao buscar receita:', err)
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            fetchRecipe()
        }
    }, [params.id])

    if (loading) {
        return <RecipeViewSkeleton />
    }

    if (error || !recipe) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-foreground">
                    <p className="text-lg text-red-500">{error || 'Receita não encontrada'}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex gap-4">
            <div className="grid grid-cols-1 grid-rows-2 w-full h-full gap-4">
                <div
                    id="bloco-1"
                    className={`h-full rounded-md overflow-hidden relative ${!recipe.imagemUrl ? 'bg-placeholder' : ''}`}
                >
                    {recipe.imagemUrl && (
                        <Image
                            src={recipe.imagemUrl}
                            alt={recipe.titulo}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            className="absolute inset-0 w-full h-full"
                            priority
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                    )}
                    {recipe.imagemUrl && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/85 z-10" />}
                    <div className="relative z-20 h-full flex flex-col p-5">
                        <div className="w-full mt-auto">
                            <h1 className="w-full text-xl text-background font-semibold">
                                {recipe.titulo}
                            </h1>
                            <div className="flex items-center gap-3 mt-3">
                                <LikeButton recipeId={recipe.id} />
                                <BookmarkButton recipeId={recipe.id} />
                            </div>
                        </div>
                    </div>
                </div>

                <div id="bloco-2" className="h-full bg-foreground rounded-md flex flex-col p-5">
                    <div className="w-full flex flex-col items-start gap-4 h-full">
                        {recipe.categoria && (
                            <>
                                <h3 className="text-sm font-medium">Categoria</h3>
                                <div className="w-full rounded-md bg-foreground-dark text-sm text-background p-2">
                                    {recipe.categoria}
                                </div>
                            </>
                        )}

                        {recipe.observacoes && (
                            <>
                                <h3 className="text-sm font-medium">Observações</h3>
                                <div className="w-full rounded-md bg-foreground-dark text-sm text-background p-3">
                                    {recipe.observacoes}
                                </div>
                            </>
                        )}

                        <div className="w-full grid grid-cols-2 gap-3 mt-auto">
                            {recipe.tempo && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span>{recipe.tempo}</span>
                                </div>
                            )}

                            {recipe.rendimento && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>{recipe.rendimento}</span>
                                </div>
                            )}
                        </div>

                        {recipe.authorName && (
                            <Link className="w-full text-xs text-background/70 mt-2 hover:underline" href={`/usuarios/${recipe.authorId}`}>
                                Por: {recipe.authorName}                                
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div id="bloco-3" className="h-full bg-foreground w-full rounded-md flex flex-col items-start gap-4 p-5 overflow-auto">
                <h3 className="text-lg font-semibold">Ingredientes</h3>
                <div className="w-full rounded-md bg-foreground-dark text-sm text-background p-3">
                    <pre className="whitespace-pre-wrap font-sans">{recipe.ingredientes}</pre>
                </div>

                <h3 className="text-lg font-semibold">Modo de preparo</h3>
                <div className="w-full rounded-md bg-foreground-dark text-sm text-background p-3 flex-1">
                    <pre className="whitespace-pre-wrap font-sans">{recipe.modo}</pre>
                </div>
            </div>
        </div>
    )
}
