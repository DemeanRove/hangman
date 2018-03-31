$(document).ready(function() {
    
    //Scale in animations
    $(".waves-effect").addClass("scale-in")
    $(".game").addClass("scale-in")
    
    //Navbar buttons
    $(".tab").click(function() {
        if ($(this).hasClass("disabled") != true) {
            $(this).siblings().removeClass("active")
            $(this).addClass("active")
        }
    })
    
    //Btn size adjust
    if ($(window).width() <= 600) {
        $(".waves-effect").addClass("btn")
    } 
    else {
        $(".waves-effect").addClass("btn-large")
    }
    
    //Play Again Btn
    // 
    // TODO : Change to work for different levels of difficulty
    //     
    $(".wrapper").click(function() {
        $(".waves-effect").removeClass("disabled")
        if($(this).hasClass("easy-mode")) {
            reset()
        }
        else if($(this).hasClass("medium-mode")) {
            resetMed()
        } 
        else {
            resetHard()
        }
    })
    
    //On-Screen Btn Pushed
    $(".waves-effect").click(function() { 
        let letter = $(this).text() //Letter guessed by user
        letterCheck(letter, level)
        $(this).addClass("disabled") //Disable btn after click
    })
  
    //Key pressed
    $(window).keypress(function(e) {
        if (lives != 0) {
            var c = String.fromCharCode(e.which).toUpperCase() 
            if (jQuery.inArray(c, guessed) == -1) { //If key not already guessed
                let letter = c //Letter guessed by user
                letterCheck(letter, level)
                $(".waves-effect").filter(function() {
                    return $(this).text() == c;
                }).addClass("disabled")
            }
        }
    })

   //Game Mode Select
   $(".tab-easy").click(function() {
       level = ".easy"
       $(".wrapper").removeClass("hard-mode")
       $(".wrapper").removeClass("medium-mode")
       $(".wrapper").addClass("easy-mode")
       reset()
   })

   $(".tab-medium").click(function() {
       level = ".medium"
       $(".wrapper").removeClass("easy-mode")
       $(".wrapper").removeClass("hard-mode")
       $(".wrapper").addClass("medium-mode")
       resetMed()
   })

   $(".tab-hard").click(function() {
    level = ".hard"
    $(".wrapper").removeClass("easy-mode")
    $(".wrapper").removeClass("medium-mode")
    $(".wrapper").addClass("hard-mode")
    resetHard()
   })

   //Final Calls
   reset()

   //Materialize CSS Commands
   $('.tooltipped').tooltip()
   $('.tabs').tabs()
        
})