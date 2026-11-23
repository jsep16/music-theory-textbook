'use strict';
(() => {
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
