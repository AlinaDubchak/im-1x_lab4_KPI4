# im-1x_lab3_KPI4
# Tetris

**Write Tetri game tests and clearly divide the game into layers:**

- "logical" - here the logic of the grid is implemented and you operate with the abstractions created (the playing field, code related to the game rules, etc.) 
- "input/output" - here the communication of your program from the external environment is implemented, which works with these abstractions (standard output, file system) 
- "communication" - a layer that ensures communication between the "logic" and "input/output". In this layer, the template "DI (dependencyinjection)” which allows you to change input/output layers in the test environment.

**Important notes:**
- When testing the "communication" layer, use mock

## Task
- Replace mocks created in Lab3 with library mocks
- It is necessary to complete the program made in the laboratory #3 and add a parameter when transferring, which will display not only the last screen, but also the screen at each step of the game. At the same time, it is necessary to save the initial mode of operation (when only the last screen is displayed).
  
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

> [Дубчак Аліна](https://github.com/AlinaDubchak) (ІМ-13)<br>

> lab3

- function createCollections + test
- function parsing grid + test
- loop for game && convert field to text + tests
> lab4
- improved function's mocks and added some tests for throw err
> [Мартинюк Марія](https://github.com/mmarty12) (ІМ-13)<br>

> lab3

- CI/CD configuration;
- functions to write in and read from files + tests for them;
- created the Field class and the moveFigureDown function + tests

> lab4
- inhanced functionality and rewrote mocks + test for loop game
