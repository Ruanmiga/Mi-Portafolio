
window.addEventListener('load',preload);

function preload(){
	const loader = document.getElementById('loader');
	loader.classList.remove('loading');
	
	loaded();
}
function loaded(){
const topbar = document.getElementById('topbar');
const menu_btn = document.getElementById('menu');
const menu_mobile_btn = document.getElementById('menu-screen');
const menu_mobile = document.getElementById('menu-mobile');

const menu_items = document.getElementById('menu-items').querySelectorAll('.menu-item');
const menu_desktop = document.getElementById('menu-desktop');
const menu_desktop_items = menu_desktop.querySelectorAll('.menu-item');

const sections = document.querySelectorAll('.sec');

menu_items.forEach((item) =>{
	item.addEventListener('click',() => menu_mobile.classList.remove('show'));
});
window.addEventListener("scroll",()=>{
	topbar.classList.toggle("show",window.scrollY > 70); 
});

menu_btn.addEventListener('click', ()=>{
	menu_mobile.classList.add('show');
});

menu_mobile_btn.addEventListener('click',()=>{
	menu_mobile.classList.remove('show');
});

const observer = new IntersectionObserver((entrys,observer)=>{
	entrys.forEach(entry => {
		if(entry.isIntersecting){
			var index = [...sections].indexOf(entry.target);
			
			menu_desktop_items.forEach((item,key) => {
				if(key != index){
					if(item.classList.contains('active')){
						item.classList.remove('active');
					}
				}
				if(key == index){
					item.classList.add('active');
				}
			});
			
			menu_items.forEach((item,key) => {
				if(key != index){
					if(item.classList.contains('active')){
						item.classList.remove('active');
					}
				}
				if(key == index){
					item.classList.add('active');
				}
			});
		}
	})
},{
	rootMargin: "-130px 0px 0px 0px",
	threshold: 0.2
});

sections.forEach(section => observer.observe(section));

loadConst();
}
