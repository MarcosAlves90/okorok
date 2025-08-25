export interface WelcomeData {
    name: string
    email: string
}

export interface ValidationResult {
    isValid: boolean
    errors: string[]
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateWelcomeData(data: WelcomeData): ValidationResult {
    const errors: string[] = []

    if (!data.name?.trim()) {
        errors.push('Nome é obrigatório')
    }

    if (!data.email?.trim()) {
        errors.push('E-mail é obrigatório')
    } else if (!EMAIL_REGEX.test(data.email)) {
        errors.push('E-mail inválido')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

export function extractWelcomeData(source: FormData | Record<string, unknown>): WelcomeData {
    const isFormData = source instanceof FormData

    return {
        name: String(isFormData ? source.get('name') : source.name || '').trim(),
        email: String(isFormData ? source.get('email') : source.email || '').trim().toLowerCase(),
    }
}
