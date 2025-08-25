import React from 'react'
import type { Metadata } from "next";
import RecipeViewClient from '@/components/pages-components/receitas/organisms/RecipeViewClient'

export const metadata: Metadata = {
    title: "Visualizar Receita",
};

export default function Page() {
    return (
        <main className="h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20 px-(--pc-padding) text-background">
            <RecipeViewClient />
        </main>
    )
}
