
//create backhorund alarm to run called screenTme
chrome.alarms.create("screenTime", {
    periodInMinutes: 1 / 60,
})

//listener to run alarm in background
chrome.alarms.onAlarm.addListener((alarm) => {
    //if alarm is screen time access local storage
    if (alarm.name === "screenTime") {
        //look in local storage for "timer", "isRunnig", "timeOption"
        chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
            //if timer is running
            if (res.isRunning) {
                //increment timer and keep timer running be setting to true
                let timer = res.timer + 1
                let isRunning = true
                //timer is equal to set time limit from options

                //if timer equal res.timeOption * 60
                if (timer === 60 * res.timeOption) {
                    //send notification to user that screen time is up
                    console.log("Inside timer notification logic")
                    

                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                                var activeTab = tabs[0];
                                // console.log(activeTab);
                                // console.log(activeTab.id);
                                // chrome.tabs.sendMessage(activeTab.id, {"message": "event_happened"});
                                if (activeTab.status === 'complete') {
                                    setTimeout(function() {
                                        console.log(activeTab.id);
                                        chrome.tabs.sendMessage(activeTab.id, {"message": "event_happened"});
                                    }, 1000);  // This will introduce a 1-second delay
                                }
                            }
                        );

                    //unused notifcation settings
                    // this.registration.showNotification("Screen Timer", {
                    //     body: `${res.timeOption} minutes has passed. Your screen time is up!`,
                    //     icon: "hourglass.png",
                    // })
                    //once notification sent reset timer to 0 and isRunning to false
                    timer = 0
                    isRunning = false
                }
                chrome.storage.local.set({
                    timer,
                    isRunning,
                })
            }
        })
    }
})

//set initial values for local storage variables "timer", "isRunning", "timeOption"
chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
    //set default value
    chrome.storage.local.set({
        //set default value of timer to 0
        timer: "timer" in res ? res.timer : 0,
        //set default value of timeOption to 1
        timeOption: "timeOption" in res ? res.timeOption : 1,
        //set default of isRunning value to false
        isRunning: "isRunning" in res ? res.isRunning : false,
    })
})

