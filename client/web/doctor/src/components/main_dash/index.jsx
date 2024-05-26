import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Grid, Typography, Button, Paper } from '@mui/material';

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
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
        }]
    });

    const fetchApiPatients = () => {
        axios.get(`http://localhost:5002/api/v1/patients/${userInfo.user.identity_id}`)
            .then((res) => {
                console.log(res.data);
                setAppointments(res.data);
            })
    };

    const getAppointmentsByHour = (appointments) => {
        const appointmentsByHour = [[], []]; 

        for (let i = 0; i < 24; i++) {
            appointmentsByHour[0].push([0, 0]);
            appointmentsByHour[1].push([0, 0]);
        }
    
        const currentDate = new Date(); 
        const currentDay = currentDate.getDate(); 
    
        appointments.forEach(appointment => {
            const createdAt = new Date(appointment.createdAt);
            if (createdAt.getDate() === currentDay) {
                const createdHour = createdAt.getHours();
                appointmentsByHour[0][createdHour][1]++;
                appointmentsByHour[1][createdHour][1] += appointment.cost;
            }
        });
    
        return appointmentsByHour;
    };
    
    const getAppointmentsByDayOfMonth = (appointments) => {
        const appointmentsByDayOfMonth = [[], []]; 
    
        for (let i = 0; i < 12; i++) {
            appointmentsByDayOfMonth[0].push([0, 0]);
            appointmentsByDayOfMonth[1].push([0, 0]);
        }
    
        appointments.forEach(appointment => {
            const createdAt = new Date(appointment.createdAt);
            const dayOfMonth = createdAt.getMonth(); 
            appointmentsByDayOfMonth[0][dayOfMonth][1]++;
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
                data: data[0].map(item => item[1])
            },
            {
                ...chartData.datasets[1],
                data: data[1].map(item => item[1])
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
        <div style={{ padding: '20px', width: '100%'}}>
            <Typography variant="h4" gutterBottom>
                Thống kê
            </Typography>
            <Grid container spacing={1} justifyContent="left">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handleIntervalChange("hour")}>
                        Giờ
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={() => handleIntervalChange("month")}>
                        Tháng
                    </Button>
                </Grid>
            </Grid>
            <canvas ref={chartRef} style={{ marginTop: '20px', width: '100%', height: '450px' }}></canvas>
        </div>
    );
};

export default DashBoard;
