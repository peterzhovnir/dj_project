const swiper = new Swiper('.swiper', {
    // Optional parameters,
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
  
    // // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper__nav_next',
      prevEl: '.swiper__nav_prev',
    },
    breakpoints: {
      // when window width is <= 499px
      425: {
          slidesPerView: 1,
          spaceBetweenSlides: 30
      },
      768: {
        slidesPerView: 2,
        spaceBetweenSlides: 30
      },
      // when window width is <= 999px
      999: {
          slidesPerView: 3,
          spaceBetweenSlides: 30
      }
  }
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // }
  });

let menuCheck = document.getElementById('menuToggle');
menuCheck.onclick = function()
{console.log("!!!");
};


// ================VIDEO==================
 
const video_play = document.getElementById("video_play_btn");

const video_source = document.getElementsByClassName("video__media");


video_play.onclick = function(){
  video_source.paused = true;
};