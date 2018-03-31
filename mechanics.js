//Variables 

let score = 0
let guessed = [] //Guessed letters
let lives = 10
let easyWords = "easyWords.json"
let mediumWords = "mediumWords.json"
let hardWords = "hardWords.json"
let temp = ""
let actual = ""
let level = ".easy"

//Guessing Mechanic

function letterCheck(guessedLetter) {
   guessed.push(guessedLetter)
   if (actual.indexOf(guessedLetter) == -1) { //If letter DNE in word
      lives--
      liveCount(lives)
   } 
   else { //Letter is in word
      for (let i = 0; i < actual.length; i++) {
         if (actual.substring(i, i + 1) == guessedLetter) {
            let posOfLetter = i
            temp = temp.substring(0, posOfLetter) + guessedLetter + temp.substring(posOfLetter + 1)
            score += 100
            updateScore()
         }
      }
      $(level).text(temp) //Append word so far to div
   }

   if (lives == 0) { //If no more lives
      gameOver(false)
   } else if (temp == actual) { //If solved
      gameOver(true)
   }
}

//Score Management

function updateScore() {
   $(".score").text("Score: " + score)
}

//Lives Management
function liveCount(lives) {
   let livesStr = lives.toString()
   $(".flow-text:first").text("Lives: " + livesStr)
}

//Game Over Mechanic
function gameOver(winner) {
   $(".waves-effect").addClass("disabled")
   $(".wrapper").addClass("scale-in")
   if (winner) {
      $(".flow-text:nth-child(2)").text("You Win!")
      score += lives * 150
      updateScore()
   } 
   else {
      $(".flow-text:nth-child(2)").text("Game Over")
      let over = ""
      for (let i = 0; i < actual.length; i++) {
         if ($(level).text().substring(i, i + 1) == "_") {
            over += "<span style='color: red'>" + actual.substring(i, i + 1) + "</span>"
         } 
         else {
            over += $(level).text().substring(i, i + 1);
         }
      }
      $(level).html(over)
   }
}

//Word Generators
//Run through JSON & choose random word
function generateEasy(easyWords) {
   temp = ""
   $.getJSON(easyWords, function(data) {
      let wordVal = Math.floor(Math.random() * data.length)
      actual = data[wordVal].word.toUpperCase()
      for (let i = 0; i < actual.length; i++) {
         if (actual.substring(i, i + 1) == " ") {
            temp += " "
         } 
         else {
            temp += "_"
         }
      }
      $(".easy").text(temp)
   })
}

function generateMedium(mediumWords) {
   temp = ""
   $.getJSON(mediumWords, function(data) {
      let wordVal = Math.floor(Math.random() * data.length)
      actual = data[wordVal].word.toUpperCase()
      for (let i = 0; i < actual.length; i++) {
         if (actual.substring(i, i + 1) == " ") {
            temp += " "
         } 
         else {
            temp += "_"
         }
      }
      $(".medium").text(temp)
   })
}

function generateHard(hardWords) {
   temp = ""
   $.getJSON(hardWords, function(data) {
      let wordVal = Math.floor(Math.random() * data.length)
      actual = data[wordVal].word.toUpperCase()
      for (let i = 0; i < actual.length; i++) {
         if (actual.substring(i, i + 1) == " ") {
            temp += " "
         } 
         else {
            temp += "_"
         }
      }
      $(".hard").text(temp)
   })
}

// Reset function
function reset() {
   temp = ""
   actual = ""
   guessed = []
   lives = 10
   score = 0
   generateEasy(easyWords)
   updateScore()
   liveCount(10)
   $(".waves-effect").removeClass("disabled")
   $(".wrapper").removeClass("scale-in")
}

function resetMed() {
   temp = ""
   actual = ""
   guessed = []
   lives = 10
   score = 0
   generateMedium(mediumWords)
   updateScore()
   liveCount(10)
   $(".waves-effect").removeClass("disabled")
   $(".wrapper").removeClass("scale-in")
}

function resetHard() {
   temp = ""
   actual = ""
   guessed = []
   lives = 10
   score = 0
   generateHard(hardWords)
   updateScore()
   liveCount(10)
   $(".waves-effect").removeClass("disabled")
   $(".wrapper").removeClass("scale-in")
}