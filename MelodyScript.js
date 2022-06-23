let progressSlider = document.querySelector('.progressSlider');
let volumeSlider = document.querySelector('.volumeSlider');
let currTime = document.querySelector('.currentTime');
let totalDuration = document.querySelector('.totalDuration');
let randomIcon = document.querySelector('.fa-random');
let currSong = document.createElement('audio');
let currIndex = 0;
let isPlaying = false;
let isRandom = false;

const melodySongsList = [{
        music: 'MelodySongs/ketsa_full_circles.mp3'
    },
    {
        music: 'MelodySongs/lobo_loco_peaceful.mp3'
    },
    {
        music: 'MelodySongs/lobo_loco_take_my_hand.mp3'
    },
];

function loadMelody(currIndex) {
    let updateTimer;
    clearInterval(updateTimer);

    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    progressSlider.value = 0;

    currSong.src = melodySongsList[currIndex].music;
    currSong.load();

    updateTimer = setInterval(setUpdate, 1000);
    currSong.addEventListener('ended', nextMelody);
}
loadMelody(currIndex);

function randomMelody() {
    isRandom = true;
    nextMelody();
}

function repeatMelody() {
    loadMelody(currIndex);
    playMelody();
}

function playpauseMelody() {
    isPlaying ? pauseMelody() : playMelody();
}

function playMelody() {
    let playpauseBtn = document.querySelector('.playpauseBtn');
    currSong.play();
    isPlaying = true;
    playpauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseMelody() {
    let playpauseBtn = document.querySelector('.playpauseBtn');
    currSong.pause();
    isPlaying = false;
    playpauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextMelody() {
    currIndex = isRandom ? Number.parseInt(Math.random() * melodySongsList.length) :
        currIndex < melodySongsList.length - 1 ?
        ++currIndex : 0;
    loadMelody(currIndex);
    playMelody();
}

function prevMelody() {
    currIndex = currIndex > 0 ? --currIndex : melodySongsList.length - 1
    loadMelody(currIndex);
    playMelody();
}

function trackProgress() {
    let progress = currSong.duration * (progressSlider.value / 100);
    currSong.currentTime = progress;
}

function setVolume() {
    currSong.volume = volumeSlider.value / 100;
}

function setUpdate() {
    let progressLevel = 0;
    if (!isNaN(currSong.duration)) {
        progressLevel = currSong.currentTime * (100 / currSong.duration);
        progressSlider.value = progressLevel;

        let currentMinutes = Math.floor(currSong.currentTime / 60);
        let currentSeconds = Math.floor(currSong.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currSong.duration / 60);
        let durationSeconds = Math.floor(currSong.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationMinutes;
    }
}