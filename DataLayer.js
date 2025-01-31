const mysql = require('mysql2/promise');

class DataLayer {
    constructor(env) {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Orushi04',
            database: 'CompanyDB',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async deleteCompany(companyName) {
        const query = 'DELETE FROM department WHERE company = ?';
        const [result] = await this.pool.query(query, [companyName]);
        return result.affectedRows > 0;
    }

    async getDepartment(company, deptId) {
        const query = 'SELECT * FROM department WHERE company = ? AND dept_id = ?';
        const [rows] = await this.pool.query(query, [company, deptId]);
        return rows[0] || null;
    }

    async getAllDepartment(company) {
        console.log('Executing query to get departments for company:', company); // Debug log
        const query = 'SELECT * FROM department WHERE company = ?';
        try {
            const [rows] = await this.pool.query(query, [company]);
            console.log('Rows fetched:', rows); // Debug log
            return rows;
        } catch (error) {
            console.error('Error fetching departments:', error); // Error log
            return { error: `Error fetching departments: ${error.message}` };
        }
    }

    async insertDepartment(department) {
        const query = 'INSERT INTO department (dept_id, company, dept_name, dept_no, location) VALUES (?, ?, ?, ?, ?)';
        const { dept_id, company, dept_name, dept_no, location } = department;
        const [result] = await this.pool.query(query, [dept_id, company, dept_name, dept_no, location]);
        return result.insertId;
    }

    async updateDepartment(department) {
        const query = 'UPDATE department SET dept_name = ?, dept_no = ?, location = ? WHERE dept_id = ? AND company = ?';
        const { dept_id, company, dept_name, dept_no, location } = department;
        const [result] = await this.pool.query(query, [dept_name, dept_no, location, dept_id, company]);
        return result.affectedRows > 0;
    }

    async deleteDepartment(company, deptId) {
        const query = 'DELETE FROM department WHERE company = ? AND dept_id = ?';
        const [result] = await this.pool.query(query, [company, deptId]);
        return result.affectedRows > 0;
    }

    async getEmployee(empId) {
        const query = 'SELECT * FROM employee WHERE emp_id = ?';
        const [rows] = await this.pool.query(query, [empId]);
        return rows[0] || null;
    }

    async getAllEmployee(company) {
        const query = 'SELECT * FROM employee WHERE dept_id IN (SELECT dept_id FROM department WHERE company = ?)';
        const [rows] = await this.pool.query(query, [company]);
        return rows;
    }

    async insertEmployee(employee) {
        const query = 'INSERT INTO employee (emp_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const { emp_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id } = employee;
        const [result] = await this.pool.query(query, [emp_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id]);
        return result.insertId;
    }

    async updateEmployee(employee) {
        const query = 'UPDATE employee SET emp_name = ?, emp_no = ?, hire_date = ?, job = ?, salary = ?, dept_id = ?, mng_id = ? WHERE emp_id = ?';
        const { emp_id, emp_name, emp_no, hire_date, job, salary, dept_id, mng_id } = employee;
        const [result] = await this.pool.query(query, [emp_name, emp_no, hire_date, job, salary, dept_id, mng_id, emp_id]);
        return result.affectedRows > 0;
    }

    async deleteEmployee(empId) {
        const query = 'DELETE FROM employee WHERE emp_id = ?';
        const [result] = await this.pool.query(query, [empId]);
        return result.affectedRows > 0;
    }

    async getTimecard(timecardId) {
        const query = 'SELECT * FROM timecard WHERE timecard_id = ?';
        const [rows] = await this.pool.query(query, [timecardId]);
        return rows[0] || null;
    }

    async getAllTimecard(empId) {
        const query = 'SELECT * FROM timecard WHERE emp_id = ?';
        const [rows] = await this.pool.query(query, [empId]);
        return rows;
    }

    async insertTimecard(timecard) {
        const query = 'INSERT INTO timecard (timecard_id, start_time, end_time, emp_id) VALUES (?, ?, ?, ?)';
        const { timecard_id, start_time, end_time, emp_id } = timecard;
        const [result] = await this.pool.query(query, [timecard_id, start_time, end_time, emp_id]);
        return result.insertId;
    }

    async updateTimecard(timecard) {
        const query = 'UPDATE timecard SET start_time = ?, end_time = ?, emp_id = ? WHERE timecard_id = ?';
        const { timecard_id, start_time, end_time, emp_id } = timecard;
        const [result] = await this.pool.query(query, [start_time, end_time, emp_id, timecard_id]);
        return result.affectedRows > 0;
    }

    async deleteTimecard(timecardId) {
        const query = 'DELETE FROM timecard WHERE timecard_id = ?';
        const [result] = await this.pool.query(query, [timecardId]);
        return result.affectedRows > 0;
    }
}

module.exports = DataLayer;
