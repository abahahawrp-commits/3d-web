import { useEffect, useRef } from 'react';
import { calculateNewTargetTime, DEFAULT_SCRUB_SENSITIVITY } from '../utils/scrub';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);
  const prevXRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const requestSeek = () => {
      const v = videoRef.current;
      if (!v || isNaN(v.duration) || v.duration <= 0) return;
      if (isSeekingRef.current) return;

      if (Math.abs(v.currentTime - targetTimeRef.current) > 0.02) {
        isSeekingRef.current = true;
        v.currentTime = targetTimeRef.current;
      }
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      requestSeek();
    };

    const onLoadedMetadata = () => {
      if (video.duration > 0 && video.currentTime === 0) {
        // seek slightly to initialize frame
        video.currentTime = 0.01;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      if (!video.duration || isNaN(video.duration)) return;

      targetTimeRef.current = calculateNewTargetTime(
        targetTimeRef.current,
        delta,
        window.innerWidth,
        video.duration,
        DEFAULT_SCRUB_SENSITIVITY
      );

      requestSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        prevXRef.current = e.touches[0].clientX;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;

      if (prevXRef.current === null) {
        prevXRef.current = clientX;
        return;
      }

      const delta = clientX - prevXRef.current;
      prevXRef.current = clientX;

      if (!video.duration || isNaN(video.duration)) return;

      targetTimeRef.current = calculateNewTargetTime(
        targetTimeRef.current,
        delta,
        window.innerWidth,
        video.duration,
        DEFAULT_SCRUB_SENSITIVITY
      );

      requestSeek();
    };

    const handleTouchEnd = () => {
      prevXRef.current = null;
    };

    video.addEventListener('seeked', onSeeked);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      poster="/poster.jpg"
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none"
      style={{
        objectPosition: '70% center',
      }}
      aria-hidden="true"
    >
      <source src="/bg.webm" type="video/webm" />
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
