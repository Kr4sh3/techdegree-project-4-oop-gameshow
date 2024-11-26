/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {

    constructor() {
        this.missed = 0
        this.phrases = [
            new Phrase('Under the weather'),
            new Phrase('Bite the bullet'),
            new Phrase('Break a leg'),
            new Phrase('All that glitters is not gold'),
            new Phrase('The only thing we have to fear is fear itself')
        ];
        this.activePhrase = null;
    }

    //Hides start overlay, sets active phrase to a random phrase, then adds it to the display
    startGame() {
        hide(document.querySelector('#overlay'));
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();

        //Reset Buttons
        document.querySelectorAll('button').forEach((button) => {
            button.disabled = false;
            button.classList.remove('chosen');
            button.classList.remove('wrong');
        });
        //Reset Lives
        document.querySelectorAll('[src="images/lostHeart.png"]').forEach((heart) => heart['src'] = "images/liveHeart.png");
    }

    //Returns a random phrase object from this.phrases
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    //Disables interacted button, checks phrase for letter, shows if matched, then checks for win, and removes life if wrong
    handleInteraction(button) {
        button.disabled = true;
        const letter = button.textContent;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(letter);
            if (this.checkForWin())
                this.gameOver(true);
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    //Replaces the first found live heart with a lost heart, and checks for game over
    removeLife() {
        this.missed++;
        if (this.missed < 5)
            document.querySelector('[src="images/liveHeart.png"]')['src'] = "images/lostHeart.png";
        else
            this.gameOver(false);
    }

    //Checks to see if there are any remaining hidden letters on the board
    checkForWin() {
        return document.querySelectorAll('li.letter.hide').length === 0;
    }

    //Unhides overlay and updates game over message
    gameOver(wonGame) {
        const overlay = document.querySelector('#overlay');
        unhide(overlay);
        if (wonGame) {
            overlay.className = 'win';
            overlay.querySelector('#game-over-message').textContent = "Congrats! You won!";
        } else {
            overlay.className = 'lose';
            overlay.querySelector('#game-over-message').textContent = "You Lost! Better Luck Next Time!";
        }
    }
}

function hide(element) {
    element.style.display = 'none';
}
function unhide(element) {
    element.style.display = '';
}