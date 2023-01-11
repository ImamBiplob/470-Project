const config = require("config");
const Joi = require("joi");
Joi.objectid = require("joi-objectid")(Joi);
const users = require("./routes/users");
const auth = require("./routes/auth");
const doctors = require("./routes/doctors");
const appointments = require("./routes/appointments");
const drivers = require("./routes/drivers");
const ambulances = require("./routes/ambulances");
const ambulance_requests = require("./routes/ambulance-requests");
const blood_banks = require("./routes/blood-banks");
const blood_requests = require("./routes/blood-requests");
const seats = require("./routes/seats");
const seat_bookings = require("./routes/seat-bookings");
const medicines = require("./routes/medicines");
const medicine_orders = require("./routes/medicine-orders");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/470-project")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/blood-banks", blood_banks);
app.use("/api/blood-requests", blood_requests);
app.use("/api/doctors", doctors);
app.use("/api/appointments", appointments);
app.use("/api/drivers", drivers);
app.use("/api/ambulances", ambulances);
app.use("/api/ambulance-requests", ambulance_requests);
app.use("/api/seats", seats);
app.use("/api/seat-bookings", seat_bookings);
app.use("/api/medicines", medicines);
app.use("/api/medicine-orders", medicine_orders);

app.get("/", (req, res) => {
  res.send("Welcome Beta");
});

const port = process.env.PORT || 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));
