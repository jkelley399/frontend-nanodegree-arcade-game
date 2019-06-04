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
// NOTE: Assuming x-values (columns) precede y-values and
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

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: For dt, see engine.js function main() @34:
// NOTE: Outline essentially copied from base code for Enemy
Player.prototype.handleInput = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    console.log(player.handleInput());

    if (keyNumber == 'left') {
        player.x -= 1;
    } else if (keyNumber == 'up') {
        player.y -= 1;
    } else if (keyNumber == 'right') {
        player.x += 1;
    } else if (keyNumber == 'down') {
        player.y += 1;
    } else {
        console.log(keyNumber);
    }

};

// Draw the player on the screen, required method for game
// NOTE: Essentially copied from base code for Enemy
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

allEnemies = [enemy1, enemy2, enemy3, enemy4];

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


/* ADDITIONAL REFERENCES CONSULTED
https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event


I am trying to write the Player.prototype.handleInput = function() in app.js. I have this
roughed out (at present without, e.g., the multiplication by dt or checking whether the player
is out of bounds) somewhat along these lines (just to get the basic handling of the values being
passed from the eventHandler):

Player.prototype.handleInput = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (keyNumber == 'left') {
        player.x -= 1;
    } else if (keyNumber == 'up') {
        player.y -= 1;
    } else if (keyNumber == 'right') {
        player.x += 1;
    } else if (keyNumber == 'down') {
        player.y += 1;
    } else {
        console.log(keyNumber);
    }
};

This clearly won't work, because keyNumber is undefined.  So I've been trying to
figure out how to refer to the value being returned by the eventHandler.

The specific problem I'm having is trying to figure out how to refer to
whatever value is being returned to Player.prototype.handleInput = function()
from the eventListener, document.addEventListener('keyup', function(e) {...

I've tried a couple of things to figure this out, including running
    monitorEvents(document.getElementsByTagName('body')[0], 'keyup')
in the console (based on https://activecollab.com/blog/labs/debugging-javascript-events),
and while that was very helpful in general terms, it's been insufficient to
answer my specific question.

I've also tried adding a parameter to Player.prototype.handleInput = function(), making
it more like Player.prototype.handleInput = function(x), so that I could define keyNumber
in the rough code above in terms of x, but that didn't seem to work.

I also tried just to do a console.log statement, thinking that I might be able to
refer to the eventHandler itself, like this:

    console.log(player.handleInput());

that didn't work either.

I also thought about rewriting Player.prototype.handleInput = function(), but the
comments in app.js say, "You don't need to modify this."

I've searched for other articles online, but haven't been able to find anything
very helpful.

I feel as though I'm overlooking something very basic, but I don't know what it is.
Any suggestions that you might have would be greatly appreciated.

Thank you very much for any suggestions you care to offer.

John



*/