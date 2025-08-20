"use client"

import Image from "next/image";
import { User } from "lucide-react";

type Props = {
    src?: string | null;
    alt?: string;
    size?: number;
    className?: string;
    ariaLabel?: string;
};

export default function AvatarDisplay({
    src = null,
    alt = "Foto de perfil",
    size = 140,
    className = "",
    ariaLabel = "Foto de perfil",
}: Props) {
    const numericSize = Math.max(0, size);

    return (
        <div
            role="img"
            aria-label={ariaLabel}
            className={`relative rounded-full overflow-hidden bg-[#A7765F] border-2 border-foreground flex items-center justify-center ${className}`}
            style={{ width: numericSize, height: numericSize }}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    width={numericSize}
                    height={numericSize}
                    className="w-full h-full object-cover"
                    unoptimized
                />
            ) : (
                <User className="text-foreground-dark" size={Math.floor(numericSize * 0.6)} aria-hidden="true" />
            )}
        </div>
    );
}
