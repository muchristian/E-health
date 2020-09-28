import UserServices from '../services/UserService';
import authUtils from '../utils/authUtil';
const { isPasswordTrue, generateToken } = authUtils;
export default class authController {
    static login = async (req, res) => {
        try {
        const { email, password } = req.body;
        const user  = await UserServices.getOneBy({ email: email});
        if (!user) {
            res.status(401).json({
                message: "User with those credentials is not found"
            })
        }
        const { dataValues } = user
        await isPasswordTrue(password, dataValues.password)
        res.status(200).json({
            message: "You successfully logged in",
            token: generateToken(dataValues)
        })
    } catch(err) {
        console.log(err)
        res.status(401).json({
            message: "Please check if email and password are true or match"
        })
    }
    }
}
