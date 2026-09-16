'use client';
import {useEffect,useState} from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Dubai Skyline',
    position: 'center center'
  },
  {
    src: '/images/hero/hero-2.jpg',
    alt: 'Dubai Marina',
    position: 'center 40%'
  },
  {
    src: '/images/hero/hero-3.jpg',
    alt: 'Luxury Architecture',
    position: 'center center'
  },
  {
    src: '/images/hero/hero-4.jpg',
    alt: 'Modern Development',
    position: 'center 60%'
  },
  {
    src: '/images/hero/hero-5.jpg',
    alt: 'Downtown Dubai',
    position: 'right center'
  }
];

export default function HeroSlideshow(){
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
  useEffect(()=>{
    const query=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setReduced(query.matches);
    update();
    query.addEventListener('change',update);
    return()=>query.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    if(paused||reduced)return;
    const timer=setInterval(()=>{
      if(!document.hidden)setActive(i=>(i+1)%slides.length);
    },6500);
    return()=>clearInterval(timer);
  },[paused,reduced]);

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
            style={{ objectPosition: slide.position, objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}
