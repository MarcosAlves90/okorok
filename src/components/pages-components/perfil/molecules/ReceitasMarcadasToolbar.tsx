import Link from 'next/link'
import Button from '@/components/atoms/Button'

interface Props {
    searchTerm: string
    setSearchTerm: (v: string) => void
    selectedCount: number
    totalCount: number
    onSelectAll: () => void
    onRemoveSelected: () => void
    removing: boolean
}

export default function ReceitasMarcadasToolbar({
    searchTerm,
    setSearchTerm,
    selectedCount,
    totalCount,
    onSelectAll,
    onRemoveSelected,
    removing
}: Props) {
    return (
        <div className="w-full flex items-center justify-between max-w-5xl">
            <div className="flex items-center gap-3">
                <input
                    aria-label="Pesquisar receitas marcadas"
                    placeholder="Pesquisar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-background-gray placeholder:text-foreground/60 border-2 border-foreground rounded-md px-4 py-3 text-sm focus:outline-none"
                />
            </div>

            <div className="flex items-center gap-3">
                {selectedCount > 0 && (
                    <>
                        <button
                            onClick={onSelectAll}
                            className="px-3 py-2 text-sm bg-transparent text-foreground-dark border-2 border-foreground rounded-md hover:bg-foreground/10 transition-colors"
                        >
                            {selectedCount === totalCount ? 'Desmarcar todas' : 'Selecionar todas'}
                        </button>
                        <button
                            onClick={onRemoveSelected}
                            disabled={removing}
                            className="px-3 py-2 text-sm bg-orange-600 text-white border border-orange-600 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {removing ? 'Removendo...' : `Remover dos favoritos (${selectedCount})`}
                        </button>
                    </>
                )}
                <Link href="/">
                    <Button variant="primary" size="sm">Explorar receitas</Button>
                </Link>
                <Link href="/perfil">
                    <Button variant="primary" size="sm">Voltar ao perfil</Button>
                </Link>
            </div>
        </div>
    )
}
