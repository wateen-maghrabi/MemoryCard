const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
const sound1 = document.getElementById('sound1');
const sound2 = document.getElementById('sound2');

var playerName = sessionStorage.getItem("playerName");
var gameLevel = sessionStorage.getItem("gameLevel");

var welcomeMessage = document.getElementById("welcome-message");
welcomeMessage.innerHTML = "Welcome, " + playerName + "</br> level: " + gameLevel ;

// احصل على قيمة اسم اللاعب ومستوى اللعبة

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      setTimeout(() => {
        return shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
    // تشغيل الصوت الأول
    sound1.play();
    showMessage1("You're a genius! You've \n overcome the challenge and won!");
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
      // تشغيل الصوت الثاني
      sound2.play();
      
      // عرض الرسالة
      showMessage("Complaining will \n not get anything done !");
      
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [];
// sessionStorage
  const gameLevel = sessionStorage.getItem('gameLevel');

  if (gameLevel === 'easy') {
    arr = [1, 1, 2, 2, 3, 3];
  } else if (gameLevel === 'medium') {
    arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  } else if (gameLevel === 'hard') {
    arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  }

  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let backImgTag = card.querySelector(".back-view img");
    backImgTag.src = `images/img-${arr[i]}.png`;

    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

startGame('easy');

function repeat() {
  window.location.reload();
  getNameScore["score"] = 0;
  sessionStorage.setItem("result", JSON.stringify(getNameScore));
}

// دالة عرض الرسالة
function showMessage(message) {
  var messageElement = document.getElementById("message");
  messageElement.innerText = message;
  messageElement.style.display = "block";

  // إخفاء الرسالة بعد فترة زمنية معينة
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 2000);
}

function showMessage1(message) {
  var messageElement = document.getElementById("message1");
  messageElement.innerText = message;
  messageElement.style.display = "block";

  // إخفاء الرسالة بعد فترة زمنية معينة
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 2000);
}



