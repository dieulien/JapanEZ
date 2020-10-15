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
    intro: "The previous character has been filled out for you.",
    position: "left",
  },
  {
    element: ".main-area",
    intro: "Now try typing something incorrect such as 'j', you will see that the character is highlighted in red and you cannot type any further. You have to click the 'Try Again' button to proceed. You already know the answer is 'ma', try typing 'ma' instead. You should see the word card pop up because you have gone through the whole word. Click 'Next Word' to proceed!",
    position: "left",
  },
]

const WALKTHROUGH_PART_4 = [
  {
    intro: "That's it! Just a couple more things before we end this tour.",
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
    intro: `That's the end of the walkthrough. You have ${USER_TIME_LIMIT_IN_MINUTES} minutes to play with this webbapp. Have fun! Oh and one last thing: You can use spacebar instead of clicking on the blue button in the middle. Now have fun learning!`
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