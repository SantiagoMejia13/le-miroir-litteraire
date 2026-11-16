import { Menu, Moon, Sun, X, ArrowRight } from 'lucide-react';
import { BOOKS, type BookId, type NavSection } from '../data/museumData';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onSelectRoom: (bookId: BookId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  drawerOpen: boolean;
  onSetDrawerOpen: (open: boolean) => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'experience', label: "L'expérience interactive" },
  { id: 'collection', label: 'Collection' },
  { id: 'apropos', label: 'À propos' }
];

export function Navbar({
  activeSection,
  onNavigate,
  onSelectRoom,
  isDark,
  onToggleTheme,
  drawerOpen,
  onSetDrawerOpen
}: NavbarProps) {
  return (
    <>
      <header className="sticky top-0 z-40 h-14 md:h-[74px] border-b border-[#113320]/12 dark:border-[#268d7c]/30 bg-[#F8FAF9]/95 dark:bg-[#0A1C12]/95 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Gauche : Bouton de répertoire du musée */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onSetDrawerOpen(true)}
              aria-label="Ouvrir le menu de navigation du musée"
              aria-expanded={drawerOpen}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#268d7c] dark:text-[#c2ffb4] hover:bg-[#113320]/8 dark:hover:bg-[#113320] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" strokeWidth={2.2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('accueil')}
              className="md:hidden font-serif text-lg font-semibold tracking-tight text-[#113320] dark:text-[#F1F5F3] whitespace-nowrap cursor-pointer"
            >
              Le Miroir Littéraire
            </button>
          </div>

          {/* Centre : Quatre catégories centrées du musée */}
          <nav
            aria-label="Navigation principale"
            className="hidden md:flex items-stretch justify-center h-full gap-2 lg:gap-4"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`h-full px-5 lg:px-6 inline-flex items-center justify-center text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#c2ffb4] cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-b from-[#268d7c] to-[#113320] text-white font-semibold shadow-sm'
                      : 'text-[#113320]/75 dark:text-[#F1F5F3]/80 hover:text-[#113320] dark:hover:text-[#c2ffb4] hover:bg-[#113320]/5 dark:hover:bg-[#113320]/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Droite : Sélecteur Mode Clair / Mode Sombre */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#113320]/15 dark:border-[#268d7c]/50 bg-white/70 dark:bg-[#113320] text-[#113320] dark:text-[#c2ffb4] hover:border-[#268d7c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#268d7c] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline text-xs font-medium">Mode clair</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="hidden sm:inline text-xs font-medium">Mode sombre</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Tiroir latéral du répertoire muséal */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
          aria-label="Répertoire du musée Le Miroir Littéraire"
        >
          <div
            className="fixed inset-0 bg-[#0A1C12]/60 backdrop-blur-xs"
            onClick={() => onSetDrawerOpen(false)}
          />
          <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#F8FAF9] dark:bg-[#0A1C12] border-r border-[#113320]/15 dark:border-[#268d7c]/40 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-[#113320]/12 dark:border-[#268d7c]/30 pb-4">
                <div>
                  <p className="font-serif text-xl font-semibold text-[#113320] dark:text-[#F1F5F3]">
                    Le Miroir Littéraire
                  </p>
                  <p className="text-xs text-[#268d7c] dark:text-[#c2ffb4]">
                    Exposition inaugurale · L’identité
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSetDrawerOpen(false)}
                  aria-label="Fermer le menu"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#113320] dark:text-[#F1F5F3] hover:bg-[#113320]/10 dark:hover:bg-[#113320] cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium tracking-wider text-[#113320]/60 dark:text-[#F1F5F3]/60">
                  Parcours du musée
                </p>
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => {
                            onNavigate(item.id);
                            onSetDrawerOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-gradient-to-r from-[#268d7c] to-[#113320] text-white'
                              : 'text-[#113320] dark:text-[#F1F5F3] hover:bg-[#113320]/8 dark:hover:bg-[#113320]'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ArrowRight className="w-4 h-4 opacity-70" aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#113320]/12 dark:border-[#268d7c]/30">
                <p className="text-xs font-medium tracking-wider text-[#113320]/60 dark:text-[#F1F5F3]/60">
                  Accès direct aux salles
                </p>
                <ul className="space-y-2">
                  {BOOKS.map((book) => (
                    <li key={book.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectRoom(book.id);
                          onSetDrawerOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 rounded-md border border-[#113320]/12 dark:border-[#268d7c]/30 hover:border-[#268d7c] bg-white/60 dark:bg-[#113320]/70 transition-colors cursor-pointer"
                      >
                        <p className="text-xs font-semibold text-[#268d7c] dark:text-[#c2ffb4]">
                          {book.roomLabel} · {book.themeLabel}
                        </p>
                        <p className="font-serif text-sm font-medium text-[#113320] dark:text-[#F1F5F3] truncate">
                          {book.title}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#113320]/12 dark:border-[#268d7c]/30">
              <p className="text-xs text-[#113320]/65 dark:text-[#F1F5F3]/65 leading-relaxed">
                Musée virtuel académique consacré à l’étude comparée de l’identité dans la littérature.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
