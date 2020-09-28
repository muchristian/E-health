const express = require("express");
//const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

users = [];

app.post("/api/signup", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details);
  }
  try {
    hashPassword(req.body.password);
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      password: hashedpassword,
    };
    users.push(user);
    res.status(200).send("Account made :)");
  } catch (error) {
    res.status(500).send("Internal error while hashing your password");
  }
});

function validateUser(user) {
  const pattern = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const schema = Joi.object({
    firstname: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
    lastname: Joi.string().regex(new RegExp("^([a-zA-Z]{3,})+$")).required(),
    phone: Joi.string().regex(new RegExp("^\\d{9}$")),
    email: Joi.string().email(),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/)
      .required(),
    confirmpassword: Joi.string().required().valid(Joi.ref("password")),
  });
  return schema.validate(user, {
    abortEarly: false,
    allowUnknown: true,
  });
}

app.listen(3000);
