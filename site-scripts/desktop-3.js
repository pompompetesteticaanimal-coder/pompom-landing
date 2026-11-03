document.addEventListener('click', function(e) {
    if (e.target.closest('#btn-direcoes')) {
      gtag('event', 'directions_click', { destination: 'google_maps' });
      return;
    }
    var link = e.target.closest('a[href*="wa.me"]');
    if (!link) return;
    var loc = 'outro';
    if (link.classList.contains('wa-float'))          loc = 'flutuante';
    else if (link.closest('#lojinha-modal'))           loc = 'lojinha';
    else if (link.closest('#navbar'))                  loc = 'navbar';
    else if (link.closest('#hero'))                    loc = 'hero';
    else if (link.closest('#contato'))                 loc = 'contato';
    else if (link.closest('footer'))                   loc = 'footer';
    gtag('event', 'whatsapp_click', { button_location: loc });
  });
