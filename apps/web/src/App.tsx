import { GridBackground } from './components/layout/grid-background';
import { Navigation } from './components/layout/navigation';
import { Features } from './components/sections/features';
import { Footer } from './components/sections/footer';
import { Hero } from './components/sections/hero';

const App = () => (
  <div className='min-h-screen overflow-x-hidden'>
    <a className='skip-link' href='#main-content'>
      Skip to main content
    </a>
    <GridBackground />
    <Navigation />
    <main id='main-content'>
      <Hero />
      <Features />
    </main>
    <Footer />
  </div>
);

export default App;
