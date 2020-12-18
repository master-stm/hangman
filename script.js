let computedStyle = window.getComputedStyle(document.documentElement)
const movieTitle = document.getElementById('movie-title')
const hintsLists = document.querySelector('ul')
const movieLetters = document.getElementById('puzzle')

// console.log(computedStyle);

fetch('./data.json')
  .then(res => res.json())
  .then(data => {

    function is_touch_enabled() { 
      return ( 'ontouchstart' in window ) ||  
             ( navigator.maxTouchPoints > 0 ) || 
             ( navigator.msMaxTouchPoints > 0 ); 
  } 

  if( is_touch_enabled() ) { 
    document.getElementById('main').style.display = 'none';
    document.querySelector('.touch-screen-message').style.display = 'block'
} 
else { 
  document.getElementById('main').style.display = 'flex';
   let randNum = Math.floor(Math.random() * data.length)
    let randMovie = data[randNum]
    movieTitle.innerText = randMovie.title
    let hint1 = document.createElement('li')
    hint1.innerText = randMovie.year
    hintsLists.appendChild(hint1)
    let hint2 = document.createElement('li')
    hint2.innerText = randMovie.genres[Math.floor(Math.random() * randMovie.genres.length)]
    hintsLists.appendChild(hint2)
    let hint3 = document.createElement('li')
    hint3.innerText = randMovie.actors[Math.floor(Math.random() * randMovie.actors.length)]
    hintsLists.appendChild(hint3)
    
    let titleArray = Array.from(randMovie.title)

    titleArray.forEach((element, i) => {
      let div = document.createElement('div')
      let letter = document.createElement('span')
      letter.innerText = element

      if (element.match(/^[0-9a-zA-Z]+$/)) {
        letter.style.visibility = 'hidden'
      }
      if (element.match(' ') && i > 10) {
        movieLetters.appendChild(document.createElement('br'))
      }
      element !== ' ' && div.classList.add('letter')
      element === ' ' ? div.style.padding = '0 15px' : null
      div.appendChild(letter)
      movieLetters.appendChild(div)

    })

    // a function to get all the matched indexes in an array and return them in an array
    let getAllIndexes = (arr, val) => {
      var indexes = [], i = -1;
      while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
      }
      return indexes;
    }
let faces = document.querySelectorAll('.face')
          
    let lettersArray = document.querySelectorAll('.letter span')
    let titleLetters = titleArray.filter(n => n !== ' ')
    let mistake = 1 //counter for gessing tries
    document.addEventListener('keypress', e => {

      let key = e.key.toLowerCase()
      correctGueses = getAllIndexes(titleLetters.join('').toLowerCase(), key)
      // if correctGuesses array length is 0 it means no match found AKA wrong answer
      if (correctGueses.length === 0) {
        if (mistake < 11) {
          let animateFigure = document.getElementById(`figure-part-${mistake}`)
          animateFigure.classList.toggle('hidden')
          animateFigure.classList.add('wrong-answer')
          mistake++
        } else {
          faces.forEach(face => {
            face.classList.toggle('hidden')
            face.classList.add('wrong-answer-face')
          })
          
          
        }
      } else {
        correctGueses.forEach(i => {
          lettersArray[i].style.visibility = 'visible'
        })
      }
    })
}

    


  })
