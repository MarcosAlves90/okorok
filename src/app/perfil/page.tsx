import type { Metadata } from "next";
import ProfileEditor from '@/components/pages-components/perfil/organisms/ProfileEditor';

export const metadata: Metadata = {
    title: "Perfil",
};

export default function About() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-20 py-17 max-w-6xl w-full flex flex-col gap-6 rounded-xl h-full text-center text-foreground">
                <ProfileEditor />
            </div>
        </main>
    );
}
