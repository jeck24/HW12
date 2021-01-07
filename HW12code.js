var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employee_db',
});

connection.connect(function (err) {
  if (err) throw err;
  runQuestion();
});

function runQuestion() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Quit',
        'View all departments',
        'Add department',
        'Remove department',
        'View all employees',
        'View all employees by department',
        'View all employees by manager',
        'Add employee',
        'Remove employee',
        'View all roles',
        'Add role',
        'Remove role',
        'Update employee role',
        'Update employee manager'
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case 'Quit':
          connection.end();
          break;

        case 'View all departments':
            viewDepartments();
            break;
        
        case 'Add department':
            addDepartment();
            break;
        
        case 'Remove department':
            removeDepartment();
            break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'View all employees by department':
          viewEmployeesByDepartment();
          break;

        case 'View all employees by manager':
          viewEmployeesByManager();
          break;

        case 'Add employee':
          addEmployee();
          break;
        
        case 'Remove employee':
            removeEmployee();
            break;
        
        case 'View all roles':
            viewRoles();
            break;

        case 'Add role':
            addRole();
            break;

        case 'Remove role':
            removeRole();
            break;
        
        case 'Update employee role':
            updateRole();
            break;
        
        case 'Update employee manager':
            updateManager();
            break;
      }
    });
}

function viewDepartments() {
    var query =
      'SELECT * FROM department;';
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runQuestion();
    });
}

function viewEmployees() {
    var query =
      'SELECT * FROM employee;';
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runQuestion();
    });
}

function viewRoles() {
    var query =
      'SELECT * FROM role;';
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runQuestion();
    });
}

function viewEmployeesdsfd() {
  inquirer
    .prompt({
      name: 'actualEmployees',
      type: 'input',
      message: 'Press enter to see the employees',
    })
    .then(function (answer) {
      connection.query(
        'SELECT id, song_name, year FROM top5000 WHERE ?',
        { artist_name: answer.artist },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}



function rangeSearch() {
  inquirer
    .prompt([
      {
        name: 'start',
        type: 'input',
        message: 'Enter starting position: ',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'end',
        type: 'input',
        message: 'Enter ending position: ',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (answer) {
      var query =
        'SELECT id,song_name,artist_name,year FROM top5000 WHERE id BETWEEN ? AND ?';
      connection.query(query, [answer.start, answer.end], function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: 'song',
      type: 'input',
      message: 'What song would you like to look for?',
    })
    .then(function (answer) {
      console.log(answer.song);
      connection.query(
        'SELECT * FROM top5000 WHERE ?',
        { song_name: answer.song },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}