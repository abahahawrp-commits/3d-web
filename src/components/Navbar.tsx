import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Labs', href: '#labs' },
  { label: 'Studio', href: '#studio' },
  { label: 'Openings', href: '#openings' },
  { label: 'Shop', href: '#shop' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center text-white">
        {/* Logo (left) */}
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-[21px] sm:text-[26px] tracking-tight text-white hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'var(--font-heading)' }}
            aria-label="Mainframe Home"
          >
            Mainframe®
          </a>
          <span
            className="text-[25px] sm:text-[30px] text-white select-none leading-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop nav links (center, hidden below md) */}
        <nav
          className="hidden md:flex items-center text-[23px] text-white"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link, idx) => (
            <span key={link.label} className="inline-flex items-center">
              <a
                href={link.href}
                className="hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
              {idx < NAV_LINKS.length - 1 && <span className="mr-2">,</span>}
            </span>
          ))}
        </nav>

        {/* Desktop CTA (right, hidden below md) */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile hamburger (visible below md) */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 focus:outline-none z-20 cursor-pointer"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile overlay (z-index: 9) */}
      <div
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="text-[32px] font-medium text-white hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-70 transition-opacity mt-4"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
}
