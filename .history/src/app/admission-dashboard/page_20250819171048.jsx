"use client";
import { useState, useEffect } from "react";
import styles from "./AdmissionDashboard.module.css";

export default function AdmissionDashboard() {
  const [applications, setApplications] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch applicants from API
  useEffect(() => {
    const fetchApplicants = async () => {
      const res = await fetch("/api/applicants");
      const data = await res.json();
      setApplications(data);
    };
    fetchApplicants();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/applicants/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const { applicant } = await res.json();

      // Update local state so UI refreshes
      setApplications((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: applicant.status } : a))
      );
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(query.toLowerCase()) ||
      app.phone.includes(query) ||
      app._id.toLowerCase().includes(query.toLowerCase())
  );

  const totalApplications = applications.length;
  const nursingCount = applications.filter((a) => a.program === "Nursing").length;
  const midwiferyCount = applications.filter((a) => a.program === "Midwifery").length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admission Office Dashboard</h1>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <h2>{totalApplications}</h2>
          <p>Total Applications</p>
        </div>
        <div className={styles.statBox}>
          <h2>{nursingCount}</h2>
          <p>Nursing</p>
        </div>
        <div className={styles.statBox}>
          <h2>{midwiferyCount}</h2>
          <p>Midwifery</p>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by Form No, Phone, or Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Applications */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Form No</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Program</th>
            <th>Results</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>{app.fullName}</td>
                <td>{app.phone}</td>
                <td>{app.program}</td>
                <td>
                  <ul className={styles.resultsList}>
                    {Object.entries(app.results).map(([subject, grade]) => (
                      <li
                        key={subject}
                        className={
                          ["A1","B2","B3","C4","C5","C6"].includes(grade)
                            ? styles.pass
                            : styles.fail
                        }
                      >
                        {subject}: {grade}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{app.status}</td>
                <td>
                  <button
                    className={styles.admitBtn}
                    onClick={() => handleStatusChange(app._id, "admitted")}
                  >
                    Admit
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleStatusChange(app._id, "rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className={styles.noResults}>
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}