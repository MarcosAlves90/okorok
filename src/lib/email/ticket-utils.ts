export interface TicketData {
    name: string
    email: string
    subject: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: string[]
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateTicketData(data: TicketData): ValidationResult {
    const errors: string[] = []

    if (!data.name?.trim()) {
        errors.push('Nome é obrigatório')
    }

    if (!data.email?.trim()) {
        errors.push('E-mail é obrigatório')
    } else if (!EMAIL_REGEX.test(data.email)) {
        errors.push('E-mail inválido')
    }

    if (!data.subject?.trim()) {
        errors.push('Assunto é obrigatório')
    }

    if (!data.message?.trim()) {
        errors.push('Mensagem é obrigatória')
    } else if (data.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

export function extractTicketData(source: FormData | Record<string, unknown>): TicketData {
    const isFormData = source instanceof FormData

    return {
        name: String(isFormData ? source.get('name') : source.name || '').trim(),
        email: String(isFormData ? source.get('email') : source.email || '').trim().toLowerCase(),
        subject: String(isFormData ? source.get('subject') : source.subject || '').trim(),
        message: String(isFormData ? source.get('message') : source.message || '').trim(),
    }
}
