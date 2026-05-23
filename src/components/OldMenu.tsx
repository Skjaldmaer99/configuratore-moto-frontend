/* import { createFileRoute } from "@tanstack/react-router"; */
import { useState, useEffect } from "react";

/* export const Route = createFileRoute("/")({
    component: Menu,
}); */

const ITEMS = [
    { label: "SKILL", hint: "Use a Skill" },
    { label: "ITEM", hint: "Use an Item" },
    { label: "EQUIP", hint: "Change Equipment" },
    { label: "PERSONA", hint: "Manage Personas" },
    { label: "STATS", hint: "View Stats" },
    { label: "QUEST", hint: "Check Quests" },
    { label: "SOCIAL LINK", hint: "Bonds & Arcana" },
    { label: "CALENDAR", hint: "Schedule" },
    { label: "SYSTEM", hint: "System Options" },
];

const PARTY = ["MC", "RY", "AK"];

function Menu() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") setActive((i) => (i + 1) % ITEMS.length);
            if (e.key === "ArrowUp") setActive((i) => (i - 1 + ITEMS.length) % ITEMS.length);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-black text-white font-sans">
            {/* background gradient + noise */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,oklch(0.18_0.08_27)_0%,oklch(0.05_0_0)_70%)]" />
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.5) 2px 3px)" }} />

            {/* giant side text */}
            <div className="absolute left-0 top-0 h-full flex items-center pointer-events-none select-none">
                <div className="text-white/90 font-black tracking-tighter leading-[0.8] -rotate-90 origin-center text-[16vw] whitespace-nowrap"
                    style={{ textShadow: "8px 8px 0 oklch(0.55 0.24 27)" }}>
                    MENU
                </div>
            </div>

            {/* wallet */}
            <div className="absolute top-6 left-[14%] z-20 border-2 border-white bg-black/80 backdrop-blur px-5 py-2">
                <div className="text-2xl font-bold tabular-nums">¥ 52,163</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">current wallet</div>
            </div>

            {/* character */}
            {/* <div className="absolute left-[8%] bottom-0 w-[50%] max-w-[700px] z-10">
                <img src={characterImg} alt="" className="w-full h-auto drop-shadow-[0_0_40px_rgba(220,38,38,0.4)]" />
            </div> */}

            {/* party */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
                {PARTY.map((p, i) => (
                    <div key={p} className="flex items-center gap-2">
                        <div className="w-14 h-14 border-2 border-white bg-black flex items-center justify-center font-black text-lg"
                            style={{ clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}>
                            {p}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="w-24 h-1.5 bg-white/20"><div className="h-full bg-[oklch(0.65_0.27_27)]" style={{ width: `${90 - i * 15}%` }} /></div>
                            <div className="w-24 h-1.5 bg-white/20"><div className="h-full bg-yellow-400" style={{ width: `${70 - i * 10}%` }} /></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* menu list */}
            <div className="absolute right-[14%] top-1/2 -translate-y-1/2 z-20 flex flex-col items-end" style={{ gap: "-10px" }}>
                {ITEMS.map((item, i) => {
                    const isActive = i === active;
                    // alternating tilt + overlap
                    const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 3));
                    const offsetX = (i % 2 === 0 ? -1 : 1) * (i * 4);
                    return (
                        <button
                            key={item.label}
                            onClick={() => setActive(i)}
                            onMouseEnter={() => setActive(i)}
                            className="relative font-black italic tracking-tighter leading-[0.85] transition-all duration-200"
                            style={{
                                fontSize: isActive ? "6rem" : "4rem",
                                marginTop: i === 0 ? 0 : "-18px",
                                transform: `translateX(${isActive ? -30 : offsetX}px) rotate(${isActive ? rot * 0.5 : rot}deg) skewX(-6deg)`,
                                zIndex: isActive ? 50 : 10 + i,
                            }}
                        >
                            {isActive && (
                                <span
                                    aria-hidden
                                    className="absolute inset-0 -z-0 bg-[oklch(0.55_0.24_27)] animate-[slash_0.25s_ease-out] origin-left"
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

            {/* bottom-right command */}
            <div className="absolute bottom-6 right-8 z-20 text-right">
                <div className="border-l-4 border-[oklch(0.55_0.24_27)] pl-3 mb-3">
                    <div className="text-3xl font-bold italic">{ITEMS[active].hint}</div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Command</div>
                </div>
                <div className="flex gap-4 justify-end text-sm font-bold">
                    <span className="flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-[oklch(0.55_0.24_27)] flex items-center justify-center text-[10px]">A</span>
                        Confirm
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px]">B</span>
                        Close
                    </span>
                </div>
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