import Script from 'next/script';
import './globals.css';
import {Navbar,Footer} from '@/components/navigation';
import ScrollRestoration from '@/components/ScrollRestoration';
import {origin} from '@/lib/seo';
import {getLocations} from '@/lib/sanity-data';

export const metadata={
  metadataBase:new URL(origin),
  title:{default:'Two Roots Realty | Dubai Property. Global Perspective.',template:'%s | Two Roots Realty'},
  description:'Carefully selected properties, transparent advice and personalised guidance. A Dubai real estate advisory company with local expertise and international reach.',
  icons:{
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  robots:{index:false,follow:false}
};
export default async function RootLayout({children}){
  let popularLocations = [];
  try {
    const locations = await getLocations();
    popularLocations = locations
      .filter(x => (x.category === 'Popular' || x.popular) && !x.hideInPopularLocations && !x.hideInPopular)
      .slice(0, 5)
      .map(x => ({ name: x.name, slug: x.slug }));
  } catch (err) {
    // Graceful fallback
  }

  return (
    <html lang="en">
      <head>
        <Script id="scroll-restore" strategy="beforeInteractive">
          {`
            try {
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
            } catch (e) {}
          `}
        </Script>
      </head>
      <body>
        <ScrollRestoration />
        <Navbar/>
        <main id="main-content">{children}</main>
        <Footer popularLocations={popularLocations}/>
      </body>
    </html>
  );
}
