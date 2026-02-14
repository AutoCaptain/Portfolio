import PageTemplate from "../Logic/PageTemplate.jsx";

export default function Project6() {
  return (
    <PageTemplate>
      <h1>Hull Optimization Study</h1>

      <section>
        <h2>Overview</h2>
        <p>
          Structural optimization of a mid-size offshore support vessel hull
          targeting weight reduction while maintaining classification compliance.
        </p>
      </section>

      <section>
        <h2>Problem</h2>
        <p>
          Initial scantling design resulted in excess structural weight.
          Objective was to reduce mass without compromising safety factors.
        </p>
      </section>

      <section>
        <h2>Methodology</h2>
        <p>
          Finite element analysis conducted using shell elements with load
          cases derived from operational sea states. Iterative thickness
          reduction validated against stress and deflection criteria.
        </p>
      </section>

      <section>
        <h2>Results</h2>
        <p>
          Achieved 8.4% structural weight reduction while maintaining required
          safety margins under classification society standards.
        </p>
      </section>

      <section>
        <h2>Images</h2>
        <img
          src="/example-image.jpg"
          alt="FEA stress plot"
          style={{
            width: "100%",
            marginTop: "20px",
            border: "1px solid #2B3A42",
          }}
        />
      </section>
    </PageTemplate>
  );
}
