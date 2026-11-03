// Detecção apenas para preview local (em produção o nginx faz isso server-side)
    (function(){
      var m = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      window.location.replace((m ? 'mobile.html' : 'desktop.html') + window.location.search + window.location.hash);
    })();
