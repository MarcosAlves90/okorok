'use client'

import React from 'react';

export default function UserProfileSkeleton(): React.ReactElement {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex flex-col justify-center items-center py-20">
            <div className="relative border-2 border-foreground px-20 py-17 max-w-6xl w-full flex flex-col gap-6 rounded-xl h-full text-center text-foreground animate-pulse">
                <div className="flex flex-col items-center gap-4 mt-4">
                    <div className="flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full bg-background/20"></div>
                        <div className="h-5 w-48 bg-background/20 rounded mt-3"></div>
                    </div>

                    <div className="w-full max-w-sm mt-4 text-left">
                        <div className="h-4 bg-background/20 rounded w-24 mb-2"></div>
                        <div className="h-24 bg-background/20 rounded p-3"></div>
                    </div>

                    <div className="max-w-sm w-full mt-4">
                        <div className="h-10 bg-background/20 rounded"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
