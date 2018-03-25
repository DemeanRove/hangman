$(document).ready(function() {

   $(".tab").click(function() {
      if($(this).hasClass("disabled") != true) {
         $(this).siblings().removeClass("active");
         $(this).addClass("active");
      };
   });
   
   if($(window).width() <= 600) {
      $(".waves-effect").addClass("btn");
   } else {
      $(".waves-effect").addClass("btn-large");
   }

   let lives = 10;
   function liveCount(lives) {
      let livesStr = lives.toString();
      $(".flow-text:first").text("Lives: " + livesStr);
   }
   

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
   
   generateEasy(easyWords);
   liveCount(10);

   $(".waves-effect").click(function() {
      let letter = $(this).text()
      if (actual.indexOf(letter) == -1) {
         lives--;
         liveCount(lives);
      } else {
         for (let i = 0; i < actual.length; i++) {
            if (actual.substring(i,i+1) == letter) {
               let posOfLetter = i;
               temp = temp.substring(0, posOfLetter) + letter + temp.substring(posOfLetter+1);
            }
         }
         $(".flow-text:nth-child(2)").text(temp);
      }
      $(this).addClass("disabled");
      if(lives == 0) {
         $(".waves-effect").addClass("disabled");
         $(".flow-text:first").text("Game Over");
         $(".flow-text:last").text(actual);
      } else if (temp == actual) {
         $(".waves-effect").addClass("disabled");
         $(".flow-text:first").text("You Win!");
      }
   });

   //TODO
   //Implement score
   //Retry btn
});

