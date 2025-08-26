'use client'
import React, { useState, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import { useUser } from '@/hooks/UserContext'

interface BookmarkButtonProps {
    recipeId: number
    className?: string
}

export default function BookmarkButton({ recipeId, className = "" }: BookmarkButtonProps) {
    const { user } = useUser()
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [bookmarksCount, setBookmarksCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        const fetchBookmarkData = async () => {
            setIsFetching(true)
            try {
                const userId = user?.id ? String(user.id) : undefined

                if (userId) {
                    const userBookmarkResponse = await fetch(`/api/marcados?receitaId=${recipeId}&userId=${userId}`)
                    if (userBookmarkResponse.ok) {
                        const userBookmarkResult = await userBookmarkResponse.json()
                        if (userBookmarkResult.success) {
                            setIsBookmarked(userBookmarkResult.data.hasBookmarked)
                        }
                    }
                }

                const totalBookmarksResponse = await fetch(`/api/marcados?receitaId=${recipeId}`)
                if (totalBookmarksResponse.ok) {
                    const totalBookmarksResult = await totalBookmarksResponse.json()
                    if (totalBookmarksResult.success) {
                        setBookmarksCount(totalBookmarksResult.data.total)
                    }
                }
            } catch (err) {
                console.error('Problema ao carregar status de marcação:', err)
            } finally {
                setIsFetching(false)
            }
        }

        fetchBookmarkData()
    }, [recipeId, user?.id])

    const handleBookmark = async () => {
        if (!user?.id || loading) return

        setLoading(true)
        try {
            const method = isBookmarked ? 'DELETE' : 'POST'
            const response = await fetch('/api/marcados', {
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
                    setIsBookmarked(!isBookmarked)
                    setBookmarksCount(prev => isBookmarked ? prev - 1 : prev + 1)
                }
            }
        } catch (err) {
            console.error('Não foi possível marcar/desmarcar receita:', err)
        } finally {
            setLoading(false)
        }
    }

    if (user?.id) {
        if (isFetching) {
            return (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-md bg-background/20 animate-pulse ${className}`} aria-hidden="true">
                    <div className="w-4 h-4 bg-foreground/30 rounded" />
                    <div className="w-6 h-4 bg-foreground/30 rounded" />
                </div>
            )
        }

        return (
            <button
                onClick={handleBookmark}
                disabled={loading}
                className={`flex items-center cursor-pointer gap-2 px-3 py-2 rounded-md transition-colors ${
                    isBookmarked 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-background text-foreground hover:bg-background/60'
                } disabled:opacity-50 ${className}`}>
                <Bookmark strokeWidth={3} className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span className="text-sm font-bold">{bookmarksCount}</span>
            </button>
        )
    }

    if (isFetching) {
        return (
            <div className={`flex items-center gap-2 px-3 py-2 bg-background/20 rounded-md animate-pulse ${className}`} aria-hidden="true">
                <div className="w-4 h-4 bg-foreground/30 rounded" />
                <div className="w-6 h-4 bg-foreground/30 rounded" />
            </div>
        )
    }

    return (
        <div className={`flex items-center cursor-pointer gap-2 px-3 py-2 bg-background/20 rounded-md ${className}`}>
            <Bookmark className="h-4 w-4 text-background" />
            <span className="text-sm text-background">{bookmarksCount}</span>
        </div>
    )
}
