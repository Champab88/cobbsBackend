const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Connect to MongoDB (replace with your MongoDB connection URL)
const password = encodeURIComponent("Bad@1234");
const connectionString = `mongodb+srv://book_A_Doc:${password}@cluster0.so4dr.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Patient model
const Patient = mongoose.model("Patient", {
  name: String,
  age: Number,
  description: String,
  angleMeasurements: [Number],
  date: Date,
});

app.use(bodyParser.json());

// Create a new patient record
app.post("/api/patients", (req, res) => {
  const { name, age, description, angleMeasurements, date } = req.body;

  const patient = new Patient({
    name,
    age,
    description,
    angleMeasurements,
    date,
  });

  patient
    .save()
    .then(() => {
      res.status(201).json(patient);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
