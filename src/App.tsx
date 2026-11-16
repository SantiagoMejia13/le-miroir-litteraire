import { useEffect, useState } from 'react';
import type { BookId, NavSection } from './data/museumData';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { QuizSection } from './components/QuizSection';
import { CollectionSection } from './components/CollectionSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('accueil');
  const [selectedCollectionBookId, setSelectedCollectionBookId] =
    useState<BookId>('harry-potter');
  const [isDark, setIsDark] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const navigateToSection = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCollectionRoom = (bookId: BookId) => {
    setSelectedCollectionBookId(bookId);
    setActiveSection('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-[#113320] dark:bg-[#0A1C12] dark:text-[#F1F5F3] transition-colors duration-300">
      <Navbar
        activeSection={activeSection}
        onNavigate={navigateToSection}
        onSelectRoom={openCollectionRoom}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        drawerOpen={drawerOpen}
        onSetDrawerOpen={setDrawerOpen}
      />

      <main className="flex-1">
        {activeSection === 'accueil' && (
          <HomeSection
            onStartExperience={() => navigateToSection('experience')}
            onOpenRoom={openCollectionRoom}
          />
        )}

        {activeSection === 'experience' && (
          <QuizSection onEnterRoom={openCollectionRoom} />
        )}

        {activeSection === 'collection' && (
          <CollectionSection
            selectedBookId={selectedCollectionBookId}
            onSelectBook={setSelectedCollectionBookId}
          />
        )}

        {activeSection === 'apropos' && <AboutSection />}
      </main>

      <Footer />
    </div>
  );
}
