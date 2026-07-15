
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());
  document.querySelectorAll('.quoteForm').forEach(form => {
    form.addEventListener('submit', function(e){
      const endpoint=(window.AG_CONFIG||{}).formEndpoint;
      if(!endpoint){
        e.preventDefault();
        const box=form.parentElement.querySelector('.formStatus');
        if(box){box.style.display='block';box.textContent='The form is ready. Add your Google Sheets or email endpoint in assets/config.js to activate submissions.';}
      } else form.action=endpoint;
    });
  });
  const calc=document.querySelector('[data-refurb-calculator]');
  if(calc){
    const n=id=>parseFloat(document.getElementById(id)?.value)||0;
    const money=v=>'£'+Math.round(v).toLocaleString('en-GB');
    const update=()=>{
      const subtotal=n('labour')+n('materials')+n('waste')+n('other');
      const contingency=subtotal*(n('contingency')/100);
      document.getElementById('subtotalOut').textContent=money(subtotal);
      document.getElementById('contOut').textContent=money(contingency);
      document.getElementById('totalOut').textContent=money(subtotal+contingency);
    };
    calc.querySelectorAll('input').forEach(i=>i.addEventListener('input',update));update();
  }
});
