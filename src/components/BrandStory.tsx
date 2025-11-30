export const BrandStory = () => {
  return (
    <section className="py-32 md:py-48 px-6 lg:px-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Statement */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="w-16 h-px bg-accent" />
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1]">
                Designed from
                <br />
                <span className="italic text-accent">the Soul</span>
              </h2>
            </div>
          </div>

          {/* Right: Description */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <p className="font-sans text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              We design from the soul—where street culture, contemporary art, and
              futurism collide into something wholly original.
            </p>
            <p className="font-sans text-lg text-muted-foreground/80 leading-relaxed font-light">
              Each piece carries intention, personality, and narrative depth. This
              isn&apos;t just fashion; it&apos;s a cultural statement born from Lagos and
              spoken to the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
