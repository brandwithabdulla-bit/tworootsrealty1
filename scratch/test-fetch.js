import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'k1h6wmz5',
  dataset: 'production',
  apiVersion: '2026-09-24',
  useCdn: false,
});

async function run() {
  const devs = await client.fetch(`*[_type == "developer"]{name, "slug": slug.current}`);
  const props = await client.fetch(`*[_type == "property"]{title, price}`);
  const projs = await client.fetch(`*[_type == "project"]{title, price}`);
  console.log('Sanity Developers Count:', devs.length);
  console.log('Sanity Properties Count:', props.length);
  console.log('Sanity Projects Count:', projs.length);
}

run();
