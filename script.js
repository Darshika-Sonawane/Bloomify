let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-3');

menu.addEventListener('click',()=>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 250){
        header.classList.add('active');
    }else{
        header.classList.remove('active');
    }
};

var swiper = new Swiper(".home-slider", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

let countDate = new Date('July 25, 2025 00:00:00').getTime();   // mention end date of sale
function countDown(){
  let now = new Date().getTime();
  gap = countDate - now;
  
  let second = 1000;
  let minute = second * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let d = Math.floor(gap / (day));
  let h = Math.floor((gap % (day)) / (hour));
  let m = Math.floor((gap % (hour)) / (minute));
  let s = Math.floor((gap % (minute)) / (second));

  document.getElementById('day').innerText = d;
  document.getElementById('hour').innerText = h;
  document.getElementById('minute').innerText = m;
  document.getElementById('second').innerText = s;
}
setInterval (function(){
  countDown();
},1000);
