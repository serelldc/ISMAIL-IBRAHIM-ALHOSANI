// Renders the right column of the practice-areas mega menu for a given
// practice key (1-9), using the current language's sub-service list.
function renderMegaSubs(practiceKey){
  var right = document.getElementById('megaRight');
  var left = document.getElementById('megaLeft');
  if(!right || !left) return;
  var dict = I18N[CURRENT_LANG] || I18N.en;
  var subs = (dict.subs && dict.subs[practiceKey]) || [];
  right.innerHTML = '';
  subs.forEach(function(label){
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#practice-' + practiceKey;
    a.textContent = label;
    li.appendChild(a);
    right.appendChild(li);
  });
  Array.prototype.forEach.call(left.children, function(li){
    li.classList.toggle('active', li.getAttribute('data-practice') === String(practiceKey));
  });
}

// Called by i18n.js (applyLanguage) whenever the language changes, so the
// mega-menu's right column re-renders in the new language.
var ACTIVE_PRACTICE = 1;
function onLanguageApplied(){
  renderMegaSubs(ACTIVE_PRACTICE);
}

document.addEventListener('DOMContentLoaded', function(){

  // Language switch
  var saved = 'en';
  try{ saved = localStorage.getItem('alhosani_lang') || 'en'; }catch(e){}
  applyLanguage(saved);
  document.querySelectorAll('[data-lang-btn]').forEach(function(btn){
    btn.addEventListener('click', function(){
      applyLanguage(btn.getAttribute('data-lang-btn'));
    });
  });

  // Mega menu: hover (desktop) swaps the right column to match the
  // hovered practice area on the left.
  document.querySelectorAll('#megaLeft > li').forEach(function(li){
    li.addEventListener('mouseenter', function(){
      ACTIVE_PRACTICE = li.getAttribute('data-practice');
      renderMegaSubs(ACTIVE_PRACTICE);
    });
  });
  renderMegaSubs(ACTIVE_PRACTICE);

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if(navToggle){
    navToggle.addEventListener('click', function(){
      navMenu.classList.toggle('open');
    });
  }
  // Close mobile menu after clicking a link
  document.querySelectorAll('.nav-menu a').forEach(function(a){
    a.addEventListener('click', function(){
      navMenu.classList.remove('open');
    });
  });
  // Toggle mega-dropdown on tap for touch/mobile
  document.querySelectorAll('.has-dropdown > a').forEach(function(a){
    a.addEventListener('click', function(e){
      if(window.innerWidth <= 900){
        e.preventDefault();
        a.parentElement.classList.toggle('open-dropdown');
      }
    });
  });

  // Hero slider
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.getElementById('heroDots');
  var current = 0;
  var timer;

  slides.forEach(function(_, i){
    var dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', function(){ goToSlide(i); });
    dotsWrap.appendChild(dot);
  });

  function goToSlide(i){
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  function nextSlide(){
    goToSlide((current + 1) % slides.length);
  }

  if(slides.length > 1){
    timer = setInterval(nextSlide, 6000);
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> mailto (no backend wired up)
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value, email = form.email.value, phone = form.phone.value, msg = form.message.value;
      var body = msg + '\n\n' + name + ' | ' + email + (phone ? ' | ' + phone : '');
      window.location.href = 'mailto:alhosaniadvocate@gmail.com?subject=' + encodeURIComponent('Consultation Request') + '&body=' + encodeURIComponent(body);
    });
  }
});
