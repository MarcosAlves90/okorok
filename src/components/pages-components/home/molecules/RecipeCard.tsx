import Link from 'next/link'
import Image from 'next/image'

interface Recipe {
    id: string
    titulo: string
    ingredientes: string
    modo: string
    tempo?: string | null
    rendimento?: string | null
    categoria?: string | null
    observacoes?: string | null
    imagemUrl?: string | null
    createdAt?: string | null
}

interface Props {
    recipe?: Recipe
}

export default function RecipeCard({ recipe }: Props) {
    if (!recipe) {
        return (
            <div className="w-full pt-[100%] relative">
                <div className="absolute inset-0 bg-[#a66b58] rounded-lg shadow-inner flex items-end p-3">
                    <div className="bg-white/20 rounded px-2 py-1 text-xs text-white">Receita</div>
                </div>
            </div>
        )
    }

    return (
        <Link href={`/receitas/${recipe.id}`}>
            <div className="w-full pt-[100%] relative group cursor-pointer">
                <div className="absolute inset-0 bg-[#a66b58] rounded-lg shadow-inner overflow-hidden">
                    {recipe.imagemUrl ? (
                        <Image
                            src={recipe.imagemUrl}
                            alt={recipe.titulo}
                            fill
                            className="object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#a66b58] to-[#8a3b1a]" />
                    )}
                    
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
                    
                    <div className="absolute inset-0 p-3 flex flex-col justify-between">
                        {recipe.categoria && (
                            <div className="flex justify-end">
                                <div className="bg-white/20 rounded px-2 py-1 text-xs text-white">
                                    {recipe.categoria}
                                </div>
                            </div>
                        )}
                        
                        <div className="space-y-1">
                            <h3 className="text-white font-semibold text-sm line-clamp-2 leading-tight">
                                {recipe.titulo}
                            </h3>
                            {recipe.tempo && (
                                <div className="text-white/80 text-xs">
                                    ⏱️ {recipe.tempo}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
