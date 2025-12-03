import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function MonthlySalesChart() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/monthly-sales')
            .then((res) => res.json())
            .then((data) => {
                console.log('Monthly Data:', data);
                setChartData(data);
            })
            .catch((err) => console.error('API error:', err));
    }, []);

    return (
        <div className="rounded-xl p-4 shadow-md" style={{ height: 420 }}>
            <h2 className="mb-3 text-xl font-bold">Monthly Sales (Daily Total)</h2>

            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottom', dy: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={3} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
