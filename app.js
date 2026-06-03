/**
 * CEREBRO DE LA APLICACIÓN - 38° ANIVERSARIO SANTA DOROTEA
 * Lógica de navegación, modo kiosco, lightbox y música generativa (100% Offline)
 */

document.addEventListener("DOMContentLoaded", () => {
  // ================= ESTADO DE LA APLICACIÓN =================
  let currentCategory = "inicios";
  let currentSubcategory = "cee-escuela-vieja";
  let activeGridItems = [];
  let currentLightboxIndex = 0;
  
  // Temporizadores
  let kioskInterval = null;
  let lightboxSlideshowInterval = null;
  let inactivityTimeout = null;
  
  // Música de Fondo (Web Audio API Synth & MP3)
  let audioContext = null;
  let isPlayingMusic = false;
  let ambientSynthTimer = null;
  const audioEl = document.getElementById("audio-bg-music");

  // Elementos del DOM
  const kioskScreen = document.getElementById("kiosk-screen");
  const btnStartExploration = document.getElementById("btn-start-exploration");
  const categoryListContainer = document.getElementById("category-list");
  const categoryBadge = document.getElementById("category-badge");
  const categoryTitle = document.getElementById("category-title");
  const categoryDescription = document.getElementById("category-description");
  const subcategoryTitle = document.getElementById("subcategory-title");
  const subcategoryNav = document.getElementById("subcategory-nav");
  const mediaGrid = document.getElementById("media-grid");
  const btnKioskReturn = document.getElementById("btn-kiosk-return");
  const sidebarLogoTrigger = document.getElementById("sidebar-logo-trigger");

  // Elementos del Lightbox
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideoContainer = document.getElementById("lightbox-video-container");
  const lightboxVideo = document.getElementById("lightbox-video");
  const youtubeFallbackContainer = document.getElementById("youtube-fallback-container");
  const btnOpenYoutubeExternal = document.getElementById("btn-open-youtube-external");
  const videoSimulator = document.getElementById("video-simulator");
  const btnSimulatorPlay = document.getElementById("btn-simulator-play");
  const cinemaCanvas = document.getElementById("cinema-reel-canvas");
  const btnCloseLightbox = document.getElementById("btn-close-lightbox");
  const btnPrevLightbox = document.getElementById("btn-prev-lightbox");
  const btnNextLightbox = document.getElementById("btn-next-lightbox");
  const btnLightboxPlay = document.getElementById("btn-lightbox-play");
  const slideshowIcon = document.getElementById("slideshow-icon");
  const slideshowStatus = document.getElementById("slideshow-status");
  const lightboxYear = document.getElementById("lightbox-year");
  const lightboxCategoryName = document.getElementById("lightbox-category");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxDescription = document.getElementById("lightbox-description");

  // Controles de Música y Presentación
  const btnPlayMusic = document.getElementById("btn-play-music");
  const musicIcon = document.getElementById("music-icon");
  const musicText = document.getElementById("music-text");
  const btnSlideshowStart = document.getElementById("btn-slideshow-start");

  // ================= CREADOR DE ICONOS SVG DINÁMICOS =================
  const getIconSVG = (iconName) => {
    const icons = {
      home: '<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
      theater: '<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5zm3-6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>',
      school: '<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91v6.27h2V9L12 3z"/></svg>',
      heart: '<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
      tools: '<svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.3C.5 6.7.9 9.8 2.9 11.8c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.4-2.4c.4-.4.4-1.1 0-1.4z"/></svg>'
    };
    return icons[iconName] || icons.home;
  };

  // ================= 1. INICIALIZACIÓN DE LA INTERFAZ =================
  const initApp = () => {
    // Generar menú lateral de categorías
    categoryListContainer.innerHTML = "";
    GALLERY_DATA.categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = `btn-category ${cat.isSpecial ? 'special-nav' : ''}`;
      btn.id = `btn-cat-${cat.id}`;
      btn.innerHTML = `
        ${getIconSVG(cat.icon)}
        <div class="cat-texts">
          <span class="cat-name">${cat.title}</span>
          <span class="cat-sub">${cat.subtitle}</span>
        </div>
        ${cat.isSpecial ? '<span class="special-nav-badge">50 AÑOS</span>' : ''}
      `;
      btn.addEventListener("click", () => switchCategory(cat.id));
      categoryListContainer.appendChild(btn);
    });

    // Activar primera categoría en el menú
    switchCategory("inicios");
    
    // Iniciar diapositivas del Protector de Pantalla (Bienvenida)
    startKioskSlideshow();
    
    // Activar monitor de inactividad
    resetInactivityTimer();
  };

  // ================= 2. CONTROL DE CATEGORÍAS Y FILTROS =================
  const switchCategory = (categoryId) => {
    // Si se hace clic en CEE y ya está activo, alternamos colapsar/expandir el submenú
    if (categoryId === currentCategory && categoryId === "cee") {
      subcategoryNav.classList.toggle("hide");
      return;
    }

    currentCategory = categoryId;
    currentSubcategory = "cee-escuela-vieja"; // resetear filtros especiales al primero por defecto
    
    // Actualizar estados visuales del menú lateral
    document.querySelectorAll(".btn-category").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`btn-cat-${categoryId}`);
    if (activeBtn) activeBtn.classList.add("active");

    // Obtener datos de la categoría actual
    const catData = GALLERY_DATA.categories.find(c => c.id === categoryId);
    
    // Modificar cabecera
    categoryBadge.innerText = catData.isSpecial ? "Bodas de Oro (50 Años)" : "Álbum del Recuerdo";
    categoryBadge.style.color = catData.isSpecial ? "var(--color-red)" : "var(--color-gold)";
    categoryTitle.innerText = catData.title;
    categoryDescription.innerText = catData.description;

    // Renderizar subcategorías (solo para Centro de Educación Especial)
    if (catData.isSpecial && catData.subcategories) {
      subcategoryNav.classList.remove("hide");
      subcategoryNav.innerHTML = "";
      
      catData.subcategories.forEach(sub => {
        const btnTab = document.createElement("button");
        btnTab.className = `tab-btn ${sub.id === currentSubcategory ? 'active' : ''}`;
        btnTab.innerText = sub.title;
        btnTab.addEventListener("click", () => switchSubcategory(sub.id));
        subcategoryNav.appendChild(btnTab);
      });

      // Mover el contenedor de subcategorías al menú lateral debajo del botón activo
      if (activeBtn) {
        activeBtn.parentNode.insertBefore(subcategoryNav, activeBtn.nextSibling);
      }

      // Mostrar el subtítulo en el encabezado del contenido central
      if (subcategoryTitle) {
        const defaultSub = catData.subcategories.find(s => s.id === currentSubcategory);
        subcategoryTitle.innerText = defaultSub ? defaultSub.title : "";
        subcategoryTitle.classList.remove("hide");
      }
    } else {
      subcategoryNav.classList.add("hide");
      if (subcategoryTitle) {
        subcategoryTitle.classList.add("hide");
      }
    }

    // Filtrar y renderizar elementos en la rejilla
    renderGrid();
  };

  const switchSubcategory = (subcategoryId) => {
    currentSubcategory = subcategoryId;
    
    // Actualizar tabs activas
    document.querySelectorAll(".tab-btn").forEach(tab => {
      tab.classList.remove("active");
      if (tab.innerText === GALLERY_DATA.categories.find(c => c.id === "cee").subcategories.find(s => s.id === subcategoryId).title) {
        tab.classList.add("active");
      }
    });

    // Actualizar el subtítulo en la cabecera
    const activeSub = GALLERY_DATA.categories.find(c => c.id === "cee").subcategories.find(s => s.id === subcategoryId);
    if (activeSub && subcategoryTitle) {
      subcategoryTitle.innerText = activeSub.title;
      subcategoryTitle.classList.remove("hide");
    }

    renderGrid();
  };

  // ================= 3. RENDERIZACIÓN DE LA REJILLA (FOTOS Y VIDEOS) =================
  const renderGrid = () => {
    mediaGrid.innerHTML = "";
    
    // Filtrar elementos según categoría principal y subcategoría
    activeGridItems = GALLERY_DATA.items.filter(item => {
      if (item.categoryId !== currentCategory) return false;
      if (currentCategory === "cee") {
        return item.subcategoryId === currentSubcategory;
      }
      return true;
    });

    if (activeGridItems.length === 0) {
      mediaGrid.innerHTML = `<div class="empty-message">No hay recuerdos cargados en esta sección todavía.</div>`;
      return;
    }

    // Renderizar tarjetas
    activeGridItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "memory-card";
      
      // Icono o miniatura de video
      const isVideo = item.type === "video";
      const thumbUrl = isVideo ? (item.thumbnailUrl || item.url) : item.url;
      
      card.innerHTML = `
        <div class="card-media-wrapper">
          <img src="${thumbUrl}" alt="${item.title}" loading="lazy">
          <span class="card-year">${item.year}</span>
          ${isVideo ? `
            <div class="video-overlay-badge">
              <svg viewBox="0 0 24 24" width="30" height="30">
                <path fill="currentColor" d="M8 5v14l11-7z"/>
              </svg>
            </div>
          ` : ""}
        </div>
        <div class="card-details">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;
      
      card.addEventListener("click", () => openLightbox(index));
      mediaGrid.appendChild(card);
    });
  };

  // ================= 4. VISOR FULLSCREEN (LIGHTBOX) =================
  const openLightbox = (index) => {
    currentLightboxIndex = index;
    const item = activeGridItems[index];
    
    // Detener presentación si está activa
    stopLightboxSlideshow();
    
    lightbox.classList.add("active");
    
    // Cargar contenido
    renderLightboxItem(item);
  };

  const renderLightboxItem = (item) => {
    // Rellenar metadatos
    lightboxYear.innerText = item.year;
    lightboxCategoryName.innerText = GALLERY_DATA.categories.find(c => c.id === item.categoryId).title;
    lightboxTitle.innerText = item.title;
    lightboxDescription.innerText = item.description;

    // Resetear visibilidades de media
    lightboxImg.classList.add("active");
    lightboxImg.style.display = "block";
    lightboxVideoContainer.classList.add("hide");
    
    // Detener videos previos
    lightboxVideo.pause();
    lightboxVideo.src = "";
    if (youtubeFallbackContainer) youtubeFallbackContainer.classList.add("hide");
    lightboxVideo.classList.add("hide");
    stopRetroSimulator();

    if (item.type === "image") {
      lightboxImg.src = item.url;
      lightboxImg.alt = item.title;
    } 
    else if (item.type === "video") {
      lightboxImg.style.display = "none";
      lightboxVideoContainer.classList.remove("hide");
      
      const isYoutube = item.url.includes("youtube.com") || item.url.includes("youtu.be");
      
      if (isYoutube) {
        if (youtubeFallbackContainer) youtubeFallbackContainer.classList.remove("hide");
        if (btnOpenYoutubeExternal) {
          btnOpenYoutubeExternal.onclick = (e) => {
            e.preventDefault();
            // Convertir URL de embed a URL estándar de YouTube para verlo en web/app
            const watchUrl = item.url.replace("embed/", "watch?v=");
            window.open(watchUrl, "_blank");
          };
        }
      } else {
        lightboxVideo.classList.remove("hide");
        // Asignar video real
        lightboxVideo.src = item.url;
        lightboxVideo.poster = item.thumbnailUrl || "";
        
        // Manejar error de carga (si el MP4 offline del usuario no se ha colocado aún)
        lightboxVideo.onerror = () => {
          // El video MP4 falló al cargar, activamos el espectacular simulador retro de cine antiguo
          lightboxVideo.classList.add("hide");
          videoSimulator.classList.remove("hide");
          startRetroSimulator(item.title);
        };

        lightboxVideo.oncanplay = () => {
          // El video real cargó con éxito, ocultar simulador y mostrar video HTML5
          lightboxVideo.classList.remove("hide");
          videoSimulator.classList.add("hide");
          stopRetroSimulator();
          lightboxVideo.play().catch(e => console.log("Auto-play de video bloqueado: ", e));
        };
      }
    }
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightboxVideo.pause();
    lightboxVideo.src = "";
    if (youtubeFallbackContainer) youtubeFallbackContainer.classList.add("hide");
    stopRetroSimulator();
    stopLightboxSlideshow();
  };

  const navigateLightbox = (direction) => {
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex >= activeGridItems.length) {
      currentLightboxIndex = 0; // bucle
    } else if (currentLightboxIndex < 0) {
      currentLightboxIndex = activeGridItems.length - 1;
    }

    renderLightboxItem(activeGridItems[currentLightboxIndex]);
  };

  // Carrusel / Presentación automática dentro del Lightbox
  const startLightboxSlideshow = () => {
    btnLightboxPlay.classList.add("playing");
    slideshowStatus.innerText = "Pausar";
    slideshowIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    
    lightboxSlideshowInterval = setInterval(() => {
      // Si hay un video reproduciéndose, esperamos a que termine
      if (activeGridItems[currentLightboxIndex].type === "video" && !lightboxVideo.paused) {
        return;
      }
      navigateLightbox(1);
    }, 5000); // 5 segundos por diapositiva
  };

  const stopLightboxSlideshow = () => {
    if (lightboxSlideshowInterval) {
      clearInterval(lightboxSlideshowInterval);
      lightboxSlideshowInterval = null;
    }
    btnLightboxPlay.classList.remove("playing");
    slideshowStatus.innerText = "Reproducir";
    slideshowIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
  };

  const toggleLightboxSlideshow = () => {
    if (lightboxSlideshowInterval) {
      stopLightboxSlideshow();
    } else {
      startLightboxSlideshow();
    }
  };

  // ================= 5. SIMULADOR DE CINE ANTIGUO EN CANVAS =================
  let simulatorAnimationId = null;
  let simulatorAudioContext = null;
  let projectorNoiseNode = null;

  const startRetroSimulator = (titleText) => {
    videoSimulator.classList.remove("hide");
    cinemaCanvas.width = cinemaCanvas.offsetWidth || 800;
    cinemaCanvas.height = cinemaCanvas.offsetHeight || 600;
    const ctx = cinemaCanvas.getContext("2d");
    
    let frameCount = 0;
    let projectorAngle = 0;

    // Generar efectos retro en Canvas
    const drawFrame = () => {
      frameCount++;
      ctx.fillStyle = "#0c0a09"; // Fondo marrón sepia oscuro
      ctx.fillRect(0, 0, cinemaCanvas.width, cinemaCanvas.height);

      // Dibujar marco cinematográfico
      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.lineWidth = 15;
      ctx.strokeRect(0, 0, cinemaCanvas.width, cinemaCanvas.height);
      
      // Dibujar carretes de proyector animados
      ctx.save();
      ctx.translate(cinemaCanvas.width / 2, cinemaCanvas.height / 2 - 40);
      projectorAngle += 0.05;
      ctx.rotate(projectorAngle);
      
      // Dibujar carrete 1
      ctx.strokeStyle = "rgba(212, 175, 55, 0.15)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();
      // Rayos del carrete
      for (let i = 0; i < 5; i++) {
        ctx.rotate((Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(70, 0);
        ctx.stroke();
      }
      ctx.restore();

      // Texto de "Cargando Película Antigua..."
      ctx.font = 'italic 16px "Georgia", serif';
      ctx.fillStyle = "#a69e94";
      ctx.textAlign = "center";
      ctx.fillText("PROYECTANDO ARCHIVO DEL RECUERDO...", cinemaCanvas.width / 2, cinemaCanvas.height / 2 + 100);

      // Efectos de película antigua (rasguños, motas de polvo, parpadeo)
      
      // 1. Parpadeo de luz
      ctx.fillStyle = `rgba(212, 175, 55, ${Math.random() * 0.05})`;
      ctx.fillRect(0, 0, cinemaCanvas.width, cinemaCanvas.height);

      // 2. Líneas verticales aleatorias (rasguños)
      if (Math.random() < 0.3) {
        ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
        ctx.lineWidth = Math.random() * 1.5;
        const lineX = Math.random() * cinemaCanvas.width;
        ctx.beginPath();
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, cinemaCanvas.height);
        ctx.stroke();
      }

      // 3. Puntos de polvo
      const numDust = Math.floor(Math.random() * 6);
      ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
      for (let i = 0; i < numDust; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * cinemaCanvas.width, Math.random() * cinemaCanvas.height, Math.random() * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Viñeta oscura
      const gradient = ctx.createRadialGradient(
        cinemaCanvas.width / 2, cinemaCanvas.height / 2, cinemaCanvas.width / 4,
        cinemaCanvas.width / 2, cinemaCanvas.height / 2, cinemaCanvas.width * 0.7
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.75)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cinemaCanvas.width, cinemaCanvas.height);

      simulatorAnimationId = requestAnimationFrame(drawFrame);
    };

    drawFrame();
    
    // Programar audio de proyector retro simulado
    btnSimulatorPlay.onclick = () => {
      startProjectorSynth();
      btnSimulatorPlay.innerHTML = `<span>PROYECTOR ENCENDIDO 🎞️</span>`;
      btnSimulatorPlay.disabled = true;
    };
  };

  const stopRetroSimulator = () => {
    if (simulatorAnimationId) {
      cancelAnimationFrame(simulatorAnimationId);
      simulatorAnimationId = null;
    }
    stopProjectorSynth();
    btnSimulatorPlay.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg><span>ENCENDER PROYECTOR</span>`;
    btnSimulatorPlay.disabled = false;
    videoSimulator.classList.add("hide");
  };

  // Sonido sintético de proyector de cine antiguo (Web Audio API)
  const startProjectorSynth = () => {
    try {
      if (!simulatorAudioContext) {
        simulatorAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (simulatorAudioContext.state === "suspended") {
        simulatorAudioContext.resume();
      }

      // Crear un generador de ruido blanco para el siseo y los clics de cinta
      const bufferSize = 2 * simulatorAudioContext.sampleRate;
      const noiseBuffer = simulatorAudioContext.createBuffer(1, bufferSize, simulatorAudioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = simulatorAudioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filtro pasa banda para darle tono de megáfono/radio antigua
      const filter = simulatorAudioContext.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 600;
      filter.Q.value = 1.0;

      // Modulación para simular el ritmo del motor del proyector (clic clic clic)
      const gainNode = simulatorAudioContext.createGain();
      gainNode.gain.value = 0.02; // volumen bajo

      // Conectar nodos
      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(simulatorAudioContext.destination);

      whiteNoise.start();
      projectorNoiseNode = whiteNoise;

      // Crear zumbido de fondo (hum de corriente)
      const humOsc = simulatorAudioContext.createOscillator();
      const humGain = simulatorAudioContext.createGain();
      humOsc.type = "sine";
      humOsc.frequency.value = 60; // 60Hz hum
      humGain.gain.value = 0.005;
      humOsc.connect(humGain);
      humGain.connect(simulatorAudioContext.destination);
      humOsc.start();
      
      // Guardar referencias para apagarlos
      projectorNoiseNode.humOsc = humOsc;
    } catch (e) {
      console.log("No se pudo iniciar el sintetizador de proyector: ", e);
    }
  };

  const stopProjectorSynth = () => {
    if (projectorNoiseNode) {
      try {
        projectorNoiseNode.stop();
        if (projectorNoiseNode.humOsc) {
          projectorNoiseNode.humOsc.stop();
        }
      } catch(e) {}
      projectorNoiseNode = null;
    }
  };


  // ================= 6. SINTETIZADOR DE MÚSICA AMBIENTAL (WEB AUDIO API) =================
  // Genera hermosos y suaves acordes pentatónicos de fondo offline
  const startAmbientSynth = () => {
    if (ambientSynthTimer) return; // ya encendido
    
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // Escala pentatónica de Sol mayor (cálida, emotiva y armoniosa)
      const scale = [196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25]; // G3, A3, B3, D4, E4, G4, A4, B4, D5, E5

      const playGentleNote = () => {
        if (!isPlayingMusic) return;

        // Escoger nota al azar
        const freq = scale[Math.floor(Math.random() * scale.length)];
        
        // Crear oscilador de onda triangular (suave, similar a flauta/piano apagado)
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, audioContext.currentTime);

        // Diseñar envolvente de volumen (ataque lento de 2s, caída lenta de 4s)
        oscGain.gain.setValueAtTime(0, audioContext.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + 2.0); // ataque suave
        oscGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 6.0); // desvanecimiento natural

        // Filtro pasa bajas para suavizar aún más los agudos
        const filter = audioContext.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, audioContext.currentTime);

        // Conectar
        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(audioContext.destination);

        osc.start();
        osc.stop(audioContext.currentTime + 6.1);

        // Programar siguiente nota (tiempo aleatorio entre 3 y 5 segundos)
        const nextTime = 3000 + Math.random() * 2000;
        ambientSynthTimer = setTimeout(playGentleNote, nextTime);
      };

      playGentleNote();
    } catch (e) {
      console.log("No se pudo iniciar el sintetizador ambiental: ", e);
    }
  };

  const stopAmbientSynth = () => {
    if (ambientSynthTimer) {
      clearTimeout(ambientSynthTimer);
      ambientSynthTimer = null;
    }
  };

  const toggleMusic = () => {
    isPlayingMusic = !isPlayingMusic;
    
    if (isPlayingMusic) {
      // 1. Intentar reproducir MP3 local
      audioEl.play()
        .then(() => {
          // El MP3 local funciona con éxito
          musicText.innerText = "Música: Encendida";
          btnPlayMusic.classList.add("active");
          musicIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
        })
        .catch(err => {
          // Si el MP3 falla o no existe, usamos el sintetizador procedural Web Audio de inmediato
          console.log("MP3 local no detectado o bloqueado. Iniciando Sintetizador de Fondo...");
          startAmbientSynth();
          musicText.innerText = "Música: Sintetizada";
          btnPlayMusic.classList.add("active");
          musicIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
        });
    } else {
      // Apagar ambos
      audioEl.pause();
      stopAmbientSynth();
      musicText.innerText = "Música Apagada";
      btnPlayMusic.classList.remove("active");
      musicIcon.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M4.27 3L3 4.27l9 9v.28c-.53-.21-1.12-.3-1.75-.25-1.78.13-3.1 1.67-2.95 3.44.14 1.76 1.7 3.07 3.48 2.94 1.54-.12 2.74-1.28 2.92-2.73l.03-.95 6 6L21 21.73 4.27 3zM21 3h-7v4.9l2 2V5h3v3h-3v1.88l2 2V3z"/></svg>';
    }
  };


  // ================= 7. PANTALLA DE ESPERA / MODO KIOSCO AUTOMÁTICO =================
  const startKioskSlideshow = () => {
    const slides = document.querySelectorAll(".kiosk-slide");
    let currentSlide = 0;

    if (kioskInterval) clearInterval(kioskInterval);
    
    kioskInterval = setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 8000); // 8 segundos por foto en protector de pantalla
  };

  const showKioskScreen = () => {
    kioskScreen.classList.add("active");
    stopLightboxSlideshow();
    closeLightbox();
  };

  const hideKioskScreen = () => {
    kioskScreen.classList.remove("active");
    resetInactivityTimer();
    
    // Encender música automáticamente al entrar para amenizar
    if (!isPlayingMusic) {
      toggleMusic();
    }
  };

  // Temporizador de Inactividad (60 Segundos)
  const resetInactivityTimer = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    
    // Si estamos en el protector de pantalla, no necesitamos temporizador
    if (kioskScreen.classList.contains("active")) return;

    inactivityTimeout = setTimeout(() => {
      showKioskScreen();
    }, 60000); // 60 segundos
  };

  // ================= 8. MANEJADORES DE EVENTOS (LISTENERS) =================
  
  // Entrar desde bienvenida
  btnStartExploration.addEventListener("click", hideKioskScreen);
  
  // Volver a bienvenida manualmente
  btnKioskReturn.addEventListener("click", showKioskScreen);
  sidebarLogoTrigger.addEventListener("click", showKioskScreen);

  // Controles de Música y Presentación General
  btnPlayMusic.addEventListener("click", toggleMusic);
  
  btnSlideshowStart.addEventListener("click", () => {
    if (activeGridItems.length > 0) {
      openLightbox(0);
      startLightboxSlideshow();
    }
  });

  // Eventos del Lightbox
  btnCloseLightbox.addEventListener("click", closeLightbox);
  btnPrevLightbox.addEventListener("click", () => navigateLightbox(-1));
  btnNextLightbox.addEventListener("click", () => navigateLightbox(1));
  btnLightboxPlay.addEventListener("click", toggleLightboxSlideshow);

  // Monitor de interacción del ratón para restablecer el temporizador de inactividad
  const activityEvents = ["mousemove", "mousedown", "click", "scroll", "keydown"];
  activityEvents.forEach(evt => {
    window.addEventListener(evt, resetInactivityTimer, { passive: true });
  });

  // Atajos de teclado para facilitar pruebas locales con teclado/TV remote
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    
    if (e.key === "ArrowLeft") {
      navigateLightbox(-1);
    } else if (e.key === "ArrowRight") {
      navigateLightbox(1);
    } else if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === " ") {
      toggleLightboxSlideshow();
    }
  });

  // --- CONTROL DEL MENÚ LATERAL EN MÓVILES (DRAWER) ---
  const mobileMenuTrigger = document.getElementById("btn-mobile-menu-trigger");
  const sidebarDrawer = document.getElementById("sidebar-drawer");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  const closeMobileMenu = () => {
    if (sidebarDrawer) sidebarDrawer.classList.remove("menu-open");
    if (sidebarOverlay) sidebarOverlay.classList.remove("active");
  };

  if (mobileMenuTrigger) {
    mobileMenuTrigger.addEventListener("click", () => {
      if (sidebarDrawer) sidebarDrawer.classList.toggle("menu-open");
      if (sidebarOverlay) sidebarOverlay.classList.toggle("active");
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeMobileMenu);
  }

  // Cerrar menú al hacer clic en cualquier categoría del menú
  categoryListContainer.addEventListener("click", (e) => {
    if (e.target.closest(".btn-category") || e.target.closest(".tab-btn")) {
      closeMobileMenu();
    }
  });

  // ================= 9. INICIO =================
  initApp();
});
