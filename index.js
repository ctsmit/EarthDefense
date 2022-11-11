let bombStartLocation = 0
let playerPosition = 5
let round = 1
const roundBombs = 10 + round * 2
const roundMil = round * 50
const bombArr = []

const gridContainer = document.querySelector(".grid-container")
const bottomRow = document.querySelectorAll(".player-container")
const player = document.createElement("div")
player.className = "player"
const playerStart = document.querySelector(".p5")
playerStart.appendChild(player)

const fireButton = document.querySelector(".fire-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")



const createBombDiv = (round) => {
   for (let i = 0; i < round; i++) {
      let name = `bombDiv${i}`
      name = document.createElement("div")
      name.className = "bomb"
      bombArr.push(name)
   }
}


const playerObject = {
   move(direction) {
      if (playerPosition === 1 && direction === 0) {
         return
      } else if (playerPosition === 9 && direction === 1) {
         return
      }
      let playerLocation = gridContainer.querySelector(`.p${playerPosition}`)
      playerLocation.removeChild(player)

      if (direction === 0) {
         playerPosition--
         gridContainer.querySelector(`.p${playerPosition}`).appendChild(player) //why does this work but a variable set to it doesn't
      } else if (direction === 1) {
         playerPosition++
         gridContainer.querySelector(`.p${playerPosition}`).appendChild(player)
      }
   },
   shoot() {
      
   },
}

const game = {
   start() {
      createBombDiv(roundBombs)
      setInterval(() => {
         new AlienBomber(bombArr[0], roundMil)
         bombArr.shift()
      }, 1000 - roundMil)
   },
   checkDeath() {
      
   },
   checkWin() {
       
   }
}

class AlienBomber {
   constructor(bombDiv, roundMil) {
      this.currentLocation = {}
      this.currentClass = ""
      this.randomStart(bombDiv)
	      this.move(bombDiv, roundMil)
	
}
   randomStart(bombDiv) {
      let newStart 
      do {
         newStart = Math.floor(Math.random() * 9 + 1)
      } while (newStart === bombStartLocation)
      bombStartLocation = newStart
      
      this.currentLocation = gridContainer.querySelector(`.s${newStart}1`)
      this.currentClass = `s${newStart}1`
      this.currentLocation.appendChild(bombDiv)
   }
   move(bombDiv, roundMil) {
      let thisClass = this.currentClass
      let thisLocation = this.currentLocation
      for (let i = 1; i <= 8; i++) {
         ;(function () {
            setTimeout(function () {
               thisClass = thisClass.slice(0, 2).concat(`${i}`)
               i++
               thisLocation.removeChild(bombDiv)
               thisLocation = gridContainer.querySelector(`.${thisClass}`)
               thisLocation.appendChild(bombDiv)
               if (i != 9) {
                  i++
               } else {
                  setTimeout(() => {
                     console.log("you lose")
                     return
                  }, 1000)
               }
            }, i * (1000 - roundMil))
         })(i)
      }
   }
}

document.onkeydown = function (e) {
   switch (e.key) {
      case "ArrowLeft":
         playerObject.move(0)
         break
      case "a":
         playerObject.move(0)
         break
      case "ArrowRight":
         playerObject.move(1)
         break
      case "d":
         playerObject.move(1)
         break
      case "ArrowUp":
         playerObject.shoot()
         gridContainer.classList.add('animation')
         gridContainer.onanimationend = () =>{
         gridContainer.classList.remove('animation')
         }
         break
      case " ":
         game.start(round)
         break
   }
}

fireButton.onclick = () => {
   playerObject.shoot()
   gridContainer.classList.add('animation')
   gridContainer.onanimationend = () =>{
   gridContainer.classList.remove('animation')
   }
}
leftButton.onclick = () => {
   playerObject.move(0)
}

rightButton.onclick = () => {
   playerObject.move(1)
}


  

