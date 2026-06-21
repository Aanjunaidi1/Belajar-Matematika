(function () {
     'use strict';

     const container = document.getElementById('page-container');
     const menuToggle = document.getElementById('menuToggle');
     const navLinksContainer = document.getElementById('navLinks');

     // Mapping halaman: header di root, aside di folder aside/
     const pageMap = {
          home: 'home.html',
          about: 'about.html',
          contact: 'contact.html',
          profile: 'profile.html',
          x: 'aside/x.html',
          xi: 'aside/xi.html',
          xii: 'aside/xii.html',
          tka: 'aside/tka.html',
          utbk: 'aside/utbk.html',
          osn: 'aside/osn.html',
     };

     function loadPage(pageId) {
          const url = pageMap[pageId];
          if (!url) {
               console.error('Halaman tidak ditemukan:', pageId);
               return;
          }

          container.classList.add('fade-out');
          container.classList.remove('fade-in');

          setTimeout(() => {
               fetch(url)
                    .then((response) => {
                         if (!response.ok)
                              throw new Error('Gagal mengambil konten');
                         return response.text();
                    })
                    .then((html) => {
                         container.innerHTML = html;
                         container.classList.remove('fade-out');
                         container.classList.add('fade-in');
                    })
                    .catch((error) => {
                         container.innerHTML = `
                        <h2><i class="fas fa-exclamation-triangle" style="color:#e74c3c;"></i> Error</h2>
                        <p>Maaf, konten tidak dapat dimuat. Silakan coba lagi.</p>
                        <p style="color:#e74c3c;font-size:0.9rem;">${error.message}</p>
                    `;
                         container.classList.remove('fade-out');
                         container.classList.add('fade-in');
                    });
          }, 300);
     }

     function setActiveLink(pageId) {
          document
               .querySelectorAll('.nav-links a, .aside ul li a')
               .forEach((el) => {
                    el.classList.remove('active');
               });
          document
               .querySelectorAll(
                    `.nav-links a[data-page="${pageId}"], .aside ul li a[data-page="${pageId}"]`
               )
               .forEach((el) => {
                    el.classList.add('active');
               });
     }

     function handleNavigation(e) {
          e.preventDefault();
          const page = this.dataset.page;
          if (page) {
               loadPage(page);
               setActiveLink(page);
               if (navLinksContainer.classList.contains('open')) {
                    navLinksContainer.classList.remove('open');
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
               }
          }
     }

     document
          .querySelectorAll(
               '.nav-links a[data-page], .aside ul li a[data-page]'
          )
          .forEach((link) => {
               link.addEventListener('click', handleNavigation);
          });

     if (menuToggle) {
          menuToggle.addEventListener('click', function () {
               navLinksContainer.classList.toggle('open');
               const icon = this.querySelector('i');
               if (navLinksContainer.classList.contains('open')) {
                    icon.className = 'fas fa-times';
               } else {
                    icon.className = 'fas fa-bars';
               }
          });
     }

     document.addEventListener('click', function (event) {
          const isClickInside =
               menuToggle?.contains(event.target) ||
               navLinksContainer?.contains(event.target);
          if (!isClickInside && navLinksContainer?.classList.contains('open')) {
               navLinksContainer.classList.remove('open');
               const icon = menuToggle?.querySelector('i');
               if (icon) icon.className = 'fas fa-bars';
          }
     });

     // Muat halaman default (Beranda)
     loadPage('home');
     setActiveLink('home');

     console.log('✅ Portal Matematika Aanjunaidi siap!');
})();
