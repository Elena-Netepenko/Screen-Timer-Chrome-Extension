function stopVideo () {
    // alert('Loaded');
    const video = document.querySelector("#appMountPoint");
    videoParent = video.parentElement;
    video.parentNode.removeChild(video);
    const text = document.createElement('p');
    videoParent.appendChild(text);
    text.innerHTML = 'Your time is up!<br>Go back to your life!';
    text.style.color = 'white';
    text.style.fontSize = '100px';
    text.style.marginTop = '200px';
    text.style.textAlign = 'center';
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "event_happened") {
            console.log("Message received in content script!");
            stopVideo();
        }
    }
);