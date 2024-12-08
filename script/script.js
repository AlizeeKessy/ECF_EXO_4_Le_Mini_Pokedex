// chargement des éléments DOM
document.addEventListener('DOMContentLoaded', () => {

  //Récupération des éléments HTML par leurs id.
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


    // Appel à l'API pour récupérer les infos de chaque pokemon correspondant à l'id depuis l'API.
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
      .then(response => response.json())
      .then(data => {
        // Extraction des données nécessaires
        const nameFR = data.names.find(n => n.language.name === "fr").name;
        //data.names : C'est une liste qui contient les noms du Pokémon dans plusieurs langues (anglais, français, etc.).
        //.find() : Cela cherche dans la liste le premier élément qui répond à une condition.
        // n.language.name === "fr" : Cela signifie "si la langue est française".
        //.name : Une fois trouvé, on récupère le nom du Pokémon.
        //Exemple : Si le Pokémon est Pikachu, alors nameFR sera "Pikachu".

        const capture = data.capture_rate;
        //data.capture_rate : Cette propriété donne directement le taux de capture du Pokémon.
        const family = data.genera.find(g => g.language.name === "fr").genus;
        //data.genera : C’est une liste qui contient la famille du Pokémon (par exemple, Pokémon Souris, Pokémon Dragon, etc.).
        ///.find() : Cela cherche dans la liste le premier élément qui répond à la condition.
        //g.language.name === "fr" : Cela signifie "si la langue est française".
        //.genus : Une fois trouvé, on récupère le nom de la famille.
        //Exemple : Pour Pikachu, family sera "Pokémon Souris"

        const description = data.flavor_text_entries.find(d => d.language.name === "fr").flavor_text;
        //data.flavor_text_entries : C’est une liste qui contient plusieurs descriptions du Pokémon dans différentes langues.
        //.find() : Cela cherche dans la liste le premier élément qui correspond à la condition.
        //d.language.name === "fr" : Cela signifie "si la langue est française".
        //.flavor_text : Une fois trouvé, on récupère la description du Pokémon.

        // Mise à jour du contenu HTML
        pokemonName.textContent = `#${pokemonId} ${nameFR}`;
        //pokemonName :C'est l'élément HTML où on veut afficher le nom du Pokémon (comme un <h2>).
        //.textContent : Cela remplace le texte existant dans l'élément HTML.
        //`#${pokemonId} ${nameFR}`:
        //# : Cela affiche un symbole “#” pour montrer l'ID du Pokémon.
        //${pokemonId} : C'est l'ID du Pokémon (un nombre, par exemple 25 pour Pikachu)
        //${nameFR} : C'est le nom du Pokémon en français.

        captureRate.textContent = `Taux de Capture : ${capture}%`;
        //captureRate : C'est l'élément HTML où on veut afficher le taux de capture (comme un <p>).
        //.textContent : Cela remplace le texte existant dans l'élément.
        //`Taux de Capture : ${capture}%`
        //${capture} : C'est la valeur du taux de capture (un nombre, par exemple 25 pour pikachu).
        //% : Ajoute le signe pour montrer que c’est un pourcentage.

        pokemonFamily.textContent = `Famille : ${family}`;
        //`Famille : ${family}` :
        //"Famille :" : Texte fixe pour expliquer ce qui est affiché.
        //${family} : C'est le nom de la famille du Pokémon en français
        //"Famille :" : Texte fixe pour expliquer ce qui est affiché.
        //${family} : C'est le nom de la famille du Pokémon en français (par exemple "Pokémon electique pour pikachu").

        pokemonDescription.textContent = description.replace(/[\n\f]/g, ' ');
        //pokemonDescription : C'est l'élément HTML où on veut afficher la description du Pokémon.
        //.textContent : Cela remplace le texte existant dans l'élément.
        //description.replace(/[\n\f]/g, ' ') :
        //description : C’est la description du Pokémon récupérée depuis l'API.
        //.replace() : Cela remplace un texte spécifique par un autre.
        ///[\n\f]/g : C'est une expression régulière qui signifie :
        // \n : Supprime les retours à la ligne.
        // \f : Supprime d'autres sauts de texte comme les sauts de page.
        //g : Cela remplace toutes les occurrences trouvées dans le texte.
        // ' ' : Remplace les sauts de ligne par des espaces

        // Recherche et mise à jour de l'image de chaque pokemon en fonction de son id.
        pokemonImage.src = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
        pokemonImage.alt = nameFR; //texte alternation qui affichera le nom du pokemon en français si jamais on ne trouvais pas son image dans la base de données

        // Bordure dynamique avec couleur aléatoire
        const colors = ["yellow", "red", "blue", "green", "orange"];//constante de type array avec un choix de couleur
        const randomColor = colors[Math.floor(Math.random() * colors.length)];//contante qui affichera une couleur de manière aléatoire
        pokemonContainer.style.borderColor = randomColor;//constante qui affichera un contour coloré en fonction du pokemon trouvé
      })
      ////Gestion des erreurs
      .catch(error => {
        alert("Une erreur s'est produite. Pokémon introuvable !");
        console.error(error);
      });
  });
});
