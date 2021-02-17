//set up the URL to get data
const baseid = "appoSpWy6YfbT6owy";
const tablename = "themes";
const apikey = "keyikCO7h5adp9Xtx";
const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}`;
document.querySelector("#loading").classList.remove("hidden");
let songList = "";

//Filter by person, or "all"
function filterByPerson(chosenPerson) {
  //clear content
  document.querySelector("#loading").classList.remove("hidden");
  document.querySelector("#output").innerHTML = "";

  //get the data
  $.getJSON(searchURL, function (songData) {
    for (let i = 0; i < songData.records.length; i++) {
      if (chosenPerson == "All") {
        let output = `
        <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">  ${songData.records[i].fields.theme}</h5>
        <p class="card-text">by ${songData.records[i].fields.whothemeName}</p>
        <a href="${songData.records[i].fields.spotifyUrl}" class="btn btn-primary">Listen on Spotify</a>
      </div>
    </div>
    `;

        //if person seletcted isn't the person in this part of the loop, skip it
      } else if (songData.records[i].fields.whothemeName != chosenPerson) {
        continue;
      }
      let output = `
      <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">  ${songData.records[i].fields.theme}</h5>
      <p class="card-text">by ${songData.records[i].fields.whothemeName}</p>
      <a href="${songData.records[i].fields.spotifyUrl}" class="btn btn-primary">Listen on Spotify</a>
    </div>
  </div>
  `;

      $("#output").append(output);
      document.querySelector("#loading").classList.add("hidden");
    }
  });
}
//Listen for change on select box

document
  .getElementById("whoSelect")
  .addEventListener("change", function getPerson() {
    let chosen = this.value;
    switch (chosen) {
      case "0":
        chosen = "All";
        break;
      case "1":
        chosen = "Chid";
        break;
      case "2":
        chosen = "Dave";
        break;
      case "3":
        chosen = "John";
        break;
      case "4":
        chosen = "Luke";
        break;
      case "5":
        chosen = "Pete";
        break;
      case "6":
        chosen = "Rocky";
        break;
      default:
        chosen = "All";
    }
    filterByPerson(chosen);
  });

// run the filter
filterByPerson("All");
