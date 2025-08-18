export default function Footer(): React.ReactElement {
    return (
        <footer className="py-6 px-4 bg-background text-foreground">
            <div className="container mx-auto">
                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} Okorok. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
