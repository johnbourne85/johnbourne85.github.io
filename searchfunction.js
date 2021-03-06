//Main search fucntion for finding songs etc

function searchfunction() {
  //reset the output ad message
  document.querySelector("#output").innerHTML = "";
  document.querySelector("#message").textContent = "";

  //disable the button and set it to show ... as a loading message
  document.querySelector("#searchBtn").textContent = "...";
  document.querySelector("#searchBtn").classList.add("disabled");

  //set up the URL for getting the data
  const baseid = "appoSpWy6YfbT6owy";
  const tablename = "songs";
  const query = document.getElementById("searchbox").value.trim();
  console.log(query);
  const apikey = "keyikCO7h5adp9Xtx";
  const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}&filterByFormula=Find(LOWER(%22${query}%22)%2C+LOWER(searchroll))`;

  //set the message if search results are found
  const hadThat = `<div class="alert alert-warning" role="alert"><p><strong>We've had that already!</strong></p></p>Or... at least we've had something kinda similar based on the letters you've typed in...</p></div>`;

  //set the message if NO search results are found
  const noResults = `<div class="alert alert-warning" role="alert"><p>There was a young man called Peter,</p><p>When it comes to cock, he's an eater,</p><p>No results for this search,</p><p>But don't cry, Mr Church,</p><p>You are a song choosing world beater.</p></div>`;

  // a variable to say if someting is odd or even
  let oddEven = "";

  // get the data
  $.getJSON(searchURL, function (songData) {
    //if no results, display the message and reset the button
    if (songData.records.length === 0) {
      $("#message").append(noResults);

      document.querySelector("#searchBtn").textContent = "Go";
      document.querySelector("#searchBtn").classList.remove("disabled");
    } else {
      // if there are results, show the message
      $("#message").append(hadThat);

      for (let i = 0; i < songData.records.length; i++) {
        let who = songData.records[i].fields.whoSongRoll;

        // if nobody is in Airtable for who chose the song, call them "Someone" rather than "undefined"
        if (who === undefined) {
          who = "someone";
        }

        //set the color of the list item if odd/even, so they display alternate colors
        if (i % 2 == 0) {
          oddEven = "list-group-item-success";
        } else {
          oddEven = "list-group-item-primary";
        }

        //set up the item's HTML pulling in the data
        const songitem = `
        <ul class="list-group">
        <li class="list-group-item ${oddEven}">
        <h4 class="card-title">${songData.records[i].fields.title}</h4>
            <h5 class="card-subtitle mb-2 text-muted">by ${songData.records[i].fields.artistRoll}</h5>
            <p class="card-text">Chosen by <strong>${who}</strong> in the "<em><strong>${songData.records[i].fields.themeRoll}</strong></em>" theme.</p>
        </li>
        </ul>
        `;

        //append the list item into the end of the output
        $("#output").append(songitem);

        //reset the button so it's no longer "loading"
        document.querySelector("#searchBtn").textContent = "Go";
        document.querySelector("#searchBtn").classList.remove("disabled");
      }
    }
  });
}
