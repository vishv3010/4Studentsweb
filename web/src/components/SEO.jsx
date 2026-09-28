import { useEffect } from 'react';

/**
 * SEO component to dynamically update document title and meta description
 * on client-side route changes.
 */
export default function SEO({ title, description, canonical }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
    if (canonical) {
      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', canonical);
      }
    }
  }, [title, description, canonical]);

  return null;
}
