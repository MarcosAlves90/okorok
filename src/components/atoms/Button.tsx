'use client'

import React from 'react';

type Variant = 'primary' | 'ghost' | 'icon';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    loading?: boolean;
    loadingText?: React.ReactNode;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    loadingText,
    disabled,
    ...props
}: ButtonProps) {
    const base = 'rounded-md focus:outline-none cursor-pointer items-center justify-center';

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

    const isDisabled = Boolean(loading || disabled);

    return (
        <button className={classes} disabled={isDisabled} aria-busy={loading} {...props}>
            {loading ? (
                <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4"></circle>
                        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                    </svg>
                    {loadingText ?? children}
                </span>
            ) : (
                children
            )}
        </button>
    );
}
