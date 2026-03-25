export function Header() {
  return (
    <header
      className="relative sticky top-0 z-50 w-full overflow-hidden
                 border-b bg-card/80 backdrop-blur-md"
    >
      {/* 🔶 Animated orange glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]
                   animate-orange-glow
                   bg-gradient-to-r from-transparent via-accent to-transparent"
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        {/* 🌱 Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <div
            className="relative flex h-12 w-12 items-center justify-center rounded-full
                       bg-accent/20 ring-2 ring-accent/40 shadow-lg"
          >
            <video
              src="/icons/agri-icon.webm"
              autoPlay
              loop
              muted
              playsInline
              className="h-9 w-9 object-contain"
            />
          </div>

          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Agri<span className="text-accent">Assist</span>
          </h1>
        </div>

        {/* 🤖 Right: Badge */}
        <div className="hidden md:flex">
          <span
            className="rounded-full bg-accent px-3 py-1
                       text-xs font-semibold text-accent-foreground shadow"
          >
            AI Powered
          </span>
        </div>

      </div>
    </header>
  );
}
