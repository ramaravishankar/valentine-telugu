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
    { name: "Ninne Pelladatha", url: "songs/song1.mp3" },
    { name: "Prema Desam", url: "songs/song2.mp3" },
    { name: "Geetanjali", url: "songs/song3.mp3" },
    { name: "Arya 2 - Ringa Ringa", url: "songs/song4.mp3" },
    { name: "Ye Maaya Chesave", url: "songs/song5.mp3" },
    { name: "Ala Modalaindi", url: "songs/song6.mp3" },
    { name: "Bommarillu - Appudo Ippudo", url: "songs/song7.mp3" },
    { name: "Raja Rani - Nee Jathaga", url: "songs/song8.mp3" },
    { name: "Tholi Prema", url: "songs/song9.mp3" },
    { name: "Fidaa - Vachinde", url: "songs/song10.mp3" }
];

let currentSongIndex = 0;
let currentlyPlayingTile = null;
let currentAudio = new Audio(); // Reuse single Audio object

// Generate heart tiles
function generateHeart() {
    const heartDiv = document.getElementById('heart');
    heartDiv.innerHTML = '';
    
    heartPattern.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const tile = document.createElement('div');
            if (cell === 1) {
                tile.className = 'tile';
                tile.dataset.row = rowIndex;
                tile.dataset.col = colIndex;
                tile.addEventListener('click', handleTileClick);
            } else {
                tile.className = 'tile invisible';
            }
            heartDiv.appendChild(tile);
        });
    });
}

// Handle tile click
function handleTileClick(event) {
    const tile = event.target;
    
    // Remove playing class from previously playing tile
    if (currentlyPlayingTile && currentlyPlayingTile !== tile) {
        currentlyPlayingTile.classList.remove('playing');
    }
    
    // Add clicked animation
    tile.classList.add('clicked');
    setTimeout(() => {
        tile.classList.remove('clicked');
    }, 600);
    
    // Add playing state
    tile.classList.add('playing');
    currentlyPlayingTile = tile;
    
    // Play song
    playSong(currentSongIndex);
    
    // Move to next song
    currentSongIndex = (currentSongIndex + 1) % teluguLoveSongs.length;
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
    messageDiv.textContent = '💙 Thanks for choosing me! You made my day! 💙';
    messageDiv.style.fontSize = '2.5rem';
    messageDiv.style.color = '#1a73e8';
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
