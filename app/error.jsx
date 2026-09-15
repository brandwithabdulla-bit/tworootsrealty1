'use client';
export default function Error({reset}){return <div className="container section"><h1>Something interrupted this page.</h1><p>Please try again.</p><button className="button" onClick={reset}>Try again</button></div>}
