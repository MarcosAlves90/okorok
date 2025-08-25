import {
    EmailContainer,
    EmailHeader,
    EmailContent,
    Greeting,
    Text,
    MessageSummary,
    Divider,
    DisclaimerText,
    WelcomeHeader,
    WelcomeGreeting,
    ActionButton,
    InfoBox,
    COLORS
} from "@/components/templates/email/EmailTemplateFragments";

interface TicketEmailTemplateProps {
    name: string;
    subject: string;
    message: string;
}

export function TicketEmailTemplate({ name, subject, message }: TicketEmailTemplateProps) {
    return (
        <EmailContainer>

            <EmailHeader title={subject} />

            <EmailContent>

                <Greeting name={name} />

                <Text style={{ margin: '16px 0', lineHeight: '1.5' }}>
                    Recebemos sua mensagem e em breve nossa equipe irá respondê-la. Abaixo está uma cópia do que você enviou:
                </Text>

                <MessageSummary subject={subject} message={message} />

                <Text style={{ margin: '24px 0 16px 0' }}>
                    Obrigado por entrar em contato — responderemos o mais rápido possível.
                </Text>

                <Divider />

                <DisclaimerText>
                    Esta é uma mensagem automática de confirmação. Por favor, não responda este e-mail, pois não é monitorado. Se precisar de ajuda, acesse nossa página de contato.
                </DisclaimerText>

            </EmailContent>

        </EmailContainer>
    );
}

interface WelcomeEmailTemplateProps {
    name: string;
    subject?: string;
    onboardingLink?: string;
}

export function WelcomeEmailTemplate({
    name,
    subject = 'Bem-vindo(a) ao Okorok!',
    onboardingLink,
}: WelcomeEmailTemplateProps) {
    return (
        <EmailContainer>
            <WelcomeHeader title={subject} />

            <EmailContent>
                <WelcomeGreeting name={name} />

                <Text style={{ margin: '16px 0', lineHeight: '1.6' }}>
                    Obrigado por se cadastrar no <strong style={{ color: COLORS.primary }}>Okorok</strong>. Estamos felizes em tê-lo(a) na nossa comunidade de receitas — aqui
                    você pode salvar, compartilhar e descobrir pratos incríveis.
                </Text>

                {onboardingLink ? (
                    <ActionButton href={onboardingLink}>
                        Comece agora
                    </ActionButton>
                ) : (
                    <InfoBox>
                        Visite seu perfil para completar suas preferências e começar a explorar.
                    </InfoBox>
                )}

                <Divider />

                <DisclaimerText>
                    Se você não criou essa conta, ignore este e-mail ou entre em contato com nosso suporte.
                </DisclaimerText>

            </EmailContent>

        </EmailContainer>
    );
}