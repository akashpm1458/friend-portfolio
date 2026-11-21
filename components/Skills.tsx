import { skills } from "@/lib/content";

export function Skills() {
  return (
    <section id="skills" className="skills-section section-pad">
      <div className="wrap">
        <div className="skills-heading">
          <h2>Skills</h2>
          <p>What I bring<br />to the table.</p>
        </div>
        <div className="skills-specimens">
          {skills.map((group) => (
            <article key={group.id} className="skills-specimen" aria-labelledby={group.id}>
              <h3 id={group.id}>{group.title}</h3>
              <p className="skills-specimen-note">{group.note}</p>
              <ul className="skills-type-mosaic">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
