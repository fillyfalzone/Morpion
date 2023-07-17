// Progammer le jeu du morpion entièrement en JS

// I) Mise en place des noeud du DOM

const grid = document.getElementById('grid');

const block = document.createElement('div');
block.classList.add('block');
 
// cibler les siège des joueur
const seatPlayer1 = document.querySelector('.seat1');
const seatPlayer2 = document.querySelector('.seat2');



// stylisation de chaque noeud

block.style.width = "200px";
block.style.height = "200px";
block.style.boxShadow = "0 0 5px #888";
block.style.display = "flex"
block.style.justifyContent = "center";
block.style.alignItems = "center"
block.style.fontFamily = "sans-serif";
block.style.fontWeight = "900"
block.style.fontSize = "70px";

// Clonnage des blocks
for(let i = 0; i < 9; i++){
    let newBlock = block.cloneNode();
    grid.appendChild(newBlock);
}

// II) Partie Script

// Déclaration des joueurs

const players = [
    {
        nom: "Paul",
        jeton: "X",
        couleur: "#800"
    },

    {
        nom: "Arnaud",
        jeton: "O",
        couleur: "#080"
    }
]

// Selection aléatoire du premier jouer
//nomber aléatoire entre 0 et 1
let idCurrentPlayer = Math.floor(Math.random() * 2);
seatSelect()
let currentPlayer = players[idCurrentPlayer];


//Création du tableau qui contient les block
let tab = [null, null, null, null, null, null, null, null, null]; // valeurs possibles : null (case disponible), 0, 1 (id player)

// fct° verification de victoire qui liste tout les ligne gagnantes

function checkWin(player){
    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical lines
        [0, 4, 8], [2, 4, 6]  // diagonal lines
    ];

    // retourner la combinaison gagnante
    return winLines.some(combinaison => {
        const [a, b, c] = combinaison;
        return tab[a] === player && tab[b] === player && tab[c] === player
    });
}

//ajout du click sur chaque block de grid
const blocks = grid.querySelectorAll('.block');
let emptyBlocks = 8; // cases vide restantes
const result = document.querySelector('.result');

blocks.forEach(element => {
    element.addEventListener('click', () => {
        // On cible la case clicquée à l'aide des méthode array.from() et indexOf() 
        const index = Array.from(blocks).indexOf(element);
         // condition de vérification de l'état de la case cochée
        if(tab[index] === null){
            tab[index] = idCurrentPlayer;
            element.textContent = currentPlayer.jeton;
            // la couleur du jeton
            element.style.color = currentPlayer.couleur;
            

            //viréfication si le coup est gagnant
            if(checkWin(currentPlayer.jeton)){
                
                resetGame();
            } 
            //potentiel nul detecté
            else if (emptyBlocks < 2){
                alert('match nul');
            }
            //tout les blocks jouer sans victoire
            else if (tab.every(cell => cell !== null)){
                //message à afficher
                resetGame();
            }
            //si la partie continue
            else {
                idCurrentPlayer = (idCurrentPlayer + 1) % 2; // toggle 0/1
               
                currentPlayer = players[idCurrentPlayer];    
            }
            seatSelect(); //switcher les giège
            --emptyBlocks;
            console.log(emptyBlocks);
        }

    });
});

//fct° de reset du jeu
function resetGame () {
    // on place un écouteur d'event de "keydown" au niveau du document
    document.addEventListener('keydown', function (event) {
       // virification si la touche est appuyée
       if(event.key === 'Enter') {
            // si oui  on efface le tableau et  le resultat
            tab = [null,null,null,null,null,null,null,null,null];
            blocks.forEach(element => {
                element.textContent = '';
            });
       } 
    })
}
resetGame();

//fct° qui selectionne le siege qui doit jouer

function seatSelect () {
    // condition de toggle pour switcher les sièges
    if (idCurrentPlayer === 0){
        seatPlayer2.classList.toggle('showSeat2');
        seatPlayer1.classList.remove('showSeat1')
    } else {
        seatPlayer1.classList.toggle('showSeat1');
        seatPlayer2.classList.remove('showSeat2');
    }
}







            