import AgoraRTC from "agora-rtc-sdk-ng";
let APP_ID = 'bbb36f0d966d4d1a9a9567da8b7281b5';


let peerConnection;
let localStream;
let remoteStream;

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  remoteUid: null,
};


let uid = String(Math.floor(Math.random() * 10000)); 
let userId1 = "975397efa8764a01ac2df7a71bbdc418";
let token = "007eJxSYEhxnOh/XeSRs/D0d7+fluv5rz/2bSJ7bE3RVZv/T0vqrrgrMCQlJRmbpRmkWJqZpZikGCZaJlqampmnJFokmRtZGCaZMrdJpjUEMjKs9TzIwMTACMYgPguUzE3MzFNgsDQ3NbY0T01LtDA3M0k0MExMNkpJM080N0xKSkk2MbQA6YLoI6wWEAAA//9NZDR3";
let client;

 let servers = {
  iceServers: [
    {
      urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"],
    },
  ],
};

let init = async () => {
  const agoraEngine = AgoraRTC.createClient({mode: "rtc", codec: "vp9"})
  await agoraEngine.join(APP_ID, "main", token, userId1)

  agoraEngine.on("user-joined", handlePeerJoined)
  
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const user1Video = document.getElementById("user-1");

  user1Video.srcObject = localStream;
};


let handlePeerJoined = async(memberId) => {
  console.log(`A new peer has joined this room ${memberId}`);
}
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
