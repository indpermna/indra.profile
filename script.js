document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Ikon Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Logika Toggle Tema (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Cek preferensi tema yang tersimpan di localStorage sebelumnya
  const savedTheme = localStorage.getItem('user_theme');
  if (savedTheme) {
    bodyElement.className = savedTheme;
  } else {
    // Default ke dark-theme jika belum ada
    bodyElement.className = 'dark-theme';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (bodyElement.classList.contains('dark-theme')) {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
        localStorage.setItem('user_theme', 'light-theme');
      } else {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
        localStorage.setItem('user_theme', 'dark-theme');
      }
      
      // Refresh ikon Lucide setelah pergantian tema jika diperlukan
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  // 3. Efek Interaktif Tambahan (Opsional)
  // Mencegah klik kanan pada kartu musik/profil jika ingin menjaga privasi aset, 
  // atau membiarkannya standar. (Opsional, saat ini diatur via CSS user-select)
});
