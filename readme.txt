Edward Dumholt
Programming Fundamentals - Spring 2014
Instructor - Brian Hogan
Final Project - May 7, 2014

===============================================================================

Problem Statement: 
A program is required that plays like a game. It will first display a splash 
screen explaining the rules and ask the user if they want to play. The rules
are as follows: individual tiles will light up for a brief period of time 
randomly at a preset interval. The user is required to successfully click on 
10 highlighted tiles to advance to the next level. If 20 tiles are highlighted 
before the user successfully clicks on ten of them, the game is over. When the 
user successfully clears a level, a "congratulations" screen will appear, with 
the option to continue or quit. The speed at which the tiles highlight will 
increase 12% with each successive level. When the player either gives up or 
loses, a "goodbye" splash appears and the game is over.

Nouns: splash screen, tiles, highlighted tile

Verbs: display, ask, highlight, click

===============================================================================

Defining Diagram:

inputs: mouse clicks

processing: determine location of mouse click, accumulate total of successful
  clicks, accumulate interval cycles, display dialog boxes

outputs: flashing tiles, splash screens

===============================================================================

Solution Algorithm:

Tiles
  INNITIALIZE failCounter = 0
  INITIALIZE idNum = 0
  INITIALIZE interval = 1500 ms
  INITIALIZE successCounter = 0

  FUNCTION gameStart
    DECLARE intervalId
    intervalId = setInterval(function, interval)    //this is where all "action" in the
      REMOVE class "highlight" from all DIVS        //game occurs. I have tried to abstract
      ADD class "highlight" to random DIVS          //it as much as possible.
      BIND click to highlighted tile
      IF click in highlighted tile
        successCounter++
      END IF
      failCounter++
      IF successCounter >= 10 THEN
        successCounter = 0
        failCounter = 0
        CLEAR intervalId and click binding
        RUN function successfulLevel
      END IF
      IF failCounter >= 20 THEN
        CLEAR interval Id
        RUN function gameFail
      END IF                        //at this point the setInterval function repeats   
    END setInterval                 //after (interval) amount of time has passed
  END gameStart                     

  FUNCTION gameDone
    DISPLAY "thank you" dialog box
    HIDE all DIVs
  END gameDone

  FUNCTION fameFail
    DISPLAY "bummer" dialog box
    HIDE all DIVS
  END gameDone

  FUNCTION successfulLevel
    DISPLAY successfulLevel dialog box with continue? option
    IF continue === "YES" THEN
      interval = interval * 0.88
      CLOSE dialog box
      RUN gameStart function
    END IF
    IF continue === "NO" THEN
      CLOSE dialog box
      RUN gameDone function
    END IF
  END successfulLevel

  FOR var i=1; i<9; i++
    FOR var j=1; i<9; i++
      APPEND DIV with class col+j+row+i to DIV #border
    END FOR
  END FOR

  INITIALIZE tiles = DIVS
  FOR EACH DIV
    idNum++
    var idString = "tiles-"+idNum
    DIV id = idString
  END EACH

  ADD CLASS fa-* to all DIVs              //used for FontAwesome fonts

  DISPLAY dialogStart
  IF mouseClick on "yes" THEN
    gameStart
  END IF
  IF mouseClick on "no" THEN
    gameDone
  END IF
END

===============================================================================

Test Plans:

TEST CASE 1:

INPUTS: mouse click on Yes, 10 successful clicks, continue to next level, 20 unsuccessful clicks

EXPECTED RESULT: Success dialog displays, Fail dialog displays, game over

ACTUAL RESULT:  Success dialog displays, Fail dialog displays, game over

TEST CASE 2: 

INPUTS: mouse click on No

EXPECTED RESULT: Game Done dialog box displays, game over

ACTUAL RESULT: Game Done dialog box displays, game over

TEST CASE 3:

INPUTS: mouse click on Yes, 10 successful clicks, mouse click to continue to next level, 10 successful clicks, No

EXPECTED RESULT: Success dialog displays, Success Dialog displays, Game Done dialog displays, game over

ACTUAL RESULT: Success dialog displays, Success Dialog displays, Game Done dialog displays, game over

TEST CASE 4:

INPUTS: (mouse click on Yes, 10 successful clicks, click on continue)x5, 4 successful clicks, 20 unsuccessful clicks

EXPECTED RESULT: (Success dialog dislays)x5, Fail dialog displays, game over

ACTUAL RESULT: (Success dialog dislays)x5, Fail dialog displays, game over