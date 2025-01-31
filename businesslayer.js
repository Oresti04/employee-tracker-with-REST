const DataLayer = require('../data/DataLayer');

class TimecardBusiness {
    constructor() {
        this.dt = new DataLayer('production');
    }

    async deleteCompany(companyName) {
        try {
            const departments = await this.dt.getAllDepartment(companyName);
            await this.dt.deleteCompany(companyName);
            return { success: `${companyName}'s information deleted.`, deletedDepartments: departments };
        } catch (error) {
            return { error: `There was an error deleting the company: ${error.message}` };
        }
    }

    async getDepartment(company, deptId) {
        try {
            const department = await this.dt.getDepartment(company, deptId);
            if (!department) throw new Error('Department not found');
            return department;
        } catch (error) {
            return { error: `There was an error fetching the department: ${error.message}` };
        }
    }

    async getAllDepartments(company) {
        try {
            const departments = await this.dt.getAllDepartment(company);
            return departments;
        } catch (error) {
            return { error: `There was an error fetching all departments: ${error.message}` };
        }
    }

    async insertDepartment(department) {
        try {
            const newDepartmentId = await this.dt.insertDepartment(department);
            const newDepartment = await this.dt.getDepartment(department.company, newDepartmentId);
            return newDepartment;
        } catch (error) {
            return { error: `There was an error inserting the department: ${error.message}` };
        }
    }

    async updateDepartment(department) {
        try {
            await this.dt.updateDepartment(department);
            const updatedDepartment = await this.dt.getDepartment(department.company, department.dept_id);
            return updatedDepartment;
        } catch (error) {
            return { error: `There was an error updating the department: ${error.message}` };
        }
    }

    async deleteDepartment(department) {
        try {
            const deletedDepartment = await this.dt.getDepartment(department.company, department.id);
            await this.dt.deleteDepartment(department.company, department.id);
            return deletedDepartment;
        } catch (error) {
            return { error: `There was an error deleting the department: ${error.message}` };
        }
    }

    async getEmployee(empId) {
        try {
            const employee = await this.dt.getEmployee(empId);
            if (!employee) throw new Error('Employee not found');
            return employee;
        } catch (error) {
            return { error: `There was an error fetching the employee: ${error.message}` };
        }
    }

    async getAllEmployees(company) {
        try {
            const employees = await this.dt.getAllEmployee(company);
            return employees;
        } catch (error) {
            return { error: `There was an error fetching all employees: ${error.message}` };
        }
    }

    async insertEmployee(employee) {
        try {
            const empId = await this.dt.insertEmployee(employee);
            const newEmployee = await this.dt.getEmployee(empId);
            return newEmployee;
        } catch (error) {
            return { error: `There was an error inserting the employee: ${error.message}` };
        }
    }

    async updateEmployee(employee) {
        try {
            await this.dt.updateEmployee(employee);
            const updatedEmployee = await this.dt.getEmployee(employee.emp_id);
            return updatedEmployee;
        } catch (error) {
            return { error: `There was an error updating the employee: ${error.message}` };
        }
    }

    async deleteEmployee(empId) {
        try {
            const deletedEmployee = await this.dt.getEmployee(empId);
            await this.dt.deleteEmployee(empId);
            return deletedEmployee;
        } catch (error) {
            return { error: `There was an error deleting the employee: ${error.message}` };
        }
    }

    async getTimecard(timecardId) {
        try {
            const timecard = await this.dt.getTimecard(timecardId);
            if (!timecard) throw new Error('Timecard not found');
            return timecard;
        } catch (error) {
            return { error: `There was an error fetching the timecard: ${error.message}` };
        }
    }

    async getAllTimecards(empId) {
        try {
            const timecards = await this.dt.getAllTimecard(empId);
            return timecards;
        } catch (error) {
            return { error: `There was an error fetching all timecards: ${error.message}` };
        }
    }

    async insertTimecard(timecard) {
        try {
            const timecardId = await this.dt.insertTimecard(timecard);
            const newTimecard = await this.dt.getTimecard(timecardId);
            return newTimecard;
        } catch (error) {
            return { error: `There was an error inserting the timecard: ${error.message}` };
        }
    }

    async updateTimecard(timecard) {
        try {
            await this.dt.updateTimecard(timecard);
            const updatedTimecard = await this.dt.getTimecard(timecard.timecard_id);
            return updatedTimecard;
        } catch (error) {
            return { error: `There was an error updating the timecard: ${error.message}` };
        }
    }

    async deleteTimecard(timecardId) {
        try {
            const deletedTimecard = await this.dt.getTimecard(timecardId);
            await this.dt.deleteTimecard(timecardId);
            return deletedTimecard;
        } catch (error) {
            return { error: `There was an error deleting the timecard: ${error.message}` };
        }
    }
}

module.exports = TimecardBusiness;
