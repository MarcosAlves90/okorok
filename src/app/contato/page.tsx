import type { Metadata } from "next";

import ContactForm from "@/components/pages-components/contato/organisms/ContactForm";

export const metadata: Metadata = {
    title: "Contato",
};

export default function Contact() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-20 py-17 max-w-6xl w-full flex flex-col gap-6 rounded-xl h-full text-center text-foreground">
                <h2 className="text-4xl md:text-5xl font-bold font-protest-strike leading-tight mb-6 text-center">Formulário de contato</h2>
                <ContactForm/>
            </div>
        </main>
    )
}
