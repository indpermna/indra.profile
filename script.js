// Inisialisasi Lucide Icons
lucide.createIcons();

// Helper Cookie untuk Google Translate
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + window.location.hostname;
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
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

// Terjemahan Bahasa Berbasis Cookie & Trigger Elemen
function changeLanguage(langCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  const targetLang = langCode === 'jw' ? 'jw' : langCode;

  if (langCode === 'id') {
    setCookie('googtrans', '', -1);
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;

    const iframe = document.querySelector('iframe.goog-te-banner-frame');
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      const restoreBtn = innerDoc.getElementById(':1.restore') || innerDoc.querySelector('button');
      if (restoreBtn) {
        restoreBtn.click();
        return;
      }
    }

    setTimeout(() => {
      window.location.reload();
    }, 150);
    return;
  }

  setCookie('googtrans', `/id/${targetLang}`, 1);

  const selectElem = document.querySelector('.goog-te-combo');
  if (selectElem) {
    selectElem.value = targetLang;
    selectElem.dispatchEvent(new Event('change'));
  } else {
    setTimeout(() => {
      window.location.reload();
    }, 150);
  }
}

// Deteksi Bahasa Aktif Saat Pertama Halaman Dimuat
window.addEventListener('DOMContentLoaded', () => {
  const currentCookie = getCookie('googtrans');
  let activeLang = 'id';

  if (currentCookie) {
    if (currentCookie.includes('/en')) activeLang = 'en';
    else if (currentCookie.includes('/jw')) activeLang = 'jw';
  }

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
    btnText.innerText = 'Show More (+3)';
  }
}

// Modal Detail Sertifikasi (Dengam Auto-Translate Dinamis)
function openCertModal(title, issuer, desc, skills, link) {
  document.getElementById('modal-title-text').innerText = title;
  document.getElementById('modal-issuer-text').innerText = issuer;
  document.getElementById('modal-desc-text').innerText = desc;
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

  const modal = document.getElementById('cert-modal');
  modal.classList.add('active');

  // Pemicu Google Translate saat modal dibuka jika dalam mode EN/JV
  const currentCookie = getCookie('googtrans');
  if (currentCookie && !currentCookie.includes('/id')) {
    const selectElem = document.querySelector('.goog-te-combo');
    if (selectElem) {
      setTimeout(() => {
        selectElem.dispatchEvent(new Event('change'));
      }, 50);
    }
  }
}

function closeCertModal(event) {
  if (event.target.id === 'cert-modal') {
    document.getElementById('cert-modal').classList.remove('active');
  }
}

function closeCertModalDirect() {
  document.getElementById('cert-modal').classList.remove('active');
}
