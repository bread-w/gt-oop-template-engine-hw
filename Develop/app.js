const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const validator = require("email-validator");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const questions = [
  {
    message: "What is your name?",
    type: "input",
    name: "name",
  },
  {
    message: "What is your employee ID?",
    type: "input",
    name: "id",
    validate: (input) => {
      if (Number.isInteger(parseInt(input))) {
        return true;
      }
      return "Please enter a valid ID number.";
    },
  },
  {
    message: "What is your email address?",
    type: "input",
    name: "email",
    validate: (input) => {
      const pass = validator.validate(input);
      if (pass) {
        return true;
      }
      return "Please enter a valid email address.";
    },
  },
  {
    message: "What is your role?",
    type: "list",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    message: "What is your office number?",
    type: "input",
    name: "officeNumber",
    validate: (input) => {
      if (Number.isInteger(parseInt(input))) {
        return true;
      }
      return "Please enter a valid office number.";
    },
    when: (response) => response.role === "Manager",
  },
  {
    message: "What is your Github username?",
    type: "input",
    name: "github",
    when: (response) => response.role === "Engineer",
  },
  {
    message: "What school/university did you attend?",
    type: "input",
    name: "school",
    when: (response) => response.role === "Intern",
  },
  {
    message: "Would you like to add another teammate?",
    type: "confirm",
    name: "addAnother",
  },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const teammates = [];
// function to initialize program
function init() {
  // I used the inquirer template from npmjs.com
  inquirer
    .prompt(questions)

    .then((data) => {
      createNewTeammate(data);
      //   console.log(data);
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      console.log(error);
    });
}

const createNewTeammate = (data) => {
  let newTeammate;
  if (data.role === "Manager") {
    newTeammate = new Manager(
      data.name,
      data.id,
      data.email,
      data.officeNumber
    );
  } else if (data.role === "Engineer") {
    newTeammate = new Engineer(data.name, data.id, data.email, data.github);
  } else if (data.role === "Intern") {
    newTeammate = new Intern(data.name, data.id, data.email, data.school);
  }

  teammates.push(newTeammate);

  if (data.addAnother === true) {
    return init();
  }

  fs.writeFileSync(outputPath, render(teammates), function (error) {
    if (error) {
      console.log("Error creating new employee.");
    }
  });
};

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
