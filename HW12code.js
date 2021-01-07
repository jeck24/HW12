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

function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Press enter the new department',
    })
    .then(function (answer) {
      connection.query(
        'INSERT INTO department SET ?;',
        { name: answer.name },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runQuestion();
        }
      );
    });
}

function addRole() {
    inquirer
      .prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the name of the new role',
      },
      {
        name: 'salary',
        type: 'input',
        message: "Please enter the salary for the role",
      },
      {
          name: 'departmentID',
          type: 'input',
          message:'What is the department id of the new role?',
      }])
      .then(function (answer) {
        connection.query(
          'INSERT INTO role SET ?;',
          { title: answer.name,
            salary: answer.salary,
            department_id: answer.departmentID},
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
  }

function addEmployee() {
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of this new employee?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the last name of this new employee?",
      },
      {
          name: 'roleID',
          type: 'input',
          message:'What is the role id of this new employee?',
      },
        {
            name: 'managerID',
            type:'input',
            message: 'What is the manager id for this new employee?',
        }])
      .then(function (answer) {
        connection.query(
          'INSERT INTO employee SET ?;',
          { first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.roleID,
            manager_id: answer.managerID},
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
}

function addRole() {
    inquirer
      .prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the name of the new role',
      },
      {
        name: 'salary',
        type: 'input',
        message: "Please enter the salary for the role",
      },
      {
          name: 'departmentID',
          type: 'input',
          message:'What is the department id of the new role?',
      }])
      .then(function (answer) {
        connection.query(
          'INSERT INTO role SET ?;',
          { title: answer.name,
            salary: answer.salary,
            department_id: answer.departmentID},
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
  }

function updateRole() {
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee to change?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the last name of the employee to change?",
      },
      {
          name: 'roleID',
          type: 'input',
          message:'What is the new role id of this employee?',
      }])
      .then(function (answer) {
        connection.query(
          'UPDATE employee SET ? WHERE ? AND ?',
          [{ role_id: answer.roleID},
        {first_name: answer.first_name},
        {last_name: answer.last_name}],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
  }

function updateManager() {
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee to change?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the last name of the employee to change?",
      },
      {
          name: 'roleID',
          type: 'input',
          message:'What is the new manager id of this employee?',
      }])
      .then(function (answer) {
        connection.query(
          'UPDATE employee SET ? WHERE ? AND ?',
          [{manager_id: answer.roleID},
        {first_name: answer.first_name},
        {last_name: answer.last_name}],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
}

function removeRole() {
    inquirer
      .prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the name of the role to remove',
      }])
      .then(function (answer) {
        connection.query(
          'DELETE FROM role WHERE ?;',
          { title: answer.name,},
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
  }

  function removeEmployee() {
    inquirer
      .prompt([{
        name: 'first_name',
        type: 'input',
        message: 'What is the first name of the employee to remove?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: "What is the last name of the employee to remove?",
      }])
      .then(function (answer) {
        connection.query(
          'DELETE FROM employee WHERE ? AND ?;',
          [{first_name: answer.first_name},
        {last_name: answer.last_name}],
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
}

function removeDepartment() {
    inquirer
      .prompt([{
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department to remove',
      }])
      .then(function (answer) {
        connection.query(
          'DELETE FROM department WHERE ?;',
          { name: answer.name,},
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runQuestion();
          }
        );
      });
  }

function viewEmployeesByManager() {
    var query =
      'SELECT * FROM employee GROUP BY manager_id;';
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runQuestion();
    });
}

function viewEmployeesByDepartment() {
    var query =
      'SELECT * FROM employee GROUP BY department_id;';
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table(res);
      runQuestion();
    });
}