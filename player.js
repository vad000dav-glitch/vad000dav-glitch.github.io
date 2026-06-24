/* Terr-a-spect — глобальний плаваючий плеєр + клієнтські переходи (pjax).
   Один екземпляр на всі сторінки; звук грає безперервно під час навігації. */
(function(){
  'use strict';
  if(window.__TAS){ return; }                 // одна копія на сесію
  window.__TAS = true;
  var MEDIA = "https://media.terr-a-spect.com";
  var ART   = (location.origin && location.origin.indexOf('http')===0 ? location.origin : "https://terr-a-spect.com") + "/icon.png";
  var HOVER = !!(window.matchMedia && window.matchMedia('(hover:hover)').matches);

  var IC = {
    play:'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    pause:'<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    prev:'<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
    next:'<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>',
    shuf:'<svg viewBox="0 0 24 24"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>'
  };

  // ── стан ──
  var tracks=[], cur=-1, ready=false, collapseT=0, idleT=0, saveT=0;
  var audio=new Audio(); audio.preload="metadata";
  var v=parseFloat(localStorage.getItem('ts_vol')); if(isNaN(v))v=1; audio.volume=v;
  var shuffle=localStorage.getItem('ts_shuffle')==='1';

  // ── DOM ──
  var root=document.createElement('div'); root.id='tas-player'; root.className='tas-mini';
  root.innerHTML =
    '<button class="tas-fab" type="button" aria-label="Музика">'
    +'<span class="tas-ico">'+IC.play+'</span>'
    +'<span class="tas-eq"><i></i><i></i><i></i><i></i></span></button>'
    +'<div class="tas-panel">'
      +'<div class="tas-top">'
        +'<img class="tas-cover" src="'+ART+'" alt="">'
        +'<div class="tas-meta"><div class="tas-title">—</div><div class="tas-perf"></div></div>'
        +'<button class="tas-min" type="button" aria-label="Згорнути">✕</button>'
      +'</div>'
      +'<div class="tas-seek"><span class="tas-cur">0:00</span>'
        +'<input class="tas-range" type="range" min="0" max="1000" value="0" aria-label="Перемотування">'
        +'<span class="tas-dur">0:00</span></div>'
      +'<div class="tas-ctrls">'
        +'<button class="tas-prev" type="button" aria-label="Назад">'+IC.prev+'</button>'
        +'<button class="tas-big tas-toggle" type="button" aria-label="Грати">'+IC.play+'</button>'
        +'<button class="tas-next" type="button" aria-label="Вперед">'+IC.next+'</button>'
        +'<button class="tas-shuf" type="button" aria-label="Випадковий порядок" title="Випадковий трек">'+IC.shuf+'</button>'
      +'</div>'
    +'</div>';
  function mount(){ if(!document.body.contains(root)) document.body.appendChild(root); }
  if(document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  var $ = function(c){ return root.querySelector(c); };
  var elTitle=$('.tas-title'), elPerf=$('.tas-perf'), elCover=$('.tas-cover'),
      elRange=$('.tas-range'), elCur=$('.tas-cur'), elDur=$('.tas-dur'),
      elToggle=$('.tas-toggle'), elShuf=$('.tas-shuf');

  var fmt=function(s){ s=Math.round(s||0); return Math.floor(s/60)+":"+String(s%60).padStart(2,"0"); };

  // ── режими: mini ↔ open ──
  function open(){ clearTimeout(collapseT); root.classList.remove('tas-mini'); root.classList.add('tas-open'); armIdle(); }
  function mini(){ clearTimeout(collapseT); root.classList.remove('tas-open'); root.classList.add('tas-mini'); }
  function armIdle(){ if(HOVER) return; clearTimeout(idleT);
    if(!audio.paused) idleT=setTimeout(function(){ if(!audio.paused) mini(); }, 4000); }
  $('.tas-fab').addEventListener('click', open);
  $('.tas-min').addEventListener('click', function(e){ e.stopPropagation(); mini(); });
  if(HOVER){
    root.addEventListener('pointerenter', function(){ clearTimeout(collapseT); open(); });
    // згортається миттєво, щойно мишка покинула плеєр (незалежно від того, грає чи ні)
    root.addEventListener('pointerleave', function(){ clearTimeout(collapseT); collapseT=setTimeout(mini, 80); });
  } else {
    document.addEventListener('click', function(e){ if(root.classList.contains('tas-open') && !root.contains(e.target)) mini(); });
    root.querySelector('.tas-panel').addEventListener('pointerdown', armIdle);
  }

  // ── контроли ──
  elToggle.addEventListener('click', function(){ toggle(); });
  $('.tas-prev').addEventListener('click', prev);
  $('.tas-next').addEventListener('click', next);
  elShuf.addEventListener('click', function(){ shuffle=!shuffle; localStorage.setItem('ts_shuffle',shuffle?'1':'0'); updShuf(); });
  elRange.addEventListener('input', function(){ if(audio.duration) audio.currentTime=this.value/1000*audio.duration; armIdle(); });
  function updShuf(){ elShuf.classList.toggle('on', shuffle); }

  // ── клік по назві → сторінка музики, поточний трек виділено й прокручено у в'юпорт ──
  var wantScroll=false;
  function scrollActive(tries){
    tries=tries||0; if(cur<0) return;
    var row=document.querySelector('[data-msg="'+tracks[cur].msg_id+'"]');
    if(row){ row.scrollIntoView({behavior:'smooth',block:'center'}); }
    else if(tries<20){ setTimeout(function(){ scrollActive(tries+1); }, 150); }
  }
  function gotoMusic(){
    if(cur<0) return;
    if(/music\.html$/.test(location.pathname)){ scrollActive(0); return; }
    wantScroll=true;
    navigate((location.origin||'https://terr-a-spect.com')+'/music.html', true);
  }
  elTitle.addEventListener('click', gotoMusic);
  window.addEventListener('tas:pageload', function(){ if(wantScroll){ wantScroll=false; scrollActive(0); } });

  // ── ядро ──
  function loadTrack(i, seek, autoplay){
    if(i<0 || i>=tracks.length) return;
    cur=i; var t=tracks[i];
    audio.src=MEDIA+t.stream;
    elTitle.textContent=t.title||'—'; elPerf.textContent=t.performer||'Terr-a-spect';
    setMs(t); persist(); emit();
    if(seek>0){ audio.addEventListener('loadedmetadata', function(){ try{audio.currentTime=seek;}catch(e){} elDur.textContent=fmt(audio.duration); }, {once:true}); }
    if(autoplay){ var p=audio.play(); if(p&&p.catch) p.catch(function(){}); }
  }
  function play(i){ if(i===cur){ toggle(); return; } loadTrack(i,0,true); open(); }
  function toggle(){ if(cur<0&&tracks.length){ loadTrack(0,0,true); return; } if(audio.paused){ var p=audio.play(); if(p&&p.catch)p.catch(function(){}); } else audio.pause(); }
  function randIdx(){ if(tracks.length<=1) return 0; var i; do{ i=Math.floor(Math.random()*tracks.length); }while(i===cur); return i; }
  function next(){ if(tracks.length) loadTrack(shuffle?randIdx():(cur+1)%tracks.length, 0, true); }
  function prev(){ if(tracks.length) loadTrack((cur-1+tracks.length)%tracks.length, 0, true); }
  function persist(){ if(cur>=0) localStorage.setItem('ts_last', JSON.stringify({msg_id:tracks[cur].msg_id, time:Math.floor(audio.currentTime||0)})); }

  // ── MediaSession ──
  function setMs(t){
    if('mediaSession' in navigator){
      try{
        navigator.mediaSession.metadata=new MediaMetadata({title:t.title||'',artist:t.performer||'Terr-a-spect',
          album:'Terr-a-spect',artwork:[{src:ART,sizes:'512x512',type:'image/png'}]});
        navigator.mediaSession.setActionHandler('play',function(){ audio.play(); });
        navigator.mediaSession.setActionHandler('pause',function(){ audio.pause(); });
        navigator.mediaSession.setActionHandler('previoustrack',prev);
        navigator.mediaSession.setActionHandler('nexttrack',next);
      }catch(e){}
    }
  }

  // ── події audio ──
  audio.addEventListener('play', function(){ elToggle.innerHTML=IC.pause; root.classList.add('tas-playing'); armIdle(); });
  audio.addEventListener('pause', function(){ elToggle.innerHTML=IC.play; root.classList.remove('tas-playing'); persist(); });
  audio.addEventListener('ended', next);
  audio.addEventListener('timeupdate', function(){
    var d=audio.duration||0, c=audio.currentTime||0;
    elRange.value = d? c/d*1000 : 0; elCur.textContent=fmt(c); elDur.textContent=fmt(d);
    var n=Date.now(); if(n-saveT>3000){ saveT=n; persist(); }
  });

  // ── публічний API (для списку music.html) ──
  function idxByMsg(m){ for(var i=0;i<tracks.length;i++) if(String(tracks[i].msg_id)===String(m)) return i; return -1; }
  function emit(){ window.dispatchEvent(new CustomEvent('tas:track', {detail:{msg_id: cur>=0?tracks[cur].msg_id:null, playing: !audio.paused}})); }
  audio.addEventListener('play', emit); audio.addEventListener('pause', emit);
  window.TAS = {
    playByMsg: function(m){ var i=idxByMsg(m); if(i>=0) play(i); },
    currentMsg: function(){ return cur>=0?tracks[cur].msg_id:null; },
    isPlaying: function(){ return !audio.paused; },
    ready: function(){ return ready; },
    tracks: function(){ return tracks; }
  };

  // ── завантаження каталогу ──
  fetch(MEDIA+"/api/tracks",{cache:"no-store"}).then(function(r){ return r.json(); }).then(function(d){
    tracks=(d&&d.tracks)||[];
    tracks.sort(function(a,b){ return a.date<b.date?1:a.date>b.date?-1:b.msg_id-a.msg_id; }); // найсвіжіший перший
    if(!tracks.length){ root.classList.add('tas-hidden'); return; }
    ready=true;
    var saved=null; try{ saved=JSON.parse(localStorage.getItem('ts_last')||'null'); }catch(e){}
    var idx = saved ? idxByMsg(saved.msg_id) : -1; if(idx<0) idx=0;
    loadTrack(idx, (saved && tracks[idx] && tracks[idx].msg_id===saved.msg_id)?(saved.time||0):0, false);
    updShuf(); window.dispatchEvent(new CustomEvent('tas:ready'));
  }).catch(function(){ root.classList.add('tas-hidden'); });

  elToggle.innerHTML=IC.play; updShuf();

  // ════════ клієнтські переходи (pjax) — звук не обривається ════════
  function samePageHash(url){ try{ var u=new URL(url, location.href); return u.pathname===location.pathname && u.hash; }catch(e){ return false; } }
  function internal(a){
    if(!a || a.target==='_blank' || a.hasAttribute('download')) return false;
    var href=a.getAttribute('href')||''; if(!href || href[0]==='#') return false;
    if(/^(mailto:|tel:|javascript:)/i.test(href)) return false;
    if(a.getAttribute('onclick')) return false;             // напр. adminLogin — не чіпаємо
    try{ var u=new URL(a.href, location.href); if(u.origin!==location.origin) return false;
         return /\.html$/.test(u.pathname) || u.pathname==='/' || /\/$/.test(u.pathname); }catch(e){ return false; }
  }
  function runScripts(container){
    var ss=container.querySelectorAll('script');
    for(var i=0;i<ss.length;i++){
      var s=ss[i], src=s.getAttribute('src');
      if(src && (/i18n\.js|player\.js/.test(src))) continue;   // спільні — вже завантажені
      var n=document.createElement('script');
      if(src){ n.src=src; } else { n.textContent=s.textContent; }
      document.body.appendChild(n); if(n.parentNode) n.parentNode.removeChild(n);
    }
  }
  function afterSwap(){
    try{ if(window.setLang) window.setLang(localStorage.getItem('ts_lang')||(navigator.language||'en').slice(0,2)); }catch(e){}
  }
  var navigating=false;
  function navigate(url, push){
    if(navigating){ return; } navigating=true;
    fetch(url,{cache:"no-store"}).then(function(r){ if(!r.ok) throw 0; return r.text(); }).then(function(html){
      var doc=new DOMParser().parseFromString(html,'text/html');
      if(!doc || !doc.body) throw 0;
      document.title=doc.title||document.title;
      // прибрати поточний контент (усе крім плеєра), вставити новий
      var keep=root;
      var frag=document.createDocumentFragment();
      var kids=Array.prototype.slice.call(doc.body.childNodes);
      for(var i=0;i<kids.length;i++){ var node=kids[i];
        if(node.id==='tas-player') continue;
        frag.appendChild(node);
      }
      // видалити старі вузли body (крім плеєра)
      var cur2=Array.prototype.slice.call(document.body.childNodes);
      for(var j=0;j<cur2.length;j++){ if(cur2[j]!==keep) document.body.removeChild(cur2[j]); }
      document.body.insertBefore(frag, keep);
      if(push) history.pushState({tas:1}, '', url);
      window.scrollTo(0,0);
      afterSwap(); runScripts(document.body);
      window.dispatchEvent(new CustomEvent('tas:pageload'));
      navigating=false;
    }).catch(function(){ navigating=false; location.href=url; });   // фолбек — звичайний перехід
  }
  document.addEventListener('click', function(e){
    if(e.defaultPrevented || e.button!==0 || e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
    var a=e.target.closest && e.target.closest('a'); if(!a) return;
    if(root.contains(a)) return;
    if(samePageHash(a.href)) return;            // якорі — нативно
    if(!internal(a)) return;
    e.preventDefault(); navigate(a.href, true);
  });
  window.addEventListener('popstate', function(){ navigate(location.href, false); });
})();
