
// productController.js
const express = require('express');
const router = express.Router();
const Pool=require('pg').Pool;
const pool=new Pool({
  host:'localhost',
  user:'postgres',
  password:'postgres',
  database:'employeedb',
  port:5432
});

// test route
router.get("/",(req,res)=>{
  res.send("Hello from Employee API");
});

// get all employees

router.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employee");
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// get employee by id

router.get("/employees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);  
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    } 
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  } 
});

// create employee

router.post("/employees", async (req, res) => {
  try 
  {
    const { name,    sal } = req.body;
    const result = await pool.query("INSERT INTO employee (name, sal) VALUES ($1, $2) RETURNING *",[name, sal]   );
    res.status(201).json(result.rows[0]);
    console.log('Employee created successfully');
  } 
  
  catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  } 
  

});

// update employee
router.put("/employees/:id", async (req, res) => {
  try 
  {
    const id = req.params.id; 
    const { name, sal } = req.body;
    const result = await pool.query(
      "UPDATE employee SET name = $1, sal = $2 WHERE id = $3 RETURNING *",
      [name, sal, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
    console.log('Employee updated successfully');
  } 
  catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 

// delete employee

router.delete("/employees/:id", async (req, res) => {
  try 
  {
    const id = req.params.id; 
    const result = await pool.query("DELETE FROM employee WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } 
  catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;