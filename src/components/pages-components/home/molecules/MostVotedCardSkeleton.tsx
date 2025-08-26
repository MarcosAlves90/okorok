import React from "react";

export default function MostVotedCardSkeleton(): React.ReactElement {
    return (
        <div className="w-full pt-[100%] relative">
            <div className="absolute inset-0 bg-[#a66b58]/20 rounded-lg shadow-inner overflow-hidden animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-[#a66b58]/10 to-[#a66b58]/30" />

                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex justify-end">
                        <div className="bg-foreground/30 rounded px-2 py-1 w-20 h-5" />
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-1">
                            <div className="bg-foreground/40 rounded h-3 w-full" />
                            <div className="bg-foreground/40 rounded h-3 w-3/4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
