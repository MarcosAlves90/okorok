import type { Metadata } from "next";
import LoginForm from "@/components/pages-components/login/organisms/LoginForm";

export const metadata: Metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <main className="min-h-[calc(100vh-82px)] mt-[82px] flex justify-center items-center py-20">
            <div className="border-2 border-foreground px-0 py-0 max-w-6xl w-full grid grid-cols-2 rounded-xl h-full overflow-hidden text-foreground">
                <div className="w-full h-full bg-foreground" aria-hidden />
                <div className="w-full h-full px-12 py-17 min-h-170 flex items-center justify-center text-center">
                    <div className="w-full max-w-md">
                        <h2 className="text-4xl md:text-5xl font-bold font-protest-strike leading-tight mb-12 text-center">Entre em sua conta</h2>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </main>
    )
}
