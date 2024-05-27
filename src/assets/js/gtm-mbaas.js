var global = global || window;
// Se empaqueta el código de google dentro de una función global para pasar como parámetro el id tagging
// La función esta tal cual la sugiere google
function setGoogleTagManager(id) {
  (function (w, d, s, l, i) {
    w[l] = w[l] || []; w[l].push({
      'gtm.start': new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })
    (window, document, 'script', 'dataLayer', id);
}
