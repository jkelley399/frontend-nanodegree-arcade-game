# Classic Arcade Game Clone Project

## Introduction
This project is being submitted in connection with part 5, "Object-Oriented Javascript," of the Udacity Front-End Web Developer Nanodegree.   *See*: ["Project: Classic Arcade Game Clone, Project Overview"](https://classroom.udacity.com/nanodegrees/nd001/parts/5b433748-71ae-488f-8eba-f102160cd17b/modules/794adb78-22bb-4a38-85cd-6fa148ebc28a/lessons/64d2cad8-b230-41da-ba90-5b74f33176cc/concepts/25968188800923).  This project is based upon the starter code.  *See*: ["udacity/frontend-nanodegree-arcade-game"](https://github.com/udacity/frontend-nanodegree-arcade-game).  Only very minimal additional functionality has been added at this time, including:

*   a very simple modal providing notification when a player has won and indicating both the total number of moves and the total number of collisions.

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Instructions](#instructions)
    - [Project Instructions](#project-instructions)
    - [Dependencies and Requirements](#dependencies-and-requirements)
    - [How to Run the Game](#how-to-run-the-game)
    - [How to Play the Game](#how-to-play-the-game)
- [Additions](#additions)
- [Known Bugs or Implementation Problems](#known-bugs-or-implementation-problems)
- [Starting Points and References](#starting-points-and-references)
- [TODO](#todo)

## Instructions

### Project Instructions
For detailed instructions, *see*: ["Project Details"](https://classroom.udacity.com/nanodegrees/nd001/parts/5b433748-71ae-488f-8eba-f102160cd17b/modules/794adb78-22bb-4a38-85cd-6fa148ebc28a/lessons/64d2cad8-b230-41da-ba90-5b74f33176cc/concepts/26849785360923) and the [project rubric, "PROJECT SPECIFICATION, Classic Arcade Game Clone[https://review.udacity.com/?_ga=1.242571394.1230547285.1451946706#!/rubrics/15/view].  An additional instructional [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true) was also provided.

### Dependencies and Requirements

#### Dependencies

[Bootstrap](https://getbootstrap.com/)

NOTE: This added to the project through [CDNs](https://en.wikipedia.org/wiki/Content_delivery_network).

#### Requirements

This project requires a computer with a keyboard and up, down, left, and right arrow keys that produce standard key values.  (It is not intended to be used on a smartphone at present.)

This project does require a browser that supports 2D Canvas, which is described generally in ["Canvas API"](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). I have not tested this thoroughly, but I believe that any browser that supports ECMAScript 5 (*see*: ["Standard ECMA-262, 5.1 Edition / June 2011, ECMAScript® Language Specifications"](https://www.ecma-international.org/ecma-262/5.1/) should support this project.  *See also*: ["Canvas (basic support)"](https://caniuse.com/#search=canvas).  (NOTE: At present, this project does not require a browser that supports [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate), which is designated as an ["experimental technology"](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Conventions_definitions#Experimental).)

To date, this project has been tested primarily on Chrome Version 74.0.3729.169 (Official Build) (64-bit).

### How to Run the Game

#### Running on GitHub Pages

This project is [currently hosted on GitHub Pages](https://jkelley399.github.io/frontend-nanodegree-arcade-game/).

#### Installing Locally

If you wish to install this project locally:

*   navigate to the [main repository page on GitHub](https://github.com/jkelley399/frontend-nanodegree-arcade-game);
*   clone or download the repository;
*   install the cloned or downloaded repository locally; and
*   open `index.html` using a suitable browser, as explained in the ["Requirements" section](#requirements).

### How to Play the Game

When the game is launched (by opening index.html), the user is presented with a game board having three principal parts, in blue, white and green from the top, and divided into a 5x6 grid, "enemies" moving at different speeds from left to right across the second part of the game board, and a "player" icon.

The user moves the "player" icon by pressing the arrow keys on a standard keyboard, specifically the up, down, right, and left keys.  When one of those keys is pressed, the "player" icon will move in the direction corresponding to the key.

If the "player" icon lands on a square that is occupied by an "enemy," there is a "collision," the "player" icon is returned to the starting position, the game automatically resets, and the user can continue playing with only minimal interruption.

If the user successfully navigates "player" icon past all of the enemies towards the top and reaches the blue part of the game board, the user wins, a modal appears, and the modal indicates the number of "collisions" and the number of moves required.

## Additions

Besides the basic requirements for the project, the only addition in the current implementation is a very simple modal providing notification when a user has won and indicating both the total number of moves and the total number of collisions required to achieve that "victory."

## Known Bugs or Implementation Problems

The most significant implementation problem to date has been my inability to create an object-oriented timer whose data would be displayed in the modal that appears when a player successfully completes the game.  Additional implementation challenges are described in the "KEY LEARNING" section of [js/app.js](https://github.com/jkelley399/frontend-nanodegree-arcade-game/blob/master/js/app.js).

## Starting Points and References

The principal starting points and references were described in the [Project Instructions](#project-instructions).

Additional materials relied upon are described in the "ADDITIONAL REFERENCES CONSULTED" section of [js/app.js](https://github.com/jkelley399/frontend-nanodegree-arcade-game/blob/master/js/app.js).

## TODO

Various possible additions are described in the "TODO" section of [js/app.js](https://github.com/jkelley399/frontend-nanodegree-arcade-game/blob/master/js/app.js).

## Contributing

This [original repository](https://github.com/udacity/frontend-nanodegree-arcade-game) from which this repository was forked is the starter code for _all_ Udacity students. Therefore, it is unlikely that Udacity will accept pull requests.  (If you care to submit a pull request to this repository, I will try to take a look at it, but if you have a significant contribution to make, it's likely that it will be appreciated more by _all_ Udacity students on the original repository.)
