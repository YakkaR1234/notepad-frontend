import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import gsap from 'gsap';

const Intro = () => {
  const comp = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useLayoutEffect(() => {
    // Set up GSAP context for animations
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '#welcome',
        { opacity: 0, scale: 0.8 }, // Start state: faded out, slightly smaller
        {
          opacity: 1,
          scale: 1, // End state: fully visible, normal size
          duration: 1.5, // Duration of the fade-in animation
          ease: 'power2.out', // Easing for smooth effect
          onComplete: () => {
            // After fade-in completes, start fade-out
            gsap.to('#welcome', {
              opacity: 0,
              scale: 0.8, // Optionally scale down during fade out
              duration: 1.5, // Duration of the fade-out animation
              ease: 'power2.in', // Easing for fade-out
              onComplete: () => {
                // After fade-out completes, navigate to login
                navigate('/login');
              }
            });
          }
        }
      );
    }, comp);

    // Cleanup function to clear GSAP context
    return () => {
      ctx.revert();
    };
  }, [navigate]);

  return (
    <div className="relative" ref={comp}>
      <div className="h-screen flex bg-gray-950 justify-center items-center">
        <h1 id="welcome" className="text-9xl font-bold text-gray-100 font-NerkoOne">
          .Notepad
        </h1>
      </div>
    </div>
  );
};

export default Intro;
