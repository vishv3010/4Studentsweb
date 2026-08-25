/**
 * Web3Forms delivers form submissions straight to an inbox with no server of
 * our own — which is what this site needs, since GitHub Pages can only serve
 * static files and cannot run any backend code.
 *
 * SETUP (one step): go to https://web3forms.com, enter 4studentshub@gmail.com,
 * and they email you an access key. Paste it below, replacing the placeholder.
 *
 * This key is safe to commit and safe to have in public page source — that is
 * how Web3Forms is designed to work. It only permits sending mail to the
 * address the key was issued to, so it cannot be abused to read anything or
 * send mail anywhere else.
 */
export const WEB3FORMS_ACCESS_KEY = 'b14ace40-f89f-4859-a140-d63e728f6429';

/** False until the key above is filled in, so the UI can say so honestly. */
export const isFormConfigured = () =>
  Boolean(WEB3FORMS_ACCESS_KEY) &&
  WEB3FORMS_ACCESS_KEY !== 'PASTE_YOUR_ACCESS_KEY_HERE';

/**
 * Posts to Web3Forms. Throws on failure so callers can show a real error
 * instead of a success message that isn't true.
 */
export async function submitToWeb3Forms(fields) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...fields,
    }),
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Submission failed');
  }
  return data;
}

/**
 * ─── Play Store launch switch ───────────────────────────────────────────────
 *
 * Google approving the app for production access is NOT the same as the app
 * being installable — a production release still has to finish rolling out
 * before the store listing answers to the public. Until it does, a "Download
 * on Google Play" button would send students to a 404, so the site keeps
 * saying "closed testing" and collecting waitlist emails.
 *
 * TO GO LIVE (two edits, both in this file):
 *   1. Paste the real store URL into PLAY_STORE_URL below.
 *   2. Flip IS_LIVE_ON_PLAY_STORE to true.
 * Commit and push to main — GitHub Actions redeploys 4students.in on its own.
 *
 * One thing this switch cannot reach: the <meta name="description"> and the
 * og/twitter descriptions in web/index.html are static HTML, so update the
 * "Now in closed testing. Join the waitlist for your campus." sentence there
 * by hand at the same time.
 */
export const PLAY_STORE_URL = 'PASTE_YOUR_PLAY_STORE_URL_HERE';

export const IS_LIVE_ON_PLAY_STORE = false;

/**
 * True only when the app is both marked live and has a real URL to point at,
 * so a half-finished flip falls back to the waitlist instead of shipping a
 * broken download button.
 */
export const isPlayStoreLive = () =>
  IS_LIVE_ON_PLAY_STORE &&
  Boolean(PLAY_STORE_URL) &&
  PLAY_STORE_URL !== 'PASTE_YOUR_PLAY_STORE_URL_HERE';
