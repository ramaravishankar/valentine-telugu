// Heart shape pattern (1 = tile, 0 = empty) - Reduced to 46 tiles
const heartPattern = [
    [0, 1, 1, 0, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0]
];

// Telugu love songs with audio file paths
const teluguLoveSongs = [
    { name: "Allantha Doorala", url: "songs/song1.mp3" },
    { name: "Andala Chukkala Lady", url: "songs/song2.mp3" },
    { name: "Yemito", url: "songs/song3.mp3" },
    { name: "Hello Rammante", url: "songs/song4.mp3" },
    { name: "Nenu Nuvvantu", url: "songs/song5.mp3" },
    { name: "Neeli Meghamula lo", url: "songs/song6.mp3" },
    { name: "Boom Boom", url: "songs/song7.mp3" },
    { name: "Em Sandheham Ledhu", url: "songs/song8.mp3" },
    { name: "Oh Priya Priya", url: "songs/song9.mp3" },
    { name: "O Madhu", url: "songs/song10.mp3" },
    { name: "Neeve", url: "songs/song11.mp3" },
    { name: "Uppenantha", url: "songs/song12.mp3" },
    { name: "Baby He Loves You", url: "songs/song13.mp3" },
    { name: "Endhuko Pichi Pichi", url: "songs/song14.mp3" },
    { name: "Emantaro", url: "songs/song15.mp3" },
    { name: "Chilakamma", url: "songs/song16.mp3" },
    { name: "Neelo Jarige", url: "songs/song17.mp3" },
    { name: "Nammavemo", url: "songs/song18.mp3" },
    { name: "Udayinchina", url: "songs/song19.mp3" },
    { name: "Monna-Kanipinchavu", url: "songs/song20.mp3" },
    { name: "Nuvvunte Chaley", url: "songs/song21.mp3" },
    { name: "Ee Hridayam", url: "songs/song22.mp3" },
    { name: "Arerey Manasa", url: "songs/song23.mp3" },
    { name: "Ninnu Chudaganne", url: "songs/song24.mp3" },
    { name: "OkAnesa", url: "songs/song25.mp3" },
    { name: "Panchadhara Bomma", url: "songs/song26.mp3" },
    { name: "Allei Allei", url: "songs/song27.mp3" },
    { name: "Hamsaro", url: "songs/song28.mp3" },
    { name: "Oohalu Oorege Gaalanthaa", url: "songs/song29.mp3" },
    { name: "Padhe Padhe", url: "songs/song30.mp3" },
    { name: "Evvare Nuvvu", url: "songs/song31.mp3" },
    { name: "Beautiful Girl", url: "songs/song32.mp3" },
    { name: "Tanemando", url: "songs/song33.mp3" },
    { name: "With You", url: "songs/song34.mp3" },
    { name: "Meghaalu Lekunna", url: "songs/song35.mp3" },
    { name: "Ordinary", url: "songs/song36.mp3" },
    { name: "i_wanna_be_yours", url: "songs/song37.mp3" },
    { name: "Ninnila", url: "songs/song38.mp3" },
    { name: "Bommanu Geesthey", url: "songs/song39.mp3" },
    { name: "Nee Kannu Neeli", url: "songs/song40.mp3" },
    { name: "Vayyarala", url: "songs/song41.mp3" },
    { name: "Oosupodu", url: "songs/song42.mp3" },
    { name: "Aadinchi Ashta Chamma", url: "songs/song43.mp3" },
    { name: "Andaanike Aadanive", url: "songs/song44.mp3" },
    { name: "Hrudayam Jaripe", url: "songs/song45.mp3" },
    { name: "Apudo Ipudo", url: "songs/song46.mp3" },
    { name: "Aadapilla", url: "songs/song47.mp3" },
    { name: "Maate_Mantramu", url: "songs/song48.mp3" }
];

let currentlyPlayingTile = null;
let currentAudio = new Audio(); // Reuse single Audio object
let tileCount = 0; // Track tile index for song mapping

// Generate heart tiles
function generateHeart() {
    const heartDiv = document.getElementById('heart');
    heartDiv.innerHTML = '';
    let songIndex = 0; // Index for assigning songs to tiles
    
    heartPattern.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const tile = document.createElement('div');
            if (cell === 1) {
                tile.className = 'tile';
                tile.dataset.row = rowIndex;
                tile.dataset.col = colIndex;
                // Map each tile to a unique song
                tile.dataset.songIndex = songIndex;
                
                // Add image element for future image support
                const img = document.createElement('img');
                img.dataset.songIndex = songIndex;
                // Image source will be like: images/song1.jpg, images/song2.jpg, etc.
                img.src = `images/song${songIndex + 1}.jpg`;
                img.alt = `Song ${songIndex + 1}`;
                img.onerror = function() {
                    // Hide image if it doesn't exist
                    this.style.display = 'none';
                };
                tile.appendChild(img);
                
                songIndex++;
                tile.addEventListener('click', handleTileClick);
            } else {
                tile.className = 'tile invisible';
            }
            heartDiv.appendChild(tile);
        });
    });
    
    tileCount = songIndex; // Store total tile count
}

// Handle tile click
function handleTileClick(event) {
    // Get the tile element (in case an image was clicked)
    const tile = event.currentTarget;
    const songIndex = parseInt(tile.dataset.songIndex);
    
    // Check if clicking the currently playing tile (pause functionality)
    if (currentlyPlayingTile === tile && !currentAudio.paused) {
        // Pause the song
        currentAudio.pause();
        tile.classList.remove('playing');
        tile.classList.add('paused');
        
        const messageDiv = document.getElementById('message');
        const song = teluguLoveSongs[songIndex];
        messageDiv.textContent = `⏸ Paused: ${song.name} ⏸`;
        return;
    }
    
    // If clicking a paused tile, resume playing
    if (currentlyPlayingTile === tile && currentAudio.paused) {
        currentAudio.play().catch(err => {
            console.log('Playback error:', err);
        });
        tile.classList.remove('paused');
        tile.classList.add('playing');
        
        const messageDiv = document.getElementById('message');
        const song = teluguLoveSongs[songIndex];
        messageDiv.textContent = `♫ Now playing: ${song.name} ♫`;
        return;
    }
    
    // Remove playing class from previously playing tile (keep clicked state)
    if (currentlyPlayingTile && currentlyPlayingTile !== tile) {
        currentlyPlayingTile.classList.remove('playing', 'paused');
    }
    
    // Add clicked animation
    tile.classList.add('clicked-animation');
    setTimeout(() => {
        tile.classList.remove('clicked-animation');
    }, 600);
    
    // Mark tile as opened/clicked (persistent state)
    tile.classList.add('opened');
    
    // Add playing state
    tile.classList.add('playing');
    currentlyPlayingTile = tile;
    
    // Play the song associated with this tile
    playSong(songIndex);
}

// Play actual audio file
function playSong(index) {
    const song = teluguLoveSongs[index];
    const messageDiv = document.getElementById('message');
    
    // Stop currently playing audio
    currentAudio.pause();
    currentAudio.currentTime = 0;
    
    // Set new audio source
    currentAudio.src = song.url;
    
    // Handle audio load error (for when files don't exist yet)
    currentAudio.onerror = function() {
        console.log(`Audio file not found: ${song.url}`);
        messageDiv.textContent = `♫ ${song.name} ♫`;
    };
    
    // Handle successful audio load and play
    currentAudio.onloadeddata = function() {
        currentAudio.play().catch(err => {
            console.log('Playback error:', err);
        });
    };
    
    // Show which song is playing
    messageDiv.textContent = `♫ Now playing: ${song.name} ♫`;
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    console.log(`Playing: ${song.name}`);
}

// Handle No button click
document.getElementById('noBtn').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Click another tile to hear another song! 🎵';
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
});

// Handle Yes button click
document.getElementById('yesBtn').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    const buttonsDiv = document.getElementById('buttons');
    
    // Stop any playing audio
    currentAudio.pause();
    
    // Hide buttons
    buttonsDiv.classList.add('hidden');
    
    // Show thank you message
    messageDiv.textContent = '💚 Thanks for choosing me! You made my day! 💚';
    messageDiv.style.fontSize = '2.5rem';
    messageDiv.style.color = '#557571';
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Add celebration effect to all tiles
    const tiles = document.querySelectorAll('.tile:not(.invisible)');
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.style.background = 'linear-gradient(135deg, #34a853, #0f9d58)';
            tile.style.animation = 'pulse 1s ease-in-out';
        }, index * 50);
    });
});

// Initialize the heart on page load
window.addEventListener('DOMContentLoaded', generateHeart);
