interface FormFieldProps {
    id: string
    name: string
    label: string
    placeholder: string
    type?: 'text' | 'email' | 'textarea'
    required?: boolean
    disabled?: boolean
    rows?: number
    minLength?: number
    autoComplete?: string
    inputMode?: 'email' | 'text'
    className?: string
}

export default function FormField({
    id,
    name,
    label,
    placeholder,
    type = 'text',
    required = false,
    disabled = false,
    rows,
    minLength,
    autoComplete = 'off',
    inputMode,
    className = ''
}: FormFieldProps) {
    const baseInputClass = `
    w-full bg-background-gray placeholder:text-foreground/60 
    border-2 border-foreground rounded-xl px-4 py-3 
    focus:outline-none
    `.trim()

    const helpText = getHelpText(type, label, minLength)

    return (
        <label htmlFor={id} className={`flex flex-col text-left ${className}`}>
            <span className="text-sm text-foreground mb-1 font-semibold">
                {label}
            </span>

            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    rows={rows}
                    minLength={minLength}
                    required={required}
                    aria-required={required}
                    aria-describedby={`${id}-help`}
                    className={`${baseInputClass} resize-vertical`}
                    disabled={disabled}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    required={required}
                    aria-required={required}
                    aria-describedby={`${id}-help`}
                    className={baseInputClass}
                    disabled={disabled}
                />
            )}

            <span id={`${id}-help`} className="sr-only">
                {helpText}
            </span>
        </label>
    )
}

function getHelpText(type: string, label: string, minLength?: number): string {
    switch (type) {
        case 'email':
            return 'Forneça um endereço de e-mail válido para contato.'
        case 'textarea':
            return `Escreva sua mensagem.${minLength ? ` Mínimo de ${minLength} caracteres.` : ''}`
        default:
            return `Informe seu ${label.toLowerCase()}.`
    }
}
