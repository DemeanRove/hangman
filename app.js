$(document).ready(function() {

   //Navbar buttons
   $(".tab").click(function() {
      if($(this).hasClass("disabled") != true) {
         $(this).siblings().removeClass("active");
         $(this).addClass("active");
      };
   });
   
   //Btn size adjust
   if($(window).width() <= 600) {
      $(".waves-effect").addClass("btn");
   } else {
      $(".waves-effect").addClass("btn-large");
   }

   //Lives
   let lives = 10;
   function liveCount(lives) {
      let livesStr = lives.toString();
      $(".flow-text:first").text("Lives: " + livesStr);
   }
   
   //Word generator
   //Run through JSON & choose random word
   let actual = "";
   let temp = "";
   let easyWords = "easyWords.json";

   function generateEasy(easyWords) {
      $.getJSON(easyWords, function(data) { 
         let wordVal = Math.floor(Math.random() * data.length);
         actual = data[wordVal].word.toUpperCase();
         for (let i = 0; i < actual.length; i++) {
            if (actual.substring(i,i+1) == " ") {
               temp += " ";
            } else {
               temp += "_"
            }
         };
         $(".flow-text:nth-child(2)").text(temp);
      });
   };

   //Words guessing
   $(".waves-effect").click(function() {
      let letter = $(this).text() //Letter guessed by user
      if (actual.indexOf(letter) == -1) { //If letter DNE in word
         lives--;
         liveCount(lives);
      } else { //Letter is in word
         for (let i = 0; i < actual.length; i++) {
            if (actual.substring(i,i+1) == letter) {
               let posOfLetter = i;
               temp = temp.substring(0, posOfLetter) + letter + temp.substring(posOfLetter+1);
            }
         }
         $(".flow-text:nth-child(2)").text(temp);
      }
      $(this).addClass("disabled"); //Disable btn after click
      if(lives == 0) { //If no more lives
         $(".waves-effect").addClass("disabled");
         $(".flow-text:first").text("Game Over");
         $(".flow-text:last").text(actual);
      } else if (temp == actual) { //If solved
         $(".waves-effect").addClass("disabled");
         $(".flow-text:first").text("You Win!");
      }
   });

   generateEasy(easyWords);
   liveCount(10);

   //TODO
   //Implement score
   //Retry btn
   //Keyboard support
});

