'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';

export default function BackButton(): React.ReactElement {
    const router = useRouter();

    return (
        <Button className="w-full" variant="primary" size="sm" onClick={() => router.back()} aria-label="Voltar">
            Voltar
        </Button>
    );
}
