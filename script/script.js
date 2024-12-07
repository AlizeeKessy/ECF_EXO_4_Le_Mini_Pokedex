// Récupération des éléments et chargement des éléments DOM
document.addEventListener('DOMContentLoaded', () => {
const searchButton = document.getElementById("searchButton");
const pokemonContainer = document.getElementById("pokemonContainer");
const pokemonName = document.getElementById("pokemonName");
const captureRate = document.getElementById("captureRate");
const pokemonFamily = document.getElementById("pokemonFamily");
const pokemonDescription = document.getElementById("pokemonDescription");
const pokemonImage = document.getElementById("pokemonImage");

// Écouteur d'événement sur le bouton
searchButton.addEventListener("click", () => {
    const pokemonId = document.getElementById("pokemonId").value;

    // Validation de l'ID
    if (pokemonId < 1 || pokemonId > 893) {
        alert("L'ID doit être compris entre 1 et 893.");
        return;
    }

    //Gestion des erreurs
    fetch('https://pokeapi.co/api/v2/pokemon-species/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Le Reseau ne repond pas' + response.statusText);
      }
      return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Il ya eu un problème pendant l'opération du Fetch"));
  

    // Appel à l'API pour récupérer les données
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
        .then(response => response.json())
        .then(data => {
            // Extraction des données nécessaires
            const nameFR = data.names.find(n => n.language.name === "fr").name;
            const capture = data.capture_rate;
            const family = data.genera.find(g => g.language.name === "fr").genus;
            const description = data.flavor_text_entries.find(d => d.language.name === "fr").flavor_text;

            // Mise à jour du contenu HTML
            pokemonName.textContent = `#${pokemonId} ${nameFR}`;
            captureRate.textContent = `Taux de Capture : ${capture}%`;
            pokemonFamily.textContent = `Famille : ${family}`;
            pokemonDescription.textContent = description.replace(/[\n\f]/g, ' ');

            // Mise à jour de l'image
            pokemonImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
            pokemonImage.alt = nameFR;

            // Bordure dynamique avec couleur aléatoire
            const colors = ["yellow", "red", "blue", "green", "orange"];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            pokemonContainer.style.borderColor = randomColor;
        })
        .catch(error => {
            alert("Une erreur s'est produite. Pokémon introuvable !");
            console.error(error);
        });
   });
});
