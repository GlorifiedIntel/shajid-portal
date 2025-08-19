"use client";
import { useState, useEffect } from "react";
import styles from "./MyProgram.module.css";

export default function MyProgram() {
  const [selectedProgram, setSelectedProgram] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  // ✅ Student admission & registration data from API
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student data on mount
  useEffect(() => {
    async function fetchStudentData() {
      try {
        const res = await fetch("/api/student"); // 🔹 Replace with your real API endpoint
        if (!res.ok) throw new Error("Failed to fetch student data");
        const data = await res.json();
        setStudent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudentData();
  }, []);

  // ✅ Nursing Programs
  const nursingPrograms = [
    { id: "Nursing-1", title: "Basic Nursing", details: "Fundamental training focusing on patient care.", duration: "3 years", cost: "₦450,000 per session" },
    { id: "Nursing-2", title: "Post Basic Nursing", details: "Advanced program after completing Basic Nursing.", duration: "2 years", cost: "₦520,000 per session" },
    { id: "Nursing-3", title: "Public Nursing", details: "Focuses on community health and preventive care.", duration: "2 years", cost: "₦480,000 per session" },
    { id: "Nursing-4", title: "Mental Health Nursing", details: "Specialized training for psychiatric and mental health care.", duration: "2 years", cost: "₦500,000 per session" },
  ];

  // ✅ Midwifery Programs
  const midwiferyPrograms = [
    { id: "Midwifery-1", title: "Basic Midwifery", details: "Covers essential skills for safe childbirth and maternal care.", duration: "3 years", cost: "₦400,000 per session" },
    { id: "Midwifery-2", title: "Post Basic Midwifery", details: "Advanced midwifery program for specialized practice.", duration: "2 years", cost: "₦450,000 per session" },
    { id: "Midwifery-3", title: "Community Midwifery", details: "Focuses on maternal and neonatal care at the community level.", duration: "2 years", cost: "₦420,000 per session" },
  ];

  const toggleDetails = (program) => {
    setExpandedCard(expandedCard === program.id ? null : program.id);
  };

  const renderCards = (programs) => (
    <div className={styles.cardGrid}>
      {programs.map((program) => {
        const isEnrolled =
          student &&
          program.id === student.admittedProgram &&
          student.registered;

        return (
          <div key={program.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{program.title}</h3>
            <button
              onClick={() => toggleDetails(program)}
              className={styles.detailsButton}
            >
              {expandedCard === program.id ? "Hide Details" : "View Details"}
              <span
                className={`${styles.chevron} ${
                  expandedCard === program.id ? styles.rotate : ""
                }`}
              ></span>
            </button>

            <div
              className={`${styles.detailsBox} ${
                expandedCard === program.id ? styles.show : ""
              }`}
            >
              <p className={styles.cardDesc}>{program.details}</p>
              <p><strong>Duration:</strong> {program.duration}</p>
              <p><strong>Cost:</strong> {program.cost}</p>

              {isEnrolled && (
                <p className={styles.enrolled}>Status: Enrolled</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading) return <p className={styles.loading}>Loading student data...</p>;
  if (!student) return <p className={styles.error}>Could not load student info.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Program</h2>
      <div className={styles.underline}></div>

      <p className={styles.subtitle}>
        Manage your education options and the accreditations you plan to complete.
      </p>

      <div className={styles.selectBox}>
        <label className={styles.label}>Program Details</label>
        <select
          className={styles.dropdown}
          onChange={(e) => {
            setSelectedProgram(e.target.value);
            setExpandedCard(null);
          }}
        >
          <option value="">Choose Action</option>
          <option value="Nursing">Nursing</option>
          <option value="Midwifery">Midwifery</option>
        </select>
      </div>

      {selectedProgram === "Nursing" && renderCards(nursingPrograms)}
      {selectedProgram === "Midwifery" && renderCards(midwiferyPrograms)}
    </div>
  );
}