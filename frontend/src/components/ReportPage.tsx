import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportData from "../interfaces/report.interface";

function ReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const { data } = await axios.get("http://localhost:5000/api/report");
      setReport(data);
    };

    fetchReport();
  }, []);

  return (
    <div>
      {report && (
        <table>
          <thead>
            <tr>
              <th>Total Users</th>
              <th>Scrolled Users</th>
              <th>Scrolled Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{report.totalUsers}</td>
              <td>{report.scrolledUsers}</td>
              <td>{report.scrolledPercentage.toFixed(2)}%</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ReportPage;
