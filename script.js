
var apikey = "keyBktR0kgRoYnwGY";
var input = document.getElementById("searchbox");
car offset = ""
var baseid = "appoSpWy6YfbT6owy";
var tablename = "songs";
var query = "";
var searchURL = "";

window.onload = function() {
  
  input = document.getElementById("searchbox");
  console.log(input);
  // Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  console.log("enter");
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    console.log("enter");
    document.getElementById("searchbtn").click();
  }
});
}

