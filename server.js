const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const config = require('./package.json');
require('dotenv').config();

const db = mysql.createConnection(
    {
        database:process.env.DB_NAME,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        host:'localhost',
        dialect:'mysql',
        port: 3306
    },
    console.log ('Connected to database')
);

console.log(logo(config).render());

function firstQuestion(){
inquirer.prompt([
    {
        type:'list',
        name: 'options',
        message: 'Select one',
        choices: [
            {name:'View all Departments', value: "View all Departments"},
            {name:'View all Roles', value:'View all Roles'},
            {name:'View all Employees', value:'View all Employees'}, 
            {name:'Add a Department', value:'Add a Department'}, 
            {name:'Add a Role', value:'Add a Role'}, 
            {name:'Add an Employee', value:'Add an Employee'}, 
            {name:'Update an Employee Role', value:'Update an Employee Role'},
            {name:'Quit', value:'quit'}
        
        ]
    },
]) .then((answers) => {
    switch(answers.options){
        case "View all Departments":
        viewAllDepartments();
        break;

        case "View all Roles":
            viewAllRoles();
        break;

        case "View all Employees":
            viewAllEmployees();
        break;

        case "Add a Department":
            addDepartment();
        break;

        case "Add a Role":
            addRole();
        break;

        case "Add an Employee":
            addEmployee();
        break;

        case "Update an Employee Role":
            updateEmployeeRole();
        break;

        case "quit":
           process.exit();
    }
})
};

const viewAllDepartments = async () =>{
const departments = await db.promise().query('SELECT * FROM department');
console.table(departments[0])
 firstQuestion()
};
const viewAllRoles = async () => {
const roles = await db.promise().query('SELECT title, salary, department.department_name FROM role left join department on department.id= role.department_id');
console.table(roles[0]);
firstQuestion()
};

const viewAllEmployees = async ()=> {
const employees = await db.promise().query('SELECT employee.first_name, employee.last_name, role.title, manager.first_name as manager From employee left join role on role.id = employee.role_id left join employee manager on employee.manager_id = manager.id');
console.table(employees[0]);
firstQuestion()
};

const addDepartment = async ()=> {
const newDepartment = await inquirer.prompt([
    {
        type:'input',
        name:'department_name',
        message:'What is the name of the department?'
    }, 
])

let query = 'INSERT INTO department set ?';
const res = await db.promise().query(query, newDepartment)

console.log('Department added')

firstQuestion()
};

const addRole = async ()=> {
const dbDepart = await db.promise().query ('SELECT *FROM department');
const departList = dbDepart[0].map(department =>({value: department.id, name: department.department_name}));
    const newRole = await inquirer.prompt([
        {
            type:'input',
            name:'title',
            message:'What is the name of the role?'
        },
        {
            type:'input',
            name:'salary',
            message:'What is the salary for the role?'
        },
        {
            type:'list',
            name:'department_id',
            message:'Select the Department',
            choices: departList
        },
    ]);
    let query = 'INSERT INTO role set ?'
    const res = await db.promise().query(query, newRole);

    console.log('Role added Successfully');
    firstQuestion()
}

const addEmployee = async ()=> {
    const dbEmployee= await db.promise().query('SELECT * FROM employee');
    const employeeList = dbEmployee[0].map(employee => ({value: employee.id, name:employee.last_name}));

    const dbRole= await db.promise().query('SELECT * FROM role');
    const roleList = dbRole[0].map(role => ({value: role.id, name: role.title}));
    const newEmployee = await inquirer.prompt([
        {
            type:'input',
            name:'first_name',
            message:'What is the new Employees first name?'
        },
        {
            type:'input',
            name:'last_name',
            message:'What is the new Employees last name?'
        },
        {
            type:'list',
            name:'role_id',
            message:'What is the new Employees role?',
            choices:roleList
        },
        {
            type:'list',
            name:'manager_id',
            message:'Who is the new Employees manager?',
            choices:employeeList
        },
    ]);
    let query = 'INSERT INTO employee set ?';
    const res = await db.promise().query(query, newEmployee);
    console.log('Added a new Employee Successfully');

    firstQuestion()
}
const updateEmployeeRole = async ()=> {
    const dbEmployee= await db.promise().query('SELECT * FROM employee');
    const employeeList = dbEmployee[0].map(employee => ({value: employee.id, name:employee.last_name}));

    const dbRole= await db.promise().query('SELECT * FROM role');
    const roleList = dbRole[0].map(role => ({value: role.id, name: role.title}));

    const update = await inquirer.prompt([
        {
            type:'list',
            name:'list_employees',
            message:'Who would you like to update?',
            choices:employeeList
        },
        {
            type:'list',
            name:'list_roles',
            message:'Update employee Role',
            choices: roleList
        }
    ]); 
    let query = 'update employee set role_id = ? WHERE id =?';
    const res = await db.promise().query(query,[update.list_roles, update.list_employees])
    console.log('Updated Employee Successfully');

   firstQuestion()
}

firstQuestion()
