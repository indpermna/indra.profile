// Inisialisasi Lucide
lucide.createIcons();

// Helper Cookie untuk Google Translate
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Inisialisasi Google Translate Widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'id',
      includedLanguages: 'en,id,jw',
      autoDisplay: false
    },
    'google_translate_element'
  );
}

// Terjemahan Bahasa Berbasis Cookie & Combo Trigger
function changeLanguage(langCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  const targetLang = langCode === 'jw' ? 'jw' : langCode;

  // Set cookie bawaan Google Translate
  setCookie('googtrans', `/id/${targetLang}`, 1);

  // Trigger combo box jika siap
  const selectElem = document.querySelector('.goog-te-combo');
  if (selectElem) {
    selectElem.value = targetLang;
    selectElem.dispatchEvent(new Event('change'));
  } else {
    // Reload halaman jika cookie baru pertama diset
    window.location.reload();
  }
}

// Toggle Dark / Light Theme
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('theme-icon');
  
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');

  if (body.classList.contains('light-theme')) {
    themeIcon.setAttribute('data-lucide', 'moon');
  } else {
    themeIcon.setAttribute('data-lucide', 'sun');
  }
  
  lucide.createIcons();
}

// Expand / Collapse Sertifikasi (Langsung dalam 1 grid)
function toggleCerts() {
  const certGrid = document.getElementById('cert-grid-main');
  const btn = document.getElementById('toggle-certs-btn');
  const btnText = document.getElementById('toggle-certs-text');

  certGrid.classList.toggle('expanded');
  btn.classList.toggle('expanded');

  if (certGrid.classList.contains('expanded')) {
    btnText.innerText = 'Show Less';
  } else {
    btnText.innerText = 'Show More (+3)';
  }
}

// Modal Detail Sertifikasi
function openCertModal(title, issuer, desc, skills, link) {
  document.getElementById('modal-title-text').innerText = title;
  document.getElementById('modal-issuer-text').innerText = issuer;
  document.getElementById('modal-desc-text').innerText = desc;
  document.getElementById('modal-verify-link').href = link;

  const skillsContainer = document.getElementById('modal-skills-container');
  skillsContainer.innerHTML = '';
  
  skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.innerText = skill;
    skillsContainer.appendChild(tag);
  });

  document.getElementById('cert-modal').classList.add('active');
}

function closeCertModal(event) {
  if (event.target.id === 'cert-modal') {
    document.getElementById('cert-modal').classList.remove('active');
  }
}

function closeCertModalDirect() {
  document.getElementById('cert-modal').classList.remove('active');
}
