// Variaveis Globais
let base_game = document.getElementById("base_game");
let card_itens = ["😀","🙄", "💀", "👀", "👶🏾","🐤","🐟", "🌱", '🌞','🍄', "🌎", "❤️"];
let cardsElements = '';
let hits = 0;
let elementsSelected = [];
let blockToClick = false;

// Funções
function createCard(content, index){

    return `
        <div class="col-sm-2 p-3 border m-2 d-flex justify-content-center cards" id="card_${index}">    
            <h1>${content}</h1>
        </div>
    `;

}

function insertCard(card) {
    base_game.innerHTML += card;
}

function shuffleArray(array) {  
      
    let selected = [];
    let newArray = [];

    card_itens = [...card_itens, ...card_itens];

    for (var i = card_itens.length; i > 0; i--) {

        let randomNumber = Math.floor(Math.random() * (card_itens.length));

        if(!selected.includes(randomNumber)){
            selected.push(randomNumber);
            newArray.push(card_itens[randomNumber])
            continue;
        } 

        i++;
    }
    return newArray;
}

function putCardsNotFoundFaceDown(){

    var h1List = document.querySelectorAll('.cards:not(.found) > h1');

    h1List.forEach(function(element) {
        // Altera o texto dentro de cada h1
        element.textContent = '🃏';
    });

}

card_itens = shuffleArray(card_itens);

card_itens.forEach(function(item, index) {
    insertCard(createCard(item, index));
});

putCardsNotFoundFaceDown()

cardsElements = document.querySelectorAll('.cards');

cardsElements.forEach(function(element) {

    element.addEventListener('click', function() {
        if(blockToClick){
            return;
        }
        hits++;

        if(hits > 2){
            putCardsNotFoundFaceDown();
            hits = 1;
        }
        
        this.classList.add("selected");

        let index = this.id.split("_")[1];
        this.querySelector("h1").textContent = card_itens[index];
        
        elementsSelected[hits] = this;

        if(hits == 2){
            
            if(elementsSelected[1].id == elementsSelected[2].id){
                return;
            }

            let firstValue = elementsSelected[1].querySelector("h1").textContent
            let secondValue = elementsSelected[2].querySelector("h1").textContent

            if(firstValue == secondValue) {
             
                elementsSelected[1].classList.add("found");        
                elementsSelected[2].classList.add("found");
            }

            elementsSelected[1].classList.remove("selected");
            elementsSelected[2].classList.remove("selected");
            blockToClick = true;
 
            elementsSelected[1].classList.add("wrongchose");
            elementsSelected[2].classList.add("wrongchose");

            setTimeout(function() {
                
                putCardsNotFoundFaceDown();
                blockToClick = false;
                elementsSelected[1].classList.remove("wrongchose");
                elementsSelected[2].classList.remove("wrongchose");
            }, 1000);
            
            
        }
        

        
    });

});

console.log(card_itens)




