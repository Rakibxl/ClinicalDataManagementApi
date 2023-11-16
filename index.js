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

const express = require('express')

const app = express()
const port =  3000

app.use(express.json());
app.use(express.urlencoded({extended: false}));

let patients = [{
  id: '1',
  name:'john',
  date: '06-06-2023',
  tests: [{}]
}];

// get the patient list in the form of JSON
app.get('/patients', (req, res) => {
  res.json(patients)
});

// add a new patient to the list
app.post('/patients',  (req, res) => {
const patient = req.body;
patients.push(patient)
res.send("Patient Info Updated")
});

// add a new patient test to the list
app.post('/patients/:id',  (req, res) => {
  const id = req.params.id
  const numID = parseInt(id) - 1
  const test = req.body;
  console.log(numID)

  for (let patient of patients) {
    if(patient.id === id) {
      patients[numID].tests.push(test)
    }  
  }
  res.send("Patient test Info Updated")
  });

//search for a patient on the list

app.get(`/patients/:id`, (req, res) => {
  const id = req.params.id

    for (let patient of patients) {
      if(patient.id === id) {
        res.json(patient)
      }  
    }
    res.status(404).send('patient not found')
})

//remove patient from  the list
app.delete(`/patients/:id`, (req,res) =>{
  const id = req.params.id;

  patients = patients.filter(patient =>{
    if (patient.id !== id) {
      return true
    }
    return false
  })
  res.send('Patient record deleted')
})

// set the server to listen at port
app.listen(port, () => console.log(`Server listening at port ${port}`));

