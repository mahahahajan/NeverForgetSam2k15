window.onload = function() { 
    var sam = document.getElementById("Sam");
    
    
    sam.onclick = function() {
        clicked();
    };
    
    
    function clicked() {
        var audio = new Audio("audio/deez.mp3");
        audio.play();
    }
}; 