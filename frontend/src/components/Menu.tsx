import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportData from "../interfaces/report.interface";
import { localAddress } from "../appconfig";

function Menu() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/")}>Home Page</button>
      <button onClick={() => (window.location.href = "/report")}>
        View Report
      </button>
    </div>
  );
}

export default Menu;
