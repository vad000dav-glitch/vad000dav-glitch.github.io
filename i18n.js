/* Terr-a-spect — shared i18n. Auto-detects device language, persists choice. */
(function () {
  const DICT = {
    en: {
      nav_what:"What we do", nav_channels:"Channels", nav_data:"Your data",
      nav_contact:"Contact", nav_music:"Music", nav_home:"Home",
      hero_tag:"The hidden beauty of nature — in image and in sound.<br>Wildlife · Macro · Landscapes · Original music.",
      hero_cta_tg:"Join on Telegram", hero_cta_all:"All our channels", hero_cta_listen:"Listen to the music",
      what_eyebrow:"What we do", what_h2:"A nature content studio",
      what_lead:"We produce original photography and short-form video of the natural world and publish it under the Terr-a-spect brand across social platforms. Every photo, video and soundtrack is created in-house — we publish only material we make and own.",
      c1h:"Photography", c1p:"Wildlife, macro and landscape photography of the natural world.",
      c2h:"Video", c2p:"Short, cinematic nature reels and clips.",
      c3h:"Music", c3p:"Full-length original soundtracks — free to stream and download.",
      ch_eyebrow:"Find us", ch_h2:"Our channels",
      ch_lead:"Follow Terr-a-spect across platforms. Our full-length nature soundtracks live on the Telegram channel — and right here on the site.",
      data_eyebrow:"Transparency", data_h2:"How our integrations use your data",
      data_p1:"The Terr-a-spect publishing tool connects only to our own brand accounts through each platform's official OAuth flow, in order to upload and publish our own finished content.",
      data_li1:"It stores only the authorization tokens for our own connected accounts, kept privately on our own secured server.",
      data_li2:"It reads basic account info (identifier and display name) only to confirm the right account is connected.",
      data_li3:"It does not access, collect or post content on behalf of any other users, and never sells or shares data.",
      data_li4:"Finished posts are uploaded to our own connected brand accounts at scheduled times, through each platform's official Content Posting API.",
      data_del:"<strong>Data deletion:</strong> to request removal of any data the tool holds, email <a href=\"mailto:vad000dav@gmail.com\">vad000dav@gmail.com</a>. Authorization can also be revoked at any time from the connected account's settings, which immediately stops all access.",
      foot_studio:"Nature content studio",
      mus_title:"Music", mus_sub:"Full-length original nature soundtracks. Listen right here — even in the background — or download.",
      mus_playall:"Play all", mus_loading:"Loading tracks…", mus_download:"Download",
      mus_tracks:"tracks", mus_offline:"Music is temporarily unavailable. Please try again in a moment.",
      mus_search:"Search tracks…", mus_nores:"No tracks found.",
      mus_sort:"Sort:", mus_byname:"Name", mus_bydate:"Date",
      gal_eyebrow:"Latest", gal_h2:"Recent posts", gal_music:"Music →",
      feat_eyebrow:"Music", feat_h2:"Our latest track", feat_lead:"Original full-length nature soundtracks — stream right here or download. New tracks are added as we publish.", feat_all:"All music →"
    },
    uk: {
      nav_what:"Що ми робимо", nav_channels:"Канали", nav_data:"Твої дані",
      nav_contact:"Контакт", nav_music:"Музика", nav_home:"Головна",
      hero_tag:"Прихована краса природи — в образі та звуці.<br>Дика природа · Макро · Пейзажі · Власна музика.",
      hero_cta_tg:"Приєднатися в Telegram", hero_cta_all:"Усі наші канали", hero_cta_listen:"Слухати музику",
      what_eyebrow:"Що ми робимо", what_h2:"Студія контенту про природу",
      what_lead:"Ми створюємо оригінальні фото й короткі відео природного світу й публікуємо їх під брендом Terr-a-spect у соцмережах. Кожне фото, відео й трек зроблені власноруч — публікуємо лише те, що створили й чим володіємо.",
      c1h:"Фотографія", c1p:"Фото дикої природи, макро та пейзажів природного світу.",
      c2h:"Відео", c2p:"Короткі кінематографічні відео природи.",
      c3h:"Музика", c3p:"Повні оригінальні треки — слухати й завантажувати безкоштовно.",
      ch_eyebrow:"Знайди нас", ch_h2:"Наші канали",
      ch_lead:"Стеж за Terr-a-spect на всіх платформах. Повні треки про природу — у Telegram-каналі й прямо тут на сайті.",
      data_eyebrow:"Прозорість", data_h2:"Як наші інтеграції використовують дані",
      data_p1:"Інструмент Terr-a-spect підключається лише до наших власних бренд-акаунтів через офіційний OAuth кожної платформи, щоб вивантажувати й публікувати наш готовий контент.",
      data_li1:"Зберігає лише токени авторизації наших підключених акаунтів — приватно на власному захищеному сервері.",
      data_li2:"Читає базову інфо акаунта (ідентифікатор і назву) лише щоб підтвердити правильний акаунт.",
      data_li3:"Не отримує, не збирає й не публікує контент від імені інших користувачів, ніколи не продає й не передає дані.",
      data_li4:"Готові пости вивантажуються на наші підключені бренд-акаунти у визначений час через офіційний Content Posting API кожної платформи.",
      data_del:"<strong>Видалення даних:</strong> щоб видалити будь-які дані, які тримає інструмент, напиши на <a href=\"mailto:vad000dav@gmail.com\">vad000dav@gmail.com</a>. Доступ також можна відкликати будь-коли в налаштуваннях акаунта — це миттєво зупиняє доступ.",
      foot_studio:"Студія контенту про природу",
      mus_title:"Музика", mus_sub:"Повні оригінальні треки про природу. Слухай прямо тут — навіть у фоні — або завантаж.",
      mus_playall:"Грати все", mus_loading:"Завантаження треків…", mus_download:"Завантажити",
      mus_tracks:"треків", mus_offline:"Музика тимчасово недоступна. Спробуй за мить.",
      mus_search:"Пошук треків…", mus_nores:"Треків не знайдено.",
      mus_sort:"Сортувати:", mus_byname:"Назва", mus_bydate:"Дата",
      gal_eyebrow:"Свіже", gal_h2:"Останні пости", gal_music:"Музика →",
      feat_eyebrow:"Музика", feat_h2:"Наш найсвіжіший трек", feat_lead:"Оригінальні повні треки про природу — слухай прямо тут або завантаж. Нові додаються в міру публікації.", feat_all:"Уся музика →"
    },
    es: {
      nav_what:"Qué hacemos", nav_channels:"Canales", nav_data:"Tus datos",
      nav_contact:"Contacto", nav_music:"Música", nav_home:"Inicio",
      hero_tag:"La belleza oculta de la naturaleza — en imagen y en sonido.<br>Fauna · Macro · Paisajes · Música propia.",
      hero_cta_tg:"Únete en Telegram", hero_cta_all:"Todos nuestros canales", hero_cta_listen:"Escuchar la música",
      what_eyebrow:"Qué hacemos", what_h2:"Un estudio de contenido de naturaleza",
      what_lead:"Producimos fotografía y vídeo corto originales del mundo natural y los publicamos bajo la marca Terr-a-spect en redes sociales. Cada foto, vídeo y banda sonora se crea internamente: solo publicamos material propio.",
      c1h:"Fotografía", c1p:"Fotografía de fauna, macro y paisajes del mundo natural.",
      c2h:"Vídeo", c2p:"Vídeos cortos y cinematográficos de la naturaleza.",
      c3h:"Música", c3p:"Bandas sonoras originales completas — gratis para escuchar y descargar.",
      ch_eyebrow:"Encuéntranos", ch_h2:"Nuestros canales",
      ch_lead:"Sigue a Terr-a-spect en todas las plataformas. Las bandas sonoras completas están en el canal de Telegram — y aquí mismo en el sitio.",
      data_eyebrow:"Transparencia", data_h2:"Cómo usan tus datos nuestras integraciones",
      data_p1:"La herramienta de Terr-a-spect se conecta solo a nuestras propias cuentas de marca mediante el flujo OAuth oficial de cada plataforma, para subir y publicar nuestro contenido terminado.",
      data_li1:"Solo guarda los tokens de autorización de nuestras cuentas conectadas, de forma privada en nuestro servidor seguro.",
      data_li2:"Lee información básica de la cuenta (identificador y nombre) solo para confirmar la cuenta correcta.",
      data_li3:"No accede, recopila ni publica contenido en nombre de otros usuarios, y nunca vende ni comparte datos.",
      data_li4:"Las publicaciones terminadas se suben a nuestras propias cuentas de marca a horas programadas, mediante la API oficial de publicación de cada plataforma.",
      data_del:"<strong>Eliminación de datos:</strong> para solicitar la eliminación de cualquier dato, escribe a <a href=\"mailto:vad000dav@gmail.com\">vad000dav@gmail.com</a>. También puedes revocar el acceso en cualquier momento desde la configuración de la cuenta.",
      foot_studio:"Estudio de contenido de naturaleza",
      mus_title:"Música", mus_sub:"Bandas sonoras originales completas de la naturaleza. Escucha aquí — incluso en segundo plano — o descarga.",
      mus_playall:"Reproducir todo", mus_loading:"Cargando pistas…", mus_download:"Descargar",
      mus_tracks:"pistas", mus_offline:"La música no está disponible por ahora. Inténtalo en un momento.",
      mus_search:"Buscar pistas…", mus_nores:"No se encontraron pistas.",
      mus_sort:"Ordenar:", mus_byname:"Nombre", mus_bydate:"Fecha",
      gal_eyebrow:"Lo último", gal_h2:"Publicaciones recientes", gal_music:"Música →",
      feat_eyebrow:"Música", feat_h2:"Nuestra última pista", feat_lead:"Bandas sonoras originales completas de la naturaleza — escucha aquí o descarga. Se añaden nuevas a medida que publicamos.", feat_all:"Toda la música →"
    },
    de: {
      nav_what:"Was wir tun", nav_channels:"Kanäle", nav_data:"Deine Daten",
      nav_contact:"Kontakt", nav_music:"Musik", nav_home:"Start",
      hero_tag:"Die verborgene Schönheit der Natur — in Bild und Klang.<br>Wildlife · Makro · Landschaften · Eigene Musik.",
      hero_cta_tg:"Auf Telegram beitreten", hero_cta_all:"Alle unsere Kanäle", hero_cta_listen:"Musik anhören",
      what_eyebrow:"Was wir tun", what_h2:"Ein Natur-Content-Studio",
      what_lead:"Wir produzieren originale Fotografie und Kurzvideos der Natur und veröffentlichen sie unter der Marke Terr-a-spect in sozialen Netzwerken. Jedes Foto, Video und jeder Soundtrack entsteht im eigenen Haus — wir veröffentlichen nur eigenes Material.",
      c1h:"Fotografie", c1p:"Wildlife-, Makro- und Landschaftsfotografie der Natur.",
      c2h:"Video", c2p:"Kurze, cinematische Naturvideos.",
      c3h:"Musik", c3p:"Vollständige originale Soundtracks — kostenlos hören und herunterladen.",
      ch_eyebrow:"Finde uns", ch_h2:"Unsere Kanäle",
      ch_lead:"Folge Terr-a-spect auf allen Plattformen. Die vollständigen Natur-Soundtracks gibt es im Telegram-Kanal — und direkt hier auf der Seite.",
      data_eyebrow:"Transparenz", data_h2:"Wie unsere Integrationen deine Daten nutzen",
      data_p1:"Das Terr-a-spect-Tool verbindet sich nur mit unseren eigenen Marken-Konten über den offiziellen OAuth-Ablauf jeder Plattform, um unsere fertigen Inhalte hochzuladen und zu veröffentlichen.",
      data_li1:"Es speichert nur die Autorisierungs-Tokens unserer verbundenen Konten, privat auf unserem eigenen sicheren Server.",
      data_li2:"Es liest grundlegende Konto-Infos (Kennung und Name) nur, um das richtige Konto zu bestätigen.",
      data_li3:"Es greift nicht auf Inhalte anderer Nutzer zu, sammelt oder postet sie nicht und verkauft oder teilt niemals Daten.",
      data_li4:"Fertige Beiträge werden zu geplanten Zeiten über die offizielle Content-Posting-API jeder Plattform auf unsere eigenen Marken-Konten hochgeladen.",
      data_del:"<strong>Datenlöschung:</strong> um die Löschung von Daten zu beantragen, schreibe an <a href=\"mailto:vad000dav@gmail.com\">vad000dav@gmail.com</a>. Der Zugriff kann auch jederzeit in den Kontoeinstellungen widerrufen werden.",
      foot_studio:"Natur-Content-Studio",
      mus_title:"Musik", mus_sub:"Vollständige originale Natur-Soundtracks. Höre direkt hier — auch im Hintergrund — oder lade herunter.",
      mus_playall:"Alle abspielen", mus_loading:"Titel werden geladen…", mus_download:"Herunterladen",
      mus_tracks:"Titel", mus_offline:"Musik ist gerade nicht verfügbar. Bitte versuche es gleich erneut.",
      mus_search:"Titel suchen…", mus_nores:"Keine Titel gefunden.",
      mus_sort:"Sortieren:", mus_byname:"Name", mus_bydate:"Datum",
      gal_eyebrow:"Neu", gal_h2:"Neueste Beiträge", gal_music:"Musik →",
      feat_eyebrow:"Musik", feat_h2:"Unser neuester Titel", feat_lead:"Vollständige originale Natur-Soundtracks — hier anhören oder herunterladen. Neue kommen mit jeder Veröffentlichung dazu.", feat_all:"Alle Titel →"
    }
  };
  const LANGS = [["en","EN"],["uk","УКР"],["es","ES"],["de","DE"]];

  function detect() {                  // мова пристрою → одна з підтримуваних, інакше українська
    const langs = (navigator.languages && navigator.languages.length)
      ? navigator.languages : [navigator.language || navigator.userLanguage || ""];
    for (let raw of langs) {
      let n = String(raw).slice(0, 2).toLowerCase();
      if (n === "ru" || n === "be") n = "uk";   // рос./біл. мова пристрою → українська
      if (DICT[n]) return n;
    }
    return "uk";                       // не вдалося визначити → дефолт українська
  }
  function pick() {
    const s = localStorage.getItem("ts_lang");
    // лише ЯВНИЙ вибір користувача (клік по прапорцю) має пріоритет; авто-визначення не залипає
    if (s && DICT[s] && localStorage.getItem("ts_lang_set") === "1") return s;
    return detect();
  }
  function apply(lang) {
    const d = DICT[lang] || DICT.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const k = el.getAttribute("data-i18n"); if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
      const k = el.getAttribute("data-i18n-html"); if (d[k] != null) el.innerHTML = d[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const k = el.getAttribute("data-i18n-ph"); if (d[k] != null) el.placeholder = d[k];
    });
    localStorage.setItem("ts_lang", lang);
    document.querySelectorAll(".langbtn").forEach(b => b.classList.toggle("on", b.dataset.l === lang));
    window.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  }
  // клік по прапорцю = явний вибір → фіксуємо, щоб переживав хард-ресет
  window.setLang = function (lang) { localStorage.setItem("ts_lang_set", "1"); apply(lang); };
  window.tt = function (k) { const l = pick(); return (DICT[l] && DICT[l][k]) || DICT.en[k] || k; };

  function buildSwitcher() {
    const host = document.querySelector("[data-lang-switcher]");
    if (host) host.innerHTML = LANGS.map(([c, l]) =>
      `<button class="langbtn" data-l="${c}" onclick="setLang('${c}')">${l}</button>`).join("");
  }
  // (пере)ініціалізація i18n — викликається і після pjax-переходу (DOMContentLoaded тоді не спрацьовує)
  window.initI18n = function () { buildSwitcher(); apply(pick()); };
  document.addEventListener("DOMContentLoaded", window.initI18n);
})();

/* --- секретний вхід в адмінку: лого = тригер; підтвердження в Telegram → сайт сам перекине --- */
(function () {
  const ADM = "https://admin.terr-a-spect.com";
  async function fp() {
    const cv = document.createElement('canvas'), ctx = cv.getContext('2d');
    ctx.textBaseline = 'top'; ctx.font = '14px Arial'; ctx.fillStyle = '#069'; ctx.fillText('terr-a-spect-fp', 2, 2);
    let w = ''; try { const gl = document.createElement('canvas').getContext('webgl');
      const d = gl.getExtension('WEBGL_debug_renderer_info');
      w = gl.getParameter(d.UNMASKED_RENDERER_WEBGL) + '|' + gl.getParameter(gl.VERSION); } catch (e) {}
    const p = [navigator.userAgent, navigator.platform, (navigator.languages || []).join(','),
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen.width + 'x' + screen.height + 'x' + screen.colorDepth,
      navigator.hardwareConcurrency, navigator.deviceMemory, navigator.maxTouchPoints,
      cv.toDataURL(), w].join('~');
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(p));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  async function login(e) {
    if (e && e.preventDefault) e.preventDefault();
    let f; try { f = await fp(); } catch (_) { return false; }
    let r;
    try { r = await fetch(ADM + '/auth/init', { method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fp: f }) }); }
    catch (_) { return false; }
    if (r.status === 429) return false;
    let d; try { d = await r.json(); } catch (_) { return false; }
    if (d.ok) { location.href = ADM + '/admin'; return false; }
    if (d.pending) { localStorage.setItem('adm_pending', JSON.stringify({ id: d.login_id, t: Date.now() })); poll(); }
    return false;   // лого нікуди не веде — лише тригер
  }
  function poll() {
    let p; try { p = JSON.parse(localStorage.getItem('adm_pending') || 'null'); } catch (_) { p = null; }
    if (!p) return;
    if (Date.now() - p.t > 6 * 60000) { localStorage.removeItem('adm_pending'); return; }
    fetch(ADM + '/auth/status/' + p.id, { credentials: 'include' }).then(r => r.json()).then(s => {
      if (s.ok) { localStorage.removeItem('adm_pending'); location.href = ADM + '/admin'; return; }
      if (s.status === 'denied' || s.status === 'expired') { localStorage.removeItem('adm_pending'); return; }
      setTimeout(poll, 2500);
    }).catch(() => setTimeout(poll, 4000));
  }
  window.adminLogin = login;
  document.addEventListener('DOMContentLoaded', poll);   // продовжити очікування на будь-якій сторінці
})();
