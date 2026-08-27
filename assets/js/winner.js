// GANIT SETU - Daily Champion (connected to current Home Page)
const winnerDB = window.supabaseClient;
const defaultImage = 'assets/images/user.png';
const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const photo = s => s?.photo || s?.photo_url || s?.profile_photo || s?.image || defaultImage;
const cls = s => s?.class_name || s?.class || s?.student_class || '';
const marks = s => s?.marks ?? s?.score ?? 0;

function podium(s,r){
  if(!s) return `<div class="gs-podium-card empty"><div class="gs-podium-rank">${r}</div><b>कोई परिणाम उपलब्ध नहीं</b></div>`;
  const type=r===1?'gold':r===2?'silver':'bronze';
  return `<article class="gs-podium-card ${type}">
    <div class="gs-podium-crown">${r===1?'👑':'🏆'}</div>
    <div class="gs-podium-photo"><img src="${esc(photo(s))}" onerror="this.onerror=null;this.src='${defaultImage}'"></div>
    <div class="gs-podium-rank">${r}</div>
    ${r===1?'<div class="gs-winner-ribbon">विजेता</div>':''}
    <h3 class="gs-podium-name">${esc(s.name||s.student_name||'Student')}</h3>
    ${cls(s)?`<div class="gs-podium-class">${esc(cls(s))}</div>`:''}
    <div class="gs-podium-score">🏆 <strong>${esc(marks(s))}</strong><small>/100</small></div>
  </article>`;
}

function renderChampion(data){
  const box=document.getElementById('dailyTop3');
  if(!box) return;
  box.innerHTML = `${podium(data[1],2)}${podium(data[0],1)}${podium(data[2],3)}`;
}

function card(s,i){
  const r=i+1;
  return `<article class="gs-top10-card ${r===1?'is-first':''}">
    <div class="gs-top10-rank">${r}</div>
    <div class="gs-top10-photo"><img src="${esc(photo(s))}" onerror="this.onerror=null;this.src='${defaultImage}'"></div>
    <div class="gs-top10-name">${esc(s.name||s.student_name||'Student')}</div>
    <div class="gs-top10-class">${esc(cls(s)||'Student')}</div>
    <div class="gs-top10-score">🏆 <strong>${esc(marks(s))}</strong><span>/100</span></div>
  </article>`;
}

function renderTopTen(data){
  const list=document.getElementById('dailyTop10List');
  if(!list) return;
  if(!data.length){ list.innerHTML='<div class="gs-no-winners">अभी कोई परिणाम उपलब्ध नहीं है।</div>'; return; }
  list.innerHTML=`<div class="gs-top10-wrap"><button class="gs-scroll-btn left" type="button" aria-label="पिछला">‹</button><div class="gs-top10-track" id="gsTop10Track">${data.map(card).join('')}</div><button class="gs-scroll-btn right" type="button" aria-label="अगला">›</button></div>`;
  const track=document.getElementById('gsTop10Track');
  list.querySelector('.left').onclick=()=>track.scrollBy({left:-Math.max(220,track.clientWidth*.75),behavior:'smooth'});
  list.querySelector('.right').onclick=()=>track.scrollBy({left:Math.max(220,track.clientWidth*.75),behavior:'smooth'});
}

async function loadWinners(){
  if(!winnerDB){ console.error('Supabase client नहीं मिला'); return; }
  try{
    const {data,error}=await winnerDB.from('results').select('*').order('marks',{ascending:false}).limit(10);
    if(error) throw error;
    const students=Array.isArray(data)?data:[];
    renderChampion(students);
    renderTopTen(students);
  }catch(err){
    console.error('Winner load error:',err);
    const top3=document.getElementById('dailyTop3');
    if(top3) top3.innerHTML='<div class="gs-no-winners">परिणाम लोड नहीं हो सके।</div>';
  }
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',loadWinners);
else loadWinners();
window.loadWinners=loadWinners;
