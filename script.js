// Inisialisasi Lucide Icons
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

// Fungsi Mengubah Bahasa
function changeLanguage(langCode) {
  // Update tampilan status tombol bahasa yang aktif
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === langCode);
  });

  // Trigger Google Translate jika elemen combo sudah dimuat
  const gtCombo = document.querySelector('.goog-te-combo');
  if (gtCombo) {
    gtCombo.value = langCode === 'jw' ? 'jw' : langCode;
    gtCombo.dispatchEvent(new Event('change'));
  }
}

// Setel Bahasa Default saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Tandai tombol EN sebagai aktif
  const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
  if (enBtn) {
    enBtn.classList.add('active');
  }

  // Picu otomatis Bahasa Inggris setelah Google Translate siap
  setTimeout(() => {
    changeLanguage('en');
  }, 800);
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
  
  // Refresh ikon Lucide setelah berganti tema
  lucide.createIcons();
}

// Fungsi Expand / Collapse Sertifikasi (+3 Show More)
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

// Tutup Modal ketika Klik Backdrop Outer
function closeCertModal(event) {
  if (event.target.id === 'cert-modal') {
    document.getElementById('cert-modal').classList.remove('active');
  }
}

// Tutup Modal via Tombol Close (X)
function closeCertModalDirect() {
  document.getElementById('cert-modal').classList.remove('active');
}
