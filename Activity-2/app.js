const title = document.getElementById('songTitle');
const artist = document.getElementById('artistName');
const addBtn = document.getElementById('addBtn');
const songBar = document.getElementById('songBar')

addBtn.addEventListener('click', ()=>{
    const newTitle = title.value;
    const newArtist = artist.value;

    const h5 = document.createElement('h5');
    const p = document.createElement('p');

    h5.innerHTML = newTitle;
    p.innerHTML = newArtist;

    h5.classList.add('mb-1');
    p.classList.add('mb-1');

    const div = document.createElement('div');
    const div1 = document.createElement('div');
    div.append(h5);
    div.append(p);

    div1.append(div);

    songBar.append(div1)

    console.log(div);
})

console.log(title, artist, addBtn)