'use client';

/**
 * Sanity Studio configuration for Coday CMS.
 *
 * This file is used by both the embedded Next.js Studio route (/studio)
 * and standalone `npx sanity deploy`.
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ge7oi7z8';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'coday-cms',
  title: 'Coday CMS',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
