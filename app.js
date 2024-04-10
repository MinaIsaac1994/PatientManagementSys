const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const teamsRoutes = require("./routes/teams");
const usersRoutes = require("./routes/users");
const patientsRoutes = require("./routes/patients");
const wardsRoutes = require("./routes/wards");
const authRoutes = require("./routes/auth");

const { get404 } = require("./controllers/404");

const Team = require("./models/team");
const User = require("./models/user");
const Ward = require("./models/ward");
const Patient = require("./models/patient");

const { handleUserSession } = require("./controllers/session");
const { sequelize, sessionOptions } = require("./util/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session(sessionOptions));
app.use("/auth", authRoutes);

app.use(handleUserSession);
app.use("/teams", teamsRoutes);
app.use("/users", usersRoutes);
app.use("/wards", wardsRoutes);
app.use("/patients", patientsRoutes);
app.use(get404);

//
//Association
User.belongsTo(Team);
Ward.belongsTo(Team);

Patient.belongsTo(Ward);

// User.belongsToMany(Ward, { through: "UserTeamWard" });
// Ward.belongsToMany(User, { through: "UserTeamWard" });

Team.hasMany(User);
Team.hasMany(Ward);
Ward.hasMany(Patient);

sequelize
  // .sync({ force: true })
  .sync()
  .then(app.listen(3001))
  .catch((err) => console.log(err));
