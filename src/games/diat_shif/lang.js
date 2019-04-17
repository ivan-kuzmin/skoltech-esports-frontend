export const lang = {
  en: {
    Menu: {
      header: 'Instruction',
      description: 'You have to do 3 different tasks simultaneously:'
        + '<ul class="m-0 pl-3">'
          + '<li class="pt-3">You have to imagine a circle inside arrows which follow your cursor on the screen and try to put the moving ball completely inside the arrows. If you put ball inside the arrows successfully its color will become grey with green check. If it will become partially inside the circle its color will change to yellow so you have to move your cursor to put it inside the arrows. If you lose the ball (ball become completely outside of the arrows) the color will change to red.</li>'
          + '<li class="pt-3">You have to check the labels string which show color name. In this task you have to read the color string and compare it with the string color provided if they become match you have to press <space> key on your keyboard.</li>'
          + '<li class="pt-3">You have to check the other label with different strings (from colors). This labels refers to specific action with specific sound. If you heard that sound (which was mentioned in the label) in your speaker or headphone you have click with do left click with your mouse.</li>'
        + '</ul>',
      current_level: 'Current level',
      new_game: 'New Game',
      home: 'Home',
    },
    Inputs: {
      speed: 'Speed',
      radius: 'Radius',
      ball_radius: 'Balls Radius',
      count_of_balls: 'Count of balls',
      count_of_trials: 'Count of trials',
      sensitivity: 'Sensitivity',
    },
    Filter: {
      last_results: 'Your last results',
    },
  },
  ru: {
    Menu: {
      header: 'Инструкция',
      description: '---',
      current_level: 'Текущий уровень',
      new_game: 'Новая игра',
      home: 'Домой',
    },
    Inputs: {
      speed: 'Скорость',
      radius: 'Радиус',
      ball_radius: 'Радиус',
      count_of_balls: 'Количество шаров',
      count_of_trials: 'Количество попыток',
      sensitivity: 'Чувствительность',
    },
    Filter: {
      last_results: 'Ваши последние результаты',
    },
  },
};

export default lang;
