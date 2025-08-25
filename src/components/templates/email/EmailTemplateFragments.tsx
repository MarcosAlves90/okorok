import type { ReactNode, CSSProperties } from 'react';
import { Html, Head, Body, Container } from '@react-email/components';

export const COLORS = {
    primary: '#A44214',
    secondary: '#712D0D',
    background: '#FEFCED',
    white: '#ffffff',
    divider: '#CBC9BD',
} as const;

export function EmailHeader({ title }: { title: string }) {
    return (
        <div style={{ 
            backgroundColor: COLORS.primary, 
            padding: '20px', 
            textAlign: 'center'
        }}>
            <h2 style={{ 
                margin: '0', 
                color: COLORS.background, 
                fontSize: '24px', 
                fontWeight: '700' 
            }}>
                {title}
            </h2>
        </div>
    );
}

export function EmailContent({ children }: { children: ReactNode }) {
    return <div style={{ padding: '24px' }}>{children}</div>;
}

export function Greeting({ name }: { name: string }) {
    return (
        <p style={{ margin: '0 0 16px 0', color: COLORS.secondary, fontSize: '16px' }}>
            Olá, {name}!
        </p>
    );
}

export function Text({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
    const defaultStyle = { color: COLORS.secondary, fontSize: '16px' };
    return <p style={{ ...defaultStyle, ...style }}>{children}</p>;
}

export function MessageSummary({ subject, message }: { subject: string; message: string }) {
    return (
        <div style={{ 
            border: `2px solid ${COLORS.primary}`, 
            padding: '16px', 
            borderRadius: '12px', 
            backgroundColor: COLORS.background, 
            margin: '16px 0' 
        }}>
            <p style={{ margin: '8px 0', color: COLORS.secondary }}>
                <strong style={{ color: COLORS.primary }}>Assunto:</strong> {subject}
            </p>
            <p style={{ margin: '8px 0', color: COLORS.secondary }}>
                <strong style={{ color: COLORS.primary }}>Mensagem:</strong>
            </p>
            <div style={{ 
                whiteSpace: 'pre-wrap', 
                color: COLORS.secondary, 
                marginTop: '8px',
                lineHeight: '1.5'
            }}>
                {message}
            </div>
        </div>
    );
}

export function Divider() {
    return (
        <div style={{ 
            height: '2px', 
            backgroundColor: COLORS.divider, 
            margin: '24px 0',
            borderRadius: '1px'
        }} />
    );
}

export function DisclaimerText({ children }: { children: ReactNode }) {
    return (
        <p style={{ 
            margin: '0', 
            color: COLORS.primary, 
            fontSize: '14px',
            lineHeight: '1.4'
        }}>
            {children}
        </p>
    );
}

export function WelcomeHeader({ title }: { title: string }) {
    return (
        <div style={{ 
            backgroundColor: COLORS.primary, 
            padding: '20px', 
            textAlign: 'center'
        }}>
            <h1 style={{ 
                margin: '0', 
                color: COLORS.background, 
                fontSize: '28px', 
                fontWeight: '700'
            }}>
                {title}
            </h1>
        </div>
    );
}

export function WelcomeGreeting({ name }: { name: string }) {
    return (
        <p style={{ 
            margin: '0 0 16px 0', 
            color: COLORS.secondary, 
            fontSize: '18px', 
            fontWeight: '600' 
        }}>
            Olá, {name}!
        </p>
    );
}

export function ActionButton({ href, children }: { href: string; children: ReactNode }) {
    return (
        <div style={{ margin: '24px 0', textAlign: 'center' }}>
            <a 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                    display: 'inline-block',
                    backgroundColor: COLORS.secondary, 
                    color: COLORS.background, 
                    padding: '12px 24px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '16px'
                }}
            >
                {children}
            </a>
        </div>
    );
}

export function InfoBox({ children }: { children: ReactNode }) {
    return (
        <div style={{ 
            backgroundColor: COLORS.background, 
            border: `2px solid ${COLORS.primary}`,
            padding: '16px', 
            borderRadius: '12px',
            margin: '24px 0',
            textAlign: 'center'
        }}>
            <p style={{ margin: '0', color: COLORS.secondary, fontSize: '16px' }}>
                {children}
            </p>
        </div>
    );
}

export function EmailFooter() {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '20px auto 0',
            textAlign: 'center',
            color: COLORS.primary,
            fontSize: '12px'
        }}>
            <p style={{ margin: '0' }}>
                <strong style={{ fontSize: '16px', fontWeight: '700' }}>
                    Okorok
                </strong> - Compartilhe e descubra receitas caseiras
            </p>
        </div>
    );
}

export function EmailContainer({ children }: { children: ReactNode }) {
    return (
        <Html>
            <Head />
            <Body style={{ margin: '0', padding: '0' }}>
                <Container style={{ 
                    backgroundColor: COLORS.background, 
                    padding: '32px 20px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                }}>
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        backgroundColor: COLORS.white,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: `2px solid ${COLORS.primary}`,
                        boxShadow: '0 4px 20px rgba(164, 66, 20, 0.1)'
                    }}>
                        {children}
                    </div>
                    <EmailFooter />
                </Container>
            </Body>
        </Html>
    );
}