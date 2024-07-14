import React, { useEffect, useState } from 'react';
import TimeSeriesGraph from '../widget/TimeSeriesGraph';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDailyRevenue, fetchWeeklyRevenue, fetchMonthlyRevenue } from '../../redux/invoiceSlice';
import '../../styles/InvoiceRevenue.css';

function InvoiceRevenue() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('daily');
  const { dailyRevenue, weeklyRevenue, monthlyRevenue } = useSelector((state) => state.invoices);
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  const currentData = filter === 'daily' ? dailyRevenue : filter === 'weekly' ? weeklyRevenue : monthlyRevenue;

  useEffect(() => {
    switch (filter) {
      case 'daily':
        dispatch(fetchDailyRevenue());
        break;
      case 'weekly':
        dispatch(fetchWeeklyRevenue());
        break;
      case 'monthly':
        dispatch(fetchMonthlyRevenue());
        break;
      default:
        break;
    }
  }, [dispatch, filter]);

  useEffect(() => {
    if (currentData) {
      let labels, dataValues;
      if (filter === 'daily') {
        labels = currentData.map(item => new Date(item.date).toLocaleDateString());
        dataValues = currentData.map(item => parseFloat(item.dailyrevenue));
      } else if (filter === 'weekly') {
        labels = currentData.map(item => `Week ${item.week} - Year ${item.year}`);
        dataValues = currentData.map(item => parseFloat(item.weeklyrevenue));
      } else if (filter === 'monthly') {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        labels = currentData.map(item => `${monthNames[item.month - 1]} - ${item.year}`);
        dataValues = currentData.map(item => parseFloat(item.monthlyrevenue));
      }
      setLabel(labels);
      setData(dataValues);
    }
  }, [currentData, filter]);

  return (
    <div className="InvoiceRevenue">
		<div className="InvoiceHeader">
			<h2>Revenue</h2>
      		<div>
        		<select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          			<option value="daily">Daily</option>
          			<option value="weekly">Weekly</option>
          			<option value="monthly">Monthly</option>
        		</select>
      		</div>
		</div>
		<div className='TimeSeriesGraph'>
			<TimeSeriesGraph
				label={label}
				data={data}
			/>
		</div>
    </div>
  );
}

export default InvoiceRevenue;
