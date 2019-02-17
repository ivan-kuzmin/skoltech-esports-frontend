import { onPropertyChange } from 'src/assets/js/script'

const globalState = {
  url: 'http://localhost:8000/balls/results/',
  current_level: {
    level: 1,
    balls: 12,
    speed: 3,
    red_balls: 4,
  },
  newGame: false,
  startGame: false,
  rad: 50,
  balls: [],
  selectedBalls: [],
  trueBalls: 0,
  falseBalls: 0,
  moveBalls: false,
  demoSpeed: 0.5,
  startTime: 1,
  gameTime: 1,
  countOfGames: 3,
  playedGames: 0
}

onPropertyChange(globalState, 'current_level', 'appComponent', 'current_level');

export default globalState

export const lang = {
  en: {
    header: 'Instruction',
    description: 'You need remember the red balls, then they will change color to blue and you need follow them.',
    current_level: 'Current level',
    balls: 'Balls',
    speed: 'Speed',
    red_balls: 'Red Balls',
    balls_radius: 'Balls Radius',
    new_game: 'New Game',
    home: 'Home',
    last_results: 'Your last results'
  },
  ru: {
    header: 'Инструкция',
    description: 'Вам необходимо запомнить шары красного цвета, затем они сменят цвет на синий, и Вам необходимо проследить за ними.',
    current_level: 'Текущий уровень',
    balls: 'Количество шаров',
    speed: 'Скорость',
    red_balls: 'Красные шары',
    balls_radius: 'Радиус',
    new_game: 'Новая игра',
    home: 'Домой',
    last_results: 'Ваши последние результаты'
  }
}
