//create variable to take in timeOption from user in options menu
const timeOption = document.getElementById("time-option")
//add listener to user changing default time
timeOption.addEventListener("change", (event) => {
    //variable to store the value of the event target
    const val = event.target.value
    //only accepts values between 1-60
    if (val < 1 || val > 60) {
        timeOption.value = 1;
    }
})

//options button to save the new time limit
const saveBtn = document.getElementById("save-btn")
saveBtn.addEventListener("click", () => {
    //on click will access chrome storage and reset timer to zero and isRunning to false
    chrome.storage.local.set({
        timer: 0,
        timeOption: timeOption.value,
        isRunning: false,
    })
})

//getting value of timeOption local storage and set to 
chrome.storage.local.get(["timeOption"], (res) => {
    timeOption.value = res.timeOption;
})
