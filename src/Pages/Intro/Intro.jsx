import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import gsap from 'gsap';

const Intro = () => {
  const comp = useRef(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useLayoutEffect(() => {
    // Set up GSAP context for animations
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from('#intro-slider', {
        xPercent: '-100',
        duration: 1.3,
        delay: 0.3,
      })
        .from(['#title-1', '#title-2', '#title-3', '#title-4'], {
          opacity: 0,
          y: '+=30',
          stagger: 0.5,
        })
        .to(['#title-1', '#title-2', '#title-3', '#title-4'], {
          opacity: 0,
          y: '-=30',
          delay: 0.3,
          stagger: 0.5,
        })
        .to('#intro-slider', {
          xPercent: '-100',
          duration: 1.3,
        })
        .from('#welcome', {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);

    // Set up a timer to redirect to the login page after the animations
    const timer = setTimeout(() => {
      navigate('/login');
    }, 9000); // Adjust the duration if needed based on your animation length

    // Cleanup function to clear timer and GSAP context
    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen p-10 bg-gray-50 absolute top-0 left-0 font-NerkoOne z-10 w-full flex flex-col gap-10 tracking-tight"
      >
        <h1 id="title-1" className="text-9xl">
          Create
        </h1>
        <h1 id="title-2" className="text-9xl">
          Save
        </h1>
        <h1 id="title-3" className="text-9xl">
          Explore
        </h1>
        <h1 id="title-4" className="text-9xl">
          from anyWhere & anyTime
        </h1>
      </div>
      <div className="h-screen flex bg-gray-950 justify-center items-center">
        <h1 id="welcome" className="text-9xl font-bold text-gray-100 font-NerkoOne">
          .Notepad
        </h1>
      </div>
    </div>
  );
};

export default Intro;
