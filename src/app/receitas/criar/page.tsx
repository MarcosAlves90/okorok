import React from 'react'
import type { Metadata } from "next";
import CreateRecipeClient from '@/components/pages-components/receitas/organisms/CreateRecipeClient'

export const metadata: Metadata = {
    title: "Criar Receita",
};

export default function Page() {
    return (
        <main className="h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20 px-(--pc-padding) text-background">
            <CreateRecipeClient />
        </main>
    )
}
