import { USER_TIME_LIMIT_IN_MINUTES } from "../constants";

const listOfPraises = [
  "Great job!",
  "You're a pro!",
  "You're getting better!",
  "You're getting good at this!",
  "You're getting good!",
  "Well done!",
  "Nicely done!",
  "Good job!",
]

const listOfSoftPraises = [
  "Nice!",
  "Good!",
  "Awesome!",
  "Well done!",
  "Great!",
  "Good job!",
  "Correct!",
]

const listOfEncouragements = [
  "You got this!",
  "Let's try again.",
  "You can do this!",
  "Try again.",
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
    intro: "This is where you will type out the Japanese word.",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Try clicking on the blue button to learn the highlighted character",
    position: "left",
  },
];

const WALKTHROUGH_PART_2 = [
  {
    element: ".hint-card",
    intro: "A character card pops up! It shows the mnemonics for the highlighted character",
    position: "left",
  },
  {
    element: ".music-button",
    intro: "You can click this to play the audio",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Click the blue button again to move on",
    position: "left",
  },
];
const WALKTHROUGH_PART_3 =  [
  {
    element: ".inputbox-div",
    intro: "Notice that the character is automatically filled out for you.",
    position: "left",
  },
  {
    element: ".japanese-word",
    intro: "The next character is now highlighted. ",
    position: "left",
  },
  {
    element: ".main-area",
    intro: "Keep clicking the blue button. Once you've reached the end of the word, a word card will appear which tells you the meaning of the word. Click the blue button to proceed!",
    position: "left",
  },
]

const WALKTHROUGH_PART_4 = [
  {
    intro: "Now you know the general flow of the webapp. Just one last thing, instead of clicking the blue button, pressing the spacebar will work the same.",
    position: "left",
  },
  // {
  //   element: ".message-bar",
  //   intro: `I will be giving some feedback here as you use the app.`,
  //   position: "bottom,"
  // },
  // {
  //   element: ".message-control",
  //   intro: `If my feedback bugs you, feel free to disable me here. I won't feel hurt!`,
  //   position: "left",
  // },
  // {
  //   element: ".audio-control",
  //   intro: "You can also toggle this switch to enable/disable audio autoplay.",
  //   position: "left",
  // },
  // {
  //   element: ".nav-button-home",
  //   intro: "You are currently on the 'Home' tab.",
  //   position: "bottom",
  // },
  // {
  //   element: ".nav-button-progress",
  //   intro: "The 'Progress' tab shows how many times you have typed each Japanese character correctly.",
  //   position: "bottom",
  // },
  // {
  //   element: ".nav-button-katakanaChart",
  //   intro: "The 'Katakana' tab shows which Japanese character you have encoutered already.",
  //   position: "bottom",
  // },
  // {
  //   element: ".nav-button-walkthrough",
  //   intro: "At any point while using the app, you can click this tab to replay  this walkthrough",
  //   position: "bottom",
  // },
  {
    intro: `You have ${USER_TIME_LIMIT_IN_MINUTES} minutes to learn. Have fun!`
  }
];

export { 
  WALKTHROUGH_PART_1,
  WALKTHROUGH_PART_2,
  WALKTHROUGH_PART_3,
  WALKTHROUGH_PART_4,
  listOfPraises,
  listOfSoftPraises,
  listOfEncouragements,
};