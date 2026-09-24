// Inisialisasi Lucide Icons
lucide.createIcons();

// Data Kamus Terjemahan Modal Native
const certTranslations = {
  'CompTIA Security+': {
    en: 'Global industry standard certification validating core competencies in cybersecurity, threat management, risk mitigation, and network security architecture.',
    id: 'Sertifikasi standar industri global yang mengesahkan kompetensi inti dalam keamanan siber, manajemen ancaman, mitigasi risiko, serta arsitektur keamanan jaringan.',
    jw: 'Sertifikasi standar industri global sing ngesahake kompetensi inti ing keamanan siber, manajemen ancaman, mitigasi risiko, lan arsitektur keamanan jaringan.'
  },
  'Fortinet Associate': {
    en: 'Foundational certification covering network security concepts, advanced firewall operation, and perimeter security infrastructure.',
    id: 'Sertifikasi foundational mengenai konsep keamanan jaringan, pengoperasian firewall tingkat lanjut, serta pemahaman infrastruktur keamanan perimeter.',
    jw: 'Sertifikasi foundational babagan konsep keamanan jaringan, operasi firewall tingkat lanjut, lan pangerten infrastruktur keamanan perimeter.'
  },
  'Forcepoint DLP Admin': {
    en: 'Expertise in Data Loss Prevention (DLP) management, sensitive data protection, and prevention of information leakage.',
    id: 'Keahlian dalam manajemen Data Loss Prevention (DLP), perlindungan data sensitif, serta pencegahan kebocoran informasi.',
    jw: 'Keahlian ing manajemen Data Loss Prevention (DLP), perlindungan data sensitif, lan pencegahan kebocoran informasi.'
  },
  'Ransomware Defense': {
    en: 'Understanding mitigation, ransomware attack vector analysis, and system recovery procedures from malicious encryption threats.',
    id: 'Pemahaman mitigasi, analisis vektor serangan ransomware, serta prosedur pemulihan sistem dari ancaman enkripsi berbahaya.',
    jw: 'Pangerten mitigasi, analisis vektor serangan ransomware, lan prosedur pemulihan sistem saka ancaman enkripsi mbebayani.'
  },
  'GenAI for SOC Analysts': {
    en: 'Leveraging Generative AI to optimize SOC operations, automated log analysis, and threat detection.',
    id: 'Pemanfaatan Generative AI untuk mengoptimalkan operasional SOC, otomatisasi analisis log, dan deteksi ancaman.',
    jw: 'Pemanfaatan Generative AI kanggo ngoptimalake operasional SOC, otomatisasi analisis log, lan deteksi ancaman.'
  }
};

let currentCertData = null;

// Ambil Bahasa Aktif saat ini
function getActiveLanguage() {
  const activeBtn = document.querySelector('.lang-btn.active');
  return activeBtn ? activeBtn.getAttribute('data-lang') : 'id';
}

// Inisialisasi Google Translate Widget
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'id', includedLanguages: 'en,id,jw', autoDisplay: false },
    'google_translate_element'
  );
}

// Switcher Bahasa Utama
function changeLanguage(langCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  const targetLang = langCode === 'jw' ? 'jw' : langCode;
  
  if (langCode === 'id') {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    window.location.reload();
    return;
  }

  document.cookie = `googtrans=/id/${targetLang}; path=/;`;
  document.cookie = `googtrans=/id/${targetLang}; path=/; domain=` + window.location.hostname;

  const selectElem = document.querySelector('.goog-te-combo');
  if (selectElem) {
    selectElem.value = targetLang;
    selectElem.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }

  // Jika modal sedang terbuka, update teks deskripsinya secara eksplisit
  if (currentCertData && document.getElementById('cert-modal').classList.contains('active')) {
    const lang = getActiveLanguage();
    const descText = certTranslations[currentCertData.title]?.[lang] || currentCertData.desc;
    document.getElementById('modal-desc-text').innerText = descText;
  }
}

// Set Active Class saat Load Pertama
window.addEventListener('DOMContentLoaded', () => {
  const cookies = document.cookie.split(';');
  let activeLang = 'id';
  cookies.forEach(c => {
    if (c.trim().startsWith('googtrans=')) {
      if (c.includes('/en')) activeLang = 'en';
      else if (c.includes('/jw')) activeLang = 'jw';
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === activeLang);
  });
});

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

// Expand / Collapse Sertifikasi
function toggleCerts() {
  const certGrid = document.getElementById('cert-grid-main');
  const btn = document.getElementById('toggle-certs-btn');
  const btnText = document.getElementById('toggle-certs-text');

  certGrid.classList.toggle('expanded');
  btn.classList.toggle('expanded');

  if (certGrid.classList.contains('expanded')) {
    btnText.innerText = 'Show Less';
  } else {
    btnText.innerText = 'Show More (+4)';
  }
}

// Modal Detail Sertifikasi dengan Terjemahan Kamus Native
function openCertModal(title, issuer, defaultDesc, skills, link) {
  currentCertData = { title, issuer, desc: defaultDesc, skills, link };
  
  const currentLang = getActiveLanguage();
  const descText = certTranslations[title]?.[currentLang] || defaultDesc;

  document.getElementById('modal-title-text').innerText = title;
  document.getElementById('modal-issuer-text').innerText = issuer;
  document.getElementById('modal-desc-text').innerText = descText;
  document.getElementById('modal-verify-link').href = link;

  const skillsContainer = document.getElementById('modal-skills-container');
  skillsContainer.innerHTML = '';
  
  skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag notranslate';
    tag.setAttribute('translate', 'no');
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
