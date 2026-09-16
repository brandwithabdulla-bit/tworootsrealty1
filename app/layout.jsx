import Script from 'next/script';
import './globals.css';
import {Navbar,Footer} from '@/components/navigation';
import ScrollRestoration from '@/components/ScrollRestoration';
import {origin} from '@/lib/seo';

export const metadata={metadataBase:new URL(origin),title:{default:'Two Roots Realty | Dubai Property. Global Perspective.',template:'%s | Two Roots Realty'},description:'Carefully selected properties, transparent advice and personalised guidance. A Dubai real estate advisory company with local expertise and international reach.',icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}){
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
        <Footer/>
      </body>
    </html>
  );
}
