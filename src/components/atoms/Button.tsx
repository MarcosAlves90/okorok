'use client'

import React from 'react';

type Variant = 'primary' | 'ghost' | 'icon';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {
    const base = 'rounded-xl focus:outline-none cursor-pointer inline-flex items-center justify-center';

    const variants: Record<Variant, string> = {
        primary: 'bg-foreground-dark text-background hover:opacity-90',
        ghost: 'bg-transparent text-background hover:underline',
        icon: 'bg-transparent text-background',
    };

    const sizes: Record<Size, string> = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3',
        lg: 'px-5 py-3 text-lg',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
