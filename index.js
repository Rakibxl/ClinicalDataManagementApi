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
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

let patients = [{
  id: 189581,
  name: 'John Kabir',
  date: '1992-05-07',
  tests: [{
    bloodPressure : '120',
    respiratoryRate : '100',
    bloodOxygen : '80',
    heartBeatRate : '70',
    timestamp: '11/8/2023, 5:00:00 AM'
  }]
}];

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to My Clinical Data Management API');
});

let users = [
  
  { username: 'admin', password: 'admin123' }
];

// SignUp a new user
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).send("User already exists");
  }

  // Add new user (passwords should be hashed in a real-world scenario)
  users.push({ username, password });
  res.status(201).send("User created");
});


// SignIn an existing user
app.post('/signin', (req, res) => {
  const { username, password } = req.body;


  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  res.status(200).send(`Welcome ${username}`);
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
//   // TODO: Add data validation here
   const patient = patients.find(p => p.id === id);
   if (patient) {
     patient.tests.push(test);
     res.json({ message: "Patient Test Info Updated", updatedTests: patient.tests });;
   } else {
     res.status(404).send("Patient not found");
   }
 });

// app.post('/patients/:id', (req, res) => {
//   const { id } = req.params;
//   const test = req.body;

//   console.log(`Received test data for patient ${id}:`, test);

//   try {
//     // Find the patient by ID
//     const patient = patients.find(p => p.id === id);
//     if (patient) {
//       // Add the test data to the patient's tests array
//       patient.tests.push(test);

//       console.log(`Updated tests for patient ${id}:`, patient.tests);
      
//       res.send(`Updated tests for patient ${id}:`, patient.tests);
//     } else {
//       // Patient not found
//       console.log(`Patient not found with ID ${id}`);
//       res.status(404).send("Patient not found");
//     }
//   } catch (error) {
//     // Log the error and send a 500 response
//     console.error(`Error processing request for patient ${id}:`, error);
//     res.status(500).send("Internal Server Error");
//   }
// });


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


