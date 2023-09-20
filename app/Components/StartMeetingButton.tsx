"use client"

import { useState,useRef } from "react";

const StartMeetingButton = () => {
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const constraints = {
    video: {
      width: {
        min: 1280,
        ideal: 1920,
        max: 2560,
      },
      height: {
        min: 720,
        ideal: 1080,
        max: 1440
      },
      facingMode: 'environment'
    }
  }
  async function handleClick() {
    try {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Let's get this party started");
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        console.log("stream", stream)
        setVideoStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        console.log("Browser doesnt support mediaDevices")
      }

    } catch (error) {
      console.error("Error accessing the camera:", error);

    }

  }
  return (
    <div>
      <button onClick={handleClick} className="bg-gray-500">Start meeting</button>
      <video ref={videoRef} autoPlay></video>

    </div>
  )
}

export default StartMeetingButton