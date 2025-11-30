export const theme = {
    darkMode: 'class',   // <--- PHẢI CÓ
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    extend: {
        animation: {
            'gradient-flow': 'gradient-animation 3s ease infinite',
        },
        // Thêm kích thước background lớn hơn để animation có chỗ di chuyển
        backgroundSize: {
            '300%': '300% 300%',
        },
    },
};
export const plugins = [];