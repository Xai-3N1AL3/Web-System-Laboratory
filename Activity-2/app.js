document.addEventListener('DOMContentLoaded', function() {

    const list = document.querySelector('#song-list ul');
    const forms = document.forms;

    // Delete songs
    list.addEventListener('click', (e) => {
        if (e.target.className == 'delete') {
            const li = e.target.parentElement;
            li.parentNode.removeChild(li);
        }
    });

    // Add songs
    const addForm = forms['add-song'];
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get input values
        const songTitle = addForm.querySelector('input[placeholder="Enter song title"]').value.trim();
        const artistName = addForm.querySelector('input[placeholder="Enter artist name"]').value.trim();

        // Ensure both fields have values
        if (songTitle === '' || artistName === '') {
            alert('Please fill out both the song title and artist name.');
            return;
        }

        // Create elements
        const li = document.createElement('li');
        const songName = document.createElement('span');
        const artist = document.createElement('span');
        const deleteBtn = document.createElement('span');

        // Add text content
        songName.textContent = songTitle;
        artist.textContent = `Artist: ${artistName}`;
        deleteBtn.textContent = 'Delete';

        // Add classes for styling
        songName.classList.add('name');
        artist.classList.add('artist'); 
        deleteBtn.classList.add('delete');

        // Append elements to the list item
        li.appendChild(songName);
        li.appendChild(artist);
        li.appendChild(deleteBtn);

        // Append the list item to the playlist
        list.appendChild(li);

        // Clear form inputs after adding
        addForm.querySelector('input[placeholder="Enter song title"]').value = '';
        addForm.querySelector('input[placeholder="Enter artist name"]').value = '';
    });

    // Filter songs
    const searchBar = forms['search-songs'].querySelector('input');
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const songs = list.getElementsByTagName('li');
        Array.from(songs).forEach((song) => {
            const title = song.firstElementChild.textContent;
            if (title.toLowerCase().includes(term)) {
                song.style.display = 'block';
            } else {
                song.style.display = 'none';
            }
        });
    });

});
