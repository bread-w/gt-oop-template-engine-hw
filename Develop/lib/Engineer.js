// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./lib/Employee");

class Engineer extends Employee {
    constructor(github){
        super(name, role, email, id);
        this.github = github;
    }

    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;