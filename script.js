console.log("Welcome to Spotify")

//Initialise
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Shape of You", filepath: "songs/1.mp3", coverpath: "covers/cover1.jpg" },
    { songName: "Perfect", filepath: "songs/2.mp3", coverpath: "covers/cover2.jpg" },
    { songName: "Happier", filepath: "songs/3.mp3", coverpath: "covers/cover1.jpg" },
    { songName: "Castle on the Hill", filepath: "songs/4.mp3", coverpath: "covers/cover2.jpg" },
    { songName: "Nancy Muligan", filepath: "songs/5.mp3", coverpath: "covers/cover1.jpg" },
    { songName: "Galway Girl", filepath: "songs/6.mp3", coverpath: "covers/cover2.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// audioElement.play();

//play-pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})

//Listen event
audioElement.addEventListener('timeupdate', () => {
    //update seeker
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    if (progress == 100) {
        let ele = document.getElementById(`${songIndex}`);
        ele.classList.remove('fa-pause-circle');
        ele.classList.add('fa-play-circle');
        if (songIndex >= 5) {
            songIndex = 0;
        }
        else {
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        ele = document.getElementById(`${songIndex}`);
        ele.classList.remove('fa-play-circle');
        ele.classList.add('fa-pause-circle');
    }
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
    document.querySelector('#masterPlay').classList.remove('fa-pause-circle');
    document.querySelector('#masterPlay').classList.add('fa-play-circle');
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (Array.from(e.target.classList).includes('fa-play-circle')) {
            console.log(e.target);
            makeAllPlays();
            gif.style.opacity = 1;
            if (parseInt(e.target.id) != songIndex) {
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
            else {
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                audioElement.play();
            }
        }
        else {
            console.log(e.target);
            makeAllPlays();
            audioElement.pause();
            gif.style.opacity = 0;
        }
    })
})

document.getElementById('next').addEventListener('click', () => {
    let ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-pause-circle');
    ele.classList.add('fa-play-circle');
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-play-circle');
    ele.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', () => {
    let ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-pause-circle');
    ele.classList.add('fa-play-circle');
    if (songIndex <= 0) {
        songIndex = 5;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle')
    ele = document.getElementById(`${songIndex}`);
    ele.classList.remove('fa-play-circle');
    ele.classList.add('fa-pause-circle');
})

