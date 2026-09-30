// Lucide Icons Initialization
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Custom Audio Ended Listener
  const audio = document.getElementById('vibe-audio');
  const widget = document.getElementById('music-widget-card');
  const playIcon = document.getElementById('audio-play-icon');
  const statusText = document.getElementById('music-status-text');

  if (audio) {
    audio.addEventListener('ended', () => {
      if (widget) widget.classList.remove('playing');
      if (statusText) statusText.textContent = 'FAVORITE TRACK';
      if (playIcon) playIcon.setAttribute('data-lucide', 'play');
      lucide.createIcons();
    });
  }
});

// Theme Switcher Functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    localStorage.setItem('theme', 'dark');
  }
  lucide.createIcons();
}

// Restore saved theme on load
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }
})();

// Real-time Clock Jakarta (UTC+7)
function updateJakartaClock() {
  const clockElement = document.getElementById('realtime-clock');
  if (!clockElement) return;

  const now = new Date();
  const options = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };

  const timeString = new Intl.DateTimeFormat('id-ID', options).format(now);
  clockElement.textContent = `${timeString.replace(/\./g, ':')} WIB`;
}

updateJakartaClock();
setInterval(updateJakartaClock, 1000);

// Interactive Audio Preview untuk Current Vibe
function toggleAudioPreview() {
  const audio = document.getElementById('vibe-audio');
  const widget = document.getElementById('music-widget-card');
  const playIcon = document.getElementById('audio-play-icon');
  const statusText = document.getElementById('music-status-text');

  if (!audio || !widget) return;

  if (audio.paused) {
    audio.play().then(() => {
      widget.classList.add('playing');
      statusText.textContent = 'PLAYING NOW';
      if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
      lucide.createIcons();
    }).catch(err => {
      console.log('Audio preview file not ready or auto-play prevented:', err);
    });
  } else {
    audio.pause();
    widget.classList.remove('playing');
    statusText.textContent = 'FAVORITE TRACK';
    if (playIcon) playIcon.setAttribute('data-lucide', 'play');
    lucide.createIcons();
  }
}

// Certifications Toggle Show More
function toggleCerts() {
  const grid = document.getElementById('cert-grid-main');
  const btn = document.getElementById('toggle-certs-btn');
  const text = document.getElementById('toggle-certs-text');

  if (!grid || !btn) return;

  grid.classList.toggle('expanded');
  btn.classList.toggle('expanded');

  if (grid.classList.contains('expanded')) {
    text.textContent = 'Show Less';
  } else {
    text.textContent = 'Show More (+4)';
  }
}

// Certifications Modal Functions
function openCertModal(title, issuer, desc, skills, verifyUrl) {
  document.getElementById('modal-title-text').textContent = title;
  document.getElementById('modal-issuer-text').textContent = issuer;
  document.getElementById('modal-desc-text').textContent = desc;
  
  const verifyBtn = document.getElementById('modal-verify-link');
  if (verifyUrl && verifyUrl !== '#') {
    verifyBtn.href = verifyUrl;
    verifyBtn.style.display = 'inline-flex';
  } else {
    verifyBtn.style.display = 'none';
  }

  const skillsContainer = document.getElementById('modal-skills-container');
  skillsContainer.innerHTML = '';
  if (Array.isArray(skills)) {
    skills.forEach(skill => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag notranslate';
      tag.setAttribute('translate', 'no');
      tag.textContent = skill;
      skillsContainer.appendChild(tag);
    });
  }

  document.getElementById('cert-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModalDirect() {
  document.getElementById('cert-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeCertModal(event) {
  if (event.target.id === 'cert-modal') {
    closeCertModalDirect();
  }
}

// Language Switcher & Google Translate Wrapper
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'id',
    includedLanguages: 'en,id,jw',
    autoDisplay: false
  }, 'google_translate_element');
}

function changeLanguage(langCode) {
  const select = document.querySelector('.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  }
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });
}
