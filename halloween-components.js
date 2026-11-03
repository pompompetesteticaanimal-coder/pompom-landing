/* Shared approved sections. No simulated ratings or Google API credentials. */
(() => {
  'use strict';
  const section = document.querySelector('.approved-reviews');
  if (section) {
    const cards = [...section.querySelectorAll('.review-card')];
    let index = 0;
    const show = offset => {
      index = (index + offset + cards.length) % cards.length;
      cards.forEach((card, i) => { card.hidden = i !== index; });
      section.querySelector('[data-review-status]').textContent = (index + 1) + ' de ' + cards.length;
    };
    section.querySelector('[data-review-prev]').addEventListener('click', () => show(-1));
    section.querySelector('[data-review-next]').addEventListener('click', () => show(1));
    section.querySelector('.reviews-nav').addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      show(event.key === 'ArrowLeft' ? -1 : 1);
    });
  }
  const modal = document.getElementById('lojinha-sheet') || document.getElementById('lojinha-modal');
  if (!modal || typeof window.abrirLojinha !== 'function') return;
  const safe = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const productBase = 'https://storage.googleapis.com/pompom-produtos/';
  window.PomPomCatalogo = {
    card(file) {
      const reference = file.replace(/\.[^.]+$/, '');
      return '<button type="button" class="catalog-product" data-product-file="' + encodeURIComponent(file) + '" aria-haspopup="dialog" aria-controls="product-detail" aria-label="Ampliar produto ' + safe(reference) + '"><img src="' + productBase + encodeURIComponent(file) + '" alt="" width="300" height="300" loading="lazy" decoding="async"><strong>Ref. ' + safe(reference) + '</strong><small>Ver detalhes ↗</small></button>';
    }
  };
  const detail = document.createElement('dialog');
  detail.id = 'product-detail';
  detail.className = 'product-detail';
  detail.setAttribute('aria-labelledby', 'product-detail-title');
  detail.setAttribute('aria-describedby', 'product-detail-note');
  detail.innerHTML = '<div class="product-detail-bar"><strong id="product-detail-title">Produto</strong><button type="button" class="product-detail-close" aria-label="Fechar foto ampliada">×</button></div><div class="product-image-area"><img class="product-detail-image" alt=""></div><div class="product-detail-tools"><div class="product-zoom"><label for="product-zoom-range">Zoom</label><input id="product-zoom-range" type="range" min="1" max="3" step=".25" value="1"><output for="product-zoom-range">100%</output></div><p id="product-detail-note">Fotos do catálogo atual. Consulte cores, tamanhos e disponibilidade com a equipe.</p><a class="product-whatsapp" target="_blank" rel="noopener noreferrer">Consultar este produto no WhatsApp ↗</a></div>';
  document.body.append(detail);
  let productOpener = null;
  const image = detail.querySelector('img'), zoom = detail.querySelector('input'), area = detail.querySelector('.product-image-area');
  const zoomOutput = detail.querySelector('output');
  zoom.addEventListener('input', () => {
    image.style.width = Number(zoom.value) * 100 + '%';
    image.style.height = Number(zoom.value) * 100 + '%';
    zoomOutput.textContent = Math.round(Number(zoom.value) * 100) + '%';
  });
  detail.querySelector('button').addEventListener('click', () => detail.close());
  detail.addEventListener('close', () => {
    document.body.style.overflow = modal.getClientRects().length ? 'hidden' : '';
    if (productOpener?.isConnected) productOpener.focus({preventScroll: true});
  });
  detail.addEventListener('cancel', event => { event.preventDefault(); detail.close(); });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-product-file]');
    if (!button || !modal.contains(button)) return;
    productOpener = button;
    const file = decodeURIComponent(button.dataset.productFile);
    const reference = file.replace(/\.[^.]+$/, '');
    detail.querySelector('#product-detail-title').textContent = 'Referência ' + reference;
    image.src = productBase + encodeURIComponent(file);
    image.alt = 'Produto do catálogo PomPom — referência ' + reference;
    image.style.width = '100%';
    image.style.height = '100%';
    zoom.value = '1';
    zoomOutput.textContent = '100%';
    area.scrollTo(0, 0);
    detail.querySelector('a').href = 'https://wa.me/5511947266216?text=' + encodeURIComponent('Olá! Quero saber mais sobre o produto ' + reference + ' da Lojinha PomPom Pet.');
    detail.showModal();
    document.body.style.overflow = 'hidden';
    detail.querySelector('button').focus();
  });
  // A photo is a separate modal: Escape must not also close the shop below.
  document.addEventListener('keydown', event => {
    if (!detail.open || event.key !== 'Escape') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    detail.close();
  }, true);
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Lojinha PomPom');
  let opener = null;
  let closing = false;
  const originalOpen = window.abrirLojinha;
  const originalClose = window.fecharLojinha;
  const focusables = () => [...modal.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => el.getClientRects().length);
  window.abrirLojinha = function () {
    opener = document.activeElement;
    closing = false;
    originalOpen();
    requestAnimationFrame(() => focusables()[0]?.focus({preventScroll: true}));
  };
  window.fecharLojinha = function () {
    if (closing || !modal.getClientRects().length) return;
    closing = true;
    originalClose();
    setTimeout(() => {
      closing = false;
      if (opener?.isConnected) opener.focus({preventScroll: true});
    }, 360);
  };
  document.querySelectorAll('[data-open-store]').forEach(button => {
    button.addEventListener('click', () => window.abrirLojinha());
  });
  document.addEventListener('keydown', event => {
    if (detail.open) return;
    if (!modal.getClientRects().length || closing) return;
    if (event.key === 'Escape') { event.preventDefault(); window.fecharLojinha(); }
    if (event.key !== 'Tab') return;
    const list = focusables();
    const first = list[0], last = list[list.length - 1];
    if (!first) return;
    if (event.shiftKey && (document.activeElement === first || !modal.contains(document.activeElement))) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !modal.contains(document.activeElement))) {
      event.preventDefault(); first.focus();
    }
  });
})();
