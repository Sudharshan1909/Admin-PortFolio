export default function HeroSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
      <p className="text-sm uppercase tracking-[0.3em] text-white/50">Welcome</p>
      <h1 className="mt-4 text-4xl font-bold md:text-6xl">
        Personal Portfolio Management
      </h1>
      <p className="mt-4 max-w-2xl text-white/70">
        Showcase your career journey, technical skills, professional experience, featured projects, and verified certificates.
      </p>
      <div className="mt-8">
        <a
          href="/projects"
          className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/20"
        >
          Explore My Work
        </a>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <h3 className="text-xl font-semibold">Recent Projects</h3>
          <p className="mt-3 text-white/70">Featured projects with links, tools, and features.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <h3 className="text-xl font-semibold">Technical Skills</h3>
          <p className="mt-3 text-white/70">Editable technical and soft skills sections.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <h3 className="text-xl font-semibold">Career Highlights</h3>
          <p className="mt-3 text-white/70">Education, experience, and achievement timeline.</p>
        </div>
      </div>
    </section>
  );
}