import { Router } from "express";
import UserModel from "../models/userModel.js";
import PokemonModel from "../models/pokemonModel.js";
import authGuard from "../authGuard.js";
import { userController } from "../controller/userController.js";


const userRouter = Router();


//registration
userRouter.get("/registration", async (req, res) => {
  try {
    await UserModel.findOne({ _id: req.params.id }, req.body);
    res.render("userRegistration.twig");
  } catch (error) {
    res.send(error);
  }
});

userRouter.post('/registration', async (req, res) => {
  try{
    await userController.setRegistration(req)
    res.redirect('/') 
  }catch(error){
    console.log(error);
    res.redirect('/registration')
  }
})

//login
userRouter.get("/", async (req, res) => {
  try {
    res.render("userLogin.twig");
  } catch (error) {
    res.send(error);
  }
});
userRouter.post('/', async (req, res) => {
  let user = await userController.login(req)
  if (user) {
    req.session.user = user._id
    res.redirect('/pokedex')
  } else {
    req.session.error = "vous n'etes pas connecté"
    res.redirect("/")
  }
})

//logout
userRouter.get('/logout', function(req, res) {
  req.session.destroy()
 res.redirect('/');
});

//pokedexView
userRouter.get("/pokedex",authGuard, async (req, res) => {
  let user = await UserModel.findOne({ _id: req.params.id }, req.body);
  let pokemon = await PokemonModel.find({ trainer: req.session.user});
  let userConnect = await UserModel.findOne({ _id: req.session.user });
  if (userConnect) {
    userConnect = userConnect.name;
  }
    res.render("pokedex.twig", {
      user: user,
      pokemon: pokemon,
      userConnect: userConnect,
    });
});
  



export default userRouter;
