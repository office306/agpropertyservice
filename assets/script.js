document.addEventListener('DOMContentLoaded', function () {
  const cfg = window.AG_CONFIG || {};
  document.querySelectorAll('[data-phone]').forEach(el => el.textContent = cfg.phone || 'ADD_PHONE_NUMBER');
  document.querySelectorAll('[data-email]').forEach(el => el.textContent = cfg.email || 'ADD_EMAIL_ADDRESS');
  document.querySelectorAll('[data-phone-link]').forEach(el => el.href = cfg.phone ? 'tel:' + cfg.phone.replace(/\s+/g,'') : '#');
  document.querySelectorAll('[data-email-link]').forEach(el => el.href = cfg.email ? 'mailto:' + cfg.email : '#');
  document.querySelectorAll('[data-whatsapp-link]').forEach(el => {
    if(cfg.whatsapp){ el.href='https://wa.me/'+cfg.whatsapp.replace(/\D/g,''); }
    else { el.style.display='none'; }
  });
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('.quoteForm').forEach(form => {
    form.addEventListener('submit', function(e){
      const endpoint = cfg.formEndpoint;
      if(!endpoint){
        e.preventDefault();
        const status = form.parentElement.querySelector('.formStatus');
        status.style.display='block';
        status.textContent='The form is ready. Add your email or CRM endpoint in assets/config.js before publishing.';
        return;
      }
      form.action = endpoint;
    });
  });
});
document.addEventListener('DOMContentLoaded', function(){
  const calc=document.querySelector('[data-refurb-calculator]');
  if(calc){
    const n=id=>parseFloat(document.getElementById(id)?.value)||0;
    const money=v=>'£'+Math.round(v).toLocaleString('en-GB');
    const update=()=>{
      const labour=n('labour'),materials=n('materials'),waste=n('waste'),other=n('other'),cont=n('contingency');
      const subtotal=labour+materials+waste+other;
      const contingency=subtotal*(cont/100);
      const total=subtotal+contingency;
      document.getElementById('subtotalOut').textContent=money(subtotal);
      document.getElementById('contOut').textContent=money(contingency);
      document.getElementById('totalOut').textContent=money(total);
    };
    calc.querySelectorAll('input').forEach(i=>i.addEventListener('input',update));
    update();
  }
});
