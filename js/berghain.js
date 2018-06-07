//A game is based on the players inputs. It basically calculates the probability of him/her getting into 
//Berghain. It also has some amount of randomness to it (because it actually is random in rl). I'll explain the points accumulation as I write the code.

$(document).ready(function(){
    
    $("#finalscreen").hide(); //by default I'm hiding the final screen.

    $('#submit').on('click',function(){

/////////////////////getting the values from elements

    var age = parseInt($("#age").val());
    var time = $("#time").val(); //it returns a string like: "00:21". I will need to omit the colon first, then parseInt it.

  //getting the value from the radio buttons
    var no = $('input[id=no]:checked').val();
    var yes = $('input[id=yes]:checked').val();

///////////////////// math for berghainPoints

    var berghainPoints = 0; //I start counting the "points" at 0

    //getting the values from checkboxes AND already adding them to the berghainPoints
    var $arrayOfChecked = $("div.buttons input:checked");

    $arrayOfChecked.each(function(i, element) {
       var $element = $(element);
       berghainPoints += parseInt($element.val());
    });

    //if the input of the age is les than 21, the selection doesn't even happen.
    if (age < 21) {
        berghainPoints -= 200;
    };
    
    //if the age is bigger, add it to the berghainPoints
    if (age >= 21) {
        berghainPoints += age;
    };

    
    //if the answer for the question is yes, add 20 to the berghainPoints
    if (yes == "true") {
       berghainPoints += 20
    };
    
    //if it's no, take 20 to the berghainPoints
    if (no == "true") {
        berghainPoints -= 20
    };
  
  //concatenate the digits in the time and add them to the berghainPoints
    var colonlessString = time.replace(/:/,'');
    var parsed = parseInt(colonlessString);

    var sum = 0;
    while (parsed) {
        sum += parsed % 10;
        parsed = Math.floor(parsed/10);
        berghainPoints -= sum;
    } 

  // generating a random number between -50 and 50, adding it to the berghainPoints
  var min = -50;
  var max = 50;
  
  function getRandom(min, max) {
        berghainPoints += Math.random() * (max - min) + min;
  };

  console.log(berghainPoints);

  
//////////getting the results, the lowest should be -109 and the highest possible 241. Based on that, the middle is 66.
/////////for 2 seconds display the "calculating" face of the bouncer

    function displayResult() {
        $(".game1").hide();
        $("#finalscreen").show();
        $(".link").hide();
        $("#finalscreen h1").html('"calculating..."');
        
        setTimeout(function(){
            if (berghainPoints <= 66) {
                $("#finalscreen h1").html('"Leider nicht (for non-german-speaking: Sorry, no, get lost!)"');//You don't get in
                $("#finalscreen").show();
                $(".link").show();
            }
            else if (berghainPoints > 66) {
                $("#finalscreen h1").html('"You are in!"'); //You get in
                $("#finalscreen").show();
                $(".link").show();
            }
        }, 2000);
  
  };
  displayResult();
});
});