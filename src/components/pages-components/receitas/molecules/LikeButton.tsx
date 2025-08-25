"use client"
import React, { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useUser } from '@/hooks/UserContext'

interface LikeButtonProps {
    recipeId: number
    className?: string
}

export default function LikeButton({ recipeId, className = "" }: LikeButtonProps) {
    const { user } = useUser()
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchLikeData = async () => {
            setIsFetching(true)
            try {
                const userId = user?.id ? String(user.id) : undefined

                if (userId) {
                    const userLikeResponse = await fetch(`/api/curtidas?receitaId=${recipeId}&userId=${userId}`)
                    if (userLikeResponse.ok) {
                        const userLikeResult = await userLikeResponse.json()
                        if (userLikeResult.success) {
                            setIsLiked(userLikeResult.data.hasLiked)
                        }
                    }
                }

                const totalLikesResponse = await fetch(`/api/curtidas?receitaId=${recipeId}`)
                if (totalLikesResponse.ok) {
                    const totalLikesResult = await totalLikesResponse.json()
                    if (totalLikesResult.success) {
                        setLikesCount(totalLikesResult.data.total)
                    }
                }
            } catch (err) {
                console.error('Falha ao carregar dados de curtida:', err)
            } finally {
                setIsFetching(false)
            }
        }

        fetchLikeData()
    }, [recipeId, user?.id])

    const handleLike = async () => {
        if (!user?.id || loading) return

        setLoading(true)
        try {
            const method = isLiked ? 'DELETE' : 'POST'
            const response = await fetch('/api/curtidas', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: String(user.id),
                    receitaId: String(recipeId)
                })
            })

            if (response.ok) {
                const result = await response.json()
                if (result.success) {
                    setIsLiked(!isLiked)
                    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
                }
            }
        } catch (err) {
            console.error('Falha na operação de curtir:', err)
        } finally {
            setLoading(false)
        }
    }

    if (user?.id) {
        if (isFetching) {
            return (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-background/20 animate-pulse ${className}`} aria-hidden="true">
                    <div className="w-4 h-4 bg-foreground/30 rounded" />
                    <div className="w-6 h-4 bg-foreground/30 rounded" />
                </div>
            )
        }

        return (
            <button
                onClick={handleLike}
                disabled={loading}
                className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isLiked 
                        ? 'bg-red-500 text-white' 
                        : 'bg-background/20 text-background hover:bg-background/30'
                } disabled:opacity-50 ${className}`}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likesCount}</span>
            </button>
        )
    }

    if (isFetching) {
        return (
            <div className={`flex items-center gap-2 px-3 py-2 bg-background/20 rounded-lg animate-pulse ${className}`} aria-hidden="true">
                <div className="w-4 h-4 bg-foreground/30 rounded" />
                <div className="w-6 h-4 bg-foreground/30 rounded" />
            </div>
        )
    }

    return (
        <div className={`flex items-center cursor-pointer gap-2 px-3 py-2 bg-background/20 rounded-lg ${className}`}>
            <Heart className="h-4 w-4 text-background" />
            <span className="text-sm text-background">{likesCount}</span>
        </div>
    )
}
