const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  // Returns a 15 item array of song data objects.
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  // Alternatively, this can all be done using .map() and .join()
  // instead of .forEach() and .innerHTML. SEE BELOW!!
  // let output = '';
  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class="btn" data-artist="${song.artist.name}"
  //     data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  //   <ul class="songs">
  //     ${output}
  //   </ul>
  // `;

  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) => `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" 
        data-songtitle="${song.title}">Get Lyrics</button>
      </li>
      `
        )
        .join('')}
    </ul>
  `;

  // Append the buttons if there are more than the initial 15 results
  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ''
      }
      ${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ''
      }
    `;
  } else {
    more.innerHTML = '';
  }
}

// Gets previous or next batch of songs
async function getMoreSongs(url) {
  // Need this to bypass CORS
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

// Get the song lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // Regex to find line breaks and carriage returns.
  // The "g" is global, and it won't only replace the first match
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, `<br>`);

  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;

  // Clear this div in case there's "next" or "prev" button
  more.innerHTML = '';
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click
// `result` is the entire div of returned songs. `e.target` gets us the
// button that was clicked
result.addEventListener('click', (e) => {
  const clickedEl = e.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});
