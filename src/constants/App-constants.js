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
    intro: "This is where you can type out the Japanese word if you think you know it.",
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
    intro: "Once you're done perusing the card, click the blue button again to move on to the next character",
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
    intro: "The previous character has been filled out for you.",
    position: "left",
  },
  {
    element: ".main-area",
    intro: "Now try typing something incorrect in the textbox such as 'j', you will see that the character is highlighted in red and you cannot type any further. You have to click the blue button to try again. Keep clicking the blue button to learn the new character. Once you've reached the end of the word, a word card will popup which tells you the meaning of the word. Click the blue button to proceed!",
    position: "left",
  },
]

const WALKTHROUGH_PART_4 = [
  {
    intro: "And that's it! Now you know the general flow of the webapp. Just a couple more things before we end this tour.",
    position: "left",
  },
  {
    element: ".message-bar",
    intro: `I will be giving feedback here as you use the app.`,
    position: "bottom,"
  },
  {
    element: ".message-control",
    intro: `If my feedback bugs you, feel free to disable me here. I won't feel hurt!`,
    position: "left",
  },
  {
    element: ".audio-control",
    intro: "You can also toggle this switch to enable/disable audio autoplay.",
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
    element: ".nav-button-walkthrough",
    intro: "At any point while using the app, you can click this tab to replay  this walkthrough",
    position: "bottom",
  },
  {
    intro: `Congrats on reaching the end of the walkthrough! You have ${USER_TIME_LIMIT_IN_MINUTES} minutes to play with this webbapp. And one last thing: You can use spacebar instead of clicking on the blue button in the middle. Now have fun learning!`
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