const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output"); //"./output" 
const outputPath = path.join(OUTPUT_DIR, "team.html");//"./output/team.html" 

const render = require("./lib/htmlRenderer");

const team = []; // array of objects

//build team html
const buildTeam = () => {
    //check if output folder exists if does not create it
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    //then we will write to a new html with team data
    fs.writeFileSync(outputPath,render(team),"utf8");
}

//we need to preapre questions in array fomat that inquirer can process
const managerQuestions = [
  {
    type: "input",
    name: "managerName",
    message: "What is the manger name?",
  },
  {
    type: "input",
    name: "managerId",
    message: "What is the manager ID?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the manager email?",
  },
  {
    type: "input",
    name: "managerOfficeNumber",
    message: "What is the manager office number?",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "What is the engineer name?",
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is the engineer ID?",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is the engineer email?",
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is the engineer Github?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "What is the Intern name?",
  },
  {
    type: "input",
    name: "internId",
    message: "What is the Intern ID?",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is the intern email?",
  },
  {
    type: "input",
    name: "internSchool",
    message: "What is the intern school?",
  },
];

//create team function that will ask user if he or she wants to add more employees
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What kind of employee would you like to add?",
        choices: ["Engineer", "Manager", "Intern", "None/No more employees"],
      },
    ])
    .then((answer) => {
      switch (answer.userChoice) {
        case "Engineer":
          createEngineer();
          break;
        case "Manager":
          createManager();
          break;
        case "Intern":
          createIntern();
          break;
        default:
            buildTeam();
          break;
      }
    });
};

//write the functions that will create each type of Employee
const createManager = () => {
  //ask the question
  inquirer.prompt(managerQuestions).then((answers) => {
    //create an employee object instance
    const newManager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOfficeNumber
    );
    //push up each object instance to team arrray
    team.push(newManager);
    //ask to add more employees?
    addEmployee();
  });
};
const createEngineer = () => {
    //ask the question
    inquirer.prompt(engineerQuestions).then((answers) => {
      //create an employee object instance
      const newEngineer = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub
      );
      //push up each object instance to team arrray
      team.push(newEngineer);
      //ask to add more employees?
      addEmployee();
    });
  };
  const createIntern = () => {
    //ask the question
    inquirer.prompt(internQuestions).then((answers) => {
      //create an employee object instance
      const newIntern = new Intern(
        answers.internName,
        answers.internId,
        answers.internEmail,
        answers.internSchool
      );
      //push up each object instance to team arrray
      team.push(newIntern);
      //ask to add more employees?
      addEmployee();
    });
  };

//start by invoking createManager
createManager();

//when no more employees are wanted in the roster - build the team html
