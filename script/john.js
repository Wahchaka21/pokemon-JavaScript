document.addEventListener("DOMContentLoaded", main);

function main() {
  const textes = [
    "Hello futur dresseur/dresseuse, je me présente, je suis le grand professeur John.",
    "Tu te trouves actuellement dans la liste du pokédex.",
    "Ici, tu pourras apercevoir des 'cards' de pokémon.",
    "En cliquant sur l'une d'elle, tu pourras accéder aux caractéristiques de celui-ci.",
    "Pour une navigation plus rapide, tu peux saisir le nom ou l'ID du pokémon que tu souhaite dans la barre de recherche.",
    "Tout bon dresseur connaît ces créatures sur le bout des doigts.",
    "Aujourd'hui, c'est ton tour de devenir l'un d'eux, alors..",
    "Fonce ! Et prouve au monde entier que tu peux devenir l'un des plus grands !"
  ];

  const agacement = [
    "(.. huh?? ..)",
    "(Mais.. pourquoi il n'a toujours pas cliqué sur une card, fais chier ça va être l'heure de la pause..)",
    "Haha.. je t'ai déjà tout dit, n'oublie pas, 'clique' sur l'une des cards pour accéder aux détails.",
    "Pourquoi tu continues de me cliquer dessus ? Je ne suis pas un Pokémon ! D'ailleurs, si tu croises mon Pikachu fais le moi savoir.",
    "Arrête de me cliquer dessus !",
    "Dernier avertissement !"
  ];

  const cible = document.getElementById("texte-bulle");
  const john = document.getElementById("john");
  const bulle = document.querySelector(".bulle-dialogue")
  const labs = document.querySelector(".labs");


  let currentIndex = 0;
  let isTyping = false;
  let postDialogClickCount = 0;
  const maxPostDialogClicks = agacement.length;
  let agacementIndex = 0;



  function machineAEcrire(texte, callback) {
    let i = 0;
    isTyping = true;
    cible.textContent = "";

    function ecrireLettre() {
      if (i < texte.length) {
        cible.textContent += texte.charAt(i);
        i++;
        setTimeout(ecrireLettre, 35);
      } else {
        isTyping = false;
        if (callback) callback();
      }
    }
    ecrireLettre();
  }



  function afficherDialogueSuivant() {
    if (currentIndex < textes.length - 1) {
      currentIndex++;
      machineAEcrire(textes[currentIndex]);
    } else {
      gererAgacement();
    }
  }



  function gererAgacement() {
    if (postDialogClickCount > maxPostDialogClicks) return;

    if (postDialogClickCount <= 1) {
      john.src = "img/2profJohnSurcilLeved.png"
    } else if (postDialogClickCount === 2) {
      john.src = "img/1profJohnBase.png"
    } else if (postDialogClickCount === 3) {
      john.src = "img/3profJohnSus.png"
    } else if (postDialogClickCount === 4) {
      john.src = "img/4profJohnVener.png"
    } else if (postDialogClickCount === 5) {
      john.src = "img/5profJohnVenerBras.png"
    } else if (postDialogClickCount === 6) {
      john.src = "img/6profJohnVenerBrasPoing.png"
    }
     
    if (postDialogClickCount === maxPostDialogClicks) {
      john.src = "img/7profJohnVenerBrasPoingDent.png"
      machineAEcrire("Bon, ça suffit, démerde-toi ! Je me casse !", () => {
        faireFuirJohn(() => {
          machineAEcrire("Professeur John a fuis la conversation...", cacherBulle);
        });
      });
    } else {
      const message = agacement[agacementIndex];
      agacementIndex++;
      if(agacement >= agacement.length) {
        agacementIndex = 0;
      }
      machineAEcrire(message);
    }
    postDialogClickCount++;
  }



  function faireFuirJohn(callback) {
    john.classList.add("fuite");
    setTimeout(() => {
      john.src = "";
      callback(); 
    }, 2000);
  }



  function cacherBulle() {
    setTimeout(() => {
    bulle.style.setProperty("opacity", "0");
    labs.src = "/img/raw.png"

    }, 1500)
  }



  function gererClicSurJohn() {
    if (isTyping) return;
    afficherDialogueSuivant();
  }



  john.addEventListener("click", gererClicSurJohn);
  machineAEcrire(textes[currentIndex]);
}
