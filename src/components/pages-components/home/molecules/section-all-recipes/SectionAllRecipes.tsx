import FilterSidebar from './FilterSidebar'
import RecipeCard from './RecipeCard'

export default function AllRecipes() {
    return (
        <section id="all-recipes" className="px-[var(--pc-padding)] py-15 space-y-10">
            <h2 className="font-protest-strike text-foreground text-5xl flex items-center gap-3">
                <span>Todas as Receitas</span>
            </h2>

            <div className="flex items-start gap-8">
                {/* Sidebar */}
                <aside className="w-72 flex-shrink-0">
                    <FilterSidebar />
                </aside>

                {/* Grid de receitas */}
                <div className="flex-1">
                    <div className="grid grid-cols-6 gap-4">
                        {Array.from({ length: 18 }).map((_, i) => (
                            <RecipeCard key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )

}