import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ReportData from "../interfaces/report.interface";
import { localAddress } from "../appconfig";

const Table = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background-color: #f4f4f4;
`;

const HeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  font-weight: bold;
`;

const BodyRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const BodyCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
`;

function ReportPage() {
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const { data } = await axios.get(`${localAddress}/api/report`);
      setReport(data);
    };

    fetchReport();
  }, []);

  return (
    <div>
      {report && (
        <Table>
          <thead>
            <HeaderRow>
              <HeaderCell>Total Users</HeaderCell>
              <HeaderCell>Scrolled Users</HeaderCell>
              <HeaderCell>Scrolled Percentage</HeaderCell>
            </HeaderRow>
          </thead>
          <tbody>
            <BodyRow>
              <BodyCell>{report.totalUsers}</BodyCell>
              <BodyCell>{report.scrolledUsers}</BodyCell>
              <BodyCell>{report.scrolledPercentage.toFixed(2)}%</BodyCell>
            </BodyRow>
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ReportPage;
