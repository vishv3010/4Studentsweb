import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** The href a section link should carry, so middle-click,
 *  open-in-new-tab, and search crawlers land on clean URLs. */
export const sectionHref = (id) => {
  if (id === 'download') return '/#download';
  return `/${id}`;
};

/**
 * The header and footer link to key sections and dedicated pages.
 * On the home page, clicking scrolls smoothly to that section if it exists on DOM.
 * From any other page, it navigates cleanly to the dedicated route.
 */
export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id, beforeNavigate) => (event) => {
      // Allow default behavior for middle-click or modifier keys
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) {
        return;
      }

      event.preventDefault();
      beforeNavigate?.();

      if (pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }

      navigate(sectionHref(id));
    },
    [pathname, navigate]
  );
}
