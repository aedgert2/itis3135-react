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
  if (!students || students.length === 0) return <p>No students found or bad data format.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Introductions</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {students.map((s, i) => {
          // wrap every field access in a safe way
          const name = s.name ?? "";
          const email = s.email ?? "";
          const major = s.major ?? "";
          const hobby = s.hobby ?? "";
          const petPeeve = s.petPeeve ?? "";
          const quote = s.quote ?? "";
          const website = s.website ?? "";
          const links = Array.isArray(s.links) ? s.links : [];
          return (
            <div key={i} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px" }}>
              {name && <h2>{name}</h2>}
              {email && <p><strong>Email:</strong> {email}</p>}
              {major && <p><strong>Major:</strong> {major}</p>}
              {hobby && <p><strong>Hobby:</strong> {hobby}</p>}
              {petPeeve && <p><strong>Pet Peeve:</strong> {petPeeve}</p>}
              {quote && <p><strong>Quote:</strong> {quote}</p>}
              {website && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                </p>
              )}
              {links.length > 0 && (
                <div>
                  <strong>Links:</strong>
                  <ul>
                    {links.map((link, idx) => {
                      const url = link.url ?? "";
                      const text = link.text ?? url;
                      return url ? (
                        <li key={idx}>
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {text}
                          </a>
                        </li>
                      ) : null;
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
