const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const escapeHtml=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

const search=$('[data-directory-search]');
if(search){
  const cards=$$('[data-integration]');
  const filters=$$('[data-filter]');
  let category='all';
  function apply(){
    const q=search.value.trim().toLowerCase();
    cards.forEach(card=>{
      const matchesText=!q||card.textContent.toLowerCase().includes(q);
      const matchesCat=category==='all'||card.dataset.category===category;
      card.hidden=!(matchesText&&matchesCat);
    });
  }
  search.addEventListener('input',apply);
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    category=btn.dataset.filter; apply();
  }));
}

const run=$('[data-run-playground]');
if(run){
  run.addEventListener('click',()=>{
    const input=$('[data-playground-input]');
    const out=$('[data-playground-output]');
    try{
      const payload=JSON.parse(input.value);
      out.textContent=JSON.stringify({jsonrpc:'2.0',result:{content:[{type:'text',text:`Simulated ${payload.method||'request'} completed successfully.`}],server:'playground-demo',latency_ms:12},id:payload.id??1},null,2);
    }catch(e){out.textContent=JSON.stringify({error:'Invalid JSON',message:e.message},null,2)}
  });
}

$$('form[data-static-form]').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();
  const msg=form.querySelector('[data-form-message]');
  if(msg) msg.textContent='Form captured locally. Connect your production form endpoint before accepting submissions.';
}));
