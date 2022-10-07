console.log("Welcome to Saavn")
let songIndex = -1;
let audio_element = new Audio('music/1.mp3');
let master_play = document.getElementById('master-play');
let my_progress_bar = document.getElementById('myProgressBar');
let gif = document.querySelector('.song-info2');
let song_items = Array.from(document.querySelectorAll('.song-item'));
let container = document.getElementById('back');
let caption = document.getElementById('caption');
let song_cover = Array.from(document.querySelectorAll('.song-cover'));


// Array containing the songs
let songs = [
    { file_name: "Hey Jude - The Beatles", file_path: "music/1.mp3", cover_path: "covers/1.jpg" },
    { file_name: "Judaa 2 - Amrinder Gill", file_path: "music/2.mp3", cover_path: "covers/2.jpg" },
    { file_name: "Oh Yoko! - John Lennon", file_path: "music/3.mp3", cover_path: "covers/3.jpg" },
    { file_name: "Imagine - John Lennon", file_path: "music/4.mp3", cover_path: "covers/3.jpg" },
    { file_name: "Long Road - Pearl Jam", file_path: "music/5.mp3", cover_path: "covers/5.jpg" },
    { file_name: "EverGlow - ColdPlay", file_path: "music/6.mp3", cover_path: "covers/6.jpg" },
    { file_name: "Akhar - Lahoriye", file_path: "music/7.mp3", cover_path: "covers/7.jpg" },
    { file_name: "Tu Te Main - Bir Singh", file_path: "music/8.mp3", cover_path: "covers/8.jpg" },
    { file_name: "Dooba Dooba rehta Hun - Silk Route", file_path: "music/9.mp3", cover_path: "covers/9.jpg" },
    { file_name: "El Sueno - Diljit Dosanjh", file_path: "music/10.mp3", cover_path: "covers/10.jpg" },
]


// iterating a loop for adding covers
song_items.forEach((element, i) => {
    // console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].cover_path
    element.getElementsByClassName('song-name')[0].innerHTML = songs[i].file_name.split('-')[0];
    element.getElementsByClassName('singer')[0].innerHTML = songs[i].file_name.split('-')[1];

});
//Handle Play/pause click

master_play.addEventListener('click', ()=>{
    
    if ((audio_element.paused || audio_element.currentTime <= 0)) {
        back.style.backgroundImage = `url('covers/${songIndex+1}.jpg')`;
        console.log("hey i am inside play")
        coverChange(songIndex,true);
        audio_element.play();
        master_play.classList.remove('fa-play-circle');
        master_play.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        back.style.backgroundImage = 'none';
        console.log("hey i am inside pause")
        audio_element.pause();
        coverChange(songIndex,false);
        master_play.classList.remove('fa-pause-circle');
        master_play.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
   
    
})


//Listen To Events
audio_element.addEventListener('timeupdate', () => {
    //Update Seekbar
    progress = parseInt((audio_element.currentTime / audio_element.duration) * 100);
    my_progress_bar.value = progress;
})
my_progress_bar.addEventListener('click', () => {
    audio_element.currentTime = (my_progress_bar.value * audio_element.duration) / 100;
})

// playing songs

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('song-item-play')).forEach((element)=>{
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('song-item-play')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        const index=parseInt(e.target.id)
        if(index === songIndex){
            coverChange(index,false);
            songIndex = -1;
            audio_element.pause();
            e.target.classList.add('fa-play-circle');
            e.target.classList.remove('fa-pause-circle');
            master_play.classList.add('fa-play-circle');
            back.style.backgroundImage = "none";
            master_play.classList.remove('fa-pause-circle');
            gif.style.opacity = 0;
        }
        else{
            makeAllPlay();
            coverChangeall();
            coverChange(index,true);
            songIndex=index;
            back.style.backgroundImage = `url('covers/${songIndex+1}.jpg')`;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audio_element.src = songs[index].file_path;
            audio_element.currentTime = 0;
            audio_element.play();
            master_play.classList.remove('fa-play-circle');
            master_play.classList.add('fa-pause-circle');
            caption.innerHTML = songs[index].file_name;
            gif.style.opacity = 1;
        }
        
    })
})
function coverChangeall(){
    song_cover.forEach((e)=>{
        e.classList.remove('playing');
    })
}

function coverChange(index, bool){
    if(bool){
        song_cover[index].classList.add('playing')
    }
    else{
        song_cover[index].classList.remove('playing')
    }
}

document.getElementById('prev').addEventListener('click',()=>{
    coverChange(songIndex,false);
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    coverChange(songIndex,true);
    audio_element.src = songs[songIndex].file_path;
    caption.innerText = songs[songIndex].file_name;
    audio_element.currentTime = 0;
    audio_element.play();
    back.style.backgroundImage = `url('covers/${songIndex+1}.jpg')`;
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
})
document.getElementById('forw').addEventListener('click',()=>{
    coverChange(songIndex,false);
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    coverChange(songIndex,true);
    audio_element.src = songs[songIndex].file_path;
    caption.innerText = songs[songIndex].file_name;
    audio_element.currentTime = 0;
    audio_element.play();
    back.style.backgroundImage = `url('covers/${songIndex+1}.jpg')`;
    master_play.classList.remove('fa-play-circle');
    master_play.classList.add('fa-pause-circle');
})
