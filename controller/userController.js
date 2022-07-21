import UserModel  from "../models/userModel.js"
import {cryptPassword,comparePassword} from "../bcrypt.js";
export class userController{

    static async setRegistration(req){
            let userPseudo= await UserModel.findOne({userName: req.body.userName})
            if (userPseudo) {
                console.log(userPseudo);
                throw "votre mail est deja utilisé"
            }
            let userMail= await UserModel.findOne({mail: req.body.mail})
            if (userMail) {
                throw "votre pseudo est deja utilisé"
            }
            req.body.password = await cryptPassword(req.body.password)
            let user = new UserModel(req.body)
            await user.save()
            req.session.user = user._id
    } 

    static async login(req){
        let userPseudo= await UserModel.findOne({userName: req.body.mail})
            if (userPseudo) {
                if ( comparePassword(req.body.password,userPseudo.password)) {
                    return userPseudo
                } 
            }
            let userMail= await UserModel.findOne({mail: req.body.mail})
            if (userMail) {
                if (comparePassword(req.body.password,userMail.password)) {
                    return userMail
                }

            }
        return null
    } 


}

export default userController