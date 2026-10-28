// Builds the contact email at runtime so it never appears in the page source,
// which keeps it away from simple scrapers.
//   <a data-email>                       → becomes a mailto: link
//   data-email-subject="…"               → pre-fills the subject
//   data-email-text                      → also shows the address as the link text
(function () {
  var codes = [116, 117, 102, 119, 102, 111, 65, 116, 117, 102, 119, 102, 111, 116, 112, 115, 112, 108, 98, 47, 100, 98];
  var address = codes.map(function (n) { return String.fromCharCode(n - 1); }).join("");

  document.querySelectorAll("[data-email]").forEach(function (link) {
    var subject = link.getAttribute("data-email-subject");
    link.href = "mailto:" + address + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    if (link.hasAttribute("data-email-text")) link.textContent = address;
  });
})();
