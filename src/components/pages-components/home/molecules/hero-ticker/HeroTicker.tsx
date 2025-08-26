import React, { useMemo } from 'react';
import styles from './hero-ticker.module.css';

// Frases do ticker
const PHRASES = [
    'churrasco profissional em um só lugar.',
    'entregas rápidas e confiáveis.',
    'ingredientes selecionados e frescos.',
    'chefes especializados em grelhados.',
    'eventos corporativos e festas privadas.'
];

const REPEAT = 4;

function TickerTrack({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.track} aria-hidden={true}>
            {children}
        </div>
    );
}

export default function HeroTicker(): React.ReactElement {
    const sequence = useMemo(
        () => Array.from({ length: REPEAT }).flatMap(() => PHRASES),
        []
    );

    const trackItems = useMemo(
        () =>
            sequence.map((text, index) => (
                <span key={index} className={styles.item} aria-hidden={true}>
                    {text}
                </span>
            )),
        [sequence]
    );

    return (
        <div className={`hero-ticker bg-foreground text-background font-bold ${styles.wrapper}`}>
            <span className={styles.srOnly} aria-live="polite">
                {PHRASES.join(' — ')}
            </span>

            <div className={styles.ticker} tabIndex={0} role="region" aria-label="Destaques">
                <TickerTrack>{trackItems}</TickerTrack>
                <TickerTrack>{trackItems}</TickerTrack>
            </div>
        </div>
    );
}
