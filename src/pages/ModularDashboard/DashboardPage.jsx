import PageTemplate from "../Logic/PageTemplate.jsx";

export default function DashboardPage() {
  return (
    <PageTemplate title="Modular Engineering Dashboard">

      <section>
        <section className="project-meta">
          <h2>Project Information</h2>

          <p><strong>Role</strong> Frontend Architect · Systems Designer</p>

          <p><strong>Core Technologies</strong> React · Zustand · WebSockets · REST · Apache Arrow</p>

          <p><strong>Domain</strong> Modular Frontend Runtime for Maritime Engineering Systems</p>

          <p><strong>Architecture</strong> Domain-Segmented State Stores · Central Component Registry · Config-Driven
            Layout Engine</p>

          <p><strong>Layout System</strong> Configurable 2D Grid (x, y, w, h) · Collision Handling · User-Persistent
            Layouts · Multi-Page Namespacing</p>

          <p><strong>Integration</strong> AIS · CycleIQ · Operational Profiling · Meshing · Autonomous Telemetry</p>

          <p><strong>Design System</strong> OpenBridge-Compliant · Modular Typography · Selectable Palette Modes</p>

          <p><strong>Deployment Model</strong> Package-Based Feature Gating · Backend-Adaptive UI · Runtime
            Configuration Without Rebuild</p>

          <p><strong>Codebase Metrics</strong> JSX: 19.210 LOC · CSS: 6.397 LOC</p>

          <p><strong>Duration</strong> Ongoing</p>

        </section>

        <h2>Overview</h2>
        <p>
          The Modular Engineering Dashboard is a state-driven frontend runtime
          built to support multiple maritime engineering systems under a single,
          configurable UI platform. Over time, various backend tools were developed
          (AIS streaming, telemetry analytics, operational profiling, meshing,
          autonomous systems), each requiring an interface. Rebuilding custom UIs
          per system would have resulted in duplication, tight coupling, and
          difficult long-term maintenance.
        </p>

        <p>
          Instead of designing UIs around individual systems, this dashboard
          standardizes layout, components, and state management so that any
          backend service can plug into the same runtime.
        </p>

        <div style={{marginTop: "16px"}}>
          <a href="https://autocaptain.nl/custom" target="_blank" rel="noopener noreferrer"
             style={{display: "block", color: "#04D9FF", marginBottom: "8px", textDecoration: "none"}}>
            Custom layout designer
          </a>
          <a href="https://autocaptain.nl/ais" target="_blank" rel="noopener noreferrer"
             style={{display: "block", color: "#04D9FF", marginBottom: "8px", textDecoration: "none"}}>
            AIS dashboard
          </a>
          <a href="https://autocaptain.nl/cycleiqs" target="_blank" rel="noopener noreferrer"
             style={{display: "block", color: "#04D9FF", marginBottom: "8px", textDecoration: "none"}}>
            CycleIQ dashboard
          </a>
          <a href="https://autocaptain.nl/vanwijngaarden" target="_blank" rel="noopener noreferrer"
             style={{display: "block", color: "#04D9FF", textDecoration: "none"}}>
            Client customised deployment
          </a>
        </div>
      </section>

      <section>
        <h2>Architecture</h2>
        <p>
          The dashboard is built as a modular React application using
          domain-segmented Zustand stores. Each subsystem (layout, AIS,
          analytics, logging) owns its own state while exposing explicit
          actions and derived values. This prevents vertical coupling and
          keeps transport, processing, and rendering concerns separated.
        </p>

        <p>
          State is treated as application configuration rather than transient
          UI data. Layout definitions, panel compositions, feature toggles,
          and search parameters are serializable and persistable, allowing
          deterministic reconstruction of the full dashboard.
        </p>
      </section>

      <section>
        <h2>Layout Engine</h2>
        <p>
          The UI is orchestrated through a configurable 2D grid. Components
          occupy discrete coordinates (x, y, width, height) in grid units
          instead of absolute pixels. This ensures deterministic placement,
          predictable resizing, and resolution-independent layouts.
        </p>

        <ul>
          <li>Dynamic placement and resizing with constraint enforcement</li>
          <li>Collision detection and structural consistency</li>
          <li>User-specific layout persistence (local + remote)</li>
          <li>Multi-page layout namespacing</li>
        </ul>

        <p>
          Layout logic is fully separated from component rendering logic,
          enabling runtime modification without recompilation.
        </p>
      </section>

      <section>
        <h2>Component Model</h2>
        <p>
          All UI functionality is registered in a central component registry.
          Selecting a grid cell opens the registry, allowing components to be
          placed dynamically. Each component has isolated file architecture
          and receives data through a unified ingest layer.
        </p>

        <p>
          Components can be dragged, resized, removed, and rebound to different
          datasets at runtime. Feature availability adapts to backend services
          and user scope, allowing different product packages without code
          duplication.
        </p>
      </section>

      <section>
        <h2>System Integration</h2>
        <p>
          The platform integrates heterogeneous backend systems with different
          data structures and transport layers. These include AIS (live and
          historic), CycleIQ telemetry analytics, operational profile engines,
          meshing tools, and autonomous telemetry systems.
        </p>

        <ul>
          <li>WebSocket + REST communication (end-to-end encrypted)</li>
          <li>MMSI-keyed registries for constant-time vessel mutation</li>
          <li>Client-side Apache Arrow decoding for large telemetry datasets</li>
          <li>Window-based aggregation and time-based cache invalidation</li>
        </ul>

        <p>
          The frontend behaves as a lightweight analytics runtime rather than
          a passive API consumer. Derived metrics and visual states are computed
          deterministically from active store state.
        </p>
      </section>

      <section>
        <h2>Design System & Challenge</h2>
        <p>
          The interface follows the OpenBridge maritime design system to ensure
          compliance with maritime UI standards while allowing configurable
          typography and palette modes.
        </p>

        <p>
          The primary engineering challenge was maintaining strict modularity
          across 30+ pages and multiple subsystems while preserving a single
          source of truth. Clear domain boundaries, centralized configuration
          normalization, and controlled component governance were required to
          keep the system scalable and predictable.
        </p>
      </section>

    </PageTemplate>
  );
}
