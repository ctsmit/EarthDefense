let bombStartLocation = 0
let playerPosition = 5
let round = 10
const roundBombs = 10 + (round*2)
const roundMil = round *100
const bombArr = []
let bombCount
let timer

const gridContainer = document.querySelector(".grid-container")
const bottomRow = document.querySelector(".bottomRow")

const player = document.createElement("div")
player.className = "player"

const playerStart = bottomRow.children[playerPosition - 1]
playerStart.appendChild(player)





const createBombDiv = (round) => {
   for (let i = 0;i < round;i++) {
      let name = `bombDiv${i}`
        name = document.createElement("div")
      name.className = "bomb"
      bombArr.push(name)
   }
}





const bombMove = (bombDiv) => {
   let currentRow = 1
   for (let i = 1; i < 8; i++) {
      ;(function (index) {
         setTimeout(function () {
            bombDiv.move()
            if (currentRow != 7) {
               currentRow++
            } else {
               console.log("you lose")
               return
            }
         }, i * (1000 - roundMil))
      })(i)
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
      createBombDiv(roundBombs)
      new AlienBomber(bombArr[0])
      
// setInterval(() => {
// 	      new AlienBomber(bombDiv1)
	      
	
// }, 1000);      
      
      
     

      
      
      // let timerId = setTimeout(bombMove, 1000, bomb)
      // timer = timerId
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
            constructor(bombDiv) {
               this.start = bombStartLocation
               this.currentLocation
               this.currentClass = ""
               this.currentRow = 2
              
               this.randomStart(bombDiv)
               this.move(bombDiv)
            }
            randomStart(bombDiv) {
               let newStart
               do {
                  newStart = Math.floor(Math.random() * 9 + 1)
               } while (newStart === this.start)
               bombStartLocation = newStart
               
               this.currentLocation = gridContainer.querySelector(`.s${newStart}1`)
               this.currentClass = `s${newStart}1`
               this.currentLocation.appendChild(bombDiv)
            }
            move(bombDiv) {
               this.currentClass = this.currentClass.slice(0, 2).concat(`${this.currentRow}`)
         this.currentRow++
         this.currentLocation.removeChild(bombDiv)
         this.currentLocation = gridContainer.querySelector(`.${this.currentClass}`)
         this.currentLocation.appendChild(bombDiv)
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
         break
      case " ":
         game.start(round)
         break
      case "ArrowDown": //testing
         bomb.move()
        
         break
   }
}
