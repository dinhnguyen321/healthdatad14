import { useEffect, useRef, useState } from "react";

export const UseWebcam = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [isCameraOn, setIsCameraOn] = useState(false)

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: "user" }
            })
            streamRef.current = stream;
            videoRef.current.srcObject = stream;
            setIsCameraOn(true)
        } catch (error) {
            console.error("Can't open camera", error);
        }
    }

    const stopCamera = async () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null
        setIsCameraOn(false)
    }

    const captureImage = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        
        return new Promise((resolve)=>{
            canvas.toBlob(
                (blob)=> {
                    resolve(blob)
                },
                "image/jpeg",
                0.9
            )
        })
    }
    useEffect(()=>{
        return () => stopCamera();
    },[])

    return{
        videoRef,
        canvasRef,
        isCameraOn,
        startCamera,
        stopCamera,
        captureImage,
    }
};