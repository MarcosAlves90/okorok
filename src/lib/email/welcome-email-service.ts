import { Resend } from 'resend'
import { WelcomeEmailTemplate } from '@/components/templates/email/EmailTemplate'
import type { WelcomeData } from './welcome-utils'

const EMAIL_CONFIG = {
    FROM: 'Marcos Pilgrim <okorok@marcospilgrim.com.br>',
    API_KEY: process.env.RESEND_API_KEY
} as const

export class WelcomeEmailService {
    private resend: Resend

    constructor() {
        if (!EMAIL_CONFIG.API_KEY) {
            throw new Error('RESEND_API_KEY não configurada')
        }
        this.resend = new Resend(EMAIL_CONFIG.API_KEY)
    }

    async sendWelcomeEmail(data: WelcomeData, onboardingLink?: string): Promise<void> {
        try {
            await this.resend.emails.send({
                from: EMAIL_CONFIG.FROM,
                to: data.email,
                subject: 'Bem-vindo(a) ao Okorok!',
                react: WelcomeEmailTemplate({
                    name: data.name,
                    onboardingLink
                })
            })
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error)
            throw new Error('Falha ao enviar e-mail')
        }
    }
}
