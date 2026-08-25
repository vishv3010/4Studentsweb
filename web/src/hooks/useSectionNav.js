import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** The href a section link should carry, so middle-click and
 *  open-in-new-tab land on the right place too. */
export const sectionHref = (id) => `/#${id}`;

/**
 * The header and footer link to sections that only exist on the home page.
 * Clicking one from /support or /privacy used to do nothing whatsoever: the
 * handler called preventDefault and then looked up an element that is not on
 * that route, so the click was swallowed. This routes home first and lets
 * ScrollToTop honour the hash on arrival; when we are already on the home
 * page it keeps the original in-page smooth scroll.
 *
 * Returns a handler factory — sectionNav('faq') for a plain link, or
 * sectionNav('faq', closeMenu) to run something on the way out, such as
 * closing the mobile menu.
 */
export function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return useCallback(
    (id, beforeNavigate) => (event) => {
      event.preventDefault();
      beforeNavigate?.();

      if (pathname !== '/') {
        navigate(sectionHref(id));
        return;
      }

      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [pathname, navigate]
  );
}
