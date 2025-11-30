import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await fetch("https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1");
        if (!res.ok) {
          throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Fetched students:", data);

        // Ensure it's an array
        setStudents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch students", err);
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error loading students: {error}</p>;
  if (!students || students.length === 0) return <p>No students found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Introductions</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {students.map((s, i) => {
          // Fix: Handle name object correctly so React doesn't crash
          const nameObj = s.name || {};
          const fullName =
            nameObj.preferred ||
            `${nameObj.first || ""} ${nameObj.middleInitial || ""} ${nameObj.last || ""}`.trim();

          const links = Array.isArray(s.links) ? s.links : [];

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px"
              }}
            >
              <h2>{fullName || "No Name"}</h2>

              {s.email && <p><strong>Email:</strong> {s.email}</p>}
              {s.major && <p><strong>Major:</strong> {s.major}</p>}
              {s.hobby && <p><strong>Hobby:</strong> {s.hobby}</p>}
              {s.petPeeve && <p><strong>Pet Peeve:</strong> {s.petPeeve}</p>}
              {s.quote && <p><strong>Quote:</strong> {s.quote}</p>}

              {s.website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={s.website} target="_blank" rel="noopener noreferrer">
                    {s.website}
                  </a>
                </p>
              )}

              {links.length > 0 && (
                <div>
                  <strong>Links:</strong>
                  <ul>
                    {links.map((link, idx) => {
                      const url = link.url || "";
                      const text = link.text || url;

                      if (!url) return null;

                      return (
                        <li key={idx}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
