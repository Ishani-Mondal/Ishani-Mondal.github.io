/* Shared behaviour: mobile nav toggle + footer year. */
(function () {
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();

  var t = document.querySelector('.nav-toggle');
  var nav = document.getElementById('sitenav');
  if (t && nav) {
    t.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      t.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
})();
