let bgmusic = new Audio("music.mp3");
let turnMusic = new Audio("ting.mp3");
let turn = "X";
let boxes = document.querySelectorAll(".box");
let countforDraw = 9;
let check = false;
// let linest = document.querySelector(".line");
let Rbutton = document.getElementById("reset");
let winAudio = new Audio("./ambient-metal-whoosh-2-174462.mp3");
Rbutton.addEventListener("click", resetbutt);

boxes.forEach((element) => {
  element.addEventListener("click", () => {
    let boxtext = element.querySelector(".boxtext");

    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      countforDraw--;
      Checkwin();
      if (!check) {
        changeTurn();
        draw();
      }
      turnMusic.play();
    }
  });
});

// check winning condition
function Checkwin() {
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    let val1 = boxes[e[0]].innerText;
    let val2 = boxes[e[1]].innerText;
    let val3 = boxes[e[2]].innerText;

    if (val1 !== "" && val2 !== "" && val3 !== "") {
      if (val1 === val2 && val2 === val3) {
        check = true;
        document.querySelector(".info").innerText = `${turn} is winner`;
        console.log(turn, "is winner");
        document.getElementsByTagName("img")[0].style.width = "200px";
        // bgmusic.play();
        document.querySelector(".line").style.width = "20vw";
        // document.querySelector(".line").style.height = "o.5vh";
        
        document.querySelector(
          ".line"
        ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        setTimeout(()=>{
            winAudio.play();
        },300)
        setTimeout(() => {
          bgmusic.play();
        },900);
        boxes.forEach((box) => (box.style.pointerEvents = "none"));
      }
    }
  });
}

// changing turn
const changeTurn = () => {
  let infoturn = document.querySelector(".info");
  turn = turn === "X" ? "O" : "X";
  infoturn.innerText = `${turn}'s turn`;
  if(turn === "O")infoturn.style.color = "red"
  else{
    infoturn.style.color = "#3498db";
  }
};

// check for draw

function draw() {
  if (countforDraw === 0 && !check) {
    document.querySelector(".info").innerText = `ITS A draw`;
  }
}

function resetbutt() {
  check = false;
  document.querySelector(".info").style.color = "#3498db";
  turn = "X";
  countforDraw = 9;
  bgmusic.currentTime = 0;
  bgmusic.pause();
  document.getElementsByTagName("img")[0].style.width = "0px";
  document.querySelector(".line").style.width = "0vw";

  boxes.forEach((e) => {
    e.querySelector(".boxtext").innerText = "";
    e.style.pointerEvents = "auto";
  });

  document.querySelector(".info").innerText = `${turn}'s turn`;

}
