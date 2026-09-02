const projects = window.projects || {};

const modal=document.getElementById('projectModal');
const media=document.getElementById('modalMedia');
const gallery=document.getElementById('modalGallery');
function openProject(key){const p=projects[key];if(!p)return;
 document.getElementById('modalType').textContent=p.type;document.getElementById('modalTitle').textContent=p.title;document.getElementById('modalDescription').textContent=p.description;document.getElementById('modalRole').textContent=p.role;document.getElementById('modalTools').textContent=p.tools;document.getElementById('modalProjectType').textContent=p.projectType;document.getElementById('modalOverview').textContent=p.overview;
 media.innerHTML=p.video?`<video controls playsinline preload="metadata" poster="${p.poster||''}"><source src="${p.video}" type="video/mp4">Your browser does not support video playback.</video>`:`<img src="${p.image}" alt="${p.title}">`;
 gallery.innerHTML=(p.gallery||[]).map(src=>`<img src="${src}" alt="Additional ${p.title} visual">`).join('');
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
}
function closeModal(){const v=media.querySelector('video');if(v)v.pause();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');media.innerHTML='';gallery.innerHTML='';}
document.querySelectorAll('.clickable-project').forEach(card=>{card.addEventListener('click',()=>openProject(card.dataset.project));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProject(card.dataset.project)}})});
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.work-card').forEach(card=>{card.hidden=!(f==='all'||card.dataset.category.split(' ').includes(f));});}));
document.getElementById('year').textContent=new Date().getFullYear();


// Showreel progressive enhancement: the site remains complete even before the reel is added.
const showreelVideo=document.getElementById('showreelVideo');
const showreelPlaceholder=document.getElementById('showreelPlaceholder');
if(showreelVideo){
  const source=showreelVideo.querySelector('source');
  if(source){
    fetch(source.src,{method:'HEAD'}).then(r=>{
      if(r.ok){showreelVideo.hidden=false;if(showreelPlaceholder)showreelPlaceholder.hidden=true;const shell=document.querySelector('.hero-reel');if(shell)shell.classList.add('is-live');}
    }).catch(()=>{});
  }
}
