import PageTemplate from "../Logic/PageTemplate.jsx";

export default function OPStackPage() {
  return (
      <PageTemplate title="Operational Intelligence & Benchmarking Platform (OPStack)">

          <section className="project-meta">
              <h2>Project Information</h2>

              <p><strong>Role</strong> Analytics Architect · Backend Engineer · Systems Designer</p>

              <p><strong>Core Technologies</strong> Python · FastAPI · PostgreSQL · Docker</p>

              <p><strong>Analytics</strong> Energy Modeling · Emissions Estimation · KPI Normalization · Comparative
                  Benchmarking</p>

              <p><strong>Comparison Logic</strong> Intensity Metrics · Behavioral Distribution Analysis · Percentile
                  Positioning</p>

              <p><strong>Simulation</strong> Counterfactual Initiative Modeling · Slow Steaming · Retrofit Validation
              </p>

              <p><strong>Exports</strong> JSON · Apache Arrow · PNG Figures · LaTeX Tables · ZIP Project Bundles</p>

              <p><strong>Frontend Integration</strong> React Dashboard · Resolution-Aware Micro Requests</p>

              <p><strong>Positioning</strong> Operational Efficiency Benchmarking · Initiative Prioritization</p>

              <p><strong>Codebase Metrics</strong> Python: 19.564 LOC</p>

              <p><strong>Duration</strong> Multi-Year Ongoing Development</p>
          </section>

          <section>
              <h2>Overview</h2>
              <p>
              OPStack builds on structured operational profiles to estimate energy
                  use, fuel consumption, emissions, and cost — and to compare vessel
                  behavior across time windows, fleets, and peer groups.
              </p>

              <p>
                  The platform provides behavior-based efficiency benchmarking without
                  requiring client-provided fuel logs or production data. All outputs
                  are comparative and expressed as indicative ranges rather than
                  certified values.
              </p>
          </section>

          <section>
              <h2>Energy & Emissions Modeling</h2>
              <p>
                  Installed power estimates from the registry are combined with
                  operation-specific load factors and time duration to compute energy
                  consumption per segment. Fuel burn and CO₂e emissions are derived
                  using engine efficiency assumptions and fuel energy density.
              </p>

              <p>
                  Weather exposure is attached to operational windows to contextualize
                  intensity metrics. All computed values are stored alongside the
                  AIS-aligned time series, allowing slice-based querying over arbitrary
                  time ranges.
              </p>
          </section>

          <section>
              <h2>KPI Schema</h2>
              <p>
                  The analytical schema follows a strict hierarchy:
              </p>

              <ul>
                  <li>Raw observables (time, distance, estimated fuel, emissions)</li>
                  <li>Project-level aggregates (totals per window)</li>
                  <li>Normalized intensity metrics (per hour, nautical mile, cycle)</li>
                  <li>Comparative deltas and percentile positioning</li>
              </ul>

              <p>
                  No composite score is used. Conclusions emerge from alignment between
                  energy intensity metrics and behavioral distributions such as idle
                  fractions, speed envelopes, and cycle structure.
              </p>
          </section>

          <section>
              <h2>Benchmarking Modes</h2>
              <p>
                  Comparisons operate across three structured modes:
              </p>

              <ul>
                  <li>Same vessel across different periods</li>
                  <li>Fleet-level comparison</li>
                  <li>Peer vessels in similar operational envelopes</li>
              </ul>

              <p>
                  Metrics are compared only when validity thresholds are met
                  (e.g., sufficient distance, cycle count, or speed variance). Results
                  are expressed as relative deltas or percentile positions rather than
                  absolute claims.
              </p>
          </section>

          <section>
              <h2>Initiative Simulation</h2>
              <p>
                  A simulation layer applies counterfactual scenarios to historical
                  behavior. Examples include slow steaming strategies, idle reduction,
                  hull fouling impacts, and retrofit technologies.
              </p>

              <p>
                  The same modeling logic is consistently applied across vessels and
                  time windows to estimate potential savings and ROI envelopes. This
                  supports both operator-facing initiative prioritization and
                  supplier-facing validation of claimed performance improvements.
              </p>
          </section>

          <section>
              <h2>System Architecture</h2>
              <p>
                  OPStack runs as a Dockerized analytics pipeline managed by FastAPI.
                  Asynchronous processing supports project-based comparisons involving
                  multiple vessels and time windows. Results can be exported as JSON,
                  Arrow datasets, PNG figures, LaTeX tables, or bundled ZIP reports.
              </p>

              <p>
                  Heavy datasets are served through a resolution-aware tiling engine,
                  enabling seamless dashboard interaction even when processing
                  gigabyte-scale analytical outputs.
              </p>
          </section>

          <section>
              <h2>Positioning</h2>
              <p>
                  The platform functions as a maritime operational intelligence system.
                  Initial engagements are structured as fixed-scope benchmarking
                  analyses, with long-term potential in recurring operational oversight
                  and initiative validation.
              </p>
          </section>

      </PageTemplate>
  );
}
