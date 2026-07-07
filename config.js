/* Iron Condors Academy deployment configuration.
   siteBase is pinned to the live domain so certificate verification links
   are never derived from location.href (which can pick up a stray trailing
   slash depending on how a link to the site was shared/redirected).
   Paste a Google Apps Script Web App URL into recordsEndpoint to record passing results. */
window.IRON_CONDORS_CONFIG = {
  siteBase: "https://poppastraining.ai4academy.net",
  recordsEndpoint: ""
};
