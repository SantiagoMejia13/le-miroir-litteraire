import { CURATORS } from '../data/museumData';

export function AboutSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-14 lg:py-20"
    >
      {/* En-tête de la section */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <p className="text-xs font-medium tracking-widest text-[#268d7c] dark:text-[#c2ffb4]">
          Équipe curatoriale
        </p>
        <h1
          id="about-title"
          className="font-serif text-4xl sm:text-5xl font-bold text-[#113320] dark:text-[#F1F5F3] text-balance"
        >
          À propos des commissaires d’exposition
        </h1>
        <p className="text-sm sm:text-base text-[#113320]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
          Ce musée virtuel a été conçu par des étudiants en 7e semestre de Langues Modernes autour d’une réflexion académique sur la critique littéraire et l’identité.
        </p>
      </div>

      {/* Grille en trois colonnes fidèle à la maquette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
        {CURATORS.map((curator) => (
          <article
            key={curator.id}
            className="flex flex-col items-center text-center p-6 rounded-xl border border-[#113320]/10 dark:border-[#268d7c]/30 bg-white/75 dark:bg-[#113320]/75"
          >
            {/* Cadre circulaire de portrait avec anneau #268d7c */}
            <div className="relative w-36 h-36 rounded-full p-1.5 ring-2 ring-[#268d7c] dark:ring-[#c2ffb4]/70 mb-6">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#113320] via-[#17422a] to-[#0A1C12] flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-2 rounded-full border border-[#c2ffb4]/25"
                  aria-hidden="true"
                />
                <span className="font-serif text-3xl font-semibold tracking-widest text-[#c2ffb4]">
                  {curator.initials}
                </span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-[#268d7c] dark:text-[#c2ffb4] mb-3">
              {curator.name}
            </h2>

            <p className="text-sm leading-relaxed text-[#268d7c]/90 dark:text-[#F1F5F3]/85 max-w-xs">
              {curator.bio}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
