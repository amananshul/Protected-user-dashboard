import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getDashboardData } from '../services/apiService';

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState('');
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData(token);
        setDashboardData(data?.data);
      } catch (error:any) {
        setError(error.message);
      }
    };

    if (token !== null) {
      fetchData();
    }
  }, [token]);

  return (
    <div className="container">
         <h2 className="dashboard-heading">Dashboard</h2>
      <div className="dashboard-container">
        {dashboardData ? (
          dashboardData.map((item: any) => (
            <div key={item.id} className="dashboard-item" style={{ backgroundColor: item.color }}>
              <p className="dashboard-item-content">Name: {item.name}</p>
              <p className="dashboard-item-content">Year: {item.year}</p>
              <p className="dashboard-item-content">Pantone Value: {item.pantone_value}</p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DashboardPage;
