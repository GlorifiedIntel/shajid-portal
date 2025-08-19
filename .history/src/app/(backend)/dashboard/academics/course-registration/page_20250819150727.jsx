"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "react-qr-code";
import styles from "./CourseRegistration.module.css";

export default function CourseRegistrationPage() {
  const [student, setStudent] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showReview, setShowReview] = useState(false);
  const [openSemester, setOpenSemester] = useState(null);

  // ✅ Fetch logged-in student info
  useEffect(() => {
    fetch("/api/student")
      .then((res) => res.json())
      .then((data) => {
        const currentYear = new Date().getFullYear();
        const admissionYear = data.admissionYear;
        const level = Math.min(3, currentYear - admissionYear + 1);
        setStudent({ ...data, level });
      });
  }, []);

  // ✅ Course data (First–Third Year with credits)
  const courses = {
    "First Year": {
      "First Semester": [
        { code: "BIO 101", title: "Anatomy and Physiology", credits: 3 },
        { code: "PPN 101", title: "Foundation of Nursing", credits: 3 },
        { code: "HBP 101", title: "Hospital Based Clinical Practices", credits: 2 },
        { code: "PHA 101", title: "Pharmacology", credits: 2 },
        { code: "ENG 101", title: "Use of English", credits: 2 },
        { code: "ACH 101", title: "Applied Chemistry", credits: 2 },
        { code: "PHY 101", title: "Applied Physics", credits: 2 },
        { code: "SOC 101", title: "Sociology", credits: 2 },
        { code: "NUT 101", title: "Nutrition", credits: 2 },
        { code: "ICT 101", title: "Introduction to ICT", credits: 2 },
        { code: "PHIL 101", title: "Philosophy", credits: 2 },
        { code: "MOE 101", title: "Moral Ethics", credits: 2 },
      ],
      "Second Semester": [
        { code: "BIO 102", title: "Anatomy & Physiology II", credits: 3 },
        { code: "PPN 102", title: "Foundation of Nursing II", credits: 3 },
        { code: "ENG 102", title: "Introduction to Writing", credits: 2 },
        { code: "CPB 102", title: "Community Based Practice", credits: 2 },
        { code: "PHC 102", title: "Primary Health Care I", credits: 2 },
        { code: "MSN 102", title: "Medical-Surgical Nursing I", credits: 3 },
        { code: "MIC 102", title: "Microbiology", credits: 2 },
        { code: "PHA 102", title: "Pharmacology I", credits: 2 },
        { code: "PSY 102", title: "Psychology", credits: 2 },
        { code: "HBP 102", title: "Hospital Based Clinical Practice I", credits: 2 },
      ],
    },
    "Second Year": {
      "First Semester": [
        { code: "BIO 201", title: "Anatomy & Physiology III", credits: 3 },
        { code: "PPN 201", title: "Foundation of Nursing III", credits: 3 },
        { code: "PHC 201", title: "Primary Health Care II", credits: 2 },
        { code: "MSN 201", title: "Medical-Surgical Nursing II", credits: 3 },
        { code: "PHA 201", title: "Pharmacology II", credits: 2 },
        { code: "SMT 201", title: "Biostatistics", credits: 2 },
        { code: "RES 201", title: "Research Methodology I", credits: 2 },
        { code: "RHN 201", title: "Reproductive Health I", credits: 2 },
        { code: "HBP 201", title: "Hospital Based Clinical Practice II", credits: 2 },
        { code: "CBP 201", title: "Community Based Clinical Practice II", credits: 2 },
        { code: "NUT 201", title: "Nutrition & Dietetics", credits: 2 },
        { code: "MHN 201", title: "Mental Health/Psychiatric Nursing", credits: 2 },
      ],
      "Second Semester": [
        { code: "BIO 202", title: "Anatomy & Physiology IV", credits: 3 },
        { code: "PPN 202", title: "Foundation of Nursing IV", credits: 3 },
        { code: "CHN 202", title: "Community Health Nursing I", credits: 2 },
        { code: "MSN 202", title: "Medical-Surgical Nursing III", credits: 3 },
        { code: "PHA 202", title: "Pharmacology III", credits: 2 },
        { code: "NUT 202", title: "Nutrition & Dietetics", credits: 2 },
        { code: "RSM 202", title: "Research Methodology II", credits: 2 },
        { code: "RHN 202", title: "Reproductive Health II", credits: 2 },
        { code: "HBP 202", title: "Hospital Based Clinical Practice II", credits: 2 },
        { code: "MES/SOS 202", title: "Introduction to Medical Sociology", credits: 2 },
        { code: "SEM 202", title: "Introduction to Seminar Presentation", credits: 1 },
        { code: "WTP 202", title: "Writing of Term Papers/Report Writing", credits: 1 },
        { code: "MGT 202", title: "Management", credits: 2 },
      ],
    },
    "Third Year": {
      "First Semester": [
        { code: "CHN 301", title: "Community Health Nursing II", credits: 2 },
        { code: "MSN 301", title: "Medical-Surgical Nursing IV", credits: 3 },
        { code: "MHPN 301", title: "Mental Health/Psychiatric Nursing", credits: 2 },
        { code: "PMT 301", title: "Principles of Management & Teaching", credits: 2 },
        { code: "NUT 301", title: "Emergency & Disaster Nursing", credits: 2 },
        { code: "RSP 301", title: "Research/Project", credits: 3 },
        { code: "RHN 301", title: "Reproductive Health III", credits: 2 },
        { code: "HBP 301", title: "Hospital Based Clinical Practice IV", credits: 2 },
        { code: "CBP 301", title: "Community Based Practice II", credits: 2 },
        { code: "SEN 301", title: "Seminar in Nursing", credits: 1 },
        { code: "GNS 320", title: "Health Economics", credits: 2 },
        { code: "GNT 321", title: "Entrepreneurship", credits: 2 },
      ],
      "Second Semester": [
        { code: "MSN 302", title: "Medical-Surgical Nursing V", credits: 3 },
        { code: "RHN 302", title: "Reproductive Health", credits: 2 },
        { code: "RSP 302", title: "Research Project", credits: 3 },
        { code: "GNS 302", title: "Health Economics", credits: 2 },
        { code: "GNT 302", title: "Entrepreneurship", credits: 2 },
        { code: "HBP 302", title: "Hospital Based Clinic", credits: 2 },
      ],
    },
  };

  // ✅ Toggle course selection
  const handleCheckboxChange = (course, semester) => {
    const key = `${semester}-${course.code}`;
    if (selectedCourses.some((c) => c.key === key)) {
      setSelectedCourses(selectedCourses.filter((c) => c.key !== key));
    } else {
      setSelectedCourses([...selectedCourses, { ...course, semester, key }]);
    }
  };

  // ✅ Get semester credits
  const getSemesterCredits = (semester) =>
    selectedCourses
      .filter((c) => c.semester === semester)
      .reduce((sum, c) => sum + c.credits, 0);

  // ✅ Validate all selected semesters
  const allSemestersValid = () => {
    const semesterCredits = {};
    selectedCourses.forEach((c) => {
      semesterCredits[c.semester] =
        (semesterCredits[c.semester] || 0) + c.credits;
    });
    return Object.values(semesterCredits).every(
      (credits) => credits >= 15 && credits <= 24
    );
  };

  // ✅ Submission
  const handleSubmit = () => {
    if (!allSemestersValid()) {
      alert("⚠️ Each semester must have between 15 and 24 credits.");
      return;
    }
    setShowReview(true);
  };

  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  // ✅ Spinner instead of "Loading..."
  if (!student)
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p>Loading student info...</p>
      </div>
    );

  return (
    <div className={styles.container}>
      {/* ✅ Logo */}
      <div className={styles.headerBlock}>
        <Image src="/logo2.png" alt="Shajid Logo" width={130} height={130} />
        <div>
          <h1 className={styles.header}>Shajid Royal College of Nursing & Midwifery</h1>
          <p className={styles.address}>#73 Wamba Road, Opposite Central School, Akwanga, Nasarawa, Nigeria</p>
          <p className={styles.city}>Akwanga, Nasarawa, Nigeria</p>
          <h2 className={styles.subHeader}>
            Department of Nursing — 2025/2026 Session
          </h2>
        </div>
      </div>

      {/* ✅ Student Info */}
      <div className={styles.studentInfo}>
        <Image
          src={student.passport}
          alt="Student Passport"
          width={100}
          height={120}
          className={styles.passport}
        />
        <div>
          <p><strong>Name:</strong> {student.fullName}</p>
          <p><strong>Matric No:</strong> {student.matricNo}</p>
          <p><strong>Level:</strong> Year {student.level}</p>
        </div>
        <div className={styles.qrCode}>
          <QRCode value={`${student.fullName} - ${student.matricNo}`} size={100} />
        </div>
      </div>

      {!showReview ? (
        <>
          <h3 className={styles.sectionTitle}>Course Registration</h3>

          {Object.keys(courses).map((year) => (
            <div key={year} className={styles.yearSection}>
              <h4>{year}</h4>
              {Object.keys(courses[year]).map((semester) => {
                const semesterCredits = getSemesterCredits(semester);
                const isOpen = openSemester === semester;
                return (
                  <div key={semester} className={styles.semesterBlock}>
                    <button
                      className={styles.semesterButton}
                      onClick={() =>
                        setOpenSemester(isOpen ? null : semester)
                      }
                    >
                      {semester} — {semesterCredits} credits
                    </button>
                    {isOpen && (
                      <div>
                        <table className={styles.courseTable}>
                          <thead>
                            <tr>
                              <th>Select</th>
                              <th>Course Code</th>
                              <th>Title</th>
                              <th>Credits</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courses[year][semester].map((course) => {
                              const key = `${semester}-${course.code}`;
                              const checked = selectedCourses.some(
                                (c) => c.key === key
                              );
                              return (
                                <tr key={key}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() =>
                                        handleCheckboxChange(course, semester)
                                      }
                                    />
                                  </td>
                                  <td>{course.code}</td>
                                  <td>{course.title}</td>
                                  <td>{course.credits}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        {/* ✅ Live error feedback */}
                        {semesterCredits > 0 &&
                          (semesterCredits < 15 || semesterCredits > 24) && (
                            <p className={styles.error}>
                              ⚠️ {semester} has {semesterCredits} credits.
                              Must be between 15 and 24.
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <button
            className={styles.addButton}
            onClick={handleSubmit}
            disabled={selectedCourses.length === 0 || !allSemestersValid()}
          >
            ➕ Add Courses
          </button>
        </>
      ) : (
        <div className={styles.reviewSection}>
          <h3>📋 Review Registered Courses</h3>
          <table className={styles.courseTable}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Title</th>
                <th>Credit Units</th>
                <th>Semester</th>
              </tr>
            </thead>
            <tbody>
              {selectedCourses.map((course) => (
                <tr key={course.key}>
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits}</td>
                  <td>{course.semester}</td>
                </tr>
              ))}
              <tr className={styles.totalRow}>
                <td colSpan="2">Total Credit Units</td>
                <td colSpan="2">{totalCredits}</td>
              </tr>
            </tbody>
          </table>
          <button
            className={styles.addButton}
            onClick={() => setShowReview(false)}
          >
            ⬅️ Back to Edit
          </button>
        </div>
      )}
    </div>
  );
}
