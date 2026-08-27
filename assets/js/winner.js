alert("NEW WINNER JS LOADED");
const winnerDB=window.supabaseClient;
const defaultImage='assets/images/user.png';
const e=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const photo=s=>s.photo||s.photo_url||s.profile_photo||defaultImage;
const cls=s=>s.class_name||s.class||s.student_class||'';
const marks=s=>s.marks??s.score??0;

function podium(s,r){
 if(!s)return `<div class="gs-podium-card empty"><div class="gs-empty-medal">${r}</div><b>कोई परिणाम उपलब्ध नहीं</b></div>`;
 const type=r===1?'gold':r===2?'silver':'bronze';
 return `<article class="gs-podium-card ${type}">
 <div class="gs-podium-crown">👑</div>
 <div class="gs-podium-photo"><img src="${e(photo(s))}" onerror="this.onerror=null;this.src='${defaultImage}'"></div>
 <div class="gs-podium-rank">${r}</div><div class="gs-podium-body">
 ${r===1?'<div class="gs-winner-ribbon">विजेता</div>':''}
 <h3 class="gs-podium-name">${e(s.name||'Student')}</h3>
 ${cls(s)?`<div class="gs-podium-class">${e(cls(s))}</div>`:''}
 <div class="gs-podium-score">🏆 <strong>${e(marks(s))}</strong><small>/ 100</small></div>
 </div></article>`;
}
function renderChampion(data){
 const box=document.getElementById('dailyChampion');if(!box)return;
 box.innerHTML=`<section class="daily-champions-dashboard" id="dailyChampionsDashboard">
 <div class="daily-champion-banner"><div class="dc-trophy">🏆</div><div class="dc-heading"><div class="dc-title">DAILY CHAMPION</div><div class="dc-subtitle">★ आज के टॉप 3 विजेता ★</div></div><div class="dc-sparkles">✦ ★ ✧</div></div>
 <div class="daily-top3">${podium(data[1],2)}${podium(data[0],1)}${podium(data[2],3)}</div></section>`;
}
function card(s,i){const r=i+1;return `<article class="gs-top10-card ${r===1?'is-first':''}"><div class="gs-top10-rank">${r}</div><div class="gs-top10-photo"><img src="${e(photo(s))}" onerror="this.onerror=null;this.src='${defaultImage}'"></div><div class="gs-top10-name">${e(s.name||'Student')}</div><div class="gs-top10-class">${e(cls(s)||'Student')}</div><div class="gs-top10-score">🏆 <strong>${e(marks(s))}</strong><span>/100</span></div></article>`;}
function renderTopTen(data){
 const list=document.getElementById('topTenList');if(!list)return;
 if(!data.length){list.innerHTML='<div class="gs-no-winners">अभी कोई परिणाम उपलब्ध नहीं है।</div>';return;}
 list.innerHTML=`<section class="gs-top10-board"><div class="daily-top10-title">🏆 TOP 10 सूची 🏆</div><div class="gs-top10-wrap"><button class="gs-scroll-btn left" type="button">‹</button><div class="gs-top10-track" id="gsTop10Track">${data.map(card).join('')}</div><button class="gs-scroll-btn right" type="button">›</button></div><div class="gs-top10-dots"><span class="active"></span><span></span><span></span><span></span><span></span></div><div class="gs-dc-congrats">✨ 🏅 आप सभी विजेताओं को <b>हार्दिक बधाई!</b> 🏆 ✨</div></section>`;
 const track=document.getElementById('gsTop10Track');
 list.querySelector('.left').onclick=()=>track.scrollBy({left:-Math.max(220,track.clientWidth*.75),behavior:'smooth'});
 list.querySelector('.right').onclick=()=>track.scrollBy({left:Math.max(220,track.clientWidth*.75),behavior:'smooth'});
}
async function loadWinners(){
 if(!winnerDB){console.error('Supabase client नहीं मिला');return;}
 try{const {data,error}=await winnerDB.from('results').select('*').order('marks',{ascending:false}).limit(10);if(error)throw error;const students=Array.isArray(data)?data:[];renderChampion(students);renderTopTen(students);}
 catch(err){console.error('Winner load error:',err);}
}
document.addEventListener('DOMContentLoaded',loadWinners);
window.loadWinners=loadWinners;
