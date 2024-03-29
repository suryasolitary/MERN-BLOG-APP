import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowCircleRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardSlidebar() {
  const location = useLocation();
  const [tab, settab] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const taburls = urlParams.get("tab");
    if (taburls) {
      settab(taburls);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item
            active={tab == "profile"}
            icon={HiUser}
            label="User"
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
        </Link>
        <Sidebar.Item icon={HiArrowCircleRight}>Sign Out</Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar>
  );
}
