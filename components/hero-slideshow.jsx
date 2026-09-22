'use client';
import {useEffect,useState} from 'react';
import Image from 'next/image';

import { defaultSlides } from '@/data/slides';

export default function HeroSlideshow({ slides: customSlides }){
  const slides = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
  useEffect(()=>{
    const query=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(query.matches);
    update();
    query.addEventListener('change',update);
    return()=>query.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(paused||reduced||slides.length<=1)return;
    const timer=setInterval(()=>{
      if(!document.hidden)setActive(i=>(i+1)%slides.length);
    },6500);
    return()=>clearInterval(timer);
  },[paused,reduced,slides.length]);

  return (
    <div className="hero-slides" aria-label="Dubai luxury real estate photography">
      {slides.map((slide,i)=>(
        <div className={`hero-slide ${i===active?'is-active':''}`} key={slide.src} aria-hidden={i!==active}>
          <Image 
            src={slide.src} 
            alt={slide.alt} 
            fill 
            sizes="100vw" 
            priority={i===0}
            style={{ objectPosition: slide.position || 'center center', objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}
