const container = document.querySelector(".video");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const btnLoad = document.querySelector(".btnLoad");
const forms = document.querySelectorAll("form");
const width = document.getElementById("width");
const height = document.getElementById("height");
const btnResize = document.querySelector(".btnResize");
const getVol = document.getElementById("getVol");
const getHeight = document.getElementById("getHeight");
const getWidth = document.getElementById("getWidth");
const output = document.getElementById("output");
const setVolume = document.getElementById("setVolume");
const btnSetVolume = document.querySelector(".btnSetVolume");
const getMute = document.getElementById("getMute");
const duration = document.getElementById("duration");
const getPlaybackState = document.getElementById("getPlaybackState");
const getViewability = document.getElementById("getViewability");
const fullscreen = document.getElementById("fullscreen");
const setAutoPlay = document.getElementById("setAutoPlay");
const setMute = document.getElementById("setMute");

// Main API CLASS
class Api {
  constructor(divId, width, height) {
    this.divId = divId;
    this.width = width;
    this.height = height;

    this.htmlString = `
      <div id=${this.divId}>
        <video id="video__player" height=${this.width} controls width=${this.height}>
          <source src=${this.initialUrl} type="video/mp4" />
        </video>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", this.htmlString);
  }

  initialUrl =
    "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";

  video__player = document.querySelector("video");

  play = () => video__player.play();

  pause = () => video__player.pause();

  load = (url) => (video__player.src = url);

  resize = (width, height) => {
    video__player.width = width;
    video__player.height = height;
  };

  getHeight = () => video__player.height;

  getWidth = () => video__player.width;

  getVolume = () => video__player.volume;

  getMute = () => video__player.muted;
  // Get Duration
  getDuration = () => Math.floor(video__player.duration);
  // set Volume
  setVolume = (vol) => (video__player.volume = +vol / 100);

  // Get Viewability with Intersection Obeserver API
  getViewability = () => {
    // Observer Function
    const playerHeight = video__player.getBoundingClientRect().height;
    const threshold = (((10 / 100) * playerHeight) / playerHeight) * 1;

    const observerFunc = (entries) => {
      const [entry] = entries;
      const { intersectionRatio } = entry;
      output.value = Math.floor(intersectionRatio * 100);
    };

    // Intersection observer api
    const videoObserver = new IntersectionObserver(observerFunc, {
      root: null,
      threshold,
    });

    videoObserver.observe(video__player);
  };

  getPlayBackState = () => {
    if (video__player.ended) {
      return "Ended";
    } else if (video__player.paused) {
      return "Paused";
    } else {
      return "Playing";
    }
  };

  // require boolean arguements
  setAutoPlay = (bool) => (video__player.autoplay = bool);

  setMute = (mute) => (video__player.muted = mute);

  setFullScreen = (fullscreen) =>
    fullscreen && video__player.requestFullscreen();
}

// Initialize Api
const Player = new Api("players", 300, 500);

// Prevent Default on all form elements
forms.forEach((form) =>
  form.addEventListener("click", (evt) => evt.preventDefault())
);

// Play
play.addEventListener("click", () => Player.play());
// Pause
pause.addEventListener("click", () => Player.pause());

// Load a new Url
btnLoad.addEventListener("click", () => {
  let { value } = document.getElementById("load");
  Player.load(value);
  load.value = "";
});

// Resize
btnResize.addEventListener("click", () => {
  let { value: widthValue } = width;
  let { value: heightValue } = height;
  Player.resize(+widthValue, +heightValue);
});

// getHeight
getHeight.addEventListener("click", () => (output.value = Player.getHeight()));

// getWidth
getWidth.addEventListener("click", () => (output.value = Player.getWidth()));

// getVolume
getVol.addEventListener(
  "click",
  () => (output.value = Player.getVolume() * 100)
);

// setVolume
btnSetVolume.addEventListener("click", () => {
  const { value } = setVolume;
  Player.setVolume(+value);
});

// Get Mute
getMute.addEventListener("click", () => (output.value = Player.getMute()));

// duration
duration.addEventListener(
  "click",
  () => (output.value = `${Player.getDuration()} seconds`)
);

// Get Playback state
getPlaybackState.addEventListener(
  "click",
  () => (output.value = Player.getPlayBackState())
);

// getViewability
getViewability.addEventListener("click", () => Player.getViewability());

fullscreen.addEventListener("click", () => {
  let { checked } = fullscreen;
  Player.setFullScreen(checked);
  fullscreen.checked = !fullscreen.checked;
});

// setAutoPlay
setAutoPlay.addEventListener("click", () => {
  let { checked } = setAutoPlay;
  Player.setAutoPlay(checked);
});

// set Mute
setMute.addEventListener("click", () => {
  let { checked } = setMute;
  Player.setMute(checked);
});
