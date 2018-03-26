$(document).ready(function() {

   let guessed = []

   let score = 0;

   function updateScore() {
       $(".score").text("Score: " + score);
   }

   $(".waves-effect").addClass("scale-in");
   $(".game").addClass("scale-in");

   //Navbar buttons
   $(".tab").click(function() {
       if ($(this).hasClass("disabled") != true) {
           $(this).siblings().removeClass("active");
           $(this).addClass("active");
       };
   });

   //Btn size adjust
   if ($(window).width() <= 600) {
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
       temp = "";
       actual = "";
       $.getJSON(easyWords, function(data) {
           let wordVal = Math.floor(Math.random() * data.length);
           actual = data[wordVal].word.toUpperCase();
           for (let i = 0; i < actual.length; i++) {
               if (actual.substring(i, i + 1) == " ") {
                   temp += " ";
               } else {
                   temp += "_"
               }
           };
           $(".flow-text:nth-child(3)").text(temp);
       });
   };

   //Words guessing
   $(".waves-effect").click(function() {
       let letter = $(this).text() //Letter guessed by user
       guessed.push(letter);
       if (actual.indexOf(letter) == -1) { //If letter DNE in word
           lives--;
           liveCount(lives);
       } else { //Letter is in word
           for (let i = 0; i < actual.length; i++) {
               if (actual.substring(i, i + 1) == letter) {
                   let posOfLetter = i;
                   temp = temp.substring(0, posOfLetter) + letter + temp.substring(posOfLetter + 1);
                   score += 100;
                   updateScore();
               }
           }
           $(".flow-text:nth-child(3)").text(temp);
       }
       $(this).addClass("disabled"); //Disable btn after click
       if (lives == 0) { //If no more lives
           gameOver(false);
       } else if (temp == actual) { //If solved
           gameOver(true);
       }
   });

   $(window).keypress(function(e) {
       if (lives != 0) {
           var c = String.fromCharCode(e.which).toUpperCase() // or e.keyCode
           if (jQuery.inArray(c, guessed) == -1) {
               //do stuff with "key" here...
               let letter = c; //Letter guessed by user
               if (actual.indexOf(letter) == -1) { //If letter DNE in word
                   lives--;
                   liveCount(lives);
               } else { //Letter is in word
                   for (let i = 0; i < actual.length; i++) {
                       if (actual.substring(i, i + 1) == letter) {
                           let posOfLetter = i;
                           temp = temp.substring(0, posOfLetter) + letter + temp.substring(posOfLetter + 1);
                           score += 100;
                           updateScore();
                       }
                   }
                   $(".flow-text:nth-child(3)").text(temp);
               }
               $(".waves-effect").filter(function() {
                   return $(this).text() == c;
               }).addClass("disabled");

               if (lives == 0) { //If no more lives
                   gameOver(false);
               } else if (temp == actual) { //If solved
                   gameOver(true);
               }
               guessed.push(c);
           }
       }
   });

   function gameOver(flag) {
       $(".waves-effect").addClass("disabled");
       $(".wrapper").addClass("scale-in");
       if (flag) {
           $(".flow-text:nth-child(2)").text("You Win!");
           score += lives * 150;
           updateScore();
       } else {
           $(".flow-text:nth-child(2)").text("Game Over");
           let over = "";
           for (let i = 0; i < actual.length; i++) {
               if ($(".flow-text:nth-child(3)").text().substring(i, i + 1) == "_") {
                   over += "<span style='color: red'>" + actual.substring(i, i + 1) + "</span>";
               } else {
                   over += $(".flow-text:nth-child(3)").text().substring(i, i + 1);
               }
           }
           $(".flow-text:nth-child(3)").html(over);
       }
   }

   $(".wrapper").click(function() {
       generateEasy(easyWords);
       lives = 10;
       liveCount(10);
       $(".waves-effect").removeClass("disabled");
       $(".wrapper").removeClass("scale-in");
       score = 0;
   });

   generateEasy(easyWords);
   updateScore();
   liveCount(10);
   $('.tooltipped').tooltip();
});

//To-Do
//Find a way to make btn more mobile friendly
//Implement medium & hard modes