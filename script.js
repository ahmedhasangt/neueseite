(() => {
'use strict';
const $ = s => document.querySelector(s);
const menu = $('.menu-toggle'), nav = $('#navigation');
function closeMenu(){if(!menu||!nav)return;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Menü öffnen');nav.classList.remove('open');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Menü schließen':'Menü öffnen');nav.classList.toggle('open',open);});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
window.matchMedia('(min-width: 851px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const clock = $('#local-time');
if(clock){const tick=()=>{clock.textContent=new Intl.DateTimeFormat('de-DE',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'}).format(new Date())+' UHR';clock.dateTime=new Date().toISOString();};tick();setInterval(tick,30000);}
if($('#year'))$('#year').textContent=new Date().getFullYear();
const video=$('#background-video'), motion=$('#motion-toggle');
if(video&&motion){
 const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
 let manualPause=false;
 function syncMotion(){const playing=!video.paused&&!video.ended;motion.setAttribute('aria-pressed',String(playing));$('#motion-label').textContent=playing?'Animation pausieren':'Animation starten';$('#motion-icon').textContent=playing?'Ⅱ':'▶';}
 async function play(){if(!video.querySelector('source').src){const source=video.querySelector('source');source.src=source.dataset.src;video.load();}try{await video.play();}catch{syncMotion();}}
 ['play','pause','ended'].forEach(name=>video.addEventListener(name,syncMotion));
 video.addEventListener('error',()=>{$('#motion-label').textContent='Video nicht verfügbar';motion.disabled=true;});
 motion.addEventListener('click',()=>{if(video.paused){manualPause=false;play();}else{manualPause=true;video.pause();}});
 if(!preference.matches&&!navigator.connection?.saveData)play();
 preference.addEventListener('change',e=>{if(e.matches)video.pause();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else if(!manualPause&&!preference.matches&&!navigator.connection?.saveData)play();});
}
const stack={dev:{items:['C#','JavaScript','Python','SQL'],comment:'// Von der Oberfläche bis zur Datenbank',description:'Frontends, Backends und Datenbanken. Die Technologie folgt der Aufgabe.'},infra:{items:['Linux','Windows','Hosting','Netzwerke'],comment:'// Das Fundament für verlässliche Systeme',description:'Server einrichten, Dienste verbinden und die passende Basis für den Betrieb schaffen.'},quality:{items:['IT-Security','QA','Bug-Hunting','Integration'],comment:'// Details prüfen. Zusammenhänge verstehen.',description:'Schwachstellen erkennen, Fehler eingrenzen und Software mit Hardware verbinden.'}};
const tabs=[...document.querySelectorAll('[data-stack]')];
function selectTab(tab){const data=stack[tab.dataset.stack];tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});$('#stack-panel').setAttribute('aria-labelledby',tab.id);$('#stack-items').replaceChildren(...data.items.map(item=>{const s=document.createElement('span');s.textContent='"'+item+'"';return s;}));$('.code-muted').textContent=data.comment;$('#stack-description').textContent=data.description;}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();selectTab(tabs[next]);}});});
const weather=$('#load-weather');
weather?.addEventListener('click',async()=>{
 weather.disabled=true;weather.textContent='Wetter wird geladen …';$('#weather-description').textContent='Verbindung zu Bright Sky wird hergestellt …';
 try{
  const response=await fetch('https://api.brightsky.dev/current_weather?lat=51.026&lon=7.564',{signal:AbortSignal.timeout(10000),credentials:'omit',referrerPolicy:'no-referrer'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();const c=data.weather;
  if(!c||!Number.isFinite(c.temperature)||!Number.isFinite(c.wind_speed_10)||typeof c.timestamp!=='string'||!Number.isFinite(Date.parse(c.timestamp)))throw new Error('Invalid data');
  const conditions={'clear-day':['Klarer Himmel','☀'],'clear-night':['Klare Nacht','☾'],'partly-cloudy-day':['Teilweise bewölkt','◐'],'partly-cloudy-night':['Teilweise bewölkt','◐'],'cloudy':['Bewölkt','☁'],'fog':['Neblig','≋'],'wind':['Windig','≋'],'rain':['Regen','☂'],'sleet':['Schneeregen','❄'],'snow':['Schneefall','❄'],'hail':['Hagel','❄'],'thunderstorm':['Gewitter','ϟ']};
  const [description,icon]=conditions[c.icon]||['Wechselhaft','◐'];
  $('#weather-temp').replaceChildren(document.createTextNode(Math.round(c.temperature)));const unit=document.createElement('small');unit.textContent='°C';$('#weather-temp').append(unit);
  $('#weather-icon').textContent=icon;$('#weather-description').textContent=description+' nahe Gummersbach';$('#weather-wind').textContent='Wind '+Math.round(c.wind_speed_10)+' km/h';$('#weather-updated').textContent='Stand '+new Intl.DateTimeFormat('de-DE',{hour:'2-digit',minute:'2-digit',timeZone:'Europe/Berlin'}).format(new Date(c.timestamp))+' Uhr';$('#weather-details').hidden=false;
  weather.textContent='Wetter aktualisieren ↻';
 }catch{$('#weather-description').textContent='Wetter gerade nicht erreichbar. Bitte versuche es erneut.';$('#weather-details').hidden=true;weather.textContent='Erneut versuchen ↻';}finally{weather.disabled=false;}
});
async function copyText(text,status){try{if(!navigator.clipboard)throw new Error('Unavailable');await navigator.clipboard.writeText(text);status.textContent='Kopiert.';}catch{status.textContent='Automatisches Kopieren ist nicht verfügbar. Bitte markiere und kopiere den Text.';}}
$('#copy-email')?.addEventListener('click',()=>copyText('ahmedhasan@mail.de',$('#copy-status')));
$('#copy-inquiry')?.addEventListener('click',()=>copyText($('#prepared-message').value,$('#inquiry-status')));
$('#save-contact')?.addEventListener('click',()=>{const card=['BEGIN:VCARD','VERSION:3.0','N:Hasan;Ahmed;;;','FN:Ahmed Hasan','TITLE:Softwareentwickler & IT-Allrounder','EMAIL;TYPE=INTERNET:ahmedhasan@mail.de','TEL;TYPE=CELL:+491772851043','ADR;TYPE=WORK:;;Hagener Straße 82A;Gummersbach;;51643;Deutschland','END:VCARD',''].join('\r\n');const url=URL.createObjectURL(new Blob([card],{type:'text/vcard;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Ahmed-Hasan.vcf';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelectorAll('input[name="service"]').forEach(input=>{input.checked=input.value===link.dataset.service;});}));
$('#project-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const fields=new FormData(form);const message='Hallo Ahmed,\n\nich möchte mit dir über ein Projekt sprechen.\n\nBereich: '+fields.get('service')+'\nZeitraum: '+fields.get('timeline')+'\n\nMeine Idee:\n'+String(fields.get('message')).trim()+'\n\nViele Grüße';$('#prepared-message').value=message;$('#email-fallback').hidden=false;window.location.href='mailto:ahmedhasan@mail.de?subject='+encodeURIComponent('Projektanfrage: '+fields.get('service'))+'&body='+encodeURIComponent(message);});
if(nav&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -60% 0px'});document.querySelectorAll('main section[id]').forEach(s=>observer.observe(s));}
})();
