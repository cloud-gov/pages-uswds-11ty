document.addEventListener("DOMContentLoaded", () => {
  // Workaround for the base tag: Update all anchor links to contain a full URL
  const pathname = window.location.href.split("#")[0];
  document.querySelectorAll("a[href^='#']").forEach((link) => {
    const originalHref = link.getAttribute("href");
    link.setAttribute("href", pathname + originalHref);
  });
});
