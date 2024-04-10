window.addEventListener('load', () => {
    // Track info
    const trackImage = document.querySelector('#track-image');
    const trackName = document.querySelector('.name');
    const trackAuthor = document.querySelector('.author');

    // Tracks Buttons
    const playStopBtn = document.querySelector('.primary-btn');
    const playStopLabel = document.querySelector('#play-stop-btn');
    const backBtn = document.querySelector('#back-btn');
    const nextBtn = document.querySelector('#next-btn');
    
    const playImage = "./assets/Play_fill.svg";
    const stopImage = "./assets/Stop_fill.svg";

    const tracks = [
        {
            name: "Lost in the City Lights",
            author: "Cosmo Sheldrake",
            image: "./assets/cover-1.png"
        },
        {
            name: "Forest Lullaby",
            author: "Lesfm",
            image: "./assets/cover-2.png"
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
    updateTrack(trackIndex);

    backBtn.addEventListener('click', () => {
        if(trackIndex > 0 ) {
            trackIndex--;
        } else {
            trackIndex = tracks.length - 1;
        }
        updateTrack(trackIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        if(trackIndex < tracks.length - 1){
            trackIndex++;
        } else {
            trackIndex = 0;
        }
        updateTrack(trackIndex);
    });

    playStopBtn.addEventListener('click', () => {
        if(!isPlaying) {
            playStopLabel.src = playImage;
            isPlaying = true;
        } else {
            playStopLabel.src = stopImage;
            isPlaying = false;
        }
    });

});