/* eslint-disable no-undef */
const video = document.getElementById("video")

const loadFaceAPI = async () => {
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models')
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models')
    await faceapi.nets.faceExpressionNet.loadFromUri('./models')
}

function getCameraStream(){
    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream=> {
            video.srcObject = stream;
        })
}
}

video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);

    const displaySize = {
            width: video.videoWidth,
            height: video.videoHeight,
        }

    setInterval(async()=>{
        const detects =  await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()) // quét 1 người
        // const detects =  await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) // quét nhiều người
                            .withFaceLandmarks()
                            .withFaceDescriptor();   
                            
        if(detects){
            const descriptor = Array.from(detects.descriptor); // mang 128 so, Chuyển Float32Array sang mảng thường để gửi JSON
            console.log("mang 128 so", descriptor);
            await fetch("http://localhost:4000/api/upload/faceapi",{
                method:"POST",
                headers:{ 'Content-Type': "application/json" },
                body: JSON.stringify({
                    name: "Đinh Nguyễn",
                    descriptor: descriptor
                })
            })
            alert("Đã lưu thông tin khuôn mặt!");
            // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptorsFromDB, 0.6)
            // const bestMatch = faceMatcher.findBestMatch(descriptor)
            // if(bestMatch.label !== 'unknown'){
            //     console.log("Xac thuc thanh cong chao ban", bestMatch.label);
                
            // }
        }
        const resizeDetects = faceapi.resizeResults(detects, displaySize)
        canvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
        faceapi.draw.drawDetections(canvas, resizeDetects)
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetects)
        // faceapi.draw.drawFaceDescriptor(canvas, resizeDetects)
    },300)
})
loadFaceAPI().then(getCameraStream)
