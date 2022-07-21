

/*

let btnModalDelete = document.querySelectorAll("#modalWindow")
let pokemonId = document.querySelectorAll("#supp")

for (let i = 0; i < btnModalDelete.length; i++) {
    btnModalDelete[i].style.display = "none"
}

function deletePokemon() {
    document.querySelector("#modalWindow").style.display = "flex"
}
function annulerPokemon() {
    document.querySelector("#modalWindow").style.display = "none"
}

*/

let modal = document.querySelectorAll(".modal")


for (let i = 0; i < modal.length; i++) {
    modal[i].style.display = "none"
}


function modalDelete(index) {
    let modal = document.querySelectorAll(".modal")[parseInt(index) - 1] 
    modal.style.display = "flex"
    let pokeId = modal.dataset.pokeid
    modal.querySelector('#linkDelete').href = `/deletePokemon/${pokeId}`
}

function modalBack(index) {
    let modal = document.querySelectorAll(".modal")[parseInt(index) - 1] 
    modal.style.display = "none"
}

