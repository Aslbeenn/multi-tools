const tools=[
{id:'word',g:'word-counter.html',e:'📝',t:'عداد الكلمات',d:'احسب الكلمات والأحرف والجمل.',c:'نصوص',k:'word counter compteur de mots mots caractères words text texte'},
{id:'case',g:'text-case-converter.html',e:'🔤',t:'تحويل النص',d:'حوّل النص إلى أحرف كبيرة أو صغيرة.',c:'نصوص',k:'text converter convertisseur texte uppercase lowercase majuscules minuscules'},
{id:'password',g:'password-generator.html',e:'🔐',t:'مولد كلمات المرور',d:'أنشئ كلمة مرور عشوائية قوية.',c:'أمان',k:'password generator générateur mot passe sécurité security'},
{id:'calc',g:'calculator.html',e:'🧮',t:'آلة حاسبة',d:'احسب العمليات الحسابية بسرعة.',c:'أرقام',k:'calculator calculatrice calcul math maths'},
{id:'percent',g:'percentage-calculator.html',e:'📊',t:'حساب النسبة',d:'احسب النسب المئوية بسهولة.',c:'أرقام',k:'percentage pourcentage percent ratio نسبة'},
{id:'age',g:'age-calculator.html',e:'🎂',t:'حساب العمر',d:'احسب عمرك بالسنوات والأشهر والأيام.',c:'أرقام',k:'age calculator calculateur âge birthday date naissance'},
{id:'image',g:'image-compressor.html',e:'🖼️',t:'ضغط الصور',d:'صغّر حجم الصورة محليًا.',c:'صور',k:'image compressor compression image photo réduire taille'},
{id:'dataurl',g:'image-to-base64.html',e:'📦',t:'صورة إلى Base64',d:'حوّل الصورة إلى Data URL.',c:'صور',k:'image base64 data url photo encode'},
{id:'json',g:'json-formatter.html',e:'{ }',t:'منسق JSON',d:'نسّق JSON وتحقق من صحته.',c:'مطورون',k:'json formatter formateur développeur developer data'},
{id:'timestamp',g:'unix-timestamp.html',e:'⏱️',t:'Unix Timestamp',d:'حوّل الوقت إلى Unix والعكس.',c:'مطورون',k:'unix timestamp date time temps développeur api'},
{id:'url',g:'url-encoder.html',e:'🔗',t:'ترميز URL',d:'Encode أو Decode لعناوين URL.',c:'مطورون',k:'url encoder encodeur décoder decoder lien link'},
{id:'color',g:'hex-to-rgb.html',e:'🎨',t:'HEX إلى RGB',d:'حوّل لون HEX إلى RGB.',c:'مطورون',k:'hex rgb color couleur couleur code couleur'}
];
const grid=document.getElementById('toolsGrid'),sideNav=document.getElementById('sideNav'),mobileFilters=document.getElementById('mobileFilters'),count=document.getElementById('resultCount'),empty=document.getElementById('emptyState'),modal=document.getElementById('modal'),body=document.getElementById('modalBody'),title=document.getElementById('modalTitle'),icon=document.getElementById('modalIcon');let active='الكل';const cats=['الكل',...new Set(tools.map(x=>x.c))];const icons={الكل:'⌂',نصوص:'T',أمان:'◇',أرقام:'#',صور:'▧',مطورون:'{}'};function nav(c){return '<button class="side-item '+(active===c?'active':'')+'" data-cat="'+c+'">'+(icons[c]||'•')+' '+c+'</button>'}function bindFilters(){
  document.querySelectorAll('[data-cat]').forEach(b=>{
    b.onclick=()=>{
      active=b.dataset.cat;
      sideNav.innerHTML=cats.map(nav).join('');
      mobileFilters.innerHTML=cats.map(c=>'<button class="filter '+(c===active?'active':'')+'" data-cat="'+c+'">'+c+'</button>').join('');
      bindFilters();
      render();
      if(window.innerWidth<=900)closeSidebar();
    };
  });
}sideNav.innerHTML=cats.map(nav).join('');mobileFilters.innerHTML=cats.map(c=>'<button class="filter '+(c==='الكل'?'active':'')+'" data-cat="'+c+'">'+c+'</button>').join('');bindFilters();const normalize=s=>String(s||'').toLocaleLowerCase('ar').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/\s+/g,' ').trim();
function searchScore(x,q){if(!q)return 1;const hay=normalize([x.t,x.d,x.c,x.k].join(' '));const terms=normalize(q).split(' ').filter(Boolean);let score=0;for(const term of terms){if(hay.includes(term))score+=term.length>=4?3:1;else return 0}if(normalize(x.t).startsWith(normalize(q)))score+=8;return score}
function render(){const q=document.getElementById('search').value.trim();const list=tools.filter(x=>active==='الكل'||x.c===active).map(x=>({x,s:searchScore(x,q)})).filter(o=>o.s>0).sort((a,b)=>b.s-a.s).map(o=>o.x);grid.innerHTML=list.map(x=>'<article class="card" data-id="'+x.id+'" tabindex="0"><div class="card-top"><div class="emoji">'+x.e+'</div><span class="card-cat">'+x.c+'</span></div><h3>'+x.t+'</h3><p>'+x.d+'</p><div class="card-open"><span>فتح الأداة ←</span><a href="'+x.g+'" class="card-guide" onclick="event.stopPropagation()">شرح الأداة</a></div></article>').join('');count.textContent=list.length+' أداة';empty.classList.toggle('hidden',list.length>0);grid.classList.toggle('hidden',!list.length);grid.querySelectorAll('.card').forEach(c=>{c.onclick=()=>openTool(c.dataset.id);c.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openTool(c.dataset.id)}})}
render();window.addEventListener('languagechange',()=>{sideNav.innerHTML=cats.map(nav).join('');mobileFilters.innerHTML=cats.map(c=>'<button class="filter '+(c===active?'active':'')+'" data-cat="'+c+'">'+c+'</button>').join('');bindFilters();render()});const searchInput=document.getElementById('search');searchInput.type='search';searchInput.setAttribute('role','searchbox');searchInput.setAttribute('aria-label','البحث عن أداة');searchInput.setAttribute('autocomplete','off');searchInput.oninput=render;document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.getElementById('search').focus()}if(e.key==='Escape')closeModal()});function theme(){const d=document.body.classList.contains('dark');const b=document.getElementById('themeBtn');if(b)b.querySelector('small').textContent=d?'☀':'☾';const t=document.getElementById('topTheme');if(t)t.textContent=d?'☀':'☾';localStorage.setItem('theme',d?'dark':'light')}if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');theme();function toggleTheme(){document.body.classList.toggle('dark');theme()}document.getElementById('themeBtn').onclick=toggleTheme;document.getElementById('topTheme').onclick=toggleTheme;function closeModal(){modal.classList.add('hidden')}document.getElementById('close').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};const sb=document.querySelector('.sidebar'),ov=document.getElementById('mobileOverlay'),menu=document.getElementById('mobileMenu');

function isMobile(){return window.matchMedia('(max-width: 900px)').matches}

function closeSidebar(){
  sb.classList.remove('open');
  ov.classList.add('hidden');
}

function openSidebar(){
  sb.classList.add('open');
  ov.classList.remove('hidden');
}

menu.addEventListener('click',e=>{
  e.preventDefault();
  e.stopPropagation();
  if(!isMobile()) return;
  sb.classList.contains('open') ? closeSidebar() : openSidebar();
});

ov.addEventListener('click',closeSidebar);

sb.addEventListener('click',e=>{
  e.stopPropagation();
});

sideNav.addEventListener('click',e=>{
  const item=e.target.closest('[data-cat]');
  if(item && isMobile()) closeSidebar();
});

document.addEventListener('pointerdown',e=>{
  if(!isMobile() || !sb.classList.contains('open')) return;
  if(e.target.closest('.sidebar') || e.target.closest('#mobileMenu')) return;
  closeSidebar();
},true);

window.addEventListener('resize',()=>{
  if(!isMobile()) closeSidebar();
});

function openTool(id){const t=tools.find(x=>x.id===id);const tr=s=>window.siteTranslate?window.siteTranslate(s):s;title.textContent=tr(t.t);icon.textContent=t.e;body.innerHTML=templates[id]();modal.classList.remove('hidden');bind(id)}
const templates={
word:()=>`<textarea id="txt" placeholder="اكتب أو الصق النص هنا..."></textarea><button class="btn" id="go">تحليل النص</button><div class="out" id="out"></div>`,
case:()=>`<textarea id="txt" placeholder="اكتب النص هنا..."></textarea><button class="btn" id="up">أحرف كبيرة</button><button class="btn" id="low">أحرف صغيرة</button>`,
password:()=>`<label>طول كلمة المرور<input id="len" type="number" min="4" max="128" value="16"></label><button class="btn" id="go">توليد كلمة مرور</button><div class="out" id="out"></div>`,
calc:()=>`<label>العملية الحسابية<input id="expr" inputmode="decimal" placeholder="مثال: (25+5)*2/3"></label><button class="btn" id="go">احسب</button><div class="out" id="out"></div>`,
percent:()=>`<label>النسبة<input id="a" type="number" placeholder="النسبة"></label><label>من العدد<input id="b" type="number" placeholder="العدد"></label><button class="btn" id="go">احسب</button><div class="out" id="out"></div>`,
age:()=>`<label>تاريخ الميلاد<input id="date" type="date"></label><button class="btn" id="go">احسب العمر</button><div class="out" id="out"></div>`,
image:()=>`<label>اختر صورة<input id="file" type="file" accept="image/*"></label><label>الجودة<input id="quality" type="range" min=".1" max="1" step=".1" value=".7"></label><button class="btn" id="go">ضغط وتنزيل</button><div class="out" id="out"></div>`,
dataurl:()=>`<label>اختر صورة<input id="file" type="file" accept="image/*"></label><button class="btn" id="go">تحويل إلى Base64</button><textarea id="out" placeholder="ستظهر النتيجة هنا"></textarea>`,
json:()=>`<textarea id="txt" placeholder='{"name":"Hassan"}'></textarea><button class="btn" id="go">تنسيق JSON</button><div class="out" id="out"></div>`,
timestamp:()=>`<label>Timestamp أو تاريخ<input id="value" placeholder="اتركه فارغًا للوقت الحالي"></label><button class="btn" id="go">تحويل</button><div class="out" id="out"></div>`,
url:()=>`<textarea id="txt" placeholder="النص أو الرابط"></textarea><button class="btn" id="enc">Encode</button><button class="btn" id="dec">Decode</button><div class="out" id="out"></div>`,
color:()=>`<label>لون HEX<input id="hex" value="#6d5dfc"></label><button class="btn" id="go">تحويل</button><div class="out" id="out"></div>`
};
function bind(id){const $=s=>document.querySelector(s);
if(id==='word')$('#go').onclick=()=>{let x=$('#txt').value;$('#out').textContent=`الكلمات: ${x.trim()?x.trim().split(/\s+/).length:0}\nالأحرف: ${x.length}\nالجمل: ${(x.match(/[.!؟?]+/g)||[]).length}`};
if(id==='case'){$('#up').onclick=()=>$('#txt').value=$('#txt').value.toUpperCase();$('#low').onclick=()=>$('#txt').value=$('#txt').value.toLowerCase()}
if(id==='password')$('#go').onclick=()=>{let n=Math.max(4,Math.min(128,+$('#len').value||16)),s='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=',r='',a=new Uint32Array(n);crypto.getRandomValues(a);a.forEach(v=>r+=s[v%s.length]);$('#out').textContent=r};
if(id==='calc')$('#go').onclick=()=>{try{let e=$('#expr').value;if(!/^[0-9+*/%().\s-]+$/.test(e))throw 0;$('#out').textContent=Function('return '+e)()}catch{$('#out').textContent='تعبير غير صالح'}};
if(id==='percent')$('#go').onclick=()=>$('#out').textContent=(+$('#a').value*+$('#b').value/100);
if(id==='age')$('#go').onclick=()=>{let d=new Date($('#date').value),n=new Date();if(!$('#date').value||isNaN(d))return;let y=n.getFullYear()-d.getFullYear();if(n<new Date(n.getFullYear(),d.getMonth(),d.getDate()))y--;$('#out').textContent=y+' سنة'};
if(id==='json')$('#go').onclick=()=>{try{$('#out').textContent=JSON.stringify(JSON.parse($('#txt').value),null,2)}catch(e){$('#out').textContent='JSON غير صالح: '+e.message}};
if(id==='timestamp')$('#go').onclick=()=>{let v=$('#value').value.trim();if(!v)$('#out').textContent=Math.floor(Date.now()/1000);else{let n=Number(v);$('#out').textContent=Number.isFinite(n)?new Date(n*1000).toLocaleString('ar-DZ'):Math.floor(new Date(v).getTime()/1000)}};
if(id==='url'){$('#enc').onclick=()=>$('#out').textContent=encodeURIComponent($('#txt').value);$('#dec').onclick=()=>{try{$('#out').textContent=decodeURIComponent($('#txt').value)}catch{$('#out').textContent='نص غير صالح'}}}
if(id==='color')$('#go').onclick=()=>{let h=$('#hex').value.replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');let n=parseInt(h,16);$('#out').textContent=/^[0-9a-f]{6}$/i.test(h)?`RGB(${n>>16}, ${n>>8&255}, ${n&255})`:'HEX غير صالح'};
if(id==='image'){let f=$('#file');$('#go').onclick=()=>{if(!f.files[0])return;let im=new Image();im.onload=()=>{let c=document.createElement('canvas'),max=2000,s=Math.min(1,max/im.width,max/im.height);c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(b=>{let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='compressed.jpg';a.click();$('#out').textContent='تم الضغط • الحجم الجديد: '+Math.round(b.size/1024)+' KB'},'image/jpeg',+$('#quality').value)};im.src=URL.createObjectURL(f.files[0])}}
if(id==='dataurl')$('#go').onclick=()=>{let f=$('#file').files[0];if(!f)return;let r=new FileReader();r.onload=()=>$('#out').value=r.result;r.readAsDataURL(f)}
}