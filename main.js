    document.getElementById("search").addEventListener('click', event => {
    event.preventDefault()

    const userInputSong = document.getElementById('InputSong').value
    if(userInputSong == "") alert("Field can't be Empty!");
    else{
        document.getElementById('results').innerHTML = ''
        document.getElementById('lyrics').innerText = ''
        document.getElementById('songTitle').innerText = ''

        document.getElementById('results').innerHTML = "<h1> Searching... </h1>";
        fetch(`https://api.lyrics.ovh/suggest/${userInputSong}`)
            .then(response => response.json())
            .then(data => {
                const searchResults = data.data.filter((song, index) => index < 10)
                if(searchResults == ""){
                    document.getElementById('results').innerHTML = "<h1> No Result </h1>";
                }else{
                    document.getElementById('results').innerHTML = "";
                    
                    searchResults.map((song) => {
                        document.getElementById('results').innerHTML += `
                    <div class="single-result row align-items-center my-2 p-2">
                        <div class="col-md-2">
                            <img width="100%" src="${song.album.cover}" alt="">
                        </div>
                        <div class="col-md-7 ml-0">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">Album By  <span>${song.artist.name}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>
                    `
                    })
                }
            })
        }
    })


    const getLyrics = (artist, title) => {

        fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            .then(res => res.json())
            .then(data => {
                const lyrics = data.lyrics
                const songTitle = `${title} - ${artist}`
                if (lyrics == undefined) {
                    document.getElementById('songTitle').innerHTML = "<br><br><br><br>" + songTitle
                    document.getElementById('lyrics').innerHTML = "<h3>Sorry No Lyrics Found</h3> <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
                } else {
                    document.getElementById('songTitle').innerText = songTitle
                    document.getElementById('lyrics').innerText = lyrics
                }
                window.location.href = "#lyric-area";
            })

            
    }