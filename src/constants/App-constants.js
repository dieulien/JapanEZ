import { USER_TIME_LIMIT_IN_MINUTES } from "../constants";

const listOfPraises = [
  "Great job!",
  "You're a pro!",
  "You're getting better!",
  "You're getting good at this!",
  "You're getting good",
  "Well done!",
  "Nicely done!",
  "Good job!",
]

const WALKTHROUGH_PART_1 = [
  {
    intro: `Welcome to the walkthrough! Click 'Next' to continue.`,
  },
  {
    element: ".japanese-word",
    intro: "This is a Japanese word. The current character is highlighted in blue.",
    position: "left",
  },
  {
    element: ".inputbox-div",
    intro: "This is where you will type out the japanese word if you already know it. For the purpose of this walkthrough, let's assume that you don't know the highlighted character.",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Try clicking on this button to learn the highlighted character",
    position: "left",
  },
];
const WALKTHROUGH_PART_2 = [
  {
    element: ".hint-card",
    intro: "A character card pop ups! It shows the mnemonics for the highlighted character",
    position: "left",
  },
  {
    element: ".music-button",
    intro: "Click this to play the audio",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Once you're done perusing the card, click this button again to move on to the next character in the word",
    position: "left",
  },
];
const WALKTHROUGH_PART_3 =  [
  {
    element: ".japanese-word",
    intro: "Notice that the next character is now highlighted in blue. ",
    position: "left",
  },
  {
    element: ".inputbox-div",
    intro: "The previous character has been filled out for you. You can continue to type the next character without space if you know it. Otherwise, keep learning by clicking the \"Learn Character\" button",
    position: "left",
  },
  {
    element: ".audio-control",
    intro: "You can toggle this switch to enable/disable audio autoplay.",
    position: "left",
  },
  {
    element: ".nav-button-home",
    intro: "You are currently on the 'Home' tab.",
    position: "bottom",
  },
  {
    element: ".nav-button-progress",
    intro: "The 'Progress' tab shows how many times you have typed each Japanese character correctly.",
    position: "bottom",
  },
  {
    element: ".nav-button-katakanaChart",
    intro: "The 'Katakana' tab shows which Japanese character you have encoutered already.",
    position: "bottom",
  },
  {
    element: ".message-bar",
    intro: `I will be giving some occasional feedback here.`,
  },
  {
    intro: `That's the end of the walkthrough. You have ${USER_TIME_LIMIT_IN_MINUTES} minutes to play with this webbapp. Have fun!`
  }
];

export { 
  WALKTHROUGH_PART_1,
  WALKTHROUGH_PART_2,
  WALKTHROUGH_PART_3,
  listOfPraises,
};