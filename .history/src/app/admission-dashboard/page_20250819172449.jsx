"use client";
import { useState } from "react";
import styles from "./admissionDashboard.module.css";

export default function AdmissionDashboard() {
  // --- Sample data for 3 applications ---
  const [applications, setApplications] = useState([
    {
      id: 1,
      formNumber: "APP-001",
      fullName: "Grace Johnson",
      phone: "08012345678",
      program: "Nursing",
      status: "pending",
      credits: ["Math", "English", "Chemistry", "Physics", "Biology"],
    },
    {
      id: 2,
      formNumber: "APP-002",
      fullName: "Emeka Okafor",
      phone: "08098765432",
      program: "Midwifery",
      status: "admitted",
      credits: ["Math", "English", "Chemistry", "Physics", "Biology"],
    },
    {
      id: 3,
      formNumber: "APP-003",
      fullName: "Aisha Bello",
      phone: "08122223333",
      program: "Nursing",
      status: "rejected",
      credits: ["Math", "English", "Chemistry", "Physics", "Biology"],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");

  // --- Handle admit/reject ---
  const updateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // --- Filter & Search Logic ---
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.formNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;

    const matchesProgram =
      programFilter === "all" || app.program === programFilter;

    return matchesSearch && matchesStatus && matchesProgram;
  });

  // --- Stats ---
  const totalApplications = applications.length;
  const nursingCount = applications.filter((a) => a.program === "Nursing").length;
  const midwiferyCount = applications.filter((a) => a.program === "Midwifery").length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admission Office Dashboard</h1>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statBox}>Total Applications: {totalApplications}</div>
        <div className={styles.statBox}>Nursing: {nursingCount}</div>
        <div className={styles.statBox}>Midwifery: {midwiferyCount}</div>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name, phone, or form number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchBar}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.dropdown}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="admitted">Admitted</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className={styles.dropdown}
        >
          <option value="all">All Programs</option>
          <option value="Nursing">Nursing</option>
          <option value="Midwifery">Midwifery</option>
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
            <th>Credits</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id}>
              <td>{app.formNumber}</td>
              <td>{app.fullName}</td>
              <td>{app.phone}</td>
              <td>{app.program}</td>
              <td>{app.credits.join(", ")}</td>
              <td>
                <span
                  className={`${styles.badge} ${
                    app.status === "admitted"
                      ? styles.green
                      : app.status === "rejected"
                      ? styles.red
                      : styles.gray
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => updateStatus(app.id, "admitted")}
                  className={styles.admitBtn}
                >
                  Admit
                </button>
                <button
                  onClick={() => updateStatus(app.id, "rejected")}
                  className={styles.rejectBtn}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {filteredApplications.length === 0 && (
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
