let APP_ID = 'bbb36f0d966d4d1a9a9567da8b7281b5';


let peerConnection;
let localStream;
let remoteStream;

let uid = String(Math.floor(Math.random() * 10000)); 
let token = null;
let client;

let servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

let init = async () => {
  console.log(AgoraRTC);
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const user1Video = document.getElementById("user-1");

  user1Video.srcObject = localStream;
};

let createPeerConnection = async (sdpType) => {
  peerConnection = new RTCPeerConnection(servers);
  remoteStream = new MediaStream();

  const user2Video = document.getElementById("user-2");
  user2Video.srcObject = remoteStream;

  const localTracks = localStream.getTracks();
  localTracks.forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.ontrack = async (event) => {
    const remoteTracks = event.streams[0].getTracks();
    remoteTracks.forEach((track) => {
      remoteStream.addTrack(track);
    });
  };

  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      document.getElementById(sdpType).value = JSON.stringify(
        peerConnection.localDescription
      );
    }
  };
}

let createOffer = async () => {
  createPeerConnection("offer-sdp");
  let offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  document.getElementById("offer-sdp").value = JSON.stringify(offer);
};

let createAnswer = async () => {
  createPeerConnection('answer-sdp');
  let offer = document.getElementById("offer-sdp").value;
  if (!offer) {
    return alert("Retrieve offer from peer first");
  }

  offer = JSON.parse(offer);
  await peerConnection.setRemoteDescription(offer);

  let answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  document.getElementById("answer-sdp").value = JSON.stringify(answer);
};

let addAnswer = async () => {
  let answer = document.getElementById("answer-sdp").value;
  if (!answer) {
    return alert("Retrieve answer from peer first...");
  }

  answer = JSON.parse(answer);

  if (!peerConnection.currentRemoteDescription) {
    peerConnection.setRemoteDescription(answer);
  }
};

init();

document.getElementById("create-offer").addEventListener("click", createOffer);
document
  .getElementById("create-answer")
  .addEventListener("click", createAnswer);
document.getElementById("add-answer").addEventListener("click", addAnswer);
