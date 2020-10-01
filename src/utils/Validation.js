import Joi from "joi";

class Validation {
  SignupValidation = async (user) => {
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
  };
}

export default new Validation();
