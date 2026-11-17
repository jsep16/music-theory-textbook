'use strict';
(() => {
  const menuButton = document.querySelector('#menu-toggle');
  const menu = document.querySelector('#chapter-navigation');
  function closeMenu() {menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}
  menuButton.addEventListener('click', () => {const open=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  document.addEventListener('click',e=>{if(!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
  const navLinks=[...menu.querySelectorAll('nav a')];
  const sections=[...document.querySelectorAll('main section[id]')];
  let ticking=false;
  const progress=document.querySelector('.reading-progress');
  function updateReading() {
    let active=sections[0];
    for (const section of sections) if(section.getBoundingClientRect().top<160)active=section;
    navLinks.forEach(a=>{if(a.hash===`#${active.id}`)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=`${max>0?Math.min(100,Math.max(0,scrollY/max*100)):0}%`;
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateReading);ticking=true;}},{passive:true});
  window.addEventListener('resize',updateReading);updateReading();
  const audio=document.querySelector('#chapter-audio');
  const dock=document.querySelector('#audio-dock');
  const dockButton=document.querySelector('#dock-toggle');
  const dockTime=document.querySelector('#dock-time');
  const status=document.querySelector('#audio-status');
  let playerVisible=true;
  function updateAudio(){dock.hidden=playerVisible||audio.paused;dockButton.textContent=audio.paused?'Play':'Pause';}
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{playerVisible=entries[0].isIntersecting;updateAudio();},{threshold:0.1}).observe(audio);}
  document.querySelector('#repeat-audio').addEventListener('change',e=>{audio.loop=e.target.checked;});
  document.querySelector('#playback-speed').addEventListener('change',e=>{audio.playbackRate=Number(e.target.value);});
  dockButton.addEventListener('click',()=>{if(audio.paused)audio.play().catch(showPlayError);else audio.pause();});
  function showPlayError(){status.textContent='Playback could not start. Use the audio controls or download the recording.';}
  document.querySelectorAll('[data-replay]').forEach(button=>button.addEventListener('click',()=>{audio.currentTime=0;audio.play().catch(showPlayError);}));
  audio.addEventListener('error',()=>{status.textContent='The recording could not load. Try downloading it using the link below.';});
  audio.addEventListener('play',()=>{status.textContent='';updateAudio();});
  audio.addEventListener('pause',updateAudio);audio.addEventListener('ended',updateAudio);
  audio.addEventListener('timeupdate',()=>{const t=Math.floor(audio.currentTime);dockTime.textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;});
  const dialog=document.querySelector('#image-dialog');
  const dialogImage=dialog.querySelector('img');
  let opener;
  document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{opener=button;dialogImage.src=button.dataset.image;dialogImage.alt=button.dataset.alt;if(typeof dialog.showModal==='function'){dialog.showModal();document.body.classList.add('dialog-open');}else{window.open(button.dataset.image,'_blank','noopener');}}));
  dialog.querySelector('button').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(opener)opener.focus();});
})();
