const baseid = "appoSpWy6YfbT6owy";
const tablename = "artist";

const apikey = "keyikCO7h5adp9Xtx";

const searchURL = `https://api.airtable.com/v0/${baseid}/${tablename}?api_key=${apikey}&sort%5B0%5D%5Bfield%5D=countSongs&sort%5B0%5D%5Bdirection%5D=desc`;
let songList = "";
$.getJSON(searchURL, function (songData) {
  for (var i = 0; i < songData.records.length; i++) {
    var artistItem = ` <div class="accordion-item">
  <h2 class="accordion-header" id="heading${i + 1}">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapse${i + 1}"
      aria-expanded="true"
      aria-controls="collapse${i + 1}"
    >
    <span><strong>${i + 1}</strong></span>: ${
      songData.records[i].fields.Name
    } (Chosen ${songData.records[i].fields.countSongs} times).
    </button>
  </h2>
  <div
    id="collapse${i + 1}"
    class="accordion-collapse collapse"
    aria-labelledby="heading${i + 1}"
    data-bs-parent="#output"
  >
    <div class="accordion-body">
      <ol id="artist${i}">
      </ol>
    </div>
  </div>
</div>`;

    $("#output").append(artistItem);
    let songsArray = songData.records[i].fields.songRoll.split(";;;");
    let whoArray = songData.records[i].fields.whoRoll.split(";;;");
    let themeArray = songData.records[i].fields.themeRoll.split(";;;");
    for (let k = 0; k < whoArray.length; k++) {
      if (whoArray[k] === "") {
        whoArray[k] = "someone";
      }
    }
    for (let j = 0; j < songsArray.length; j++) {
      songList = `<li>
      <strong>${songsArray[j]}</strong>, chosen by ${whoArray[j]} in the ${themeArray[j]} theme
          </li>`;
      $(`#artist${i}`).append(songList);
    }
  }
  document.querySelector("#loading").classList.add("hidden");
});
