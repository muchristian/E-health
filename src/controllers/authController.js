import UserServices from "../services/UserService";
import authUtils from "../utils/authUtil";
import Validation from "../utils/Validation";
const { hashPassword, isPasswordTrue, generateToken } = authUtils;
const { SignupValidation } = Validation;
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
    const { error } = SignupValidation(req.body);
    if (error) {
      res.status(400).send(error.details);
    }

    try {
      const hashedPassword = await hashPassword(req.body.password);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashedPassword,
      };
      await UserServices.saveAll(user);
      res.status(200).send("Account made :)");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal error while hashing the password");
    }
  };
}
