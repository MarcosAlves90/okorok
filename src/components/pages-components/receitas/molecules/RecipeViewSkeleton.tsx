import React from 'react'

export default function RecipeViewSkeleton() {
    return (
        <div className="w-full h-full flex gap-4 animate-pulse">
            <div className="grid grid-cols-1 grid-rows-2 w-full h-full gap-4">
                <div className="h-full rounded-xl bg-foreground/20 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-foreground/30" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-foreground/40" />
                    <div className="relative z-10 h-full flex flex-col p-5">
                        <div className="w-full mt-auto">
                            <div className="h-6 bg-foreground/40 rounded-md w-3/4"></div>
                        </div>
                    </div>
                </div>

                <div className="h-full bg-foreground/20 rounded-xl flex flex-col p-5">
                    <div className="w-full flex flex-col items-start gap-4 h-full">
                        <div className="w-16 h-4 bg-foreground/30 rounded"></div>
                        <div className="w-full h-8 bg-foreground/25 rounded-xl"></div>

                        <div className="w-20 h-4 bg-foreground/30 rounded"></div>
                        <div className="w-full h-16 bg-foreground/25 rounded-xl"></div>

                        <div className="w-full grid grid-cols-2 gap-3 mt-auto">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-foreground/30 rounded"></div>
                                <div className="w-16 h-4 bg-foreground/30 rounded"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-foreground/30 rounded"></div>
                                <div className="w-20 h-4 bg-foreground/30 rounded"></div>
                            </div>
                        </div>

                        <div className="w-32 h-3 bg-foreground/25 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="h-full bg-foreground/20 w-full rounded-xl flex flex-col items-start gap-4 p-5">
                <div className="w-24 h-5 bg-foreground/30 rounded"></div>
                <div className="w-full h-32 bg-foreground/25 rounded-xl"></div>

                <div className="w-32 h-5 bg-foreground/30 rounded"></div>
                <div className="w-full flex-1 bg-foreground/25 rounded-xl"></div>
            </div>
        </div>
    )
}
