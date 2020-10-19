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
    intro: `Welcome to the walkthrough!
    Press the right arrow key to continue.`,
  },
  {
    element: ".main-area",
    intro: "Your challenge is to type out the pronunciation of the word.",
    position: "left",
  },
  // {
  //   element: ".japanese-word",
  //   intro: "This is a Japanese word. The current character is highlighted in blue.",
  //   position: "left",
  // },
  // {
  //   element: ".inputbox-div",
  //   intro: "This is where you can type out what you think word is. For example, you will type 'kisu' for 'キス'.",
  //   position: "left",
  // },
  {
    element: ".main-button",
    intro: "Click this button now to see the pronunciation of the highlighted character.",
    position: "left",
  },
  // {
  //   element: ".main-button",
  //   intro: "Try clicking on the blue button to learn the highlighted character",
  //   position: "left",
  // },
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
  // {
  //   element: ".main-area",
  //   intro: "Try typing something in the input box. If you're stuck, just keep clicking the blue button to learn each character. Once you've reached the end of the word, a word card will appear. Then you can click the 'Next Word' button to proceed.",
  //   position: "left",
  // },
  {
    element: ".main-area",
    intro: "Can you try to finish the rest? Keep clicking the button if you don't the character.",
    position: "left",
  },
]

const WALKTHROUGH_PART_4 = [
  {
    intro: "Now you know the general flow of the webapp. Just one last thing: You can press spacebar instead of clicking the blue button.",
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
  {
    element: ".nav-button-home",
    intro: "You are currently on the 'Home' tab.",
    position: "bottom",
  },
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
  {
    intro: `You have ${USER_TIME_LIMIT_IN_MINUTES} minutes to learn. Good luck!`
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