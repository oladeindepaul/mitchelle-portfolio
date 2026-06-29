// Mobile nav toggle
var t = document.getElementById('navToggle');
var l = document.getElementById('navLinks');
t.addEventListener('click', function () {
  var o = l.getAttribute('data-open') === 'true';
  l.setAttribute('data-open', String(!o));
  t.setAttribute('aria-expanded', String(!o));
});

// Scroll-reveal
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

// Contact form + toast
var form = document.getElementById('hireForm');
var toast = document.getElementById('toast');
var err = document.getElementById('formErr');
var btn = form.querySelector('.submit');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  err.textContent = '';
  btn.disabled = true;
  btn.firstChild.textContent = 'Sending… ';
  fetch(form.action, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
    .then(function (r) {
      if (r.ok) {
        form.reset();
        toast.classList.add('show');
      } else {
        return r.json().then(function (d) {
          throw new Error((d.errors && d.errors[0] && d.errors[0].message) || 'Something went wrong.');
        });
      }
    })
    .catch(function () { err.textContent = 'Could not send. Please try again, or email directly.'; })
    .finally(function () { btn.disabled = false; btn.firstChild.textContent = 'Send message '; });
});

document.getElementById('toastClose').addEventListener('click', function () { toast.classList.remove('show'); });
toast.addEventListener('click', function (e) { if (e.target === toast) toast.classList.remove('show'); });
