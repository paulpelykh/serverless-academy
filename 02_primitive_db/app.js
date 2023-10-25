import inquirer from 'inquirer';

import db from './db.js';

const cli = async () => {
  const { name } = await inquirer.prompt([
    {
      name: 'name',
      message: "Enter the user's name. To cancel press ENTER: ",
      type: 'input',
    },
  ]);
  if (!name) {
    findUser();
  } else {
    addUser(name);
  }
};

const addUser = async (name) => {
  const { gender, age } = await inquirer.prompt([
    {
      name: 'gender',
      message: 'Choose your gender: ',
      type: 'list',
      choices: ['male', 'female'],
    },
    {
      name: 'age',
      message: 'Choose your age: ',
      type: 'number',
    },
  ]);
  const user = {
    name,
    gender,
    age,
  };

  db.users.add(user);
  cli();
};

const findUser = async () => {
  const { confirm } = await inquirer.prompt([
    {
      name: 'confirm',
      message: 'Would you like to search values in DB?: ',
      type: 'confirm',
    },
  ]);

  if (confirm) {
    // show users before finding
    db.users.get();

    const { name } = await inquirer.prompt({
      name: 'name',
      message: 'Enter the name to search for: ',
      type: 'input',
    });

    db.users.find(name);
  } else {
    console.log('Goodbye!');
    return;
  }
};

cli();
