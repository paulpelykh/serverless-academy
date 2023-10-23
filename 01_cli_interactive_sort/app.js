const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const showMenu = () => {
  rl.question(
    'Hello. Enter 10 words or digits deviding them in spaces: ',
    input => {
      // close the readline
      if (input === 'exit') {
        console.log('Good bye! Come back again!');
        rl.close();
      } else {
        const data = input.split(' ');
        interactiveSort(data);
      }
    }
  );
};

// Helper functions
const getWords = input => input.filter(word => isNaN(word));
const getNumbers = input => input.filter(word => !isNaN(word));

const interactiveSort = data => {
  rl.question('Select (1 - 6) and press ENTER: ', choice => {
    choiceInt = parseInt(choice);
    switch (choiceInt) {
      case 1:
        const sortedWordsAlphatically = getWords(data).sort();
        console.log(sortedWordsAlphatically);
        break;
      case 2:
        const sortedNumbersAscending = getNumbers(data).sort((a, b) => a - b);
        console.log(sortedNumbersAscending);
        break;
      case 3:
        const sortedNumberDescending = getNumbers(data).sort((a, b) => b - a);
        console.log(sortedNumberDescending);
        break;
      case 4:
        const sortedWordsByLength = getWords(data).sort(
          (a, b) => a.length - b.length
        );
        console.log(sortedWordsByLength);
        break;
      case 5:
        const uniqueWords = [...new Set(getWords(data))];
        console.log(uniqueWords.join(' '));
      case 6:
        const unique = [...new Set(data)];
        console.log(unique);
        break;
      default:
        console.log('Invalid choice. Try again');
    }
    showMenu();
  });
};

showMenu();
