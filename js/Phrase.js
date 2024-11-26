/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
        this.color = randomHSLA(); //Random color that will be different for each phrase
    }

    //Finds the ul for the phrase, and constructs html to match the phrase by turning it into an array using split and using foreach to create the html tags
    addPhraseToDisplay() {
        const ul = document.querySelector('#phrase').querySelector('ul');
        ul.innerHTML = '';
        let newHTML = '';
        this.phrase.split('').forEach((letter) => {
            if (letter === ' ')
                newHTML = newHTML.concat(`<li class="space"> </li>`);
            else
                newHTML = newHTML.concat(`<li class="hide letter ${letter}">${letter}</li>`);
        });
        ul.innerHTML = newHTML;
    }

    //Checks if the letter is in the phrase
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    //Finds the matched letter and replaces the hide class with the show class
    showMatchedLetter(letter) {
        document.querySelector('#phrase').querySelectorAll(`.${letter}`).forEach((li) => {
            li.classList.remove('hide');
            li.classList.add('show');
            li.style.backgroundColor = this.color;
        });
    }
}

function randomHSLA(){
    return `hsla(${~~(360 * Math.random())}, 90%,  50%, 1)`
}