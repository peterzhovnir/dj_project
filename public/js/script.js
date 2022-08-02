//===========================TRACKS===============================

var listAudio = [
    {
      name:"Kendrick Lamar - BLOOD.",
      src:"audio/01 BLOOD..mp3",
      duration:"08:47"
    },
    {
      name:"Kendrick Lamar - DNA.",
      src:"audio/02 DNA..mp3",
      duration:"08:47"
    },
    {
      name:"Kendrick Lamar - YAH.",
      src:"audio/03 YAH..mp3",
      duration:"08:47"
    },
    {
      name:"Kendrick Lamar - ELEMENT.",
      src:"audio/04 ELEMENT..mp3",
      duration:"08:47"
    },
    {
      name:"Kendrick Lamar - FEEL.",
      src:"audio/05 FEEL..mp3",
      duration:"08:47"
    },
    {
      name:"Kendrick Lamar - LOYALTY. (FEAT. RIHANNA.)",
      src:"audio/06 LOYALTY. (FEAT. RIHANNA.).mp3",
      duration:"08:47"
    },
    {
    name:"Kendrick Lamar - PRIDE.",
    src:"audio/07 PRIDE..mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - HUMBLE.",
    src:"audio/08 HUMBLE..mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - LUST.",
    src:"audio/09 LUST..mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - LOVE. (FEAT. ZACARI.)",
    src:"audio/10 LOVE. (FEAT. ZACARI.).mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - XXX. (FEAT. U2.)",
    src:"audio/11 XXX. (FEAT. U2.).mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - FEAR.",
    src:"audio/12 FEAR..mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - GOD.",
    src:"audio/13 GOD..mp3",
    duration:"08:47"
    },
    {
    name:"Kendrick Lamar - DUCKWORTH.",
    src:"audio/14 DUCKWORTH..mp3",
    duration:"08:47"
    }
  ];
//===========================/TRACKS===============================
//===========================EQVis===============================

const createEq = function (audioElement, cnv, canvasWrapper) {
    const ctx = cnv.getContext('2d');

    let sudioSource;
    let context;
    let analyser;

    let initialized;
 
    return () => {
        if (!initialized) {
            context = new AudioContext();
            analyser = context.createAnalyser();
            sudioSource = context.createMediaElementSource(audioElement);

            // audioSrc.load();
            // audioSrc.play();

            sudioSource.connect(analyser);
            analyser.connect(context.destination);

            analyser.fftSize = 256;
            initialized = true;
        }

        let bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
    
        let dataArray = new Uint8Array(bufferLength);



        function init() {
            cnv.width = canvasWrapper.clientWidth;
            cnv.height = canvasWrapper.clientHeight;
        }
        init();


        const numberOfRings = 2;
        const ringRadiusOffset = 40;
        const ringRadius =200;


        // var barWidth = (WIDTH / bufferLength) * 2.5;
        var x = 0;


        let centerX = cnv.width /2;
        let centerY = cnv.height /2;
        
        function upadteRings(){
            analyser.getByteFrequencyData(dataArray);


            // let radius = i * ringRadiusOffset + ringRadius;
            for (var i = 0; i < bufferLength; i++) {
            // console.log(dataArray[i]);
            let radius_in = ringRadius;
            let radius_out = (dataArray[i]/3)  + ringRadius;
            // drawRing(radius);
            drawLines(radius_in, radius_out,i);
            }
                
        }

        function drawLines(radius_in, radius_out,j) {
                
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 4;
                // let sideSwitch =true;
                const graphSize = 150;
                let leftAngle = graphSize;
                let righttAngle = -graphSize;


                    redredSides(radius_in, radius_out,j,leftAngle);
                    redredSides(radius_in, radius_out,j,righttAngle);
                

                // j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
            
        }

        function redredSides (radius_in, radius_out,j,sizeAngle) {
            let currentAngle = (Math.PI) + j * Math.PI/sizeAngle;
            let x_in = centerX + Math.cos(currentAngle) * radius_in;
            let y_in = centerY + Math.sin(currentAngle) * radius_in;

            let x_out = centerX + Math.cos(currentAngle) * radius_out;
            let y_out = centerY + Math.sin(currentAngle) * radius_out;

            ctx.beginPath();

            ctx.moveTo(x_in,y_in);
            ctx.lineTo(x_out,y_out);
            ctx.stroke();
            
            // sideSwitch = !sideSwitch;
        };



    //OLD


        // function init() {
        //     cnv.width = innerWidth;
        //     cnv.height = innerHeight;
        // }

        
        // init();


        // const numberOfRings = 2;
        // const ringRadiusOffset = 40;
        // const ringRadius =200;


        // let centerX = cnv.width /2;
        // let centerY = cnv.height /2;
        
        // function upadteRings(){
        //     for (let i = 0; i < numberOfRings; i++) {
        //         let radius = i * ringRadiusOffset + ringRadius;

        //         let radius_in = ringRadius;
        //         let radius_out = ringRadiusOffset + ringRadius;
        //         // drawRing(radius);
        //         drawLines(radius_in, radius_out)
                
        //     }
        // }

        // function drawLines(radius_in, radius_out) {
        //     for (let j = 0; j < 360; j++) {
                
        //         ctx.strokeStyle = 'red';
        //         ctx.lineWidth = 1;
                
        //         let currentAngle = j * Math.PI/180;
        //         let x_in = centerX + Math.cos(currentAngle) * radius_in;
        //         let y_in = centerY + Math.sin(currentAngle) * radius_in;

        //         let x_out = centerX + Math.cos(currentAngle) * radius_out;
        //         let y_out = centerY + Math.sin(currentAngle) * radius_out;

        //         ctx.beginPath();

        //         ctx.moveTo(x_in,y_in);
        //         ctx.lineTo(x_out,y_out);
        //         ctx.stroke();

        //         // j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
        //     }
        // }

    //OLD END

        // function drawRing(radius) {
        //     ctx.strokeStyle = 'red';
        //     ctx.lineWidth = 15;

        //     ctx.beginPath();
        //     // ctx.moveTo(centerX + 200, centerY);

        //     for (let j = 0; j < 360; j++) {
        
        //         let currentAngle = j * Math.PI / 180;
        //         let x = centerX + Math.cos(currentAngle) * radius;
        //         let y = centerY + Math.sin(currentAngle) * radius;

        //         j> 0? ctx.lineTo(x,y) : ctx.moveTo(x,y);
                            
        //     }


        //     // ctx.lineTo(300,400);
        //     ctx.closePath();
        //     ctx.stroke();

            
        // }



        function loop(){
            ctx.clearRect(0,0, cnv.width, cnv.height);
            upadteRings();
            requestAnimationFrame(loop);
        }
        loop();
        window.addEventListener('resize', init);
    }
};


//===========================/EQVis===============================
// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

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
const timeline = document.getElementById('video-timeline');
const timelineBar = document.querySelector(".timeline-bar");

const vPauseIcon = videoPlayBtn.querySelector("img[alt = 'pause-icon']");
const vPlayIcon = videoPlayBtn.querySelector("img[alt = 'play-icon']");


function togglePlayPause() {
  if(video.paused){
    videoPlayBtn.className = "pause";
    // toggleAudioPlayPause();
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";

    video.play();
    vPlayIcon.style.display = "";
    vPauseIcon.style.display = "";
  } else{
    videoPlayBtn.className = "play";
    video.pause();
    vPauseIcon.style.display = "none";
    vPlayIcon.style.display = "block";
  }
}
videoPlayBtn.onclick = function(){
  togglePlayPause();
};


// document.querySelector('.video').addEventListener('click', function(){
//   togglePlayPause();
//   console.log("ffdf");
// });
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
// timeline.addEventListener('click', (e) =>{
//   const ProgressTime = (e.offsetX/timeline.offsetWidth) * video.duration;
//   video.currentTime = ProgressTime;
// });



// =============AUDIO_PLAYER===============
let isMove = false;

//CREATE TRACKLIST


function createTrackItem(index,name,duration){
  var trackItem = document.createElement('li');
  trackItem.setAttribute("class", "track__list_item-wrapper");
  trackItem.setAttribute("id", "ptc-"+index);
  trackItem.setAttribute("data-index", index);


  var trackCounter = document.createElement('span');
  trackCounter.setAttribute("class", "list-item_counter");

  if(index<10){
    trackCounter.innerHTML =`0${index+1}`;
  }else{
    trackCounter.innerHTML = index;
  }
  trackItem.appendChild(trackCounter);

  var trackInfoItem = document.createElement('span');
    trackInfoItem.setAttribute("class", "tracks__item_name");
    trackInfoItem.innerHTML = name;
    trackItem.appendChild(trackInfoItem);

    return trackItem;
}

function createTrackList() {
  var trackList = document.createElement('ol');
  trackList.setAttribute("class", "track__list");

  for (var i = 0; i < listAudio.length; i++) {
    const trackItem = createTrackItem(i,listAudio[i].name,listAudio[i].duration);
    trackList.appendChild(trackItem);
  }

  return trackList;
}

const list = createTrackList();
document.getElementById('track_list_container').appendChild(list);

let currentTrackNumber = 0;

const canvasWrapper = document.getElementById('canvas-wrapper');
console.log(canvasWrapper);
console.log(Number.parseInt(canvasWrapper.clientHeight));
console.log(canvasWrapper.height);

//PLAY / PAUSE

const audio = document.getElementById("audio-source");
const audioPlayBtn = document.getElementById("audio_play_btn");

const pauseIcon = audioPlayBtn.querySelector("img[alt = 'pause-icon']");
const playIcon = audioPlayBtn.querySelector("img[alt = 'play-icon']");

const canvas = document.querySelector('canvas');
const trackImageWrapper = document.querySelector('.tracks__img-wrapper');

trackBackLigth(currentTrackNumber);

audio.volume = 0.2;
video.volume= 0.1;


const runEq = createEq(audio, canvas, canvasWrapper);



requestAnimationFrame(() => {
  console.log(111);
});

function toggleAudioPlayPause() {
  if(audio.paused){
    runEq();
    audioPlayBtn.className = "pause";
    // togglePlayPause();
    video.pause();
    vPauseIcon.style.display = "none";
    vPlayIcon.style.display = "block";

    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    console.log(currentTrackNumber);
    trackBackLigth(currentTrackNumber);
    trackImageWrapper.classList.add('shrink');
    trackImageWrapper.firstElementChild.classList.add('active-rotate');

  } else{
    audioPlayBtn.className = "play";
    audio.pause();
    playIcon.style.display = "";
    pauseIcon.style.display = "";
    trackImageWrapper.classList.remove('shrink');
    trackImageWrapper.firstElementChild.classList.remove('active-rotate');

    
  }
}
audioPlayBtn.onclick = function(){
  toggleAudioPlayPause();
};

// audioPlayBtn.addEventListener('touchend', function () {
//   toggleAudioPlayPause();  
// });

//DURATION


const audioTimeElapsed = document.getElementById("audio-time-elapsed");
const audioDuration = document.getElementById("audio-duration"); 

function formatAudioTime(timeInSec) {
  const result = new Date(timeInSec * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};


function initializeAudio() {
  const audioDurationEst = Math.round(audio.duration);
  const time = formatTime(audioDurationEst);


  audioDuration.innerText = `${time.minutes}:${time.seconds}`;
  audioDuration.setAttribute('date-time', `${time.minutes}m ${time.seconds}s`);
}
function updateAudioTimeElapsed() {
  const time = formatTime(Math.round(audio.currentTime));
  audioTimeElapsed.innerText = `${time.minutes}:${time.seconds}`;
  audioTimeElapsed.setAttribute('date-time', `${time.minutes}m ${time.seconds}s`)
}




audio.addEventListener('loadedmetadata', initializeAudio);

audio.addEventListener('timeupdate', updateAudioTimeElapsed);


//TIMELINE
const audioTimelineProgress = document.getElementById("audio-timeline-progress");
audio.addEventListener("timeupdate", function(){
  let timelinePos = audio.currentTime / audio.duration;
  audioTimelineProgress.style.width = timelinePos *100 + "%";
});


//TIMELINE CLICK
const audioTimeline = document.getElementById("audio-timeline");


// audioTimeline.addEventListener('click', (e) =>{
//   const ProgressTime = (e.offsetX/audioTimeline.offsetWidth) * audio.duration;
//   audio.currentTime = ProgressTime;
// });

// TIMELINE SCRUB UNIVERSAL


function scurb(e,src,srcTimeline) {

  // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
  const currentTime = ( (e.clientX - srcTimeline.getBoundingClientRect().left) / srcTimeline.offsetWidth ) * src.duration;
  src.currentTime = currentTime;

}
//audio  events
audioTimeline.addEventListener("pointerdown", (e) => {
  scurb(e,audio,audioTimeline);
  isMove = true;
});

document.addEventListener("pointermove", (e) => {
  if (isMove) {
      scurb(e,audio, audioTimeline); 
      audio.muted = true;
  }
});

document.addEventListener("pointerup", () => {
  isMove = false;
  audio.muted = false;
});
//video events

timeline.addEventListener("pointerdown", (e) => {
  scurb(e,video,timeline);
  isMove = true;
});

document.addEventListener("pointermove", (e) => {
  if (isMove) {
      scurb(e,video, timeline); 
      video.muted = true;
  }
});

document.addEventListener("pointerup", () => {
  isMove = false;
  video.muted = false;
});

//TRACK CLICK


const trackList = document.querySelector('.track__list');


trackList.addEventListener("click", (e)=>{
  // audio.paused();
  audio.setAttribute("data-index",`${e.target.parentElement.getAttribute("data-index")}`);
  //index for autoplay next
  if(e.target.parentElement.className === 'track__list_item-wrapper'){
    audio.src = listAudio[`${e.target.parentElement.getAttribute("data-index")}`].src;
    //  temp.classlist.toggle("backlight");
      // audio.innerHTML =('<source src="audio/03 YAH..mp3">');
      // console.log(e.target.parentElement.getAttribute("data-index"));
    
      audio.load();
      // togglePlayPause();
      video.pause();
      toggleAudioPlayPause();
      currentTrackNumber = e.target.parentElement.getAttribute("data-index");
      trackBackLigth(currentTrackNumber);
    

    
  }
});

//AUTO NEXT

audio.addEventListener("ended",()=>{
  currentTrackNumber = Number.parseInt(`${audio.getAttribute('data-index')}`);
  // console.log(trackNumber);
  // console.log(typeof(trackNumber));
  currentTrackNumber++;


  audio.src = listAudio[`${currentTrackNumber}`].src;
  // console.log(Number.parseInt(`${audio.getAttribute('data-index')+1}`));
  audio.load();
  audio.play();
  // trackNumber++;
  audio.setAttribute("data-index",`${currentTrackNumber}`);
  trackBackLigth(currentTrackNumber-1);
  trackBackLigth(currentTrackNumber);
});


//TRACKLIST BACKLIGHT


function trackBackLigth (currentTrackNumber) {
  const tracks = Array.from(document.getElementsByClassName('track__list_item-wrapper'));
  tracks.forEach(element =>{
    element.classList.remove('backlight');
  });
  // console.log(currentTrackNumber);
  const element = document.getElementById(`ptc-${currentTrackNumber}`);
  // console.log(element);
  element.classList.toggle('backlight');
};

// function trackBackLigth (currentTrackNumber) {
//   const tracks = document.getElementsByClassName('track__list_item-wrapper');

//   // console.log(currentTrackNumber);
//   const element = document.getElementById(`ptc-${currentTrackNumber}`);
//   // console.log(element);
//   element.classList.toggle('backlight');
// };




//UP BUTTON

//Get the button:
mybutton = document.getElementById("upScrollBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}