// Heart shape pattern (1 = tile, 0 = empty)
const heartPattern = [
    [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
];

// Telugu love songs (dummy references)
const teluguLoveSongs = [
    { name: "Ninne Pelladatha", url: "" },
    { name: "Prema Desam", url: "" },
    { name: "Geetanjali", url: "" },
    { name: "Arya 2 - Ringa Ringa", url: "" },
    { name: "Ye Maaya Chesave", url: "" },
    { name: "Ala Modalaindi", url: "" },
    { name: "Bommarillu - Appudo Ippudo", url: "" },
    { name: "96 - Kaathalae Kaathalae", url: "" },
    { name: "Tholi Prema", url: "" },
    { name: "Fidaa - Vachinde", url: "" }
];

let currentSongIndex = 0;
let currentlyPlayingTile = null;

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
    
    // Play song (simulated)
    playSong(currentSongIndex);
    
    // Move to next song
    currentSongIndex = (currentSongIndex + 1) % teluguLoveSongs.length;
}

// Simulate playing song
function playSong(index) {
    const song = teluguLoveSongs[index];
    const messageDiv = document.getElementById('message');
    
    // Show which song is "playing"
    messageDiv.textContent = `♫ Now playing: ${song.name} ♫`;
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // In a real implementation, you would play actual audio here
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
    
    // Hide buttons
    buttonsDiv.classList.add('hidden');
    
    // Show thank you message
    messageDiv.textContent = '💙 Thanks for choosing me! You made my day! 💙';
    messageDiv.style.fontSize = '2.5rem';
    messageDiv.style.animation = 'none';
    setTimeout(() => {
        messageDiv.style.animation = 'fadeIn 0.5s ease';
    }, 10);
    
    // Add celebration effect to all tiles
    const tiles = document.querySelectorAll('.tile:not(.invisible)');
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.style.background = 'linear-gradient(135deg, #56ab2f, #a8e063)';
            tile.style.animation = 'pulse 1s ease-in-out';
        }, index * 50);
    });
});

// Initialize the heart on page load
window.addEventListener('DOMContentLoaded', generateHeart);
