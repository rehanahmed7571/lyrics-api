document.getElementById("btn").addEventListener('click',function(){
    const searchText = document.getElementById('search-text').value
fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
.then(res => res.json())
.then(data => {
    let getData = data.data
    getData= getData.slice(0,10)
    const searchResult = document.getElementById('search-result')
    searchResult.innerHTML=" ";
    for(i=0; i<getData.length; i++){
        const getItems = getData[i]
        const title = getItems.title
        const artist = getItems.artist.name

       const newDiv = document.createElement("div")
       
       newDiv.innerHTML=`

       <div class="single-result row align-items-center my-3 p-3" >
            <div class="col-md-9" >
                <h3 class="lyrics-name">${title}</h3>
            <p class="author lead">Album by <span>${artist}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="callLyrics('${artist}','${title}')">Get Lyrics</button>
            </div>
        </div>     
       `
       searchResult.appendChild(newDiv)
    }            
})

.catch(error => displayError('Something Went Wrong!! Please try again later!'));

})

function callLyrics(artist,title){

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res =>res.json())
    .then(data=>{
        const lyricsContainer = document.getElementById('lyrics')
        lyricsContainer.innerHTML="";
        const p = document.createElement("div")

        if(data.lyrics==undefined){
            p.innerHTML=`there is no result`
        }else{
            p.innerHTML=`${data.lyrics}`
        lyricsContainer.appendChild(p)
        }
     
    })

}