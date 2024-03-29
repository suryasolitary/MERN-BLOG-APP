import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import DashboardSlidebar from "../Components/DashboardSlidebar";
import DashboardProfile from "../Components/DashboardProfile";

export default function Dashboard() {
  const [tab, settab] = useState(null);
  ``;
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const taburls = urlParams.get("tab");
    if (taburls) {
      settab(taburls);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <div className="md:w-56">
        <DashboardSlidebar />
      </div>
      {tab === "profile" && <DashboardProfile />}
    </div>
  );
}
