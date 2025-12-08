/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",   // <--- PHẢI CÓ
    content: [
      "./index.html",
      "./src/**/*.{html,js,ts,jsx,tsx}",
    ],
    theme:{
        extend: {
            animation: {
                'gradient-flow': 'gradient-animation 3s ease infinite',
            },
            // Thêm kích thước background lớn hơn để animation có chỗ di chuyển
            backgroundSize: {
                '300%': '300% 300%',
            },
        }
    },
    plugins:[]
};