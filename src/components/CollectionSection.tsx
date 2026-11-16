import { useState } from 'react';
import { BOOKS, type BookId } from '../data/museumData';
import { BOOK_ARTWORK } from '../data/artworkAssets';
import { StarRatingBar } from './StarRatingBar';

interface CollectionSectionProps {
  selectedBookId: BookId;
  onSelectBook: (bookId: BookId) => void;
}

export function CollectionSection({
  selectedBookId,
  onSelectBook
}: CollectionSectionProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const activeBook =
    BOOKS.find((book) => book.id === selectedBookId) ?? BOOKS[0];

  const imageFailed = failedImages[activeBook.id];

  return (
    <section
      aria-labelledby="collection-title"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16"
    >
      {/* En-tête de la galerie */}
      <div className="max-w-3xl space-y-3 mb-10">
        <p className="text-xs font-medium tracking-widest text-[#268d7c] dark:text-[#c2ffb4]">
          Exposition permanente · Trois salles thématiques
        </p>
        <h1
          id="collection-title"
          className="font-serif text-4xl sm:text-5xl font-bold text-[#113320] dark:text-[#F1F5F3] text-balance"
        >
          Collection du musée
        </h1>
        <p className="text-base text-[#113320]/80 dark:text-[#F1F5F3]/80 leading-relaxed">
          Chaque salle rassemble la notice documentaire d’une œuvre majeure et une critique littéraire consacrée aux mécanismes de l’identité.
        </p>
      </div>

      {/* Sélecteur des 3 salles */}
      <div
        role="tablist"
        aria-label="Salles d'exposition"
        className="flex flex-wrap gap-2 sm:gap-3 border-b border-[#113320]/15 dark:border-[#268d7c]/35 pb-5 mb-10"
      >
        {BOOKS.map((book) => {
          const isActive = book.id === activeBook.id;
          return (
            <button
              key={book.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectBook(book.id)}
              className={`px-5 py-3 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] ${
                isActive
                  ? 'bg-gradient-to-b from-[#268d7c] to-[#113320] text-white shadow-sm'
                  : 'border border-[#113320]/18 dark:border-[#268d7c]/40 bg-white/70 dark:bg-[#113320]/60 text-[#113320] dark:text-[#F1F5F3] hover:border-[#268d7c]'
              }`}
            >
              <span>
                {book.roomLabel} — {book.themeLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Présentation muséale de la salle active */}
      <article
        role="tabpanel"
        aria-label={`${activeBook.roomLabel} : ${activeBook.title}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
      >
        {/* Colonne visuelle gauche : Couverture encadrée et évaluation */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="rounded-xl overflow-hidden border border-[#113320]/20 dark:border-[#268d7c]/50 bg-[#0A1C12] shadow-xl">
            <div className="relative aspect-[3/4]">
              {!imageFailed ? (
                <img
                  src={BOOK_ARTWORK[activeBook.id]}
                  alt={`Planche d’exposition de la ${activeBook.roomLabel} : ${activeBook.title}`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setFailedImages((prev) => ({ ...prev, [activeBook.id]: true }))
                  }
                  className="w-full h-full object-cover scale-[1.08]"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#113320] via-[#194a30] to-[#0A1C12]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C12] via-[#0A1C12]/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <p className="text-xs font-semibold tracking-wider text-[#c2ffb4]">
                  {activeBook.roomLabel} · {activeBook.themeLabel}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                  {activeBook.title}
                </h2>
                <p className="text-sm text-[#F1F5F3]/85">
                  {activeBook.author}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#113320]/15 dark:border-[#268d7c]/40 bg-white/80 dark:bg-[#113320]/80 p-5 flex flex-col items-center gap-3">
            <StarRatingBar
              rating={activeBook.rating}
              caption="Note moyenne des lecteurs sur Internet"
            />
            <p className="text-xs text-[#113320]/70 dark:text-[#F1F5F3]/70 text-center">
              {activeBook.motifs.join(' · ')}
            </p>
          </div>
        </div>

        {/* Colonne éditoriale droite : Notice bibliographique et Critique littéraire */}
        <div className="lg:col-span-7 space-y-8">
          <header className="space-y-2 border-b border-[#113320]/15 dark:border-[#268d7c]/35 pb-6">
            <p className="text-xs font-semibold tracking-widest text-[#268d7c] dark:text-[#c2ffb4]">
              {activeBook.roomLabel} — Axe thématique : {activeBook.themeLabel}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#113320] dark:text-[#F1F5F3]">
              {activeBook.title}
              {activeBook.originalTitle ? (
                <span className="block text-xl sm:text-2xl font-normal italic text-[#113320]/70 dark:text-[#F1F5F3]/75 mt-1">
                  ({activeBook.originalTitle})
                </span>
              ) : null}
            </h2>
          </header>

          {/* Bloc de métadonnées structurées */}
          <dl className="divide-y divide-[#113320]/12 dark:divide-[#268d7c]/30 border-y border-[#113320]/15 dark:border-[#268d7c]/35">
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Titre
              </dt>
              <dd className="sm:col-span-8 text-sm font-medium text-[#113320] dark:text-[#F1F5F3]">
                {activeBook.title}
              </dd>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Auteur(e)
              </dt>
              <dd className="sm:col-span-8 text-sm text-[#113320] dark:text-[#F1F5F3]">
                {activeBook.author}
              </dd>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Date de publication
              </dt>
              <dd className="sm:col-span-8 text-sm tabular-nums text-[#113320] dark:text-[#F1F5F3]">
                {activeBook.publicationDate}
              </dd>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Lieu de rédaction
              </dt>
              <dd className="sm:col-span-8 text-sm text-[#113320] dark:text-[#F1F5F3]">
                {activeBook.writingLocation}
              </dd>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Renommée
              </dt>
              <dd className="sm:col-span-8 text-sm leading-relaxed text-[#113320]/90 dark:text-[#F1F5F3]/90">
                {activeBook.renown}
              </dd>
            </div>
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-center">
              <dt className="sm:col-span-4 text-xs font-semibold tracking-wide text-[#268d7c] dark:text-[#c2ffb4]">
                Note Internet
              </dt>
              <dd className="sm:col-span-8">
                <StarRatingBar
                  rating={activeBook.rating}
                  caption="Évaluation moyenne des lecteurs"
                  align="left"
                />
              </dd>
            </div>
          </dl>

          {/* Citation exergue */}
          <blockquote className="py-4 border-y border-[#113320]/15 dark:border-[#268d7c]/35 font-serif text-xl sm:text-2xl italic text-[#113320]/90 dark:text-[#c2ffb4] leading-relaxed">
            « {activeBook.quote} »
          </blockquote>

          {/* Critique littéraire axée sur l'identité */}
          <div className="space-y-5 max-w-prose">
            <h3 className="font-serif text-2xl font-bold text-[#113320] dark:text-[#F1F5F3]">
              Critique littéraire — {activeBook.themeLabel} et identité
            </h3>

            {activeBook.critiqueParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-[15px] sm:text-base leading-[1.8] text-[#113320]/90 dark:text-[#F1F5F3]/90 ${
                  index === 0
                    ? 'first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#268d7c] dark:first-letter:text-[#c2ffb4]'
                    : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
