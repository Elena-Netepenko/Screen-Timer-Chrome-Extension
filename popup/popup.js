function updateTime() {
    chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
        const time = document.getElementById("time")
        const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
        let seconds = "00"
        if (res.timer % 60 != 0) {
            seconds = `${60 - res.timer % 60}`.padStart(2, "0")
        }
        time.textContent = `${minutes}:${seconds}`
        startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer"
    })
}

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