import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students", err);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Introductions</h1>

      {students.length === 0 && <p>No data found.</p>}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {students.map((s, i) => (
          <div key={i} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
            <h2>{s.name || "No Name"}</h2>
            <p><strong>Email:</strong> {s.email}</p>
            <p><strong>Major:</strong> {s.major}</p>
            <p><strong>Hobby:</strong> {s.hobby}</p>
            <p><strong>Pet Peeve:</strong> {s.petPeeve}</p>
            <p><strong>Quote:</strong> {s.quote}</p>
            <p><strong>Website:</strong> {s.website}</p>

            {s.links && s.links.length > 0 && (
              <div>
                <strong>Links:</strong>
                <ul>
                  {s.links.map((link, idx) => (
                    <li key={idx}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.text || link.url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
