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

