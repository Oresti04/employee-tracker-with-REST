const express = require('express');
const bodyParser = require('body-parser');
const TimecardBusiness = require('./business/businesslayer');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const business = new TimecardBusiness();

// CRUD Operations for Departments
app.get('/timecard/departments/:company', async (req, res) => {
    try {
        const departments = await business.getAllDepartments(req.params.company);
        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/timecard/department', async (req, res) => {
    try {
        const { company, dept_id } = req.query;
        const department = await business.getDepartment(company, parseInt(dept_id));
        res.status(200).json({ success: true, data: department });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/timecard/department', async (req, res) => {
    try {
        const department = await business.insertDepartment(req.body);
        res.status(201).json({ success: true, data: department });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/timecard/department', async (req, res) => {
    try {
        const department = await business.updateDepartment(req.body);
        res.status(200).json({ success: true, data: department });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/timecard/department', async (req, res) => {
    try {
        const deletedDepartment = await business.deleteDepartment(req.body);
        res.status(200).json({ success: true, data: deletedDepartment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRUD Operations for Employees
app.get('/timecard/employees/:company', async (req, res) => {
    try {
        const employees = await business.getAllEmployees(req.params.company);
        res.status(200).json({ success: true, data: employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/timecard/employee/:empId', async (req, res) => {
    try {
        const employee = await business.getEmployee(parseInt(req.params.empId));
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/timecard/employee', async (req, res) => {
    try {
        const employee = await business.insertEmployee(req.body);
        res.status(201).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/timecard/employee', async (req, res) => {
    try {
        const employee = await business.updateEmployee(req.body);
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/timecard/employee/:empId', async (req, res) => {
    try {
        const deletedEmployee = await business.deleteEmployee(parseInt(req.params.empId));
        res.status(200).json({ success: true, data: deletedEmployee });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// CRUD Operations for Timecards
app.get('/timecard/timecards/:empId', async (req, res) => {
    try {
        const timecards = await business.getAllTimecards(parseInt(req.params.empId));
        res.status(200).json({ success: true, data: timecards });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/timecard/timecard/:timecardId', async (req, res) => {
    try {
        const timecard = await business.getTimecard(parseInt(req.params.timecardId));
        res.status(200).json({ success: true, data: timecard });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/timecard/timecard', async (req, res) => {
    try {
        const timecard = await business.insertTimecard(req.body);
        res.status(201).json({ success: true, data: timecard });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/timecard/timecard', async (req, res) => {
    try {
        const timecard = await business.updateTimecard(req.body);
        res.status(200).json({ success: true, data: timecard });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/timecard/timecard/:timecardId', async (req, res) => {
    try {
        const deletedTimecard = await business.deleteTimecard(parseInt(req.params.timecardId));
        res.status(200).json({ success: true, data: deletedTimecard });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Timecard Service running at http://localhost:${port}`);
});
