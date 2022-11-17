let bombStartLocation = 0
let playerPosition = 5
let round = 1
let playerAlive = true
let bombArr = []
let bombsRemaining
let intervalId

const gridContainer = document.querySelector(".grid-container")
const missile = document.createElement("span")
missile.classList.add("missile")
const player = document.createElement("div")
player.className = "player"
const playerStart = document.querySelector(".p5")
playerStart.appendChild(player)
const fireButton = document.querySelector(".fire-button")
const leftButton = document.querySelector(".left-button")
const rightButton = document.querySelector(".right-button")
const startButton = document.createElement("button")
startButton.classList.add("start-button")
startButton.innerText = "START"
gridContainer.appendChild(startButton)
const restartButton = document.createElement("button")
restartButton.classList.add("restart-button")
restartButton.innerText = "RESTART"
let roundCounter = document.createElement("span")
roundCounter.classList.add("round-counter")

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
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
         gridContainer.querySelector(`.p${playerPosition}`).appendChild(player)
      } else if (direction === 1) {
         playerPosition++
         gridContainer.querySelector(`.p${playerPosition}`).appendChild(player)
      }
   },
   shoot() {
      sounds.fireSound()
      let hit = true
      let columnClass = `row${playerPosition}`
      let currentColumn = document.getElementsByClassName(`${columnClass}`)
      for (let row = 7; row >= 0; row--) {
         if (currentColumn[row].lastChild) {
            hit = true
            playerObject.shootAnimation(hit)
            currentColumn[row].removeChild(currentColumn[row].firstChild)
            bombsRemaining--
            return
         } else {
            hit = false
            playerObject.shootAnimation(hit)
         }
      }
   },
   shootAnimation(hit) {
      let columnClass = `.p${playerPosition}`
      let currentColumn = document.querySelector(`${columnClass}`)
      currentColumn.appendChild(missile)
      gridContainer.onanimationend = () => {
         currentColumn.removeChild(missile)
      }
      if (hit === true) {
         gridContainer.classList.add("animation")
         gridContainer.onanimationend = () => {
            gridContainer.classList.remove("animation")
         }
      }
   },
}

const game = {
   start() {
      let roundBombs = 10 + round * 2
      let roundMil = round * 50

      sounds.roundStart()
      roundCounter.innerText = round
      gridContainer.appendChild(roundCounter)
      startButton.innerText = `WAVE ${round}`
      setTimeout(() => {
         gridContainer.removeChild(startButton)
      }, 1500)

      game.createBombDiv(roundBombs)
      bombInterval = () => {
         if (playerAlive === false) clearInterval(intervalKey)
         new AlienBomber(bombArr[0], roundMil)
         bombArr.shift()
         game.checkWin()
         game.isDead()
      }
      const intervalKey = setInterval(bombInterval, 1000 - roundMil)
      intervalId = intervalKey
   },
   createBombDiv(roundBombs) {
      for (let i = 0; i < roundBombs; i++) {
         let name = `bombDiv${i}`
         name = document.createElement("div")
         name.className = "bomb"
         bombArr.push(name)
      }
      bombsRemaining = roundBombs
   },
   isDead() {
      if (playerAlive === false) {
         clearInterval(intervalId)
         sounds.deadSound()
         gridContainer.appendChild(restartButton)
         restartButton.style.animation = "flicker 5s 1s forwards"
         gridContainer.classList.add("dead-animation")
      }
   },
   restart() {
      bombArr = []
      round = 1
      playerAlive = true
      bombsRemaining = 0
      playerPosition = 5

      for (let square of gridContainer.children) {
         if (square.classList.contains("squares")) {
            square.textContent = ""
         }
      }
      gridContainer.classList.remove("dead-animation")
      gridContainer.removeChild(restartButton)
      gridContainer.appendChild(startButton)
      startButton.innerText = "START"
      playerStart.appendChild(player)
   },
   checkWin() {
      if (playerAlive === true && bombsRemaining === 0) {
         sounds.roundWin()
         clearInterval(intervalId)
         round++
         gridContainer.appendChild(startButton)
         startButton.innerText = "NEXT ROUND"
      }
   },
}

const sounds = {
   fireSound() {
      const fire =  new Audio("sounds/fireSound.mp3")
      fire.volume = 0.2
      fire.playbackRate = 2
      fire.preload
      fire.play()
   },
   alienSound() {
      let alien = new Audio("sounds/alienMove5.mp3")
      alien.volume = 0.1
      alien.playbackRate = 2
      alien.play()
   },
   deadSound() {
      let dead = new Audio("sounds/gameOver.mp3")
      dead.volume = 0.2
      dead.play()
   },
   roundWin() {
      let win = new Audio("sounds/roundWin2.mp3")
      win.volume = 0.2
      win.playbackRate = 0.5
      win.play()
   },
   roundStart() {
      let start = new Audio("sounds/roundStart.mp3")
      start.volume = 0.2
      start.playbackRate = 2
      start.play()
   },
}
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
class AlienBomber {
   constructor(bombDiv, roundMil) {
      this.currentLocation = {}
      this.currentClass = ""
      this.randomStart(bombDiv)
      this.move(bombDiv, roundMil)
   }
   randomStart(bombDiv) {
      if (typeof bombDiv != "object") return
      let newStart
      do {
         newStart = Math.floor(Math.random() * 9 + 1)
      } while (newStart === bombStartLocation)
      bombStartLocation = newStart

      if (window.matchMedia("(pointer: fine)").matches) {
         sounds.alienSound()
      }
      this.currentLocation = gridContainer.querySelector(`.s${newStart}1`)
      this.currentClass = `s${newStart}1`
      this.currentLocation.appendChild(bombDiv)
   }
   move(bombDiv, roundMil) {
      let thisClass = this.currentClass
      let thisLocation = this.currentLocation
      for (let i = 1; i <= 9; i++) {
         ;(function () {
            setTimeout(function () {
               if (!thisLocation.lastChild || bombDiv.parentElement === null) return
               if (window.matchMedia("(pointer: fine)").matches) {
                  sounds.alienSound()
               }
               thisClass = thisClass.slice(0, 2).concat(`${i}`)
               thisLocation.removeChild(bombDiv)
               thisLocation = gridContainer.querySelector(`.${thisClass}`)
               thisLocation.appendChild(bombDiv)
               if (i === 9) {
                  playerAlive = false
                  return
               }
            }, i * (1000 - roundMil))
         })(i)
      }
   }
}
////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
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
      case "w":
         playerObject.shoot()
         break
      case " ":
         if (playerAlive === false) {
            game.restart()
         } else if (bombsRemaining === 0 || bombsRemaining === undefined) {
            game.start()
         }
         break
   }
}

fireButton.onclick = () => {
   playerObject.shoot()
}
leftButton.onclick = () => {
   playerObject.move(0)
}
rightButton.onclick = () => {
   playerObject.move(1)
}
startButton.onclick = () => {
   game.start()
}
restartButton.onclick = () => {
   game.restart()
}
