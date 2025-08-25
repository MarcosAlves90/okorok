import type { Metadata } from "next";
import RegisterForm from "@/components/pages-components/cadastro/organisms/RegisterForm";

export const metadata: Metadata = {
    title: "Cadastro",
};

export default function Cadastro() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-0 py-0 max-w-6xl w-full grid grid-cols-2 rounded-xl h-full overflow-hidden text-foreground">
                <div className="w-full h-full bg-foreground" aria-hidden />
                <div className="w-full h-full px-12 py-17 min-h-170 flex items-center justify-center text-center">
                    <div className="w-full max-w-md">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </main>
    )
}
