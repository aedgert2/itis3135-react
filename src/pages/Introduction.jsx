export default function Introduction() {
  return (
    <main>
      <h2 className="center-align">Introduction</h2>
      <h3 className="center-align">Andrew J Edgerton</h3>

      <img
        src="/images/selfimage.jpg"
        className="center-align"
        alt="Professional Headshot"
      />
      <p className="center-align">Professional Photo</p>

      <ul>
        <li>
          <strong>Personal Background:</strong> I was born in Raleigh NC but now
          have lived in Charlotte the majority of my life.
        </li>
        <li>
          <strong>Professional Background:</strong> I have over five years of
          experience working at Home Depot, both part-time and full-time.
        </li>
        <li>
          <strong>Academic Background:</strong> I graduated with an Associate's
          degree from Central Piedmont Community College in 2024, and I am now
          pursuing my Bachelor’s in Computer Science with a minor in
          mathematics.
        </li>
        <li>
          <strong>Courses I'm Taking</strong>
          <ol>
            <li>
              <strong>MATH 1242</strong> - Calculus 2
            </li>
            <li>
              <strong>ITSC 3160</strong> - Database Design and Implementation
            </li>
            <li>
              <strong>ITIS 3135</strong> - Front-End Web Application Development
            </li>
            <li>
              <strong>ITSC 2175</strong> - Logic and Algorithms
            </li>
            <li>
              <strong>ITSC 3155</strong> - Software Engineering
            </li>
          </ol>
        </li>
      </ul>

      <p className="center-align">
        <em>"Not all those who wander are lost."</em>
      </p>
      <p className="center-align">– J.R.R Tolkien</p>
    </main>
  );
}
