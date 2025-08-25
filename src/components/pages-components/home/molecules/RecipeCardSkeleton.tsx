export default function RecipeCardSkeleton() {
    return (
        <div className="w-full pt-[100%] relative">
            <div className="absolute inset-0 bg-foreground/20 rounded-lg shadow-inner overflow-hidden animate-pulse">
                <div className="w-full h-full bg-gradient-to-br from-foreground/10 to-foreground/30" />
                
                <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex justify-end">
                        <div className="bg-foreground/30 rounded px-2 py-1 w-16 h-5" />
                    </div>
                    
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <div className="bg-foreground/40 rounded h-3 w-full" />
                            <div className="bg-foreground/40 rounded h-3 w-3/4" />
                        </div>
                        
                        <div className="bg-foreground/30 rounded h-3 w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}
