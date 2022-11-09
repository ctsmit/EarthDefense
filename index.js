let bombStartLocation = 0
let playerPosition = 5
let round = 1


const gridContainer = document.querySelector(".grid-container")
const bottomRow = document.querySelector(".bottomRow")

const player = document.createElement("div")
player.className = "player"

const playerStart = bottomRow.children[playerPosition - 1]
playerStart.appendChild(player)

const bomb = document.createElement("div")
bomb.className = "bomb"



const playerObject = {
   move(direct) {
      if (playerPosition === 1 && direct === 0) {
         return
      } else if (playerPosition === 9 && direct === 1) {
         return
      }

      bottomRow.children[playerPosition - 1].removeChild(player)

      if (direct === 0) {
         playerPosition--
         bottomRow.children[playerPosition - 1].appendChild(player)
      } else if (direct === 1) {
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
      let bomb = new AlienBomber(round, )
      bomb.randomStart()
   }
   

}

class AlienBomber {
   constructor(round,name) {
      this.name = name
   }
   randomStart() {
      let previousLocation = bombStartLocation
      let start
      do {
         start = Math.floor((Math.random() * 9) + 1)
      } while (previousLocation === start);
      let location = gridContainer.querySelector(`.s${start}1`)
      location.appendChild(bomb)
   }
   move(round){

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
      case " ":
         playerObject.shoot()
         break
      case "t":
         game.start()
   }
}


