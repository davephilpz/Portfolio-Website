let exerciseMenu = [
  "2x pistol squats per leg",
  "10 deep squats",
  "30 jumping jacks",
  "10 scapula pushups",
  "10 grips each hand",
];
let newEx = [];

function exerciseAlert() {
  let randomExercise =
    exerciseMenu[Math.floor(Math.random() * exerciseMenu.length)];
  console.log(randomExercise);
  newEx.push(randomExercise);
  console.log(newEx);
}
exerciseAlert(...exerciseMenu);
