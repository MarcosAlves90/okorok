import { Resend } from 'resend'
import { TicketEmailTemplate } from '@/components/templates/email/EmailTemplate'
import type { TicketData } from './ticket-utils'

const EMAIL_CONFIG = {
    FROM: 'Marcos Pilgrim <okorok@marcospilgrim.com.br>',
    API_KEY: process.env.RESEND_API_KEY
} as const

export class TicketEmailService {
    private resend: Resend

    constructor() {
        if (!EMAIL_CONFIG.API_KEY) {
            throw new Error('RESEND_API_KEY não configurada')
        }
        this.resend = new Resend(EMAIL_CONFIG.API_KEY)
    }

    async sendTicketEmail(data: TicketData): Promise<void> {
        try {
            await this.resend.emails.send({
                from: EMAIL_CONFIG.FROM,
                to: data.email,
                subject: data.subject,
                react: TicketEmailTemplate({
                    name: data.name,
                    subject: data.subject,
                    message: data.message
                })
            })
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error)
            throw new Error('Falha ao enviar e-mail')
        }
    }
}
