'use client'

import React from 'react'
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackLinkProps {
    className?: string;
}

export default function BackLink({ className }: BackLinkProps) {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className={`text-foreground cursor-pointer hover:underline flex items-center justify-center ${className || ''}`}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
        </button>
    );
}
