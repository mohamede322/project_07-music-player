let songArtist = [
  "Tape Machines ft. (Mia Pfirrman)",
  "Арина Барса",
  "zheez",
  "Besomorph & RIELL",
  "Robby Burke",
  "Jax Jones ft.AuRa",
  "Ricii Lompeurs",
  "MOTi & Laura White",
  "Chico Rose & Jaden Bojsen",
  "Besomorph & Anthony Keyrouz ft. (Lunis)",
];
let songName = [
  "Arms of Gold",
  "Арина Барса - Связаны",
  "Step Now",
  "Lie To Me",
  "To WNDRLND",
  "I Miss You",
  "Far Away",
  "Push It Right",
  "Poppin Bottles",
  "Virus",
];
let songDuration = [
  {
    minutes: 3,
    seconds: 44,
  },
  {
    minutes: 2,
    seconds: 34,
  },
  {
    minutes: 3,
    seconds: 21,
  },
  {
    minutes: 2,
    seconds: 53,
  },
  {
    minutes: 2,
    seconds: 52,
  },
  {
    minutes: 2,
    seconds: 52,
  },
  {
    minutes: 5,
    seconds: 56,
  },
  {
    minutes: 2,
    seconds: 46,
  },
  {
    minutes: 2,
    seconds: 53,
  },
  {
    minutes: 2,
    seconds: 08,
  },
];

let themeBtnS = document.querySelectorAll(".color-patterns div");
let container = document.querySelector(".container");
let playerBotSide = document.querySelector(".txt");
let progress = document.querySelector(".progress");
let currentProgress = document.querySelector(".current-progress");

let playBtn = document.querySelector(".play");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let img = document.querySelector(".img");
let currentSong = document.querySelector(".song-name");
let artistName = document.querySelector(".artist-name");
let audio = document.querySelector(".audio");
let volume = document.querySelector(".volume");
let currentVolume = document.querySelector(".current-volume");
let audioBtn = document.querySelector(".audio-btn");
let playList = document.querySelector(".play-list");
let playListICO = document.querySelector(".playlist-icon");
let songDur = document.querySelector(".duration");
let currentTime = document.querySelector(".current-time");

let index = songName.length - 1;
let seconds = 0;
let minutes = 0;

changeThemeColor();
PlayPause();
PreviousSong();
NextSong();
getProgress();
setProgress();
setVolume();
addPlayList();

audio.addEventListener("timeupdate", getProgress);

function PlayPause() {
  playBtn.addEventListener("click", () => {
    if (playBtn.className === "fas fa-play play") {
      audio.play();
      playBtn.className = "fas fa-pause play";
      timer();
    } else if (playBtn.className === "fas fa-pause play") {
      audio.pause();
      clearInterval(time);
      playBtn.className = "fas fa-play play";
    }
  });
}

function loadSong() {
  img.src = `./images/${index}.jpg`;
  currentSong.innerHTML = `${songName[index]}`;
  artistName.innerHTML = `${songArtist[index]}`;
  songDur.innerHTML = `${songDuration[index].minutes} : ${
    songDuration[index].seconds < 10
      ? `0${songDuration[index].seconds}`
      : songDuration[index].seconds
  }`;
  audio.src = `./music/${index}.mp3`;
}

function timer() {
  time = setInterval(countdown, 1000);
}

function countdown() {
  seconds += 1;
  if (seconds === 60) {
    seconds = 0;
    minutes += 1;
  }

  if (seconds < 10) {
    currentTime.innerHTML = `${minutes} : 0${seconds}`;
  } else {
    currentTime.innerHTML = `${minutes} : ${seconds}`;
  }

  if (currentTime.innerHTML === songDur.innerHTML) {
    currentTime.innerHTML = `0 : 00`;
    seconds = 0;
    minutes = 0;
    clearInterval(time);
    timer();
  }
}

function PreviousSong() {
  prevBtn.addEventListener("click", () => {
    index--;
    if (index < 0) {
      index = songName.length - 1;
    }
    loadSong();
    if (playBtn.className === "fas fa-pause play") {
      currentTime.innerHTML = `0 : 00`;
      seconds = 0;
      minutes = 0;
      clearInterval(time);
      timer();
      audio.play();
    } else {
      currentTime.innerHTML = `0 : 00`;
      seconds = 0;
      minutes = 0;
      currentProgress.style.width = "0";
    }
  });
}
function NextSong() {
  nextBtn.addEventListener("click", () => {
    index++;
    if (index > songName.length - 1) {
      index = 0;
    }
    loadSong();
    if (playBtn.className === "fas fa-pause play") {
      currentTime.innerHTML = `0 : 00`;
      seconds = 0;
      minutes = 0;
      clearInterval(time);
      timer();
      audio.play();
    } else {
      currentTime.innerHTML = `0 : 00`;
      seconds = 0;
      minutes = 0;
      currentProgress.style.width = "0";
    }
  });
}

function getProgress() {
  let { duration, currentTime } = audio;
  let progressPercent = (currentTime / duration) * 100;

  currentProgress.style.width = `${progressPercent}%`;
  if (progressPercent === 100) {
    if (index > 8) {
      index = -1;
    }
    index++;
    loadSong();
    audio.play();
  }
}

function setProgress() {
  progress.addEventListener("click", (e) => {
    let width = progress.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
    minutes = parseInt(audio.currentTime / 60);
    seconds = parseInt((audio.currentTime / 60).toFixed(2).slice(2, 4) / 1.65);
    if (seconds < 10) {
      currentTime.innerHTML = `${minutes} : 0${seconds}`;
    }
    currentTime.innerHTML = `${minutes} : ${seconds}`;
  });
}

function setVolume() {
  volume.addEventListener("click", (e) => {
    let clickX = e.offsetX;
    currentVolume.style.width = `${clickX}%`;
    audio.volume = clickX / 100;

    if (audio.volume === 0) {
      audioBtn.className = "fas fa-volume-off audio-btn";
    } else if (audio.volume < 0.5) {
      audioBtn.className = "fas fa-volume-down audio-btn";
    } else if (audio.volume > 0.5) {
      audioBtn.className = "fas fa-volume-up audio-btn";
    }
  });

  audioBtn.addEventListener("click", () => {
    if (
      audioBtn.className === "fas fa-volume-up audio-btn" ||
      audioBtn.className === "fas fa-volume-down audio-btn"
    ) {
      audioBtn.className = "fas fa-volume-mute audio-btn";
      currentVolume.style.width = `0%`;
      audio.volume = 0;
    } else if ((audioBtn.className = "fas fa-volume-mute audio-btn")) {
      audioBtn.className = "fas fa-volume-down audio-btn";
      currentVolume.style.width = `15%`;
      audio.volume = 0.15;
    }
  });
}

function addPlayList() {
  for (i = 0; i < songName.length; i++) {
    let lis = document.createElement("li");
    lis.innerText = `${i + 1} ${songName[i]}`;
    lis.className = `${i}`;
    playList.appendChild(lis);
    lis.addEventListener("click", () => {
      img.src = `./images/${lis.className}.jpg`;
      currentSong.innerHTML = `${songName[lis.className]}`;
      artistName.innerHTML = `${songArtist[lis.className]}`;
      audio.src = `./music/${lis.className}.mp3`;
      if (playBtn.className === "fas fa-pause play") {
        audio.play();
      }
      playList.classList.add("closed");
      playList.classList.remove("active");
      playList.style.cssText = "display:block;";
    });
    lis.addEventListener("mouseenter", () => {
      lis.style.color = localStorage.getItem("container-color");
    });
    lis.addEventListener("mouseleave", () => {
      lis.style.color = `unset`;
    });
  }

  playListICO.addEventListener("click", () => {
    if (playList.classList.contains("active")) {
      playList.classList.add("closed");
      playList.classList.remove("active");
      playList.style.cssText = "display:block;";
    } else if (playList.classList.contains("closed")) {
      playList.classList.add("active");
      playList.classList.remove("closed");
    }
  });
}

function changeThemeColor() {
  themeBtnS.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      themeBtnS.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      if (e.currentTarget.classList.contains("blue")) {
        container.style.cssText = `background-color: var(--blue)`;
        playerBotSide.style.cssText = `background-color: var(--dark-blue)`;
        progress.style.cssText = `background-color:var(--blue)`;
        currentProgress.style.cssText = `background-color:var(--progress-bar-blue)`;
        volume.style.backgroundColor = `var(--blue)`;
        currentVolume.style.backgroundColor = `var(--progress-bar-blue)`;
        localStorage.setItem("container-color", "var(--blue)");
        localStorage.setItem("botside-color", "var(--dark-blue)");
        localStorage.setItem("progress-color", "var(--blue)");
        localStorage.setItem("current-progress", "var(--progress-bar-blue)");
        localStorage.setItem("volume-color", `var(--blue)`);
        localStorage.setItem("v-progress-color", `var(--progress-bar-blue)`);
      } else if (e.currentTarget.classList.contains("green")) {
        container.style.cssText = `background-color: var(--green)`;
        playerBotSide.style.cssText = `background-color: var(--dark-green)`;
        progress.style.cssText = `background-color:var(--green)`;
        currentProgress.style.cssText = `background-color:var(--progress-bar-green)`;
        volume.style.backgroundColor = `var(--green)`;
        currentVolume.style.backgroundColor = `var(--progress-bar-green)`;
        localStorage.setItem("container-color", "var(--green)");
        localStorage.setItem("botside-color", "var(--dark-green)");
        localStorage.setItem("progress-color", "var(--green)");
        localStorage.setItem("current-progress", "var(--progress-bar-green)");
        localStorage.setItem("volume-color", `var(--green)`);
        localStorage.setItem("v-progress-color", `var(--progress-bar-green)`);
      } else if (e.currentTarget.classList.contains("red")) {
        container.style.cssText = `background-color: var(--red)`;
        playerBotSide.style.cssText = `background-color: var(--dark-red)`;
        progress.style.cssText = `background-color:var(--red)`;
        currentProgress.style.cssText = `background-color:var(--progress-bar-red)`;
        volume.style.backgroundColor = `var(--red)`;
        currentVolume.style.backgroundColor = `var(--progress-bar-red)`;
        localStorage.setItem("container-color", "var(--red)");
        localStorage.setItem("botside-color", "var(--dark-red)");
        localStorage.setItem("progress-color", "var(--red)");
        localStorage.setItem("current-progress", "var(--progress-bar-red)");
        localStorage.setItem("volume-color", `var(--red)`);
        localStorage.setItem("v-progress-color", `var(--progress-bar-red)`);
      }
    });
  });
}

if (localStorage.getItem("container-color")) {
  container.style.cssText = `background-color: ${localStorage.getItem(
    "container-color"
  )}`;
  themeBtnS.forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${localStorage.getItem("container-color")}"]`)
    .classList.add("active");
}
if (localStorage.getItem("botside-color")) {
  playerBotSide.style.cssText = `background-color: ${localStorage.getItem(
    "botside-color"
  )}`;
}
if (localStorage.getItem("progress-color")) {
  progress.style.cssText = `background-color: ${localStorage.getItem(
    "progress-color"
  )}`;
}

if (localStorage.getItem("current-progress")) {
  currentProgress.style.cssText = `background-color: ${localStorage.getItem(
    "current-progress"
  )}`;
}
if (localStorage.getItem("volume-color")) {
  volume.style.backgroundColor = localStorage.getItem("volume-color");
}
if (localStorage.getItem("v-progress-color")) {
  currentVolume.style.backgroundColor =
    localStorage.getItem("v-progress-color");
}
