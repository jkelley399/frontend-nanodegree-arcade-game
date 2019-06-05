// Enemies our player must avoid
// NOTE: Adding three parameters to differentiate enemies:
    // y for row (1, 2, or 3; see engine.js function render() @105/109:)
    // d for delay before starting (integer in milliseconds)
    // rs for relative speed (float from 0 to 10)
var Enemy = function(y, d, rs) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Initializing Enemy position
    // NOTE: Alignment constant apparently necessary to center pngs
    const yAlignConstant = 0.25;
    // NOTE: Assuming origin = 0,0
    // NOTE: startX always 0;
    // NOTE: Pass in startY or generate randomly???
    this.startX = 0;
    this.startY = y - yAlignConstant;
    this.x = this.startX;
    this.y = this.startY;

    // NOTE: Setting delay and relative speed
    this.delay = d;
    this.relativeSpeed = rs;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: For dt, see engine.js function main() @34:
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // NOTE: Applying relativeSpeed and adding modulo to loop around
    // NOTE: 5 for modulo comes from numCols in engine.js.
    //         See engine.js function render() @105/109:)
    // TODO: Implement delay
    this.x = ((this.x + (dt * this.relativeSpeed)) % 5)
    // FUTURE: To make more challenging:
        // (a) vary parameters randomly
        // (b) have "lane changes" when looping around
        // (c) levels with increasing speeds & enemies
};

// Draw the enemy on the screen, required method for game
// NOTE 2019-06-03: Assuming x-values (columns) precede y-values and
// constants need to be added based on engine.js function render() @105/137:
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y *83);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    // Initializing Player position
    // NOTE: Seems like constant start position
    // NOTE: Alignment constant apparently necessary to center pngs
    const yAlignConstant = 0.25;
    this.startX = 2;
    this.startY = 4 - yAlignConstant;
    this.x = this.startX;
    this.y = this.startY;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

    // TODO: Should be a way to get this directly from the
    // original eventListener
    this.currentKeyupValue = 0;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: For dt, see engine.js function main() @34:
// NOTE: Outline essentially copied from base code for Enemy
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


// helper function for collisonTest();
function logName(element) {
    console.log(element);
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: For dt, see engine.js function main() @34:
// NOTE: Outline essentially copied from base code for Enemy
Player.prototype.handleInput = function(event) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    let keyDirection = event;
    const allowedDirections = ['left', 'up', 'right', 'down'];

    // 2019-06-05: first if () test based on
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    if (allowedDirections.includes(keyDirection) === false) {
        console.log(keyDirection + " from eventListener was improper input");
    } else if ((keyDirection == 'left') && (player.x >= 0.75)) {
        player.x -= 1;
    } else if ((keyDirection == 'up') && (player.y >= 0)) {
        player.y -= 1;
    } else if ((keyDirection == 'right') && (player.x <= 3)) {
        player.x += 1;
    } else if ((keyDirection == 'down') && (player.y <= 4)) {
        player.y += 1;
    } else {
        console.log("Player has reached an x or y limit.");
    }

    // collisonTest();
    const collisonK = 0.5;

    // 2019-06-05: Basic syntax from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    allEnemies.forEach(logName);

    // for 3 rows
    //     for all enemies in row
    //         if abs(player.x - enemy.x) < collisonK
    //             return true;
    //         else
    //             return false;

    // victoryTest();
};

// Draw the player on the screen, required method for game
// NOTE 2019-06-03: Essentially copied from base code for Enemy
// NOTE: Assuming x-values (columns) precede y-values and
// constants need to be added based on engine.js function render() @105/137:
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y *83);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player();

const enemy1 = new Enemy(1, 0, 1.2);
const enemy2 = new Enemy(2, 0, 0.9);
const enemy3 = new Enemy(3, 0, 1.5);
const enemy4 = new Enemy(1, 0, 2.0);

const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/* TODO

*/

/* ADDITIONAL REFERENCES CONSULTED

Javascript:

https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback

    "The event listener can be specified as either a callback function or
    an object that implements EventListener, whose handleEvent() method serves
    as the callback function.

    The callback function itself has the same parameters and return value as
    the handleEvent() method; that is, the callback accepts a single
    parameter: an object based on Event describing the event which has
    occurred, and it returns nothing."

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onkeyup
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

*/

/* KEY LEARNING

2019-06-04--2019-06-05:
Took me a while to figure out what was being returned from
document.addEventListener('keyup', function(e) to
A key insight was provided by
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback

    "The callback function itself has the same parameters and return value as
    the handleEvent() method; that is, the callback accepts a single
    parameter: an object based on Event describing the event which has
    occurred, and it returns nothing."

I added an explicit parameter, "event," to
    Player.prototype.handleInput = function(event)
After doing that, I checked the return values in two different console.log statements,
one in Player.prototype.handleInput = function(event) and
one in document.addEventListener('keyup', function(e)

Surprisingly, they provided two different results (see the following excerpts from
Console in Chrome Dev Tools):

"left
app.js:180 KeyboardEvent {isTrusted: true, key: "ArrowLeft", code: "ArrowLeft",
location: 0, ctrlKey: false, …}"

In was apparent from the comparison, however, that the directional strings,
'left,' 'right,' etc. were reaching Player.prototype.handleInput = function(event),
and, in addtion to the explicit paramater, "event," that was enough to write the
player movement code.

I still don't understand why the two console.log statements produce different results; or
but I'm beginning to understand how (a) var allowedKeys and
(b) player.handleInput(allowedKeys[e.keyCode]) together operate to both (1) filter
the acceptable keyboard input and (2) translate the keyCode for the key whose release
fires the eventListener into a more comprehensible string that can be used in
Player.prototype.handleInput = function(event)
*/