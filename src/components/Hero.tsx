import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const INTRO_LINE_1 = 'Hey there, meet A.R.I.A,';
const INTRO_LINE_2 = "Mainframe's Adaptive Response Interface Agent";
const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const WHITE_PILLS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText('hello@mainframe.co');
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = 'hello@mainframe.co';
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePillClick = (label: string) => {
    if (label === 'Send a brief hello' || label === 'Pitch us an idea') {
      window.location.href = 'mailto:hello@mainframe.co?subject=' + encodeURIComponent(label);
    } else {
      setActiveMessage(`Selected: "${label}"`);
      setTimeout(() => setActiveMessage(null), 2500);
    }
  };

  return (
    <main className="relative z-[1] w-full h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden pointer-events-none">
      <div className="max-w-xl relative z-10 w-full pointer-events-auto">
        {/* 1. Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
          }}
          aria-hidden="true"
        >
          {INTRO_LINE_1}
          <br />
          {INTRO_LINE_2}
        </div>

        {/* 2. Typewriter text */}
        <p
          className="text-white mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
          }}
          aria-live="polite"
        >
          {displayed}
          {!done && (
            <span
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-cursor-blink"
              aria-hidden="true"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-all duration-400 ease-out ${
            buttonsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {/* 4 White pill buttons */}
          {WHITE_PILLS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => handlePillClick(label)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-black hover:text-white transition-colors duration-200"
            >
              {label}
            </button>
          ))}

          {/* 1 Outline pill button */}
          <button
            type="button"
            onClick={handleCopyEmail}
            title="Click to copy email address"
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap cursor-pointer hover:bg-white hover:text-black transition-colors duration-200 gap-2 sm:gap-3"
          >
            <span>
              {copied ? (
                'Copied to clipboard!'
              ) : (
                <>
                  Reach us:{' '}
                  <span className="underline underline-offset-1">
                    hello@mainframe.co
                  </span>
                </>
              )}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="7" height="7" rx="1" />
              <path d="M2.5 8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v0.5" />
            </svg>
          </button>
        </div>

        {/* Temporary pill notification for non-mailto actions */}
        {activeMessage && (
          <div
            className="mt-3 text-xs text-white/70 tracking-wide transition-opacity duration-300"
            role="status"
          >
            {activeMessage}
          </div>
        )}
      </div>
    </main>
  );
}
