import UserServices from "../services/UserService";
import authUtils from "../utils/authUtil";
const { hashPassword, isPasswordTrue, generateToken } = authUtils;
export default class authController {
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserServices.getOneBy({ email: email });
      if (!user) {
        res.status(401).json({
          message: "User with those credentials is not found",
        });
      }
      const { dataValues } = user;
      await isPasswordTrue(password, dataValues.password);
      res.status(200).json({
        message: "You successfully logged in",
        token: generateToken(dataValues),
      });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        message: "Please check if email and password are true or match",
      });
    }
  };
  static signup = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
      res.status(400).send(error.details);
    }
    try {
      hashedpassword = await hashPassword(req.body.password);
      const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        password: hashedpassword,
      };
      UserServices.saveAll(user);
      res.status(200).send("Account made :)");
    } catch (error) {
      res.status(500).send("Internal error while hashing the password");
    }

    function validateUser(user) {
      const schema = Joi.object({
        firstname: Joi.string()
          .regex(new RegExp("^([a-zA-Z]{3,})+$"))
          .required(),
        lastname: Joi.string()
          .regex(new RegExp("^([a-zA-Z]{3,})+$"))
          .required(),
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
  };
}
