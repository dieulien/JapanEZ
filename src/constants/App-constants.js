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
    element: ".main-area",
    intro: "Your challenge is to type out the pronunciation of the word.",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Click this button now to see the pronunciation of the highlighted character.",
    position: "left",
  },
];

const WALKTHROUGH_PART_2 = [
  {
    element: ".hint-card",
    intro: "A character card pops up!",
    position: "left",
  },
  {
    element: ".music-button",
    intro: "You can click this to play the audio",
    position: "left",
  },
  {
    element: ".main-button",
    intro: "Click this button again to move on",
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
    intro: "Can you try to finish the rest? Keep clicking the button if you don't the character.",
    position: "left",
  },
]

const WALKTHROUGH_PART_4 = [
  {
    intro: "Now you know the general flow of the webapp. Just one last thing: You can press spacebar instead of clicking the button.",
    position: "left",
  },
  {
    element: ".nav-button-home",
    intro: "You are currently on the 'Home' tab.",
    position: "bottom",
  },
  {
    element: ".nav-button-chart",
    intro: "Check your progress with these two tabs.",
    position: "bottom",
  },
  {
    element: ".nav-button-walkthrough",
    intro: "Click this tab to replay this walkthrough",
    position: "bottom",
  },
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