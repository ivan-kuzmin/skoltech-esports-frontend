export const lang = {
  en: {
    Menu: {
      header: 'Instruction',
      description: 'In this game you have 2 different opportunity to do simultaneously.</br>'
      + 'Screen will divide into 2 parts. you have the opportunity to keep the park safe from snakes and don’t let the chipmunk to steal oaks from your tree (while it’s not correct to do such a thing), but there are some cases that you need to consider.'
      + '</br>For keeping oak tree safe from chipmunks there are 2 cases:'
      + '<ul class="m-0 pl-3">'
      + '<li class="pt-3">You might only get a chipmunk on the tree, so you can catch it.</li>'
      + '<li class="pt-3">you might get a chipmunk with 3 different park keepers, which describe bellow: </li>'
      + '<ul class="m-0 pl-3">'
      + '<li class="pt-3">His name is Bob. Bob lived his life honest and full of prosperity. So he loves animals. And he doesn’t let you to catch the chipmunk. Then you should be aware of him. While you see him, you cannot catch chipmunk.</li>'
      + "<img src='"+ `${window.location.href.split('games')[0]}img` +"/old_head.png'  width='200'>"
      + '<li class="pt-3">His name is Joe. Joe is your friend. And he knows that you don’t want to catch the chipmunk. So, you can catch the chipmunk while you see him.</li>'
      + "<img src='"+ `${window.location.href.split('games')[0]}img` +"/forest_head.png' width='200'>"
      + '<li class="pt-3">His name is Peter. Peter is a super young park keeper. He recently started his job in the park, so you must know that he wants to do the best and he cannot understand your opinion about catching chipmunks, then it is obvious that shouldn’t catch them while you seeing him.</li>'
      + "<img src='"+ `${window.location.href.split('games')[0]}img` +"/park_head.png' width='200'>"
      + '</ul>'
      +'</ul>'
      + 'There is a trunk on the screen with 4 holes you have to catch 2 different snakes with different tools, they can harm you if you catch them with wrong tool.</br>'
      + 'For keeping the park safe from snakes, there are 2 different cases that you need to consider:</br>'
      + '<ul class="m-0 pl-3">'
      + '<li class="pt-3">Dizzy snake, for this snake you can use default tool. So, you only need to select the related hole with keyboard keys.</li>'
      + "<img src='"+ `${window.location.href.split('games')[0]}img` +"/snake2.png'  width='200'>"
      + '<li class="pt-3">Poisonous snake, for catching this one you have to use special tool, so in this case you should press ctrl + keyboard keys related to those holes to catch them.</li>'
      + "<img src='"+ `${window.location.href.split('games')[0]}img` +"/snake.png'  width='200'>"
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
