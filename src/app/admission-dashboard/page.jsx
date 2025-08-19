"use client";

import { useEffect, useState } from "react";
import styles from "./AdmissionDashboard.module.css";

export default function AdmissionDashboard() {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch applications from backend
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch("/api/applications");
        const data = await res.json();
        setApplications(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
      }
    };
    fetchApps();
  }, []);

  // Filtering logic
  useEffect(() => {
    let results = applications;

    // Search filter
    if (search.trim()) {
      const term = search.toLowerCase();
      results = results.filter(
        (a) =>
          a.fullName.toLowerCase().includes(term) ||
          a.phone.toLowerCase().includes(term) ||
          a.formNumber.toLowerCase().includes(term)
      );
    }

    // Program filter
    if (programFilter !== "all") {
      results = results.filter((a) => a.program === programFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      results = results.filter((a) => a.status === statusFilter);
    }

    setFiltered(results);
  }, [search, programFilter, statusFilter, applications]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) =>
            a._id === id ? { ...a, status: newStatus } : a
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const total = applications.length;
  const admitted = applications.filter((a) => a.status === "admitted").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const pending = applications.filter((a) => a.status === "pending").length;

  const getBadgeClass = (status) => {
    if (status === "admitted") return styles.badgeGreen;
    if (status === "rejected") return styles.badgeRed;
    return styles.badgeGray;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admission Office Dashboard</h1>

      {/* Summary Stats */}
      <div className={styles.summary}>
        <span>Total Applications: {total}</span>
        <span className={styles.badgeGreen}>Admitted: {admitted}</span>
        <span className={styles.badgeRed}>Rejected: {rejected}</span>
        <span className={styles.badgeGray}>Pending: {pending}</span>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by Name, Phone, or Form No."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Programs</option>
          <option value="Nursing">Nursing</option>
          <option value="Midwifery">Midwifery</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="admitted">Admitted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Form No.</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Core Credits</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((app) => (
            <tr key={app._id}>
              <td>{app.formNumber}</td>
              <td>{app.fullName}</td>
              <td>{app.phone}</td>
              <td>{app.program}</td>
              <td>
                {app.credits.join(", ")} {/* Example: [Math, Eng, Bio...] */}
              </td>
              <td>
                <span className={`${styles.badge} ${getBadgeClass(app.status)}`}>
                  {app.status}
                </span>
              </td>
              <td>
                <button
                  className={styles.admitBtn}
                  onClick={() => updateStatus(app._id, "admitted")}
                  disabled={app.status === "admitted"}
                >
                  Admit
                </button>
                <button
                  className={styles.rejectBtn}
                  onClick={() => updateStatus(app._id, "rejected")}
                  disabled={app.status === "rejected"}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className={styles.noData}>No applications found.</p>
      )}
    </div>
  );
}