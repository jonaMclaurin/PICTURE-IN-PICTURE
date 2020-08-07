const videoElement = document.getElementById('video')
const button = document.getElementById('start-button')
const selectButton = document.getElementById('select-button')
const stopButton = document.getElementById('stop-button')

//Prompt to select a media stream, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }

        

    } catch (error) {
        //Catch errors
        console.log(error)
    }
}



function stopCapture(evt) {
    let tracks = videoElement.srcObject.getTracks();
  
    tracks.forEach(track => track.stop());
    videoElement.srcObject = null;
    selectButton.disabled = false
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    }
  }



button.addEventListener('click', async () => {
    //Disable Button
    button.disabled = true
    //Start picture in picture
    await videoElement.requestPictureInPicture()
    //Reset Button
    button.disabled = false

})


selectButton.addEventListener('click', async () => {
    selectButton.disabled = true
    await selectMediaStream()
    if(videoElement.srcObject === null ){
        selectButton.disabled = false
    }
})

stopButton.addEventListener('click', ()=>{
    stopCapture()
})

//On load 
