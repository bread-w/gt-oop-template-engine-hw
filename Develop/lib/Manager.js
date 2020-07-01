// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./lib/Employee");

class Manager extends Employee {
    constructor(officeNumber){
        super(name, role, email, id);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;