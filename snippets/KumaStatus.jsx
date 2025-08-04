import { useEffect, useState } from "react";

export default function KumaStatus() {
  const [status, setStatus] = useState("Checking...");
  const [icon, setIcon] = useState("⏳");

  useEffect(() => {
    fetch("http://104.234.133.14/api/status-page/paythr")
      .then((res) => res.json())
      .then((data) => {
        const monitor = data.monitors.find(
          (m) => m.name === "CM.com - emails"
        );
        if (!monitor) {
          setStatus("Monitor not found");
          setIcon("⚠️");
          return;
        }

        if (monitor.status === 1) {
          setStatus("Online");
          setIcon("🟢");
        } else {
          setStatus("Offline");
          setIcon("🔴");
        }
      })
      .catch(() => {
        setStatus("Error fetching status");
        setIcon("⚠️");
      });
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "12px",
        display: "inline-block",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <strong>Website Status</strong>
      <div style={{ fontSize: "40px", margin: "10px 0" }}>{icon}</div>
      <div>{status}</div>
    </div>
  );
}
