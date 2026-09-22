// Inisialisasi Ikon Lucide
lucide.createIcons();

// Logika Dark / Light Mode Switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Cek preferensi tema sebelumnya dari local storage
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  body.className = savedTheme;
} else {
  // Mode standar (Dark Theme untuk kesan Cyber Security)
  body.classList.add('dark-theme');
}

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    body.classList.replace('dark-theme', 'light-theme');
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.replace('light-theme', 'dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  }
});

// Kamus & Fungsi Translate (ID, EN, JV)
const translations = {
  id: {
    collab: "Open for Tech Collaboration",
    sec_socials: "NETWORKS & SOCIALS",
    sec_certs: "VERIFIED CERTIFICATIONS",
    sec_hobbies: "HOBBIES",
    sec_vibe: "CURRENT VIBE",
    fav_track: "FAVORITE TRACK",
    footer_text: "&copy; 2026 Indra Permana. Secured & Designed with Precision.",
    modal_tag: "// DETAIL_SERTIFIKASI",
    verify_btn: "Verifikasi Kredensial",
    restore_btn: "[ Pulihkan Sesi Terminal ]"
  },
  en: {
    collab: "Open for Tech Collaboration",
    sec_socials: "NETWORKS & SOCIALS",
    sec_certs: "VERIFIED CERTIFICATIONS",
    sec_hobbies: "HOBBIES",
    sec_vibe: "CURRENT VIBE",
    fav_track: "FAVORITE TRACK",
    footer_text: "&copy; 2026 Indra Permana. Secured & Designed with Precision.",
    modal_tag: "// CERTIFICATION_DETAILS",
    verify_btn: "Verify Credential",
    restore_btn: "[ Restore Terminal Session ]"
  },
  jw: {
    collab: "Buka Kolaborasi Teknologi",
    sec_socials: "JARINGAN & SOSMED",
    sec_certs: "SERTIFIKASI TERVERIFIKASI",
    sec_hobbies: "HOBI",
    sec_vibe: "VIBE SAIKI",
    fav_track: "LAGU FAVORIT",
    footer_text: "&copy; 2026 Indra Permana. Aman & Dirancang Presisi.",
    modal_tag: "// DETAIL_SERTIFIKAT",
    verify_btn: "Priksa Sertifikat",
    restore_btn: "[ Pulihaken Sesi Terminal ]"
  }
};

function changeLanguage(langCode) {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if(btn.getAttribute('data-lang') === langCode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const langData = translations[langCode];
  if (!langData) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.innerHTML = langData[key];
    }
  });
}

// Logika Modal Sertifikasi
function openCertModal(title, issuer, desc, link) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalIssuer').innerText = issuer;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalLink').href = link;
  document.getElementById('certModal').classList.add('active');
}

function closeCertModal(event) {
  if (event.target.id === 'certModal') {
    document.getElementById('certModal').classList.remove('active');
  }
}

function closeCertModalDirect() {
  document.getElementById('certModal').classList.remove('active');
}

// Logika Minimize Terminal Rahasia (??? dots)
function toggleSecretWindow() {
  const container = document.querySelector('.container');
  const secretBtn = document.getElementById('secret-restore-btn');
  
  container.classList.toggle('is-hidden');
  if (container.classList.contains('is-hidden')) {
    secretBtn.classList.add('reveal');
  } else {
    secretBtn.classList.remove('reveal');
  }
}
