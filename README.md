# im-1x_lab3_KPI4
# Tetris

**Write Tetri game tests and clearly divide the game into layers:**

- "logical" - here the logic of the grid is implemented and you operate with the abstractions created (the playing field, code related to the game rules, etc.) 
- "input/output" - here the communication of your program from the external environment is implemented, which works with these abstractions (standard output, file system) 
- "communication" - a layer that ensures communication between the "logic" and "input/output". In this layer, the template "DI (dependencyinjection)” which allows you to change input/output layers in the test environment.

**Important notes:**
- When testing the "communication" layer, use mock

## Task
The initial state is presented to the screen, which has one "suspended" figure and a "landscape" - the remains of previous figures. It is necessary to display the state of the game when the figure "fell" (that is, the player does not give any commands, but simply waits for the figure to collide with the "landscape")

## How to run
Before running the project you should install certain dependencies:
```
npm install jest
```
In order to run the project:
```
node controller.js
```
In order to run the tests:
```
npm test
```
## Contributors

> [Дубчак Аліна](https://github.com/AlinaDubchak) (ІМ-13)

- function createCollections + test
- function parsing grid + test
- loop for game && convert field to text + tests
> [Мартинюк Марія](https://github.com/mmarty12) (ІМ-13)

- CI/CD configuration;
- functions to write in and read from files + tests for them;
- created the Field class and the moveFigureDown function + tests
