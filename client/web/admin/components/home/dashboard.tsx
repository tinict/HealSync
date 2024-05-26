import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const DashBoard = () => {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);
    const userInfo = useSelector(state => state.auth.user);
    const [appointments, setAppointments] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: "Đặt lịch khám",
            data: [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
        },
        {
            label: "Tiền khám",
            data: [],
            fill: false,
            borderColor: "rgb(75, 102, 102)",
            tension: 0.1
        }]
    });

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/patient/all`)
            .then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            })
    };

    const getAppointmentsByHour = (appointments: any) => {
        const appointmentsByHour = [[], []]; 

        for (let i = 0; i < 24; i++) {
            appointmentsByHour[0].push([0, 0]);
            appointmentsByHour[1].push([0, 0]);
        }
    
        const currentDate = new Date(); 
        const currentDay = currentDate.getDate(); 
    
        appointments.forEach((appointment: any) => {
            const createdAt = new Date(appointment.createdAt);
            if (createdAt.getDate() === currentDay) {
                const createdHour = createdAt.getHours();
                appointmentsByHour[0][createdHour][0]++;
                appointmentsByHour[1][createdHour][1] += appointment.cost;
            }
        });
    
        return appointmentsByHour;
    };
    
    const getAppointmentsByDayOfMonth = (appointments: any) => {
        const appointmentsByDayOfMonth = [[], []]; 
    
        for (let i = 0; i < 12; i++) {
            appointmentsByDayOfMonth[0].push([0, 0]);
            appointmentsByDayOfMonth[1].push([0, 0]);
        }
    
        appointments.forEach((appointment: any) => {
            const createdAt = new Date(appointment.createdAt);
            const dayOfMonth = createdAt.getMonth(); 
            appointmentsByDayOfMonth[0][dayOfMonth][1] += 1;
            appointmentsByDayOfMonth[1][dayOfMonth][1] += appointment.cost;
        });
    
        return appointmentsByDayOfMonth;
    };
    

    useEffect(() => {
        fetchApiPatients();
        updateChartData("hour");
    }, []);

    const updateChartData = (interval) => {
        let labels = [];
        let data = [];
        switch (interval) {
            case "hour":
                labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
                data = getAppointmentsByHour(appointments);
                break;  
            case "month":
                labels = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
                data = getAppointmentsByDayOfMonth(appointments);
                break;
            default:
                break;
        }
        setChartData({
            labels: labels,
            datasets: [{
                ...chartData.datasets[0],
                data: data[0]
            },
            {
                ...chartData.datasets[1],
                data: data[1]
            }]
        });
    };

    useEffect(() => {
        if (chartRef.current && chartData.labels.length > 0) {
            const ctx = chartRef.current.getContext("2d");
            if (chart) {
                chart.destroy();
            }
            const newChart = new Chart(ctx, {
                type: "line",
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            setChart(newChart);
        }
    }, [chartData]);


    const handleIntervalChange = (interval) => {
        updateChartData(interval);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleIntervalChange("hour")}>Giờ</button>
                <button onClick={() => handleIntervalChange("month")}>Tháng</button>
            </div>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default DashBoard;
