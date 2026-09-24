// script.js - Full Active Features

// Apply Initial User Settings (Theme & English as Default)
function applySavedSettings() {
  const body = document.body;
  const savedTheme = localStorage.getItem('user_theme') || 'dark';
  
  body.classList.remove('dark-theme', 'light-theme');
  body.classList.add(`${savedTheme}-theme`);
  
  // Default ke Bahasa Inggris ('en') jika belum pernah memilih
  const savedLang = localStorage.getItem('user_lang');
  const lang = savedLang || 'en';
  
  if (!savedLang) {
    const value = '/id/en';
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    const repoPath = pathSegments.length > 0 ? `/${pathSegments[0]}/` : '/';
    
    document.cookie = `googtrans=${value}; path=/; max-age=31536000`;
    document.cookie = `googtrans=${value}; path=${repoPath}; max-age=31536000`;
    localStorage.setItem('user_lang', 'en');
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// 1. Toggle Dark/Light Mode
window.toggleTheme = function () {
  const body = document.body;
  const isLight = body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme', !isLight);
  localStorage.setItem('user_theme', isLight ? 'light' : 'dark');
};

// 2. Switch Language
window.changeLanguage = function (lang) {
  localStorage.setItem('user_lang', lang);
  const value = lang === 'id' ? '' : `/id/${lang}`;
  
  const pathname = window.location.pathname;
  const pathSegments = pathname.split('/').filter(Boolean);
  const repoPath = pathSegments.length > 0 ? `/${pathSegments[0]}/` : '/';
  
  document.cookie = `googtrans=${value}; path=/; max-age=31536000`;
  document.cookie = `googtrans=${value}; path=${repoPath}; max-age=31536000`;
  
  location.reload();
};

// 3. Toggle Extra Certifications (Show More / Less)
window.toggleCerts = function () {
  const certsContainer = document.getElementById('more-certs');
  const btn = document.getElementById('toggle-certs-btn');
  const btnText = document.getElementById('toggle-certs-text');
  
  if (!certsContainer) return;
  
  const isExpanded = certsContainer.classList.toggle('expanded');
  btn.classList.toggle('expanded', isExpanded);
  
  if (btnText) {
    btnText.textContent = isExpanded ? 'Show Less' : 'Show More (+3)';
  }
};

// 4. Open Certification Modal
window.openCertModal = function (title, issuer, description, skills, link) {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  document.getElementById('modal-title-text').textContent = title;
  document.getElementById('modal-issuer-text').textContent = issuer;
  document.getElementById('modal-desc-text').textContent = description;
  document.getElementById('modal-verify-link').href = link;
  
  const list = document.getElementById('modal-skills-container');
  list.innerHTML = '';
  
  skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    list.appendChild(tag);
  });
  
  modal.classList.add('active');
};

// 5. Close Certification Modal
window.closeCertModal = function (event) {
  if (!event || event.target.id === 'cert-modal') {
    const modal = document.getElementById('cert-modal');
    if (modal) modal.classList.remove('active');
  }
};

window.closeCertModalDirect = function () {
  const modal = document.getElementById('cert-modal');
  if (modal) modal.classList.remove('active');
};

// Google Translate Initialization Callback
window.googleTranslateElementInit = function () {
  if (window.google && window.google.translate) {
    new window.google.translate.TranslateElement({ 
      pageLanguage: 'id', 
      includedLanguages: 'id,en,jw', 
      autoDisplay: false 
    }, 'google_translate_element');
  }
};

// Initialize Features on Load
document.addEventListener('DOMContentLoaded', () => {
  applySavedSettings();
  
  // Render Lucide Icons Safely
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});
