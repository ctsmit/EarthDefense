let bombStartLocation = 0
let playerPosition = 5
let round = 2
const bombArr = []
let bombCount
let timer

const gridContainer = document.querySelector(".grid-container")
const bottomRow = document.querySelector(".bottomRow")
const domBombs = document.querySelectorAll(".bomb")

const player = document.createElement("div")
player.className = "player"

const playerStart = bottomRow.children[playerPosition - 1]
playerStart.appendChild(player)

const bombDiv = document.createElement("div")
bombDiv.className = "bomb"






const bombInterval = () => {
   function start() {
      bombArr[0].randomStart()
      bombArr.shift()
   }

   
   // start()
   domBombs.move()
   bombCount--
      console.log(bombCount);
   if (bombCount===0) {
      console.log(bombCount);
         clearInterval(timer)
      }

  }





const playerObject = {
   move(direction) {
      if (playerPosition === 1 && direction === 0) {
         return
      } else if (playerPosition === 9 && direction === 1) {
         return
      }

      bottomRow.children[playerPosition - 1].removeChild(player)

      if (direction === 0) {
         playerPosition--
         bottomRow.children[playerPosition - 1].appendChild(player) //why does this work but a variable set to it doesn't
      } else if (direction === 1) {
         playerPosition++
         bottomRow.children[playerPosition - 1].appendChild(player)
      }
   },
   shoot() {
      console.log("pew")
   },
}

const game = {
   start(round) {
      for (let bombs = 0; bombs < round * 2; bombs++) {
         let bomb = new AlienBomber()
      }
      bombCount = bombArr.length

      // bombArr[bombCount].randomStart()

      let timerId = setInterval(bombInterval, 1000)
      timer = timerId
   },

   move() {
      this.currentClass = this.currentClass.slice(0, 2).concat(`${this.currentRow}`)
      this.currentRow++
      this.currentLocation.removeChild(bombDiv)
      this.currentLocation = gridContainer.querySelector(`.${this.currentClass}`)
      this.currentLocation.appendChild(bombDiv)
      console.log("move")
   },

   // let bombCount = bombs

   //    for (let bomb of bombArr) {
   //      setTimeout(() => {
   //         bomb.randomStart()

   //      }, 500);
   //       setTimeout(() => {

   //          setInterval(bomb.move(), 500)
   //       }, 500);
   //   }
}
   

class AlienBomber {
   constructor() {
      this.start = bombStartLocation
      this.currentLocation
      this.currentClass = ""
      this.currentRow = 2
      bombArr.push(this)
   }
   randomStart() {
      let newStart
      
      do {
         newStart = Math.floor(Math.random() * 9 + 1)
      } while (newStart === this.start)
      bombStartLocation = newStart
      
      this.currentLocation = gridContainer.querySelector(`.s${newStart}1`)
      this.currentClass = `s${newStart}1`
      this.currentLocation.appendChild(bombDiv)
   }
   
}
let bomb = new AlienBomber()
bomb.randomStart()

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
         break
      case " ":
         game.start(round)
         break
      case "ArrowDown": //testing
         bomb.move()
         break
   }
}
