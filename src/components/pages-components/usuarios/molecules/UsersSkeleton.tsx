'use client'

import React from 'react';

type Props = {
    count?: number;
};

export default function UsersSkeleton({ count = 6 }: Props): React.ReactElement {
    return (
        <section className="w-full max-w-5xl mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-foreground/20 rounded-xl p-2 flex flex-col items-center transition-opacity text-center animate-pulse"
                        aria-hidden="true"
                    >
                        <div className="w-20 h-20 rounded-full bg-foreground/30 animate-pulse"></div>
                        <div className="mt-3 w-full">
                            <div className="h-4 bg-foreground/25 rounded w-3/4 mx-auto animate-pulse"></div>
                            <div className="h-3 bg-foreground/20 rounded w-1/2 mx-auto mt-2 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
