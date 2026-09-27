export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-09-24';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k1h6wmz5';

export const useCdn = false;

function assertValue(v, errorMessage) {
  if (!v) {
    throw new Error(errorMessage);
  }
  return v;
}
