
const menu=document.querySelector('.menu'), nav=document.querySelector('.nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)})}
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));

const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
 const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');ob.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px'});
 els.forEach((e,i)=>{e.style.setProperty('--reveal-delay',`${Math.min(i*70,280)}ms`);ob.observe(e)});
}else els.forEach(e=>e.classList.add('show'));

const hero=document.querySelector('.hero');
if(hero&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--hero-x',`${((e.clientX-r.left)/r.width-.5)*24}px`);hero.style.setProperty('--hero-y',`${((e.clientY-r.top)/r.height-.5)*24}px`)});
 hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--hero-x','0px');hero.style.setProperty('--hero-y','0px')});
}

const form=document.querySelector('#contactForm'), success=document.querySelector('#success');
if(form&&success)form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}success.classList.add('show');form.reset()});
