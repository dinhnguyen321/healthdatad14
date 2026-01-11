/* eslint-disable no-undef */
const video = document.getElementById("video")
// let faceMatcher = null;
let videoStream = null;
const btnCam = document.getElementById('btn-cam');
const btnRegister = document.getElementById('btn-register');
const status = document.getElementById('status');

// 1. Hàm Bật/Tắt Camera
async function toggleCam() {
    if (videoStream) {
        // Tắt cam
        videoStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        videoStream = null;
        status.innerText = "Trạng thái: Đã tắt Camera";
    } else {
        // Bật cam
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: {} });
            video.srcObject = videoStream;
            status.innerText = "Trạng thái: Camera đang chạy";
        } catch (err) {
            alert("Không thể mở camera: " + err);
        }
    }
}

// 2. Hàm Đăng ký (Có kiểm tra trùng lặp)
async function registerFace() {
    const name = document.getElementById('username').value;
    // const status = document.getElementById('status');
    if (!name) return alert("Vui lòng nhập tên!");
    if (!videoStream) return alert("Vui lòng bật camera trước!");

    status.innerText = "Đang quét khuôn mặt...";

    // Quét khuôn mặt hiện tại
    const detect = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

        if (!detect) {
        return alert("Không tìm thấy khuôn mặt, vui lòng nhìn thẳng vào cam!");
    }
    const currentDescriptor = detect.descriptor;

    // --- BƯỚC KIỂM TRA TRÙNG LẶP ---
    // Lấy dữ liệu từ server về để so sánh xem mặt này đã có ai đăng ký chưa
    const response = await fetch('http://localhost:4000/api/upload/faceapi');
    const usersData = await response.json();
    console.log("response",response);
    
    if (usersData.length > 0) {
        const labeledDescriptors = usersData.map(u => new faceapi.LabeledFaceDescriptors(u.name, [new Float32Array(u.faceData)]));
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(currentDescriptor);

        if (bestMatch.label !== 'unknown') {
            return alert(`Khuôn mặt này đã được đăng ký dưới tên: ${bestMatch.label}`);
        }
    }

    // --- NẾU CHƯA CÓ THÌ MỚI PUSH LÊN SERVER ---
    try {
        const res = await fetch('http://localhost:4000/api/upload/faceapi', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                faceData: Array.from(currentDescriptor) // Chuyển sang mảng thường để lưu JSON
            })
        });
        const result = await res.json();
        alert(result.message);
        status.innerText = "Đăng ký thành công!";
    } catch (err) {
        alert("Lỗi server: " + err);
    }
}

// Gán sự kiện cho nút
btnCam.addEventListener('click', toggleCam);
btnRegister.addEventListener('click', registerFace);
// load models
const loadFaceAPI = async () => {
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models')
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models')
    await faceapi.nets.faceExpressionNet.loadFromUri('./models')
    console.log("Models Loaded!");
}

// lấy dữ liệu từ server và tạo hàm faceMatcher

// async function loadServerData(){
//     const response = await fetch('http://localhost:4000/api/upload/faceapi');
//     const users = await response.json()
//     console.log("users response", response);
//     if (users.length > 0) {
//         const labeledDescriptors = users.map(user => {
//             const desc = new Float32Array(user.faceData); // Chuyển mảng thường từ JSON thành Float32Array
//             return new faceapi.LabeledFaceDescriptors(user.name, [desc]);
//         });
//         // Khởi tạo FaceMatcher với độ sai số cho phép là 0.6
//         faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
//         console.log("Database Loaded!");
//     }
// }

// function starVideo(){
//     if(navigator.mediaDevices.getUserMedia){
//         navigator.mediaDevices.getUserMedia({ video: {} })
//         .then(stream=> {
//             video.srcObject = stream;
//         })
//         .catch(err => console.error(err))
// }
// }

// video.addEventListener('playing', () => {
//     const canvas = faceapi.createCanvasFromMedia(video);
//     document.body.append(canvas);

//     const displaySize = {
//             width: video.videoWidth,
//             height: video.videoHeight,
//         }

//     setInterval(async()=>{
//         const detection =  await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()) // quét 1 người
//         // const detects =  await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) // quét nhiều người
//                             .withFaceLandmarks()
//                             .withFaceDescriptor();
                            
//         if(detection 
//             // && faceMatcher
//         ){
//             // So sánh khuôn mặt vừa quét với Database
//             const descriptor = Array.from(detection.descriptor); // mang 128 so, Chuyển Float32Array sang mảng thường để gửi JSON
//             console.log("descriptor",descriptor);
            
//             const bestMatch = faceMatcher.findBestMatch(descriptor)
//             console.log(`Tìm thấy: ${bestMatch.label} (Độ lệch: ${bestMatch.distance})`);

//             if (bestMatch.label !== 'unknown') {
//                 // Xử lý khi nhận diện đúng người (ví dụ: mở cửa, log info...)
//                 document.getElementById('status').innerText = `Chào ${bestMatch.label}!`;
//             } else {
//                 document.getElementById('status').innerText = "Người lạ!";
//             }
//             // await fetch("http://localhost:4000/api/upload/faceapi",{
//             //     method:"POST",
//             //     headers:{ 'Content-Type': "application/json" },
//             //     body: JSON.stringify({
//             //         name: "Đinh Nguyễn",
//             //         descriptor: descriptor
//             //     })
//             // })
//             // alert("Đã lưu thông tin khuôn mặt!");
//         }
//         const resizeDetects = faceapi.resizeResults(detection, displaySize)
//         canvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
//         faceapi.draw.drawFaceLandmarks(canvas, resizeDetects)
//         faceapi.draw.drawDetections(canvas, resizeDetects)
//     },300)
// })


    const init = async () => {
    try {
        await loadFaceAPI();
        console.log("Models loaded!");
        // await loadServerData();
        // starVideo();
    } catch (error) {
        console.error("Lỗi khởi tạo:", error);
    }
};
init()