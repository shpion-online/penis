const characters = [
    { name: 'Мальборо', emoji: '😈' },
    { name: 'Вінстон', emoji: '😈' },
    { name: 'Лакі Страйкі', emoji: '😈' },
    { name: 'Елемка', emoji: '😈' },
    { name: 'Пул синій', emoji: '😈' },
    { name: 'Блек кепітан', emoji: '😈' },
    { name: 'Маршал тонкі', emoji: '😈' },
    { name: 'Алькапоне', emoji: '😈' },
    { name: 'Грін дей', emoji: '😈' },
    { name: 'Портва', emoji: '😈' },
    { name: 'Рево', emoji: '😈' },
    { name: 'Фінька', emoji: '😈' },
    { name: 'Джим бім', emoji: '😈' },
    { name: 'Шейк', emoji: '😈' },
    { name: 'Кінг брідж', emoji: '😈' },
    { name: 'Шампанське', emoji: '😈' },
    { name: 'Неміроф', emoji: '😈' },
    { name: 'Трава', emoji: '😈' },
    { name: 'Меф', emoji: '😈' },
    { name: 'Кокс', emoji: '😈' },
    { name: 'Герич', emoji: '😈' },
    { name: 'Соль', emoji: '😈' },
    { name: 'Гараж', emoji: '😈' },
    { name: 'Повна діжка', emoji: '😈' },
    { name: 'Піна колада', emoji: '😈' },
    { name: 'Єгер', emoji: '😈' },
    { name: 'Трибуха', emoji: '😈' },
    { name: 'Косиба', emoji: '😈' },
    { name: 'Наукова', emoji: '😈' },
    { name: 'Філіпіни', emoji: '😈' },
    { name: 'Вальхала', emoji: '😈' },
    { name: 'Подік', emoji: '😈' },
    { name: 'Лео бір', emoji: '😈' },

];

let players = [];
let currentPlayerIndex = 0;
let totalPlayers = 0;
let selectedCharacter = null;
let spyIndex = -1;

const setupScreen = document.getElementById('setup-screen');
const cardsScreen = document.getElementById('cards-screen');
const allCardsScreen = document.getElementById('all-cards-screen');
const playerButtons = document.querySelectorAll('.player-btn');
const nextPlayerBtn = document.getElementById('next-player-btn');
const showCardBtn = document.getElementById('show-card-btn');
const hideCardBtn = document.getElementById('hide-card-btn');
const showAllBtn = document.getElementById('show-all-btn');
const restartBtn = document.getElementById('restart-btn');
const backToSingleBtn = document.getElementById('back-to-single-btn');
const restartAllBtn = document.getElementById('restart-all-btn');
const cardImage = document.getElementById('card-image');
const cardPhoto = document.getElementById('card-photo');
const cardTitle = document.getElementById('card-title');
const playerCard = document.getElementById('player-card');
const cardPlaceholder = document.getElementById('card-placeholder');
const screenSubtitle = document.querySelector('.screen-subtitle');
const currentPlayerNumber = document.getElementById('current-player-number');
const totalPlayersSpan = document.getElementById('total-players');
const allCardsGrid = document.getElementById('all-cards-grid');

const photosFolder = 'photos/';

const photoExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function encodeFileName(fileName) {
    return encodeURIComponent(fileName);
}

function getCharacterPhoto(characterName) {
    for (const ext of photoExtensions) {
        const encodedName = encodeFileName(characterName);
        const photoPath = photosFolder + encodedName + ext;
        return photoPath;
    }
    return null;
}

async function checkPhotoExists(photoPath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = photoPath;
    });
}

async function getCharacterPhotoWithCheck(characterName) {
    for (const ext of photoExtensions) {
        const encodedName = encodeFileName(characterName);
        const photoPath = photosFolder + encodedName + ext;
        const exists = await checkPhotoExists(photoPath);
        if (exists) {
            return photoPath;
        }
    }
    return null;
}

playerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        totalPlayers = parseInt(btn.dataset.players);
        startGame();
    });
});

function startGame() {
    selectedCharacter = characters[Math.floor(Math.random() * characters.length)];
    
    spyIndex = Math.floor(Math.random() * totalPlayers);
    
    players = [];
    for (let i = 0; i < totalPlayers; i++) {
        players.push({
            number: i + 1,
            isSpy: i === spyIndex
        });
    }
    
    setupScreen.classList.remove('active');
    cardsScreen.classList.add('active');
    allCardsScreen.classList.remove('active');
    
    currentPlayerIndex = 0;
    resetCardDisplay();
}

function updateSubtitle() {
    if (showCardBtn.style.display !== 'none') {
        screenSubtitle.textContent = 'Натисніть "Показати карточку гравця", щоб побачити картку';
    } else if (hideCardBtn.style.display !== 'none') {
        screenSubtitle.textContent = 'Натисніть "Я побачив карточку", щоб приховати картку';
    } else if (nextPlayerBtn.style.display !== 'none') {
        screenSubtitle.textContent = 'Передай телефон іншому гравцю';
    } else if (showAllBtn.style.display !== 'none') {
        screenSubtitle.textContent = 'Натисніть "Показати всі карточки", щоб побачити всі карточки';
    }
}

function resetCardDisplay() {
    if (currentPlayerIndex >= totalPlayers) {
        showGameFinishedScreen();
        return;
    }
    
    const player = players[currentPlayerIndex];
    totalPlayersSpan.textContent = totalPlayers;
    currentPlayerNumber.textContent = player.number;
    
    playerCard.classList.add('hidden');
    cardPlaceholder.classList.remove('hidden');
    cardPlaceholder.innerHTML = '<p>Нажми кнопку нижче, щоб побачити свою картку</p>';

    
    showCardBtn.style.display = 'inline-block';
    hideCardBtn.style.display = 'none';
    nextPlayerBtn.style.display = 'none';
    showAllBtn.style.display = 'none';
    
    updateSubtitle();
}

function showGameFinishedScreen() {
    totalPlayersSpan.textContent = totalPlayers;
    currentPlayerNumber.textContent = totalPlayers;
    
    playerCard.classList.add('hidden');
    cardPlaceholder.classList.remove('hidden');
    cardPlaceholder.innerHTML = '<p style="font-size: 1.5em; font-weight: bold; color: #667eea;">✅ Всі карточки показані!</p><p style="margin-top: 20px;">Тепер можна подивитися всі ролі</p>';
    
    showCardBtn.style.display = 'none';
    hideCardBtn.style.display = 'none';
    nextPlayerBtn.style.display = 'none';
    showAllBtn.style.display = 'inline-block';
    
    updateSubtitle();
}

async function showPlayerCard() {
    const player = players[currentPlayerIndex];
    
    if (player.isSpy) {
        playerCard.classList.add('spy');
        cardImage.textContent = '🕵️';
        cardImage.style.display = 'block';
        cardPhoto.style.display = 'none';
        cardTitle.textContent = 'ШПІОН';
    } else {
        playerCard.classList.remove('spy');
        const photo = await getCharacterPhotoWithCheck(selectedCharacter.name);
        
        if (photo) {
            cardPhoto.src = photo;
            cardPhoto.onerror = () => {
                cardPhoto.style.display = 'none';
                cardImage.textContent = selectedCharacter.emoji;
                cardImage.style.display = 'block';
            };
            cardPhoto.style.display = 'block';
            cardImage.style.display = 'none';
        } else {
            cardImage.textContent = selectedCharacter.emoji;
            cardImage.style.display = 'block';
            cardPhoto.style.display = 'none';
        }
        cardTitle.textContent = selectedCharacter.name;
    }
    
    playerCard.classList.remove('hidden');
    cardPlaceholder.classList.add('hidden');
    
    showCardBtn.style.display = 'none';
    hideCardBtn.style.display = 'inline-block';
    nextPlayerBtn.style.display = 'none';
    
    updateSubtitle();
}

function hideCard() {
    playerCard.classList.add('hidden');
    cardPlaceholder.classList.add('hidden');
    
    showCardBtn.style.display = 'none';
    hideCardBtn.style.display = 'none';
    nextPlayerBtn.style.display = 'inline-block';
    
    updateSubtitle();
}

showCardBtn.addEventListener('click', () => {
    showPlayerCard();
});

hideCardBtn.addEventListener('click', () => {
    hideCard();
});

nextPlayerBtn.addEventListener('click', () => {
    currentPlayerIndex++;
    resetCardDisplay();
});

showAllBtn.addEventListener('click', () => {
    showAllCards();
});

async function showAllCards() {
    cardsScreen.classList.remove('active');
    allCardsScreen.classList.add('active');
    
    allCardsGrid.innerHTML = '';
    
    const photo = await getCharacterPhotoWithCheck(selectedCharacter.name);
    
    players.forEach((player, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'mini-card' + (player.isSpy ? ' spy' : '');
        
        if (player.isSpy) {
            cardDiv.innerHTML = `
                <div class="mini-card-image">🕵️</div>
                <div class="mini-card-title">ШПІОН</div>
                <div class="mini-card-player">Гравець ${player.number}</div>
            `;
        } else {
            if (photo) {
                cardDiv.innerHTML = `
                    <img src="${photo}" class="mini-card-photo" alt="${selectedCharacter.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="mini-card-image" style="display: none;">${selectedCharacter.emoji}</div>
                    <div class="mini-card-title">${selectedCharacter.name}</div>
                    <div class="mini-card-player">Гравець ${player.number}</div>
                `;
            } else {
                cardDiv.innerHTML = `
                    <div class="mini-card-image">${selectedCharacter.emoji}</div>
                    <div class="mini-card-title">${selectedCharacter.name}</div>
                    <div class="mini-card-player">Гравець ${player.number}</div>
                `;
            }
        }
        
        allCardsGrid.appendChild(cardDiv);
    });
}

backToSingleBtn.addEventListener('click', () => {
    allCardsScreen.classList.remove('active');
    cardsScreen.classList.add('active');
    showGameFinishedScreen();
});

restartBtn.addEventListener('click', () => {
    resetGame();
});

restartAllBtn.addEventListener('click', () => {
    resetGame();
});

function resetGame() {
    cardsScreen.classList.remove('active');
    allCardsScreen.classList.remove('active');
    setupScreen.classList.add('active');
    
    players = [];
    currentPlayerIndex = 0;
    totalPlayers = 0;
    selectedCharacter = null;
    spyIndex = -1;
}

