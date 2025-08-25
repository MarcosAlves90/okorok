'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { User } from "lucide-react";

type Props = {
    id?: string;
    name?: string;
    initialUrl?: string | null;
    ariaLabel?: string;
};

export default function AvatarInput({
    id = "avatar",
    name = "avatar",
    initialUrl = null,
    ariaLabel = "Enviar foto de perfil",
}: Props) {
    const [preview, setPreview] = useState<string | null>(initialUrl);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (!file) return;
        const url = URL.createObjectURL(file);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(url);
    };

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    return (
        <label htmlFor={id} className="flex flex-col items-center group">
            <input
                id={id}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                aria-label={ariaLabel}
            />
            <div className="relative w-35 h-35 rounded-full bg-[#A7765F] placeholder:text-foreground/60 border-2 border-foreground flex items-center justify-center overflow-hidden cursor-pointer transition-shadow duration-200 group-hover:shadow-lg">
                {preview ? (
                    <Image
                        src={preview}
                        alt="Pré-visualização da foto"
                        width={140}
                        height={140}
                        className="w-full h-full object-cover"
                        unoptimized
                    />
                ) : (
                    <User className="text-foreground-dark" size={80} aria-hidden="true" />
                )}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                    Alterar foto
                </div>
            </div>
        </label>
    );
}
