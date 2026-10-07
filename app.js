const tools=[
{id:'word',e:'📝',t:'عداد الكلمات',d:'احسب الكلمات والأحرف والجمل.'},
{id:'case',e:'🔤',t:'تحويل النص',d:'حوّل النص إلى أحرف كبيرة أو صغيرة.'},
{id:'password',e:'🔐',t:'مولد كلمات المرور',d:'أنشئ كلمة مرور عشوائية قوية.'},
{id:'calc',e:'🧮',t:'آلة حاسبة',d:'احسب العمليات الحسابية بسرعة.'},
{id:'percent',e:'📊',t:'حساب النسبة',d:'احسب النسب المئوية بسهولة.'},
{id:'age',e:'🎂',t:'حساب العمر',d:'احسب عمرك بالسنوات والأشهر والأيام.'},
{id:'image',e:'🖼️',t:'ضغط الصور',d:'صغّر حجم الصورة محليًا.'},
{id:'dataurl',e:'📦',t:'صورة إلى Base64',d:'حوّل الصورة إلى Data URL.'},
{id:'json',e:'{ }',t:'منسق JSON',d:'نسّق JSON وتحقق من صحته.'},
{id:'timestamp',e:'⏱️',t:'Unix Timestamp',d:'حوّل الوقت إلى Unix والعكس.'},
{id:'url',e:'🔗',t:'ترميز URL',d:'Encode أو Decode لعناوين URL.'},
{id:'color',e:'🎨',t:'HEX إلى RGB',d:'حوّل لون HEX إلى RGB.'}
];
const grid=document.getElementById('tools'), modal=document.getElementById('modal'), body=document.getElementById('modalBody'), title=document.getElementById('modalTitle');
function render(q=''){grid.innerHTML=tools.filter(x=>(x.t+x.d).includes(q)).map(x=>`<article class="card" data-id="${x.id}"><div class="emoji">${x.e}</div><h3>${x.t}</h3><p>${x.d}</p></article>`).join('');document.querySelectorAll('.card').forEach(c=>c.onclick=()=>openTool(c.dataset.id))}
render();document.getElementById('search').oninput=e=>render(e.target.value);
document.getElementById('close').onclick=()=>modal.classList.add('hidden');modal.onclick=e=>{if(e.target===modal)modal.classList.add('hidden')};
document.getElementById('themeBtn').onclick=()=>document.body.classList.toggle('dark');

function openTool(id){const t=tools.find(x=>x.id===id);title.textContent=t.t;body.innerHTML=templates[id]();modal.classList.remove('hidden');bind(id)}
const templates={
word:()=>`<textarea id="txt" placeholder="اكتب أو الصق النص هنا..."></textarea><button class="btn" id="go">احسب</button><div class="out" id="out"></div>`,
case:()=>`<textarea id="txt" placeholder="النص..."></textarea><button class="btn" id="up">أحرف كبيرة</button> <button class="btn" id="low">أحرف صغيرة</button>`,
password:()=>`<label>الطول <input id="len" type="number" min="4" max="128" value="16"></label><button class="btn" id="go">توليد</button><div class="out" id="out"></div>`,
calc:()=>`<input id="expr" placeholder="مثال: (25+5)*2/3"><button class="btn" id="go">احسب</button><div class="out" id="out"></div>`,
percent:()=>`<input id="a" type="number" placeholder="النسبة"><input id="b" type="number" placeholder="من العدد"><button class="btn" id="go">احسب</button><div class="out" id="out"></div>`,
age:()=>`<input id="date" type="date"><button class="btn" id="go">احسب العمر</button><div class="out" id="out"></div>`,
image:()=>`<input id="file" type="file" accept="image/*"><label>الجودة <input id="quality" type="range" min=".1" max="1" step=".1" value=".7"></label><button class="btn" id="go">ضغط وتنزيل</button><div class="out" id="out"></div>`,
dataurl:()=>`<input id="file" type="file" accept="image/*"><button class="btn" id="go">تحويل</button><textarea id="out"></textarea>`,
json:()=>`<textarea id="txt" placeholder='{"name":"Hassan"}'></textarea><button class="btn" id="go">تنسيق</button><div class="out" id="out"></div>`,
timestamp:()=>`<input id="value" placeholder="اتركه فارغًا للوقت الحالي"><button class="btn" id="go">تحويل</button><div class="out" id="out"></div>`,
url:()=>`<textarea id="txt" placeholder="النص أو الرابط"></textarea><button class="btn" id="enc">Encode</button> <button class="btn" id="dec">Decode</button><div class="out" id="out"></div>`,
color:()=>`<input id="hex" value="#4f46e5"><button class="btn" id="go">تحويل</button><div class="out" id="out"></div>`
};
function bind(id){
const $=s=>document.querySelector(s);
if(id==='word')$('#go').onclick=()=>{let x=$('#txt').value;$('#out').textContent=`الكلمات: ${x.trim()?x.trim().split(/\s+/).length:0}\nالأحرف: ${x.length}\nالجمل: ${(x.match(/[.!؟?]+/g)||[]).length}`};
if(id==='case'){ $('#up').onclick=()=>$('#txt').value=$('#txt').value.toUpperCase(); $('#low').onclick=()=>$('#txt').value=$('#txt').value.toLowerCase()}
if(id==='password')$('#go').onclick=()=>{let n=Math.max(4,Math.min(128,+$('#len').value||16)),s='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=';let r='';crypto.getRandomValues(new Uint32Array(n)).forEach(v=>r+=s[v%s.length]);$('#out').textContent=r};
if(id==='calc')$('#go').onclick=()=>{try{let e=$('#expr').value;if(!/^[0-9+*/%().\s-]+$/.test(e))throw 0;$('#out').textContent=Function('return '+e)()}catch{$('#out').textContent='تعبير غير صالح'}};
if(id==='percent')$('#go').onclick=()=>$('#out').textContent=(+$('#a').value*+$('#b').value/100);
if(id==='age')$('#go').onclick=()=>{let d=new Date($('#date').value),n=new Date();if(!$('#date').value||isNaN(d))return;let y=n.getFullYear()-d.getFullYear();if(n<new Date(n.getFullYear(),d.getMonth(),d.getDate()))y--;$('#out').textContent=y+' سنة'};
if(id==='json')$('#go').onclick=()=>{try{$('#out').textContent=JSON.stringify(JSON.parse($('#txt').value),null,2)}catch(e){$('#out').textContent='JSON غير صالح: '+e.message}};
if(id==='timestamp')$('#go').onclick=()=>{let v=$('#value').value.trim();if(!v)$('#out').textContent=Math.floor(Date.now()/1000);else{let n=Number(v);$('#out').textContent=Number.isFinite(n)?new Date(n*1000).toLocaleString('ar-DZ'):Date.parse(v)/1000}};
if(id==='url'){$('#enc').onclick=()=>$('#out').textContent=encodeURIComponent($('#txt').value);$('#dec').onclick=()=>{try{$('#out').textContent=decodeURIComponent($('#txt').value)}catch{$('#out').textContent='نص غير صالح'}}}
if(id==='color')$('#go').onclick=()=>{let h=$('#hex').value.replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');let n=parseInt(h,16);$('#out').textContent=/^[0-9a-f]{6}$/i.test(h)?`RGB(${n>>16}, ${n>>8&255}, ${n&255})`:'HEX غير صالح'};
if(id==='image'){let f=$('#file');$('#go').onclick=()=>{if(!f.files[0])return;let im=new Image();im.onload=()=>{let c=document.createElement('canvas'),max=2000,s=Math.min(1,max/im.width,max/im.height);c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);c.toBlob(b=>{let a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='compressed.jpg';a.click();$('#out').textContent='تم الضغط. الحجم الجديد: '+Math.round(b.size/1024)+' KB'},'image/jpeg',+$('#quality').value)};im.src=URL.createObjectURL(f.files[0])}}
if(id==='dataurl'){$('#go').onclick=()=>{let f=$('#file').files[0];if(!f)return;let r=new FileReader();r.onload=()=>$('#out').value=r.result;r.readAsDataURL(f)}}
}