import type { BookId } from './museumData';
import salleFiliationImg from '../assets/images/salle_filiation_cover_1794788686046.jpg';
import salleTraumatismeImg from '../assets/images/salle_traumatisme_cover_1794788687906.jpg';
import salleScienceImg from '../assets/images/salle_science_cover_1794788688249.jpg';

export const BOOK_ARTWORK: Record<BookId, string> = {
  'harry-potter': salleFiliationImg,
  'jardin-papillons': salleTraumatismeImg,
  'arpenteurs-monde': salleScienceImg
};
