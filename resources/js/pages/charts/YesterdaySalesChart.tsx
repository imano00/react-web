import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function YesterdaySalesChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/sales/yesterday')
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched chart data:', data);
                setChartData(data);
            })
            .catch((err) => console.error('API error:', err));
    }, []);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h2 className="mb-3 text-xl font-bold">Yesterday's Sales (Hourly)</h2>

            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
