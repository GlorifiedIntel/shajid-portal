"use client";
import { useState } from "react";
import styles from "./AdmissionDashboard.module.css";

export default function AdmissionDashboard() {
  // Sample applicants data (replace with API call)
  const [applications, setApplications] = useState([
    {
      id: "APP001",
      fullName: "John Doe",
      phone: "08012345678",
      program: "Nursing",
      results: {
        Mathematics: "C6",
        English: "B3",
        Chemistry: "C5",
        Physics: "C4",
        Biology: "B2",
      },
      status: "pending",
    },
    {
      id: "APP002",
      fullName: "Mary Jane",
      phone: "08087654321",
      program: "Midwifery",
      results: {
        Mathematics: "C6",
        English: "C5",
        Chemistry: "D7",
        Physics: "C4",
        Biology: "C6",
      },
      status: "pending",
    },
    {
      id: "APP003",
      fullName: "Ahmed Musa",
      phone: "08123456789",
      program: "Nursing",
      results: {
        Mathematics: "B3",
        English: "C6",
        Chemistry: "C5",
        Physics: "B2",
        Biology: "C6",
      },
      status: "pending",
    },
  ]);

  const [query, setQuery] = useState("");

  // Handlers for admit/reject
  const handleAdmit = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "admitted" } : app
      )
    );
  };

  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.fullName.toLowerCase().includes(query.toLowerCase()) ||
      app.phone.includes(query) ||
      app.id.toLowerCase().includes(query.toLowerCase())
  );

  const totalApplications = applications.length;
  const nursingCount = applications.filter((a) => a.program === "Nursing").length;
  const midwiferyCount = applications.filter((a) => a.program === "Midwifery").length;

  // Helper: status badge class
  const getStatusClass = (status) => {
    if (status === "admitted") return styles.statusAdmitted;
    if (status === "rejected") return styles.statusRejected;
    return styles.statusPending;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admission Office Dashboard</h1>

      {/* Statistics */}
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

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by Form No, Phone, or Name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Applications Table */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Form No</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Program</th>
            <th>WASSCE/NECO Results</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.fullName}</td>
                <td>{app.phone}</td>
                <td>{app.program}</td>
                <td>
                  <ul className={styles.resultsList}>
                    {Object.entries(app.results).map(([subject, grade]) => (
                      <li
                        key={subject}
                        className={
                          ["A1", "B2", "B3", "C4", "C5", "C6"].includes(grade)
                            ? styles.pass
                            : styles.fail
                        }
                      >
                        {subject}: {grade}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    className={styles.admitBtn}
                    onClick={() => handleAdmit(app.id)}
                    disabled={app.status === "admitted" || app.status === "rejected"}
                  >
                    Admit
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => handleReject(app.id)}
                    disabled={app.status === "rejected" || app.status === "admitted"}
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