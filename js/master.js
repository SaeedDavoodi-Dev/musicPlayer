const bus = document.querySelector('.bus')
const figure = document.querySelectorAll('.bus>figure')
const music = document.querySelector('.music>audio')
const progress = document.querySelector('.progress')
const txt = document.querySelector('.txt')
const _play = document.getElementById('play')
const musics = [
    {
        id: 1,
        title: 'Set Fire to the Rain',
        name: 'Adele',
        source: 'music/Set Fire to the Rain - Adele.mp3'
    },
    {
        id: 2,
        title: 'Bunker',
        name: 'Balthazar',
        source: 'https://dl.musicviral.ir/Music/03-08/Bunker%20Balthazar.mp3'
    },
    {
        id: 3,
        title: 'Unstoppable',
        name: 'Sia',
        source: 'https://cdn.musicgitar.ir/Music/Sia/320/Sia%20-%20Unstoppable%20[320].mp3?src=musicgitar'
    },
    {
        id: 4,
        title: 'The Lakes',
        name: 'Taylor swift',
        source: 'https://mehrdl.musitraf.com/Music/A/J/Taylor-Swift/10.-%20Taylor%20Swift%20-%20Blank%20Space%20%28128%29.mp3?src=mehrdl'
    },
    {
        id: 5,
        title: 'Dancing With Your Ghost',
        name: 'Sasha Sloan',
        source: 'https://files.musicfeed.ir/2020/07/Sasha-Sloan-Dancing-With-Your-Ghost.mp3'
    },
    {
        id: 6,
        title: ' Somewhere Only We Know',
        name: 'Keane',
        source: 'https://cdn.behmelody.in/1402/12/29/Keane%20-%20Somewhere%20Only%20We%20Know.mp3?src=cdn'
    },
    {
        id: 7,
        title: 'white Dress',
        name: 'IVOXYGEN',
        source: 'https://dl.musicviral.ir/Music/04-08/IVOXYGEN%20-%20white%20Dress.mp3'
    },
    {
        id: 8,
        title: 'Diamonds',
        name: 'Rihanna',
        source: 'https://cdn.tiktokmusics.ir/music/Diamonds%20Rihanna.mp3'
    }
]
let turn = 0

let cardWidth = document.querySelector('.card').clientWidth
// console.log(cardWidth);

figure.forEach((val) => {
    val.style.width = cardWidth + 'px'
})

let widthMove = (cardWidth + 24)


function _right() {
    if (turn < figure.length - 1) {
        turn++
        busMove()
    } else {
        bus.style.transform = 'translateX(0)'
        turn = 0
    }
    figure.forEach((val, i) => {
        if (i == turn) {
            val.classList.remove('transR', 'transL')
        } else if (i > turn) {
            val.classList.add('transR')
            val.classList.remove('transL')
        } else {
            val.classList.add('transL')
        }

    })

    music.src = musics[turn].source
    txt.children[0].innerText = musics[turn].title
    txt.children[1].innerText = musics[turn].name
    setTimeout(() => {
        music.play()
        _play.children[0].style.display = 'none'
        _play.children[1].style.display = 'block'
    }, 500);

}



function _left() {
    if (turn != 0) {
        turn--
        busMove()
    }
    figure.forEach((val, i) => {
        if (i != turn) {
            val.classList.add('transR')
        } else {
            val.classList.remove('transR', 'transL')
        }

    })

    music.src = musics[turn].source
    txt.children[0].innerText = musics[turn].title
    txt.children[1].innerText = musics[turn].name
    setTimeout(() => {
        music.play()
        _play.children[0].style.display = 'none'
        _play.children[1].style.display = 'block'
    }, 500);
}


function busMove() {
    bus.style.transform = 'translateX(-' + (turn * widthMove) + 'px)'
}


_play.addEventListener('click', (e) => {
    if (music.paused) {
        e.currentTarget.children[0].style.display = 'none'
        e.currentTarget.children[1].style.display = 'block'
        music.play()
    } else {
        e.currentTarget.children[0].style.display = 'block'
        e.currentTarget.children[1].style.display = 'none'
        music.pause()
    }
})

music.addEventListener('timeupdate', () => {
    const progressPercentage = (music.currentTime * 100) / music.duration
    // console.log(music.currentTime);
    // console.log(music.duration);
    progress.children[0].style.left = progressPercentage + '%'
    progress.children[1].style.width = progressPercentage + '%'
    if(music.currentTime == music.duration){
        _right()
    }
    
})

progress.addEventListener('click', (event) => {
    const progressWidth = progress.clientWidth
    // console.log(progressWidth);
    const clickPosition = event.offsetX;
    const newTime = (clickPosition * music.duration) / progressWidth
    music.currentTime = newTime
})
