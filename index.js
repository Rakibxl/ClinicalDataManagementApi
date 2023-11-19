/*
Milestone 3. Web Server with Implementation of all of use-cases and Integration with Android Mobile App
for a Patient Clinical Data management application with the express framewor.
Functionality Implemented
● Create Patient Information
● View Patient Information
● Add Patient test Information
● List all Patients Information 
● Remove Patient Information
Team Members - Group 4
Michael Akinola - 201251688 
Jemine Collins - 301275173 
Ahmed Rakib - 301243511 
Temiloluwa Omoniwa - 301209585
*/

const express = require('express');

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let patients = [{
  id: '1',
  name: 'John',
  date: '06-06-2023',
  tests: [{}]
}];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to My Clinical Data Management API');
});

// Get the patient list in the form of JSON
app.get('/patients', (req, res) => {
  res.json(patients);
});

// Add a new patient to the list
app.post('/patients', (req, res) => {
  const patient = req.body;
  // TODO: Add data validation here
  patients.push(patient);
  res.status(201).send("Patient Info Added");
});

// Add a new patient test to the list
app.post('/patients/:id', (req, res) => {
  const { id } = req.params;
  const test = req.body;
  // TODO: Add data validation here
  const patient = patients.find(p => p.id === id);
  if (patient) {
    patient.tests.push(test);
    res.send("Patient Test Info Updated");
  } else {
    res.status(404).send("Patient not found");
  }
});

// Search for a patient in the list
app.get('/patients/:id', (req, res) => {
  const { id } = req.params;
  const patient = patients.find(p => p.id === id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

// Remove a patient from the list
app.delete('/patients/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = patients.length;
  patients = patients.filter(patient => patient.id !== id);
  
  if (patients.length < initialLength) {
    res.send('Patient record deleted');
  } else {
    res.status(404).send('Patient not found');
  }
});

// Start the server
app.listen(port, () => console.log(`Server listening at port ${port}`));


