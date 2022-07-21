import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: [true, "Pas de level"]
    },
    name: {
        type: String,
        required: [true, "pas de name"]
    },
    type: {
        type: String,
        required: [true, "pas de type"]
    },
    trainer: {
        type: String,
        required: [true, "pas de trainer"]
    },
    //multer - ajout de l'attribut img (***** image *****)
    img:{
        type:String,
        default: "pikachu.png"
    }
})

const PokemonModel = mongoose.model('pokemons', pokemonSchema)
export default PokemonModel