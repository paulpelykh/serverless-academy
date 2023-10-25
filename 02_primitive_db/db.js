import fs from 'fs';

const usersDB = 'users.txt';

// create file if it doesn't exist
if (!fs.existsSync(usersDB)) {
  fs.writeFileSync(usersDB, '[]');
}

const db = {
  users: {
    // add new user to db
    add: (data) => {
      try {
        const db = fs.readFileSync(usersDB, 'utf-8');
        const users = JSON.parse(db);

        users.push(data);

        fs.writeFileSync(usersDB, JSON.stringify(users, null, 2));
      } catch (error) {
        console.log('Error adding user: ', error);
      }
    },

    // get all users from db
    get: () => {
      try {
        const db = fs.readFileSync(usersDB, 'utf-8');
        const users = JSON.parse(db);

        console.log(users);
      } catch (error) {
        console.log('Error showing users: ', error);
      }
    },

    // find user by name
    find: (name) => {
      try {
        const db = fs.readFileSync(usersDB, 'utf-8');
        const users = JSON.parse(db);

        const foundUser = users.find(
          (user) => user.name.toLowerCase() === name.toLowerCase()
        );

        if (!foundUser) {
          return console.log('User is not found');
        } else {
          console.log(`User ${name} has found\n`, foundUser);
        }
      } catch (error) {
        console.log('Error searching for users: ', error);
      }
    },
  },
};

export default db;
