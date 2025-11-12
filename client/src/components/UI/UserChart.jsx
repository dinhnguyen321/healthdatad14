import React,{useState,useEffect} from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart() {
    const [data, setData] = useState({})
    const [options, setOptions] = useState({})
    useEffect(()=>{
        const chartData = {
            labels: ["Nam", "Nữ","Khác"],
            datasets: [
              {
                label: "Người dùng",
                data: [100,10,50],
                backgroundColor: ["#3b82f6", "#facc15", "#ef4444"],
                borderWidth: 2,
              },
            ],
          };
          setData(chartData)
          const chartOptions = {
            cutout: "50%", // 👈 tạo lỗ ở giữa (đổi 0 → pie)
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          };
          setOptions(chartOptions)
    },[])
  return (
        <div className="">
          {
            data?.datasets?.length ? (
              <Doughnut width={200} height={100} data={data} options={options}/>
            ):
            (
              <p className="text-gray-400 text-center">Đang Tải Dữ Liệu</p>
            )
          }
       
        </div>
  );
}
