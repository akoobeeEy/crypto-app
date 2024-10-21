import Navbar from "@/components/navbar/Navbar";
import useTelegramStore from "@/context/telegram";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "@/components/Loading/Loading";

const Layout = () => {
  const { tg } = useTelegramStore();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (tg) {
      tg.ready();
    }
  }, [tg]);

  useEffect(() => {
    if (progress === 100) {
      setLoading(false);
    }
  }, [progress]);

  if (loading) {
    return <Loading progress={progress} />;
  }

  return (
    <div className="bg-bodyColor h-screen flex flex-col">
      <div className="flex-grow px-[14px] overflow-y-auto scrollbar-none">
        <Outlet />
      </div>
      <div className="flex-shrink-0 bg-red-500">
        <Navbar />
      </div>
    </div>
  );
};

export default Layout;
