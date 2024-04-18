window.addEventListener('load', () => {
    // Track info
    const trackImage = document.querySelector('#track-image');
    const trackName = document.querySelector('.name');
    const trackAuthor = document.querySelector('.author');

    // Tracks Buttons
    const audio = document.querySelector('#audio');
    const playStopBtn = document.querySelector('.primary-btn');
    const playStopLabel = document.querySelector('#play-stop-btn');
    const backBtn = document.querySelector('#back-btn');
    const nextBtn = document.querySelector('#next-btn');

    const currentTime = document.querySelector('#current-time');
    const totalTime = document.querySelector('#total-time');
    const trackSlider = document.querySelector('#track-slider');
    
    const playImage = "./assets/Play_fill.svg";
    const stopImage = "./assets/Stop_fill.svg";

    const tracks = [
        {
            name: "Lost in the City Lights",
            author: "Cosmo Sheldrake",
            image: "./assets/cover-1.png",
            src: "./assets/forest-lullaby-110624.mp3"
        },
        {
            name: "Forest Lullaby",
            author: "Lesfm",
            image: "./assets/cover-2.png",
            src: "./assets/lost-in-city-lights-145038.mp3"
        }
    ];


    const updateTrack = (trackIndex) => {
        trackName.textContent = tracks[trackIndex].name;
        trackAuthor.textContent = tracks[trackIndex].author;
        trackImage.src = tracks[trackIndex].image;
    };

    // Initializing
    let trackIndex = 0;
    let isPlaying = false;
    let audioPosition = 0;
    updateTrack(trackIndex);

    playStopBtn.addEventListener('click', () => {
        if(!isPlaying) {
            if(audioPosition == 0) {
                audio.src = tracks[trackIndex].src;
            }
            audio.load();
            audio.currentTime = audioPosition;
            audio
                .play()
                .then(() => {
                    playStopLabel.src = stopImage;
                    isPlaying = true;
                    updateTrack(trackIndex);
                })
        } else {
            audioPosition = audio.currentTime;
            audio.pause();
            playStopLabel.src = playImage;
            isPlaying = false;
        }
    });

    const playTrack = (trackIndex) => {
        audio.src = tracks[trackIndex].src;
        audio.load();
        audio.play();
        playStopLabel.src = stopImage;
        isPlaying = true;
        updateTrack(trackIndex);
    }

    backBtn.addEventListener('click', () => {
        if(trackIndex > 0 ) {
            trackIndex--;
        } else {
            trackIndex = tracks.length - 1;
        }
        playTrack(trackIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        if(trackIndex < tracks.length - 1){
            trackIndex++;
        } else {
            trackIndex = 0;
        }
        playTrack(trackIndex);
    });

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${ minutes }:${ remainingSeconds < 10 ? '0' : '' }${ remainingSeconds }`;
    }

    audio.addEventListener('timeupdate', () => {
        const current = formatTime(audio.currentTime);
        const total = formatTime(audio.duration);
        currentTime.textContent = current;
        totalTime.textContent = total;
        const currentPosition = ( audio.currentTime / audio.duration ) * 100;
        trackSlider.value = currentPosition;
    });

    trackSlider.addEventListener('input', () => {
        const newPosition = ( trackSlider.value / 100 ) * audio.duration;
        audio.currentTime = newPosition;
    });
});