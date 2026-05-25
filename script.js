/* =============================================
   PARA MI LOQUITA LINDA ❤️ — script.js
============================================= */

/* ── TEXTO DE LA CARTA ── */
const TEXTO_CARTA = `Naye, amor mio

hoy, 27 de mayo, te queria dar las gracias por este
primer mes, y me encanto poder pasarlo todos 
los dias juntos, adoro el tiempo que paso a tu lado
y odio lo corto que se nos hace.

tambien quiero darte las gracias por siempre ser tu,
con esa personalidad que te hace unica, esa sonrisa 
que me encanta ver, esos chistes malos que nos hacen reir,
esa carita linda que veo todos los dias, esa ternura 
que transmites y tambien ese algo que me enamora mas cada dia.

espero que este mes no solo sea un mes mas si no que sea 
el inicio de esta historia linda que estamos escribiendo
te quiero de aqui al fondo del mar, a saltitos de medusa
mi niña hermosa.`;

/* ── FECHA DE INICIO ── */
const FECHA_INICIO = new Date("2026-04-27T00:00:00");

/* =============================================
   LOADER
============================================= */
window.addEventListener("load", () => {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("oculto");
    document.querySelectorAll(".hero .reveal-up").forEach(el => el.classList.add("visible"));
  }, 1200);
});

/* =============================================
   MODAL MENSAJE
============================================= */
function abrirMensaje() {
  document.getElementById("modalOverlay").classList.add("activo");
  lanzarCorazones(document.body, 12);
}

function cerrarMensaje(e) {
  if (!e || e.target === document.getElementById("modalOverlay") || e.type === "click") {
    document.getElementById("modalOverlay").classList.remove("activo");
  }
}

/* =============================================
   PARTÍCULAS / ESTRELLAS
============================================= */
(function initParticulas() {
  const canvas = document.getElementById("particulas");
  const ctx    = canvas.getContext("2d");
  let W, H, particulas;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function crearParticulas() {
    particulas = [];
    const total = Math.min(Math.floor((W * H) / 8000), 120);
    for (let i = 0; i < total; i++) {
      particulas.push({
        x:   Math.random() * W,
        y:   Math.random() * H,
        r:   Math.random() * 1.5 + 0.3,
        op:  Math.random() * 0.6 + 0.1,
        vel: Math.random() * 0.3 + 0.05,
        dx:  (Math.random() - 0.5) * 0.2,
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particulas) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,160,176,${p.op})`;
      ctx.fill();
      p.y -= p.vel;
      p.x += p.dx;
      p.op += (Math.random() - 0.5) * 0.01;
      p.op = Math.max(0.05, Math.min(0.7, p.op));
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
    }
    requestAnimationFrame(dibujar);
  }

  resize();
  crearParticulas();
  dibujar();
  window.addEventListener("resize", () => { resize(); crearParticulas(); });
})();

/* =============================================
   PARALLAX HERO
============================================= */
window.addEventListener("scroll", () => {
  const heroBg = document.getElementById("heroBg");
  if (!heroBg) return;
  heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.25}px)`;
});

/* =============================================
   SCROLL ANIMATIONS
============================================= */
const observerOpts = { threshold: 0.12 };

const observerGeneral = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observerGeneral.unobserve(e.target);
    }
  });
}, observerOpts);

document.querySelectorAll(".fade-section").forEach(el => observerGeneral.observe(el));

const observerFotos = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 80);
      observerFotos.unobserve(e.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll(".fade-photo").forEach(el => observerFotos.observe(el));

/* =============================================
   LIGHTBOX GALERÍA
============================================= */
document.querySelectorAll(".polaroid").forEach(wrap => {
  wrap.addEventListener("click", () => {
    const src = wrap.querySelector("img").src;
    document.getElementById("lightboxImg").src = src;
    document.getElementById("lightbox").classList.add("activo");
  });
});

function cerrarLightbox() {
  document.getElementById("lightbox").classList.remove("activo");
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") cerrarLightbox();
});

/* =============================================
   PLAYER PELÍCULA
============================================= */
(function initPelicula() {
  const video   = document.getElementById("videoPelicula");
  const overlay = document.getElementById("peliculaOverlay");
  const playBtn = document.getElementById("peliculaPlayBtn");
  if (!video || !overlay) return;

  function reproducirVideo() {
    video.play().catch(() => {});
    overlay.classList.add("oculto");
  }

  overlay.addEventListener("click", reproducirVideo);
  if (playBtn) playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    reproducirVideo();
  });

  video.addEventListener("pause", () => {
    if (!video.ended) overlay.classList.remove("oculto");
  });

  video.addEventListener("ended", () => {
    overlay.classList.remove("oculto");
    const t = overlay.querySelector(".play-texto");
    if (t) t.textContent = "Volver a ver ❤";
  });
})();

/* =============================================
   CONTADOR EN TIEMPO REAL
============================================= */
function padDos(n) { return String(n).padStart(2, "0"); }

function actualizarContador() {
  const diff = new Date() - FECHA_INICIO;
  if (diff < 0) return;
  const s = Math.floor(diff / 1000);
  animarNumero("cDias",     padDos(Math.floor(s / 86400)));
  animarNumero("cHoras",    padDos(Math.floor((s % 86400) / 3600)));
  animarNumero("cMinutos",  padDos(Math.floor((s % 3600) / 60)));
  animarNumero("cSegundos", padDos(s % 60));
}

function animarNumero(id, v) {
  const el = document.getElementById(id);
  if (!el || el.textContent === v) return;
  el.style.transform = "translateY(-4px)";
  el.style.opacity   = "0.6";
  setTimeout(() => {
    el.textContent     = v;
    el.style.transform = "translateY(0)";
    el.style.opacity   = "1";
  }, 150);
}

actualizarContador();
setInterval(actualizarContador, 1000);

/* =============================================
   CARTA — EFECTO MÁQUINA DE ESCRIBIR
============================================= */
let cartaIniciada = false;

const observerCarta = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !cartaIniciada) {
      cartaIniciada = true;
      iniciarTypewriter();
      observerCarta.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

const cartaSection = document.getElementById("carta");
if (cartaSection) observerCarta.observe(cartaSection);

function iniciarTypewriter() {
  const el     = document.getElementById("cartaTexto");
  const cursor = document.getElementById("cartaCursor");
  if (!el) return;
  let i = 0;
  el.textContent = "";
  function escribir() {
    if (i < TEXTO_CARTA.length) {
      el.textContent += TEXTO_CARTA.charAt(i++);
      setTimeout(escribir, 28);
    } else {
      setTimeout(() => { if (cursor) cursor.style.display = "none"; }, 2000);
    }
  }
  escribir();
}

/* =============================================
   CORAZONES ANIMADOS
============================================= */
function lanzarCorazones(contenedor, cantidad) {
  for (let i = 0; i < cantidad; i++) {
    setTimeout(() => {
      const c = document.createElement("span");
      c.textContent = "❤";
      c.style.cssText = `
        position:fixed;
        font-size:${Math.random()*1.5+0.8}rem;
        left:${Math.random()*100}vw;
        bottom:${Math.random()*20+5}vh;
        color:rgba(232,160,176,${Math.random()*0.5+0.5});
        pointer-events:none;
        z-index:9999;
        animation:subirCorazon ${Math.random()*1.5+1.5}s ease-out forwards;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3000);
    }, i * 120);
  }
}

const observerFinal = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      lanzarCorazones(e.target, 15);
      observerFinal.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });

const finalSection = document.getElementById("final");
if (finalSection) observerFinal.observe(finalSection);
