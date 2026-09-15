export const origin=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export function pageMetadata(title,description,path='/'){return {title,description,alternates:{canonical:path},openGraph:{title:`${title} | Two Roots Realty`,description,url:path,type:'website',siteName:'Two Roots Realty'},twitter:{card:'summary',title,description}};}
