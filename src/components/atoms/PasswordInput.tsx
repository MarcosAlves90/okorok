'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type PasswordInputProps = {
    id?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    autoComplete?: string;
    required?: boolean;
    ariaInvalid?: boolean;
    disabled?: boolean;
    className?: string;
};

export default function PasswordInput({
    id,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    required,
    ariaInvalid,
    disabled,
    className,
}: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                id={id}
                name={name}
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                aria-required={required}
                aria-invalid={!!ariaInvalid}
                value={value}
                onChange={onChange}
                className={(className ?? '') + ' pr-12'}
                disabled={disabled}
            />

            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={show}
                className="absolute right-3 top-1/2 hover:bg-foreground/30 rounded-md transition-colors duration-200 -translate-y-1/2 cursor-pointer text-foreground-dark p-1"
                disabled={disabled}
            >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
}
