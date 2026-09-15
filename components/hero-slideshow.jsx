'use client';
import {useEffect,useState} from 'react';
import Image from 'next/image';
import {images} from '@/data/images';
const slides=[{src:images.hero,alt:'Dubai Marina skyline and waterfront',label:'Waterfront perspective'},{src:images.villa,alt:'Illustrative villa with a swimming pool',label:'Space to call your own'},{src:images.apartment,alt:'Illustrative contemporary apartment interior',label:'Considered living'}];
export default function HeroSlideshow(){
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true);
 useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(query.matches);update();query.addEventListener('change',update);return()=>query.removeEventListener('change',update);},[]);
 useEffect(()=>{if(paused||reduced)return;const timer=setInterval(()=>{if(!document.hidden)setActive(i=>(i+1)%slides.length);},6500);return()=>clearInterval(timer);},[paused,reduced]);
 const choose=i=>{setActive(i);setPaused(true);};
 return <><div className="hero-slides" aria-label="Illustrative property photography">{slides.map((slide,i)=><div className={`hero-slide ${i===active?'is-active':''}`} key={slide.src} aria-hidden={i!==active}><Image src={slide.src} alt={slide.alt} fill sizes="100vw" priority={i===0}/></div>)}</div></>;
}
