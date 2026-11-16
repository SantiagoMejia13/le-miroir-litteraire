import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKS, type BookId } from '../data/museumData';
import { BOOK_ARTWORK } from '../data/artworkAssets';
import { StarRatingBar } from './StarRatingBar';

interface HomeSectionProps {
  onStartExperience: () => void;
  onOpenRoom: (bookId: BookId) => void;
}

export function HomeSection({
  onStartExperience,
  onOpenRoom
}: HomeSectionProps) {
  const [selectedBookId, setSelectedBookId] = useState<BookId>('harry-potter');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const selectedBook =
    BOOKS.find((book) => book.id === selectedBookId) ?? BOOKS[0];
  const selectedIndex = BOOKS.findIndex((book) => book.id === selectedBookId);

  return (
    <section
      aria-labelledby="hero-title"
      className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Colonne gauche : Titre solennel, manifeste et appel à l'action */}
        <div className="lg:col-span-5 flex flex-col items-start gap-6">
          <h1
            id="hero-title"
            className="font-serif text-5xl sm:text-6xl lg:text-[4.25rem] font-bold leading-[1.02] tracking-tight text-balance"
          >
            <span className="block text-[#113320] dark:text-[#F1F5F3]">
              Le Miroir
            </span>
            <span className="block text-[#268d7c] dark:text-[#c2ffb4]">
              Littéraire
            </span>
          </h1>

          <div className="inline-block border border-[#113320]/25 dark:border-[#268d7c]/60 px-6 py-2 bg-white/60 dark:bg-[#113320]/70">
            <span className="text-sm font-medium tracking-wide text-[#113320] dark:text-[#c2ffb4]">
              L’identité
            </span>
          </div>

          <p className="text-base sm:text-[17px] leading-relaxed text-[#113320]/90 dark:text-[#F1F5F3]/90 max-w-xl">
            Ce musée virtuel est un espace solennel dédié à l’art de la critique littéraire, explorant une seule et unique question universelle : l’identité.
          </p>

          <div className="w-full border border-[#113320]/30 dark:border-[#268d7c]/60 bg-white/80 dark:bg-[#113320]/80 p-5 sm:p-6">
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#113320] dark:text-[#F1F5F3]/95">
              Pour notre exposition inaugurale, nous avons sélectionné trois œuvres majeures. Chacune aborde la construction de soi sous un angle radicalement différent : la filiation, le traumatisme et la science.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onStartExperience}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md bg-gradient-to-b from-[#268d7c] to-[#113320] text-white text-sm font-semibold shadow-sm hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-opacity cursor-pointer whitespace-nowrap"
            >
              <span>Commencer l’expérience interactive</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Colonne droite : Vitrine interactive des trois œuvres et barre d'évaluation */}
        <div className="lg:col-span-7 flex flex-col items-center gap-7">
          {/* Deck en cascade contenu proprement sur mobile et grand écran */}
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-[620px] min-h-[340px] sm:min-h-[420px] flex items-center justify-center overflow-hidden px-2">
              {BOOKS.map((book, idx) => {
                const isSelected = book.id === selectedBookId;
                const offset = (idx - selectedIndex + BOOKS.length) % BOOKS.length;
                const layoutStyles =
                  offset === 0
                    ? 'z-30 translate-x-[-14%] sm:translate-x-[-26%] scale-100 opacity-100 shadow-2xl'
                    : offset === 1
                    ? 'z-20 translate-x-[10%] sm:translate-x-[12%] scale-[0.9] opacity-90 shadow-xl'
                    : 'z-10 translate-x-[28%] sm:translate-x-[46%] scale-[0.8] opacity-75 shadow-lg';

                const imageSrc = BOOK_ARTWORK[book.id];
                const imageFailed = failedImages[book.id];

                return (
                  <button
                    key={book.id}
                    type="button"
                    onMouseEnter={() => setSelectedBookId(book.id)}
                    onFocus={() => setSelectedBookId(book.id)}
                    onClick={() => {
                      if (isSelected) {
                        onOpenRoom(book.id);
                      } else {
                        setSelectedBookId(book.id);
                      }
                    }}
                    aria-pressed={isSelected}
                    aria-label={`${book.roomLabel} : ${book.title}, par ${book.author}. Thème : ${book.themeLabel}.`}
                    className={`absolute w-[195px] sm:w-[265px] aspect-[3/4] rounded-xl overflow-hidden text-left transition-all duration-300 ease-out border cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#268d7c] ${
                      isSelected
                        ? 'border-[#268d7c] dark:border-[#c2ffb4]'
                        : 'border-[#113320]/25 dark:border-[#268d7c]/40'
                    } ${layoutStyles}`}
                  >
                    {/* Fond visuel recadré bord-à-bord ou repli typographique */}
                    {!imageFailed ? (
                      <img
                        src={imageSrc}
                        alt={`Illustration littéraire pour ${book.title}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [book.id]: true }))
                        }
                        className="absolute inset-0 w-full h-full object-cover scale-[1.08]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#113320] via-[#194a30] to-[#0A1C12]" />
                    )}

                    {/* Voile de contraste mesuré pour une lisibilité éditoriale irréprochable */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0A1C12] via-[#0A1C12]/55 to-[#0A1C12]/55"
                      aria-hidden="true"
                    />

                    {/* Cadre intérieur de couverture littéraire */}
                    <div className="relative z-10 h-full p-5 flex flex-col justify-between text-[#F1F5F3]">
                      <div className="flex items-center justify-between text-xs tracking-wider border-b border-[#c2ffb4]/30 pb-2.5">
                        <span className="font-semibold text-[#c2ffb4]">
                          {book.roomLabel}
                        </span>
                        <span className="text-[#F1F5F3]/85">
                          {book.themeLabel}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-[#c2ffb4]/90 font-medium">
                          {book.author}
                        </p>
                        <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white">
                          {book.title}
                        </h2>
                        <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                          <span className="text-[#F1F5F3]/80">
                            {isSelected ? 'Cliquer pour ouvrir la salle' : 'Aperçu de l’œuvre'}
                          </span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 transition-transform ${
                              isSelected ? 'text-[#c2ffb4] translate-x-0.5' : 'opacity-60'
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sélecteur direct des 3 salles sous le deck */}
            <div
              className="mt-4 flex flex-wrap items-center justify-center gap-2"
              role="group"
              aria-label="Sélectionner une œuvre en vitrine"
            >
              {BOOKS.map((book) => {
                const isSelected = book.id === selectedBookId;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => setSelectedBookId(book.id)}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#113320] text-[#c2ffb4] dark:bg-[#268d7c] dark:text-white'
                        : 'border border-[#113320]/20 dark:border-[#268d7c]/40 text-[#113320]/80 dark:text-[#F1F5F3]/80 hover:border-[#268d7c]'
                    }`}
                  >
                    {book.roomLabel} · {book.themeLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Barre dynamique des étoiles dorées et lien direct vers la salle */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <StarRatingBar
              rating={selectedBook.rating}
              bookTitle={selectedBook.title}
              caption="Note moyenne des lecteurs sur Internet"
            />
            <button
              type="button"
              onClick={() => onOpenRoom(selectedBook.id)}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#268d7c] dark:text-[#c2ffb4] hover:underline underline-offset-4 cursor-pointer"
            >
              <span>Entrer dans la {selectedBook.roomLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
