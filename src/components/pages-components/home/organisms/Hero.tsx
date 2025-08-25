import React from "react";
import Image from "next/image";

export default function Hero(): React.ReactElement {
    return (
        <section className="hero min-h-[calc(100vh-3rem)] flex items-center justify-center relative overflow-hidden text-background px-[var(--pc-padding)]" role="region" aria-label="Hero de destaque">
            {/* Blur e escuridão */}
            <div className="bg-black/46 backdrop-blur-sm absolute inset-0 z-[2]" aria-hidden="true" />
            <Image
                src="https://res.cloudinary.com/dyenpzpcr/image/upload/v1755488141/hero-background_vmw9cp.png"
                alt=""
                fill
                priority
            className="absolute inset-0 object-cover z-[1]"
            />
            <div className="bg-foreground h-3 absolute bottom-0 left-0 right-0 z-[4]" aria-hidden="true" />
            <div className="bg-foreground h-6 w-[32rem] absolute bottom-3 left-1/2 -translate-x-1/2 z-[4] rounded-t-xl" aria-hidden="true" />
            <div className="z-[3] flex items-start w-full justify-between">
                <div className="pt-[6.25rem]">
                    <h2 className="font-protest-strike text-8xl">SUCULENTA E<br /> SABOROSA!</h2>
                    <p className="text-2xl">as melhores receitas, só aqui.</p>
                </div>
            <div>
                <Image
                    src="https://res.cloudinary.com/dyenpzpcr/image/upload/v1755488143/hero-highlight_ydet61.png"
                    alt="Ilustração em destaque relacionada às receitas"
                    width={600}
                    height={600}
                    priority
                />
                </div>
            </div>
        </section>
    );
}