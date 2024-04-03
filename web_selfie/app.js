(() => {
  console.log("Hello from where we take pictures inside");
  let width = 320;
  let height = 0;

  let streaming = false;

  let video = null;
  let canvas = null;
  let photo = null;
  let startButton = null;

  function startup() {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    photo = document.getElementById("photo");
    startButton = document.getElementById("startbutton");

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
        video: true,
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((error) => {
        console.log(`An error occurred ${error}`);
      });

    video.addEventListener(
      "canplay",
      (ev) => {
        console.log("The video is about to play");
        if (!streaming) {
          height = (video.videoHeight / video.videoWidth) * width;

          video.setAttribute("height", height);
          video.setAttribute("width", width);
          canvas.setAttribute("height", height);
          canvas.setAttribute("width", width);
          streaming = true;
        }
      },
      false
    );

    startButton.addEventListener("click", (e) => {
      console.log("Taking a picture");
      takePicture();
      e.preventDefault();
    });

    clearPhoto();
  }

  function clearPhoto() {
    const context = canvas.getContext("2d");
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const data = canvas.toDataURL("image/png");
    photo.setAttribute("src", data);
  }

  function takePicture() {
    const context = canvas.getContext("2d");
    if(width && height){
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
      const data = canvas.toDataURL("image/png");
      photo.setAttribute("src", data);
    }

  }

  window.addEventListener('load', startup, false)
})();
