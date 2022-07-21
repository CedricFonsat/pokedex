import PokemonModel from "../models/pokemonModel.js";

export class pokemonController {
  static async setPokemon(req, res) {
    req.body.trainer = req.session.user;
    //multer (***** image *****)
    req.body.img = req.file.filename;
    //multer (***** image *****)
    const newPokemon = new PokemonModel(req.body);
    await newPokemon.save();
    res.redirect("/pokedex");
    console.log("c'est carré le poke-mouille");
  }
}

export default pokemonController;
