interface HeroProps {
  taskCount: number;
  doneCount: number;
}

function Hero({ taskCount, doneCount }: HeroProps) {
  return (
    <header className="border-b border-ink/10 bg-white px-6 pb-8 pt-10">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Optimized Study Planner
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-ink">
            Lock tf in brotha
          </h1>
        </div>

        <div className="hidden text-right sm:block">
          <p className="text-2xl font-semibold text-ink">
            {doneCount}
            <span className="text-ink/30"> / {taskCount}</span>
          </p>
          <p className="text-xs text-ink/40">tasks done</p>
        </div>
      </div>

      <div className="mt-4 h-px w-16 bg-accent" />
    </header>
  );
}

export default Hero;