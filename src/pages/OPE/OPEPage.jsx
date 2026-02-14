import PageTemplate from "../Logic/PageTemplate.jsx";

export default function OPEPage() {
  return (
    <PageTemplate title="Operational Profile Engine (OPE)">

        <section>
            <section className="project-meta">
                <h2>Project Information</h2>

                <p><strong>Role</strong> System Architect · Data Engineer · Backend Developer</p>

                <p><strong>Core Technologies</strong> Python · FastAPI · PostgreSQL · Docker</p>

                <p><strong>Data Processing</strong> Pandas · NumPy · PyArrow · AsyncIO</p>

                <p><strong>Architecture</strong> Asynchronous Pipeline Manager · WebSocket Tracking · Microservice
                    Design</p>

                <p><strong>Modeling</strong> Rule-Based Classification · Statistical Feature Engineering · Regression
                    (Installed Power Estimation)</p>

                <p><strong>Data Sources</strong> Live & Historical AIS · North Sea Wave Data (Hs, Tp, Spectra)</p>

                <p><strong>Storage & Streaming</strong> PostgreSQL · Apache Arrow IPC · Resolution-Aware Tiling Engine
                </p>

                <p><strong>Vessel Coverage</strong> 30+ Vessel Classes · ~92% Identification Accuracy</p>

                <p><strong>Duration</strong> Multi-Year Ongoing Development</p>
            </section>

            <h2>Overview</h2>
            <p>
                AIS provides position, speed, and basic metadata — but it does not
                describe what a vessel is actually doing. Operational intent remains
                hidden in movement patterns. The Operational Profile Engine (OPE)
                was built to transform raw AIS telemetry into structured operational
                behavior.
            </p>

            <p>
                The system ingests live and historical AIS data from the North Sea,
                processes it through a modular classification and segmentation
                pipeline, and outputs time-aligned operational states for each
                vessel. The result is a structured behavioral layer that enables
                higher-level analytics without relying on proprietary vessel data.
            </p>
        </section>

        <section>
            <h2>Data Infrastructure</h2>
            <p>
                AIS data is continuously collected and stored in PostgreSQL,
                supporting live queries, historic retrieval, area searches, and
                vessel-based lookups. A weather pipeline provides historical wave
                conditions (Hs, Tp, spectra) for any spatial-temporal window.
            </p>

            <p>
                The backend is built using FastAPI with asynchronous pipeline
                orchestration. Services are Dockerized and communicate through
                structured APIs and WebSocket tracking endpoints. Heavy datasets are
                served using Apache Arrow IPC streams with a custom resolution-aware
                tiling engine for efficient downstream visualization.
            </p>
        </section>

        <section>
            <h2>Vessel Identification & Registry</h2>
            <p>
                AIS static metadata is insufficient for detailed analysis. A custom
                vessel identification model was developed to classify vessels into
          detailed operational categories (e.g., TSHD, multicat, AHTS, tug
          subclasses) using weighted KPI ranges derived from historical
          movement patterns.
        </p>

        <p>
          Movement statistics such as speed distributions, heading variance,
          turning indices, clustering entropy, and path geometry are compared
          against rule-based feature envelopes. The highest weighted match
          determines vessel class, achieving ~92% average accuracy across
          labeled types.
        </p>

        <p>
          Installed power is estimated through regression models linking vessel
          dimensions to known power curves, enabling downstream energy modeling
          without access to proprietary databases. Registry results are stored
          and periodically re-evaluated to improve confidence.
        </p>
      </section>

      <section>
        <h2>Operational Segmentation Engine</h2>
        <p>
          The core of OPE is a modular segmentation system that converts
          time-series AIS data into labeled operational states.
        </p>

        <p>
          Velocity and heading are sliced into statistically stable occurrence
          bands. Transitions between bands define segmentation boundaries.
          These segments are then interpreted using vessel-type-specific logic.
        </p>

        <p>
          For example, trailing suction hopper dredgers are labeled into
          operations such as dredging, sailing full, dumping, rainbowing,
          idle, port visit, acceleration, and maintenance. Tug classes and
          offshore vessels use different labeling rules.
        </p>

        <p>
          The segmentation engine is generic; interpretation layers are
          modular. New vessel types can be implemented within hours by defining
          registry parameters and labeling logic.
        </p>
      </section>

      <section>
        <h2>System Design Principles</h2>
        <p>
          The architecture separates:
        </p>

        <ul>
          <li>Raw observables (AIS-aligned telemetry)</li>
          <li>Derived behavioral aggregates</li>
          <li>Normalized state classifications</li>
        </ul>

        <p>
          This layered contract ensures reproducibility and allows improvements
          in modeling logic without breaking downstream analytics. OPE forms
          the behavioral foundation for higher-level energy and benchmarking
          systems.
        </p>
      </section>

    </PageTemplate>
  );
}
