import React from 'react';
import styles from './hero-ticker.module.css';

export default function HeroTicker(): React.ReactElement {
    const phrases = [
        'churrasco profissional em um só lugar.',
        'entregas rápidas e confiáveis.',
        'ingredientes selecionados e frescos.',
        'chefes especializados em grelhados.',
        'eventos corporativos e festas privadas.'
    ];

    const repeat = 4;
    const sequence = Array.from({ length: repeat }).flatMap(() => phrases);

    const items = sequence.map((t, i) => (
        <span key={i} className={styles.item} aria-hidden>
            {t}
        </span>
    ));

    return (
        <div className={`hero-ticker bg-foreground text-background font-bold ${styles.wrapper}`}>
            <span className={styles.srOnly} aria-live="polite">
                {phrases.join(' — ')}
            </span>

            <div className={styles.ticker} tabIndex={0} role="region" aria-label="Destaques">
                <div className={styles.track} aria-hidden>
                    {items}
                </div>
                <div className={styles.track} aria-hidden>
                    {items}
                </div>
            </div>
        </div>
    );
}
