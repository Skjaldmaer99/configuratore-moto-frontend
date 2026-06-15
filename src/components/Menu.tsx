import { ConfigurationService } from "@/features/configurations/configuration.service";
import { useConfigurationStore } from "@/features/configurations/configuration.store";
import type { Configuration } from "@/features/configurations/configuration.type";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router";


function Menu() {
    const { configurationId, currentStep, setCurrentStep } = useConfigurationStore();
    const { id } = useParams();
    const location = useLocation();
    const isEdit = location.pathname.startsWith('/configurations');
    const isMobile = useIsMobile();

    const configId = isEdit
        ? Number(id)
        : configurationId;

    const { data: configuration, isLoading, isError } = useQuery<Configuration>({
        queryFn: () => ConfigurationService.show(configId!),
        queryKey: ['configurations', configId],
        enabled: !!configId,
    });

    if (isLoading) {
        <p>Caricamento...</p>
    }
    if (isError) {
        <p>Errore nel Caricamento</p>
    }
    console.log({
        configuration,
        model: configuration?.model,
        engine: configuration?.engine,
        color: configuration?.color,
    });

    const ITEMS = [
        { label: `${configuration?.model?.name ? configuration?.model?.name : "MODELLO"} ${configuration?.engine?.name ? configuration?.engine?.name : "-"}`, step: 0 },
        { label: `${configuration?.color?.name ? configuration?.color?.name : "COLORE"}`, step: 1 },
        { label: `${configuration?.engine?.name ? configuration?.engine?.name : "CILINDRATA"}`, step: 2 },
        { label: "OPTIONALS", step: 3 },
        { label: "ACCESSORI", step: 4 },
    ];



    return (
        <main className="relative min-h-[340px] overflow-hidden bg-white text-black font-sans"> {/* min-h-screen */}
            {/* background gradient + noise */}
            <div className="absolute inset-0 " /> {/* bg-[radial-gradient(ellipse_at_30%_40%,oklch(0.18_0.08_27)_0%,oklch(0.05_0_0)_70%)] */}
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.5) 2px 3px)" }} />

            {/* menu list */}
            <div className="absolute left-[5%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-start" style={{ gap: "-10px" }}>
                {ITEMS.map((item, i) => {
                    const isActive = item.step === currentStep;
                    // alternating tilt + overlap
                    const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 3));
                    const offsetX = (i % 2 === 0 ? -1 : 1) * (i * 4);
                    return (
                        <button
                            key={item.label}
                            onClick={() => setCurrentStep(item.step)}
                            className="relative font-black italic tracking-tighter leading-[0.85] transition-all duration-200 uppercase"
                            style={{
                                fontSize: isActive
                                    ? (isMobile ? "4rem" : "6rem")
                                    : "4rem",
                                marginTop: i === 0 ? 0 : "0px",
                                transform: `translateX(${isActive ? -30 : offsetX}px) rotate(${isActive ? rot * 0.5 : rot}deg) skewX(-6deg)`,
                                zIndex: isActive ? 50 : 10 + i,
                            }}
                        >
                            {isActive && (
                                <span
                                    aria-hidden
                                    className="absolute inset-0 -z-0 bg-[oklch(0.55_0.24_27)] origin-left" //animate-[slash_0.25s_ease-out]
                                    style={{
                                        clipPath: "polygon(0 18%, 100% 0, 96% 82%, 4% 100%)",
                                        transform: "scale(1.08, 0.95)",
                                    }}
                                />
                            )}
                            <span
                                className="relative px-3"
                                style={{
                                    color: isActive ? "white" : "oklch(0.98 0 0 / 0.85)",
                                    textShadow: isActive
                                        ? "3px 3px 0 oklch(0.05 0 0), 6px 6px 0 rgba(0,0,0,0.6)"
                                        : "3px 3px 0 oklch(0.05 0 0)",
                                    WebkitTextStroke: isActive ? "1.5px white" : "0",
                                }}
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <style>{`
        @keyframes slash {
            from { transform: translateY(-50%) scaleX(0); }
            to { transform: translateY(-50%) scaleX(1); }
        }
        `}</style>
        </main>
    );
}

export default Menu;