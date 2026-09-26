import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas/index.js';
import { projectId, dataset } from './sanity/env.js';

export default defineConfig({
  basePath: '/studio',
  name: 'tworootsrealty',
  title: 'Two Roots Realty CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
