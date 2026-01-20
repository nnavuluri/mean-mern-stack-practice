
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [patientData, setPatientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPatients() {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://dlk-api-usc-stg2-01.bo3.e-dialog.com/clinicalsapi/patients",
          { signal: controller.signal }
        );
        // Your API returns an array of objects like the sample you shared
        setPatientData(Array.isArray(res.data) ? res.data : [res.data]);
        setErr(null);
      } catch (e) {
        if (!axios.isCancel(e)) setErr(e.message || "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
    return () => controller.abort();
  }, []); // <-- run once

  if (loading) return <p>Loading patients…</p>;
  if (err) return <p style={{ color: "crimson" }}>Error: {err}</p>;

  return (
    <div>
      <h2>Patients Clinicals Data</h2>
      {patientData.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table border="1" cellPadding={6}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
