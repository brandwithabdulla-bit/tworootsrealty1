import './globals.css';
import {Navbar,Footer} from '@/components/navigation';
import {origin} from '@/lib/seo';

export const metadata={metadataBase:new URL(origin),title:{default:'Two Roots Realty | Dubai Property. Global Perspective.',template:'%s | Two Roots Realty'},description:'Carefully selected properties, transparent advice and personalised guidance. A Dubai real estate advisory company with local expertise and international reach.',icons:{icon:'/favicon.svg'},robots:{index:false,follow:false}};
export default function RootLayout({children}){return <html lang="en"><body><Navbar/><main id="main-content">{children}</main><Footer/></body></html>}
