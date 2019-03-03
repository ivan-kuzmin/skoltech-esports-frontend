import { onPropertyChange } from 'src/assets/js/script'

const globalState = {
  url: 'http://localhost:8000/reaction_test/results/',
  current_level: {
    level: 1,
  },
  rad: 100,
  newGame: false,
  startGame: false,
  startTime: 2,
  gameTime: 5,
  reactionFrames: 0,
  loadingWidth: 0,
  countOfGames: 5,
  playedGames: 0,
  leftMouseMode: true,
  results: {},
}

onPropertyChange(globalState, 'current_level', 'appComponent', 'current_level');

export default globalState

export const lang = {
  en: {
    header: 'Instruction',
    description: 'A red circle will show up at the center of the screen after a random time. After you see the circle, you should click <i>«Left Mouse»</i> or <i>«Space»</i> button as soon as possible.',
    left_mouse: 'Left Mouse',
    space: 'Space',
    current_level: 'Current level',
    ball_radius: 'Ball Radius',
    new_game: 'New Game',
    home: 'Home',
    last_results: 'Your last results'
  },
  ru: {
    header: 'Инструкция',
    description: 'Шар красного цвета появится в центре экрана через случайный промежуток времени. После этого Вам необходимо как можно быстрее нажать <i>«Left Mouse»</i> или <i>«Space»</i>.',
    left_mouse: 'Left Mouse',
    space: 'Space',
    current_level: 'Текущий уровень',
    ball_radius: 'Радиус',
    new_game: 'Новая игра',
    home: 'Домой',
    last_results: 'Ваши последние результаты'
  }
}
