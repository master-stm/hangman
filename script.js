let computedStyle = window.getComputedStyle(document.documentElement)
const movieTitle = document.getElementById('movie-title')
const hintsLists = document.querySelector('ul')
const movieLetters = document.getElementById('puzzle')

// console.log(computedStyle);

fetch('./data.json')
  .then(res => res.json())
  .then(data => {

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

    let check = (k, t) => {
      if (k.toLowerCase() === t.toLowerCase()) {
        return true
      } else {
        return false
      }
    }

    let lettersArray = document.querySelectorAll('.letter span')
    let titleLetters = titleArray.filter(n => n !== ' ')


    //try adding keypress event to each element in the array
    titleLetters.forEach((t, index) => {
      const l = lettersArray[index];
      document.addEventListener('keypress', e => {
        let key = e.code.split('')[3]
        check(key, t) ? l.style.visibility = 'visible' : alert('wrong')
      })

    });

  })
