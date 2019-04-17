# Skoltech E-sports Frontend
## Installation
```
yarn
```
## Development
```
yarn dev     // Build the project to the /dist folder
yarn start   // Start the webpack-dev-server http://localhost:9000
yarn build   // Build the production version of project to the /dist folder
```
## Create new test
1. **config.js** -> *name*, *other test configs*
2. **lang.js** -> *description*, *names of example configs*
3. **components/Inputs.js** ->
> 1. name of const (7)
> 2. put it to Input tag -> *value*, *name*, *min*, *max* (14-16)
> 3. put propTypes (22)
4. **components/Results.js** ->
> 1. put you html (React) result (ask me, if you'll need help) (17)
> 2. put propTypes (24)
5. **sketch/index.js** ->
> 1. declare you props (8)
> 2. change your variables to start game state in *force end game* function (30)
> 3. declare your *moveCallback* – Do you need PointerLock? (read [PointerLock Api](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)) (38)
> 4. new game scope in *draw* function (51)
> 5. remove it if you don't use pointer lock (67)
> 6. put here you *end game* function
> 7. generate results (*App.js* – generateResult function)
> 8. put here your other mousePressed callbacks (87)
6. **sketch/Ball.js** –> PointerLock uses this instance
