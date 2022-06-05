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
//PLAY/PAUSE
const videoPlayBtn = document.getElementById("video_play_btn");
const video = document.querySelector(".video__media");
const timeline = document.querySelector(".player__timeline");
const timelineBar = document.querySelector(".timeline-bar");

function togglePlayPause() {
  if(video.paused){
    videoPlayBtn.className = "pause";
    video.play();
  } else{
    videoPlayBtn.className = "play";
    video.pause();
  }
}
videoPlayBtn.onclick = function(){
  togglePlayPause();
};

//TIMELINE
video.addEventListener("timeupdate", function(){
  let timelinePos = video.currentTime / video.duration;
  timelineBar.style.width = timelinePos *100 + "%";
});

//DURATION
const timeElapsed = document.getElementById("time-elapsed");
const duration = document.getElementById("duration"); 

function formatTime(timeInSec) {
  const result = new Date(timeInSec * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  const time = formatTime(videoDuration);


  duration.innerText = `${time.minutes}:${time.seconds}`;
  duration.setAttribute('date-time', `${time.minutes}m ${time.seconds}s`);
}
function updateTimeElapsed() {
  const time = formatTime(Math.round(video.currentTime));
  timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
}




video.addEventListener('loadedmetadata', initializeVideo);

video.addEventListener('timeupdate', updateTimeElapsed);

//TIMELINE CLICK
timeline.addEventListener('click', (e) =>{
  const ProgressTime = (e.offsetX/timeline.offsetWidth) * video.duration;
  video.currentTime = ProgressTime;
});