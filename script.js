function Album(albumName, artistName, productionYear, genre, trackList) { 
    this.albumName = albumName;
    this.artistName = artistName;
    this.productionYear = productionYear;
    this.genre = genre;
    this.trackList = trackList; 
} //المعلومات داخل الفونكشن هو مجرد تعريف، وبهدها يتم عملية الاستدعاء. يعني لما نعمل البوم جديد، يتم تخزين كل واحدة من القيم التي مررناها قي الفونكشن، ويخلينا ان نقدر نستدعيها لاحقا 
// man definerer en funktion, der fungere som en klasse til at skabe et albums object, hvor hvert album skal have fem egenskaber/oplsyninger. 

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60); // beregner antallet af minutter 
    const remainingSeconds = seconds % 60; // finder resterende sekunder 
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`; // tilføjer et null foran, hvis sekunderne er under 10. 
}
// This function converts a duration in seconds into a miuntes format. 

function addAlbumToWebsite(album) { /* Man bruger denne function for at vise på websiden */
    const container = document.getElementById("content"); /* henter HTML element med id'et content, som fungere som området, hvor albummet vises. */
 
  
    const albumCard = document.createElement("div"); // albumcard bliver oprettet som et div, og rilføjer klassen "album-card. Har CSS-klassen"
    albumCard.classList.add("album-card");

    const albumHeader = document.createElement("div");
    albumHeader.classList.add("album-header"); // albumHeader oprettes og får klassen "album-Header", som tilføjer albumets grundlæggende information
/* den hjælper med at organisere hvert albums visning som et separat kort */ 
    
albumHeader.innerHTML = 
"<div class=\"album-title\">" + album.albumName + "</div>" +
"<div class=\"artist-name\">" + album.artistName + "</div>" +
"<div class=\"genre-year\">" + album.genre + " | " + album.productionYear + "</div>";


    
    const trackListButton = document.createElement("button"); /* for at create buttin der viser track-list */ 
    trackListButton.classList.add("track-list-button");
    trackListButton.textContent = "Vis trackliste ⬇";
    trackListButton.addEventListener("click", () => { /* bruges for at vise/skjile sanglisten, når man trykker på dem */
        trackList.classList.toggle("show"); 
        trackListButton.textContent = trackList.classList.contains("show") 
            ? "Skjul trackliste  ⬆"
            : "Vis trackliste ⬇";
    });

    
    const trackList = document.createElement("div"); /* for at vise sangen */
    trackList.classList.add("track-list");

  /* her går den gennem hver sang i tracklist og viser titel, nummer og længde. */
    album.trackList.forEach((track, index) => { /* går gennem alle sange */
        const trackItem = document.createElement("div");
        trackItem.classList.add("track-item"); /* for hvert sang oprettes et trackItem, som viser dangsnr, titel og længde */
        trackItem.innerHTML = `
            <span class="track-number">${index + 1}.</span>
            <span class="track-title">${track.trackTitle}</span>
            <span class="track-duration">${formatTime(track.trackTimeInSeconds)}</span>
        `;
        trackList.appendChild(trackItem);
    });

/* Denne kode tilføjer forksellgie elementer til albumCard */
    albumCard.appendChild(albumHeader);
    albumCard.appendChild(trackListButton); 
    albumCard.appendChild(trackList); 
    container.appendChild(albumCard); 
}



fetchContent("albums.json").then((albums) => { /* henter JSON-fataen fra filen */
    albums.forEach((albumData) => { /* går gennem hver album i JSON og opretter et album, som vises med addAlbumToWebsite */
        const album = new Album(
            albumData.albumName,
            albumData.artistName,
            albumData.productionYear,
            albumData.genre,
            albumData.trackList 
        );
        addAlbumToWebsite(album); 
    });
});

/* هذا الشيفرة تقوم بجلب بيانات من الأنترنت وتسهل استخدامها.  */
async function fetchContent(url) {   /* تحتاج الى رابط url للوصل الى البيانات  */
    const request = await fetch(url);  /* بعد الحصول على البيانات، تقوم الدالة بتحويلها الى صيغة json وهي صيغة سهلة الاستخدام للبيانات*/
    return await request.json();
}
/* Funktionen skal bruge en URL, hvor den kan hente data fra, så bruger den fetch til athente data fra den adresse. når dataene er hentet, bliver den lavet om til JSON-foramt */