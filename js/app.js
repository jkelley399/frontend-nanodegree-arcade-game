// PRIMARY SECTION
    // NOTE: Comments marked with "NOTE" or in block caps have been added

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
    // NOTE: startX = hardcoded; FUTURE: vary startX and generate randomly
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
    // NOTE: 5 for x-axis modulo comes from numCols in engine.js.
    //      See engine.js function render() @105/109
    // FUTURE: Implement means of delaying start of enemies
    this.x = ((this.x + (dt * this.relativeSpeed)) % 5)
    // FUTURE: To make more challenging:
        // (a) vary parameters randomly
        // (b) have "lane changes" when looping around
        // (c) levels with increasing speeds & enemies
};

/*2019-06-06
New method on Enemy.prototype
Returns Boolean and increments collision count
Adding checkCollision() to updateEntities in engine.js
2019-06-06 NOTE: After manual testing, not necessary to test deltaY,
but decided to leave in for sake of completeness
NOTE: collisonK set through manual testing to
to fine tune responsiveness of collision detection
*/
Enemy.prototype.checkCollision = function() {
    const collisionK = 0.4;
    let deltaX = Math.abs(this.x - player.x);
    let deltaY = Math.abs(this.y - player.y);
    if ((deltaX <= collisionK) && (deltaY <= 0.01)) {
        console.log("COLLISION DETECTED");
        // increment collision count
        scoreboard.collisionCountIncrement();
        return true;
    } else {
        return false;
    }
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
    // NOTE: If yAlignConstant changed, will need to change hard-coded
    //     value in Player.prototype.handleInput
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

    // WIP
    // tracking time for current round
    // this.elapsedTimeIntervalID = '';
    // this.startElapsedTimeInterval = '';
    // this.elapsedTimeInterval = '';
};


// helper function for Player.prototype.update
//     NOTE: chose separate function to enable modal-showing syntax
function checkVictory() {
    if (player.y <= 0) {
        // NOTE 2019-06-10: WIP --- uncommenting timer functionality
        intervalClock.endIntervalClock();
        scoreboard.update();
        // NOTE:   Based on modal done for prior Memory Game project,
        //         which was based on on
        //         https://getbootstrap.com/docs/4.0/components/modal/,
        //         specifically, the "Methods" section,
        //         consulted 2019-05-09 and 2019-06-07
        $('#game-winning-modal-div').modal('show');
    }
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: Since the player's position was determined by
// keyboard input, I chose to add that
// functionality to Player.prototype.handleInput
// NOTE: For dt, see engine.js function main() @34:
// NOTE: Basic syntax from base code for Enemy
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    checkVictory();
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
// NOTE: For dt, see engine.js function main() @34:
// NOTE: Basic syntax from base code for Enemy
Player.prototype.handleInput = function(event) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    let keyDirection = event;
    const allowedDirections = ['left', 'up', 'right', 'down'];

    // NOTE 2019-06-08: WIP --- uncommenting timer functionality
    // start elapsedTime
    if ((allowedDirections.includes(keyDirection) === true) &&
        scoreboard.keystrokeCount === 0) {
        // WIP
        intervalClock.startIntervalClock();
    }

    // 2019-06-05: first if () test based on
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    if (allowedDirections.includes(keyDirection) === false) {
        console.log(keyDirection + " from eventListener was improper input");
    // NOTE: 0.75 value in next line basically hard-coded based on
    //     0.25 yAlignConstant
    } else if ((keyDirection == 'left') && (player.x >= 0.75)) {
        player.x -= 1;
        scoreboard.keystrokeCount += 1;
    } else if ((keyDirection == 'up') && (player.y >= 0)) {
        player.y -= 1;
        scoreboard.keystrokeCount += 1;
    } else if ((keyDirection == 'right') && (player.x <= 3)) {
        player.x += 1;
        scoreboard.keystrokeCount += 1;
    } else if ((keyDirection == 'down') && (player.y <= 4)) {
        player.y += 1;
        scoreboard.keystrokeCount += 1;
    } else {
        scoreboard.keystrokeCount += 1;
        console.log("Player has reached an x or y limit.");
    }
};

// Draw the player on the screen, required method for game
// NOTE 2019-06-03: Essentially copied from base code for Enemy above
// NOTE: Assuming x-values (columns) precede y-values and
// constants need to be added based on engine.js function render() @105/137:
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y *83);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

const enemy1 = new Enemy(1, 0, 1.6);
const enemy2 = new Enemy(2, 0, 0.9);
const enemy3 = new Enemy(3, 0, 1.8);
const enemy4 = new Enemy(1, 0, 3.0);
const enemy5 = new Enemy(2, 0, 2.0);
const enemy6 = new Enemy(3, 0, 1.4);
const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

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

// NOTE    2019-06-10: WIP --- uncommenting clock section
//         and testing suggestions of anonymous Udacity reviewer
// CLOCK SECTION

// NOTE    2019-06-10: Original code on following lines
//         New code below is part of a fix suggested by an anonymous
//         Udacity reviewer on 2019-06-09 as a means of fixing the
//         updateInterval method.  This also helps to overcome the overall
//         problem of my earlier code allowing Date.now() to generate
//         an undefined value in the updateInterval method.
// Original code:
// var IntervalClock = function () {
//     this.startTime = '';
//     this.millisecondIntervalTime = '';
//     this.intervalTime = '';
// };

var IntervalClock = function () {
    this.startTime = Date.now();
};

// NOTE    2019-06-10: Original code on following lines
//         New code below is part of a fix suggested by an anonymous
//         Udacity reviewer on 2019-06-09 as a means of fixing the
//         updateInterval method.  This also helps to overcome the overall
//         problem of my earlier code allowing Date.now() to generate
//         an undefined value in the updateInterval method.
// IntervalClock.prototype.updateInterval = function() {
//     if (this.startTime == '') {
//         this.intervalTime = '';
//     } else {
//         this.millisecondIntervalTime = (Date.now() - this.startTime);
//         this.intervalTime = this.millisecondIntervalTime;
//         // for testing
//         // console.log('this.millisecondIntervalTime = ' +
//         //     this.millisecondIntervalTime);
//     }
// };

IntervalClock.prototype.updateInterval = function(x) {
        this.millisecondIntervalTime = (x - this.startTime);
        this.intervalTime = this.millisecondIntervalTime;
        // for testing
        // console.log('this.millisecondIntervalTime = ' +
        //     this.millisecondIntervalTime);
};

IntervalClock.prototype.startIntervalClock = function() {
    this.startTime = Date.now();
};

IntervalClock.prototype.endIntervalClock = function() {
    this.intervalTime = this.millisecondIntervalTime;
    // 2019-06-10: WIP: Is this generating a NaN?
    scoreboard.elapsedTimeCount = this.intervalTime;
    // 2019-06-10: WIP: Probably need to change this to have a variable
    clearInterval(elapsedTimeInterval);
    // for testing
    console.log('this.millisecondIntervalTime = ' +
        this.millisecondIntervalTime);
    console.log('this.intervalTime = ' + this.intervalTime);

};

IntervalClock.prototype.resetIntervalClock = function() {
    this.startTime = 0;
    this.millisecondIntervalTime = 0;
    this.intervalTime = 0;
};

IntervalClock.prototype.resetElapsedTimeInterval = function() {
    elapsedTimeInterval;
};

let intervalClock = new IntervalClock();

// NOTE    2019-06-10: Original code on following line
//         New code below is part of a fix suggested by an anonymous
//         Udacity reviewer on 2019-06-09 as a means of passing Date.now()
//         to the function.  This also helps to overcome the overall
//         problem of my earlier code allowing Date.now() to generate
//         an undefined value in the updateInterval method.
// Original code:
// setInterval(intervalClock.updateInterval, 100);
// 2019-06-10 WIP: setting interval time to 1000; need to reset to 100 for deployment

// create variable for setInterval so it's easy to clear

let elapsedTimeInterval =
    setInterval(function(){intervalClock.updateInterval(Date.now())}, 1000);

// SCOREBOARD SECTION

// Create scoreboard
var Scoreboard = function() {
    // elements of time for scoreboard
    this.hHours
    this.mMinutes
    this.sSeconds
    // initial values for elements of scoreboard
    this.startElapsedTime = 0;
    this.startKeystrokeCount = 0;
    this.startCollisionCount = 0;
    // accumulating values for elements of scoreboard
    this.elapsedTimeCount = 0;
    this.keystrokeCount = 0;
    this.collisionCount = 0;
};

// Update the data in the scoreboard
// NOTE: Basic syntax from base code for Enemy
Scoreboard.prototype.update = function() {
    // NOTE 2019-06-10: WIP --- uncommenting clock section
    document.querySelector('#modal-elapsed-time').innerHTML =
        this.elapsedTimeCount;
    document.querySelector('#modal-collision-count').innerHTML =
        this.collisionCount;
    document.querySelector('#modal-keystroke-count').innerHTML =
        this.keystrokeCount;
};

// Increment keystroke count
// NOTE: Basic syntax from base code for Enemy
Scoreboard.prototype.keystrokeIncrement = function() {
    this.keystrokeCount += 1;
};

// Increment collision count
// NOTE: Basic syntax from base code for Enemy
Scoreboard.prototype.collisionCountIncrement = function() {
    this.collisionCount += 1;
};

// Reset the scoreboard
// NOTE: Basic syntax from base code for Enemy
Scoreboard.prototype.reset = function() {
    this.elapsedTimeCount = 0;
    this.keystrokeCount = 0;
    this.collisionCount = 0;
    // NOTE 2019-06-08: WIP --- uncommenting clock section
    document.querySelector('#modal-elapsed-time').innerHTML = '';
    document.querySelector('#modal-collision-count').innerHTML = '';
    document.querySelector('#modal-keystroke-count').innerHTML = '';
};

// Instantiate scoreboard
let scoreboard = new Scoreboard();

// NOTE 2019-06-08: WIP --- commenting out helper functions for scoreboard section
// // HELPER FUNCTIONS FOR SCOREBOARD SECTION

// // NOTE: All of these helper functions for scoreboard based upon
// // prior Memory Game project,

// // helper function
// // converts a one- or two-digit whole number to a two-digit string in '0X' format
// // TODO: add test for whole number input
// function toTDString(wn) {
//     let tds = (wn < 10) ? (0 + wn.toString()) : wn.toString();
//     return tds; //a two-digit string
// }

// // helper function
// // returns scoreboard.hHours, scoreboard.mMinutes, and scoreboard.sSeconds in HH:MM:SS string format
// // TODO: add test for whole number input
// function scoreboardHHMMSS() {
//     return toTDString(scoreboard.hHours) + ':' + toTDString(scoreboard.mMinutes) +
//         ':' + toTDString(scoreboard.sSeconds);
// }

// // helper function
// // increments digital display of time in HH:MM:SS string format by one second up to 24 hours
// // assumes it is called in one-second intervals; shorter intervals can be used for testing
// // based upon the following, which were originally consulted 1Q2019, I believe
// // (I can't recall the exact date) and consulted 2019-06-07:
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
// function displayNextSecondInHHMMSS() {
//     if (scoreboard.sSeconds < 59) {
//         scoreboard.sSeconds += 1;
//     } else {
//         scoreboard.sSeconds = 0;
//         if (scoreboard.mMinutes < 59) {
//             scoreboard.mMinutes += 1;
//         } else {
//             scoreboard.mMinutes = 0;
//             if (scoreboard.hHours < 24) {
//                 scoreboard.hHours += 1;
//             } else {
//                 window.alert('24-hour time limit reached.');
//             }
//         }
//     }
//     return scoreboardHHMMSS();
// }

// Create modal to hold scoreboard data
// NOTE: Based on keyup eventListener above and on eventListener done
// for prior Memory Game project
const modalPlayAgainInput = document.querySelector('#modal-play-again-button');

function startNewGame() {
    // based on on https://getbootstrap.com/docs/4.0/components/modal/,
    // specifically, the "Methods" section, consulted 2019-06-07
    $('#game-winning-modal-div').modal('hide');
    //reset scoreboard
    scoreboard.reset();
    // reset player values
    player.x = player.startX;
    player.y = player.startY;
    // NOTE 2019-06-10: WIP --- uncommenting clock section
    // reset intervalClock
    intervalClock.resetIntervalClock();
    // 2019-06-10 WIP:
    // resetting elapsedTimeInterval;
    // otherwise time goes to 0 after first victory
    intervalClock.resetElapsedTimeInterval();
}

modalPlayAgainInput.addEventListener('click', startNewGame);

/*
TODO
0.  NOTE 2019-06-10: WIP --- time going to 0 and staying there after first victory
    NEED TO UPDATE README.md
1.  Time permitting:
    A.  Get object-oriented timer to work.
        See below in KEY LEARNING, note for 2019-06-08
2.  Further time permitting:
    A.  Add additional functionality as described in project rubric.
    B.  Add add more functionality (e.g. link to YouTube video) for winning.
    C.  Implement means of delaying start of enemies
    D.  Randomize Enemy speed and starting position values.
    E.  Try module approach for collision detection.
    F.  For time helper functions, add tests for whole number input
    G.  Test updateElapsedTime against system clock
    H.  Try to figure ut how to get updateElapsedTime to work as a method on Player
        Difficulty may relate to "The 'this' problem" for setInterval
        see: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem
*/

/*
ADDITIONAL REFERENCES CONSULTED

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
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval
https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#The_this_problem
https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

https://stackoverflow.com/questions/25962958/calling-a-javascript-function-in-another-js-file
https://stackoverflow.com/questions/14666924/clearinterval-not-working

https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval
https://stackoverflow.com/questions/18263585/call-javascript-object-method-with-setinterval

Bootstrap:

https://getbootstrap.com/docs/4.0/components/modal/

KEY LEARNING

2019-06-08:
Tried to figure out how to do an object style timer, but have not figured it out yet.
Found two good resources that I've consulted on 2019-06-08:
https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval
https://stackoverflow.com/questions/18263585/call-javascript-object-method-with-setinterval
Time permitting, I'll continue working on this, but since project submission deadline
is in about 24 hours, I'm going to submit what I have at present.

2019-06-06:
Also took me a while to figure out where to put collision detection.

One issue was whether to try to call a function from engine.js in app.js,
but this might have entailed using modules because of the sequence of
these two files being called in index.html.  See the following:
https://stackoverflow.com/questions/25962958/calling-a-javascript-function-in-another-js-file
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

For initial implementation, I'm not using the module approach.  Instead,
I've added (a) Enemy.prototype.checkCollision() as a new method on
the Enemy prototype and (b) a test based on enemy.checkCollision()
to updateEntities(dt) in engine.js


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
