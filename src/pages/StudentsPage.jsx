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
        console.error("Error loading students", err);
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Students</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
        }}
      >
        {students.map((s, i) => {
          const name = s.name || {};
          const fullName =
            name.preferred ||
            `${name.first || ""} ${name.middleInitial || ""} ${name.last || ""}`.trim();

          return (
            <div
              key={i}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              {/* NAME */}
              <h2>{fullName || "Unnamed Student"}</h2>

              {/* BASIC FIELDS */}
              <p><strong>Prefix:</strong> {s.prefix}</p>
              <p><strong>Mascot:</strong> {s.mascot}</p>
              <p><strong>Fun Fact:</strong> {s.funFact}</p>
              <p><strong>Additional:</strong> {s.additional}</p>

              {/* LINKS */}
              <h3>Links</h3>
              <ul>
                {s.links &&
                  Object.entries(s.links).map(([key, url]) => (
                    <li key={key}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {key}
                      </a>
                    </li>
                  ))}
              </ul>

              {/* BACKGROUNDS */}
              <h3>Background</h3>
              <p><strong>Personal:</strong> {s.backgrounds.personal}</p>
              <p><strong>Professional:</strong> {s.backgrounds.professional}</p>
              <p><strong>Academic:</strong> {s.backgrounds.academic}</p>
              <p><strong>Subject:</strong> {s.backgrounds.subject}</p>

              {/* COURSES */}
              <h3>Courses</h3>
              <ul>
                {s.courses?.map((course, idx) => (
                  <li key={idx}>
                    {course.code}: {course.name}
                    <br />
                    <em>{course.reason}</em>
                  </li>
                ))}
              </ul>

              {/* QUOTE */}
              {s.quote && (
                <>
                  <h3>Quote</h3>
                  <p>"{s.quote.text}" — {s.quote.author}</p>
                </>
              )}

              {/* PLATFORM */}
              <h3>Platform</h3>
              <p><strong>Device:</strong> {s.platform.device}</p>
              <p><strong>OS:</strong> {s.platform.os}</p>

              {/* MEDIA */}
              {s.media && s.media.hasImage && (
                <div>
                  <img
                    src={`https://dvonb.xyz${s.media.src}`}
                    alt={s.media.caption}
                    style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
                  />
                  <p><em>{s.media.caption}</em></p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
