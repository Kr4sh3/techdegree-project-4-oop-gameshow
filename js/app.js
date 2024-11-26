/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//Start game button handler
let game;
document.querySelector('#btn__reset').addEventListener('click', event => {
    game = new Game();
    game.startGame();
});

//Onscreen Button Handler
document.querySelector('#qwerty').addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON')
        return;
    game.handleInteraction(event.target);
});

//Keyboard Button Handler
document.addEventListener('keydown', event => {
    //Exit if hitting anything other than a letter key
    if (!/^[A-Za-z]$/.test(event.key))
        return;
    const key = event.key.toLowerCase();
    //Find corresponding button and handle interaction if button is not disabled
    document.querySelectorAll(`button.key`).forEach((button) => { if (button.textContent === key && button.disabled === false) game.handleInteraction(button); });
});