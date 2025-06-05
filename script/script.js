class Pokemon {
    constructor(name, id, image, types, evolution, preEvolution, stats) {
        this.name = name
        this.id = id
        this.image = image
        this.types = types
        this.evolution = evolution
        this.preEvolution = preEvolution
        this.stats = stats
    }
}

// Appelle une fonction spécifique en fonction de la page actuelle
document.addEventListener("DOMContentLoaded", function() {
  const currentURL = window.location.pathname

  if (currentURL === "/detail.html") {
    getPokemonById(getCurrentPokemon(), "detail")
  } else {
    if (currentURL === "/liste.html" ) {
      displayPokemonList() //à changer si on arrive à faire un système de pagination, ou de pouvoir changer le nb de pokémons affichés depuis un <input>
    } else {
      // Si on a d'autres pages spécifiques, mais le mieux serait de faire un fichier .js par page
    }

  }
})

// Récupère l'id du pokémon via l'URL
function getCurrentPokemon() {
  return  Number(document.URL.split("id=")[1])
}

const fetchAPI = async () => {
  const res = await fetch("https://pokebuildapi.fr/api/v1/pokemon", { method: "GET" });
  const pokemons = await res.json();
  return pokemons
}

function classCreator(data) {
  let stats = []
      for (let key in data.stats) {
        stats[key] = data.stats[key]    
      }

      let types = []
      for (let key in data.apiTypes) {
        types[key] = data.apiTypes[key]
      }

      if (data.apiEvolutions.length >= 1) {
        evolution = data.apiEvolutions[0].name
        
      } else {
        evolution = null
      }

      if (data.apiPreEvolution.name) {
        preEvolution = data.apiPreEvolution.name
      } else {
        preEvolution = null
      }
 
      const pokemon = new Pokemon(data.name, data.id, data.image, types, evolution, preEvolution, stats)
      return pokemon
}

const displayPokemonList = async (limit) => {

  let pokemons = await fetchAPI()
  
  pokemons.forEach(data => {
    if (data.id <= limit || !limit) {
      let pokemon = classCreator(data)
      cardBase(pokemon)
    }
  })
}


const getPokemonById = async (id, card) => {

  let pokemons = await fetchAPI()
  data = pokemons.find(value => value.id === id)
  let pokemon = classCreator(data)
  if (!card || card === "base") {
    cardBase(pokemon)
  } else {
    if (card === "detail") {
      cardDetail(pokemon)
    }
  }
  
}


const getPokemonByName = async (name, card) => {

  let pokemons = await fetchAPI()
  data = pokemons.find(value => value.name === name)
  let pokemon = classCreator(data)
  if (!card || card === "base") {
    cardBase(pokemon)
  } else {
    if (card === "detail") {
      cardDetail(pokemon)
    }
  }
}


//Card qui affiche les infos rapides d'un pokémon
function cardBase(pokemon) {
  
  // Div principale de la card, élément parent
  let mainContainer = document.createElement("div")
  mainContainer.id = "pokemonDisplay"
  document.getElementById("pokeList").appendChild(mainContainer)

          // div du header, élément parent
          let headerContainer = document.createElement("div")
          headerContainer.id = "headerContainer"
          mainContainer.appendChild(headerContainer)

                //div qui contient le nom + id, à l'intérieur de la div du header
                let identityContainer = document.createElement("div")
                identityContainer.id = "pokemonDisplayIdentity"
                identityContainer.addEventListener("click", function() {
                  window.location.href = "./detail.html?id=" + pokemon.id
                })
                headerContainer.appendChild(identityContainer)

                    //nom du pokémon
                    let nameContent = document.createElement("div")
                    nameContent.id = "pokemonDisplayName"
                    nameContent.textContent = pokemon.name
                    identityContainer.appendChild(nameContent)

                    //id du pokémon
                    let idContent = document.createElement("div")
                    idContent.id = "pokemonDisplayId"
                    idContent.textContent = "(" + pokemon.id + ")"
                    identityContainer.appendChild(idContent)
                    
        //div qui contient l'image
        let imageContainer = document.createElement("div")
        imageContainer.id = "pokemonDisplayImage"
        imageContainer.addEventListener("click", function() {
          window.location.href = "./detail.html?id=" + pokemon.id
        })
        mainContainer.appendChild(imageContainer)

          // image
            let imageContent = document.createElement("div")
            imageContent.id = "pokemonImage"
            let image = document.createElement("img")
            image.src = String(pokemon.image)
            imageContent.appendChild(image)
            imageContainer.appendChild(imageContent)
}


// Card détaillée
function cardDetail(pokemon) {
  let mainDiv = document.createElement("div")
      mainDiv.id = "mainDiv"
      document.body.appendChild(mainDiv)

      //élément parent
      let mainContainer = document.createElement("div")
      mainContainer.id = "pokemonDisplayDetail"
      mainDiv.appendChild(mainContainer)

          // div du header
          let headerContainer = document.createElement("div")
          headerContainer.id = "headerContainerDetail"
          mainContainer.appendChild(headerContainer)

                //div qui contient le nom + id, à l'intérieur de la div du header
                let identityContainer = document.createElement("div")
                identityContainer.id = "pokemonDisplayIdentityDetail"
                headerContainer.appendChild(identityContainer)

                    //nom du pokémon
                    let nameContent = document.createElement("div")
                    nameContent.id = "pokemonDisplayNameDetail"
                    nameContent.textContent = pokemon.name
                    identityContainer.appendChild(nameContent)

                    //id du pokémon
                    let idContent = document.createElement("div")
                    idContent.id = "pokemonDisplayIdDetail"
                    idContent.textContent = "(" + pokemon.id + ")"
                    identityContainer.appendChild(idContent)

                    let allTypes = document.createElement("div")
                    allTypes.id = "allTypesDetail"
                    identityContainer.appendChild(allTypes)
                 
                    pokemon.types.forEach(type => {
                      let typeContent = document.createElement("div")
                      typeContent.id = "typeContainerDetail"
                      let typeImage = document.createElement("img")
                      typeImage.src = String(type.image)
                      typeContent.appendChild(typeImage)
                      allTypes.appendChild(typeContent)
                    })

        //div qui contient l'image
        let imageContainer = document.querySelector(".filtre")
      

          // image
          let imageContent = document.createElement("div")
          imageContent.id = "pokemonImageDetail"
          let image = document.createElement("img")
          image.src = String(pokemon.image)
          imageContent.appendChild(image)
          imageContainer.appendChild(imageContent)
        
        let statsContainer = document.createElement("div")
        statsContainer.id = "statsContainerDetail"
        mainContainer.appendChild(statsContainer)

      for (let key in pokemon.stats) {
        let stat = document.createElement("div")
        stat.id = "stat" + key
        stat.textContent = key + " : " + pokemon.stats[key]
        statsContainer.appendChild(stat)
      }
      
      //div qui contient les infos de l'évolution (footer)    
        let infoEvolutionContainer = document.createElement("div")
        infoEvolutionContainer.id = "pokemonInfoEvolutionDetail"
        mainContainer.appendChild(infoEvolutionContainer)

        if (pokemon.preEvolution !== null) {
          let preEvolutionContainer = document.createElement("div")
          preEvolutionContainer.id = "pokemonDisplayPreEvolutionDetail"
          preEvolutionContainer.textContent = "Évolution de " + pokemon.preEvolution
          infoEvolutionContainer.appendChild(preEvolutionContainer)
        }  
                 
          if (pokemon.evolution !== null) {
            let evolutionContainer = document.createElement("div")
            evolutionContainer.id = "pokemonDisplayEvolutionDetail"
            evolutionContainer.textContent = "Évolue en " + pokemon.evolution
            infoEvolutionContainer.appendChild(evolutionContainer) 
          }
  
}
