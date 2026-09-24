// Inisialisasi Ikon Lucide
lucide.createIcons();

// Inisialisasi Google Translate Widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'id',
      includedLanguages: 'en,id,jw',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'google_translate_element'
  );
}

// Fungsi Pengubah Bahasa
function changeLanguage(langCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  const gtCombo = document.querySelector('.goog-te-combo');
  if (gtCombo) {
    gtCombo.value = langCode === 'jw' ? 'jw' : langCode;
    gtCombo.dispatchEvent(new Event('change'));
  }
}

// Set Bahasa Default ke EN saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
  if (enBtn) {
    enBtn.classList.add('active');
  }

  const checkComboInterval = setInterval(() => {
    const gtCombo = document.querySelector('.goog-te-combo');
    if (gtCombo) {
      changeLanguage('en');
      clearInterval(checkComboInterval);
    }
  }, 300);
});

// Fungsi Toggle Theme (Dark / Light)
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

// Fungsi Expand / Collapse Sertifikasi
function toggleCerts() {
  const moreCerts = document.getElementById('more-certs');
  const btn = document.getElementById('toggle-certs-btn');
  const btnText = document.getElementById('toggle-certs-text');

  moreCerts.classList.toggle('expanded');
  btn.classList.toggle('expanded');

  if (moreCerts.classList.contains('expanded')) {
    btnText.innerText = 'Show Less';
  } else {
    btnText.innerText = 'Show More (+3)';
  }
}

// Fungsi Modal Detail Sertifikasi
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
