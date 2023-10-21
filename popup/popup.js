
//function to update time display
function updateTime() {
    //access chrome local chrome storage 
    chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
        //take time html element and set equa to time
        const time = document.getElementById("time")
        //take user input time option and subtract the time that has accumlated on the timer variable
        //this will show the minutes remaining
        const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
         let seconds = "00"
         //continue to update if timer doesn't equal zero
        if (res.timer % 60 != 0) {
            seconds = `${60 - res.timer % 60}`.padStart(2, "0")
        }
        //display updated time content
        time.textContent = `${minutes}:${seconds}`
        //change's display of timer based on pause/start
        startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer"
    })
}

//run update to timer every 1 second
updateTime()
setInterval(updateTime, 1000)

//button to start timer linked to html popup element
const startTimerBtn = document.getElementById("start-timer-btn")

//event listener to start button
startTimerBtn.addEventListener("click", () => {
    //get isRunning from local storage
    chrome.storage.local.get(["isRunning"], (res) => {
        //set isRunning to be the opposite of current
        chrome.storage.local.set({
            //By setting this to the opposite of current status it can either start or pause timer
            isRunning: !res.isRunning,
        }, () => {
            //change button display based on whether pausing or starting button
            startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
        })
    })
})

//button to reset timer
const resetTimerBtn = document.getElementById("reset-timer-btn")
//event listener to start button
resetTimerBtn.addEventListener("click", () => {
    //set timer to be zero and isRunning to false on reset
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    }, () => {
        //reset start/pause button to display start
        startTimerBtn.textContent = "Start Timer"
    })
})