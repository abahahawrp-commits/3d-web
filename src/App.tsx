import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      {/* Background Video (mouse-scrub controlled, fixed z-0) */}
      <BackgroundVideo />

      {/* Fixed Navbar (z-10, mobile overlay z-9) */}
      <Navbar />

      {/* Hero Section (z-1) */}
      <Hero />
    </div>
  );
}
