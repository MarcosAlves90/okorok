import { NextResponse } from 'next/server';
import { TicketEmailService } from '@/lib/email/ticket-email-service';
import { extractTicketData, validateTicketData } from '@/lib/email/ticket-utils';

const json = (body: unknown, status = 200) => NextResponse.json(body, { status });

const MSG = {
    SUCCESS: 'E-mail enviado com sucesso!',
    VALIDATION_ERROR: 'Dados inválidos',
    SERVER_ERROR: 'Erro interno do servidor',
} as const;

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get('content-type') || '';
        const data = contentType.includes('multipart/form-data')
            ? extractTicketData(await request.formData())
            : extractTicketData(await request.json());

        const validation = validateTicketData(data);
        if (!validation.isValid) {
            return json({ 
                success: false, 
                message: MSG.VALIDATION_ERROR, 
                errors: validation.errors 
            }, 400);
        }

        await new TicketEmailService().sendTicketEmail(data);
        return json({ success: true, message: MSG.SUCCESS });
    } catch (error) {
        console.error('Erro na rota POST /api/email/ticket:', error);
        const message = error instanceof Error ? error.message : MSG.SERVER_ERROR;
        return json({ success: false, message }, 500);
    }
}
