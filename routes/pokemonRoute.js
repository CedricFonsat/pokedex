import { Router } from "express";
import PokemonModel from "../models/pokemonModel.js";
import UserModel from "../models/userModel.js";
import authGuard from "../authGuard.js";
import pokemonController from "../controller/pokemonController.js";
import multer from "multer";

const pokemonRouter = Router();


// debut multer (***** image *****)
//image
const storage = multer.diskStorage({
  // destination pour le fichier
  destination:function(req,file,callback){
    callback(null,'./assets/uploads/images' )
  },
  //ajouter le retour de l'extension
  filename:function (req,file,callback) {
    callback(null,Date.now() + file.originalname)//date d'aujourd'hui concaténé au nom de l'image
  },
})

//upload parametre pour multer
const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
})

// fin multer (***** image *****)





//ajouter pokemon
pokemonRouter.get("/addPokemon",authGuard, async (req, res) => {
    let userConnect = await UserModel.findOne({ _id: req.session.user });
    if (userConnect) {
      userConnect = userConnect.name;
    }
    try {
      await PokemonModel.findOne({ _id: req.params.id }, req.body);
      res.render("addPokemon.twig", {
        userConnect: userConnect,
      });
    } catch (error) {
      res.send(error);
    }
  });
  //multer -  ajouter "upload.single('image')" (***** image *****)
  pokemonRouter.post("/addPokemon",upload.single('image'), async (req, res) => {
    try {
     await pokemonController.setPokemon(req,res)
    } catch (error) {
      console.log(error);
    }
  });
  //delete
  pokemonRouter.get("/deletePokemon/:id",authGuard, async (req, res) => {
  try {
    await PokemonModel.deleteOne({ _id: req.params.id });
    res.redirect("/pokedex");
  } catch (error) {
    res.send(error);
  }
});
//update
pokemonRouter.get("/updatePokemon/:id",authGuard, async (req, res) => {
  try {
    let pokemon = await PokemonModel.findOne({ _id: req.params.id }, req.body);
    let userConnect = await UserModel.findOne({ _id: req.session.user });
    if (userConnect) {
      userConnect = userConnect.name;
    }
    res.render("updatePokemon.twig", {
      userConnect: userConnect,
      pokemon: pokemon,
    });
  } catch (error) {
    res.send(error);
  }
});

pokemonRouter.post("/updatePokemon/:id", async (req, res) => {
  try {
    await PokemonModel.updateOne({ _id: req.params.id }, req.body);
    res.redirect("/pokedex");
  } catch (error) {
    res.send(error);
  }
});

export default pokemonRouter




