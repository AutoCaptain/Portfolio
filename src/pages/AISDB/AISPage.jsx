import PageTemplate from "../Logic/PageTemplate.jsx";
import img1 from "./AISCover.png"
import img2 from "./live.png"
import img3 from "./pasttrack.png"
import img4 from "./Router.png"
import img5 from "./cover.png"

export default function FatigueAnalysis() {
  return (
    <PageTemplate title="AIS Data Platform">

      <section>
        <p>
          Real-time maritime ingestion, time-series storage, and streaming API.
        </p>
      </section>

      {/* Overview */}
      <section>
        <p>
          I built a modular AIS (Automatic Identification System) data platform that continuously ingests,
          processes, stores, and serves vessel position data in real time. The system runs as a cloud-deployed
          Docker service and currently sustains ~600 messages per second continuously, with ~20 billion AIS
          messages collected to date.
        </p>

        <p>
          The objective was not just to collect AIS data, but to design a scalable ingestion-to-query pipeline
          capable of handling time-series workloads, unreliable upstream sources, and long-term storage growth
          without architectural redesign.
        </p>
        <a
            href="https://autocaptain.nl/ais"
            target="_blank"
            rel="noopener noreferrer"
            style={{display: "block", color: "#04D9FF", marginBottom: "8px", textDecoration: "none"}}
        >
          AIS dashboard
        </a>

      </section>

      {/* Meta */}
      <section className="project-meta">
        <h2>Project Information</h2>
        <p><strong>Role</strong> System Architect · Backend Engineer</p>

        <p><strong>Core Technologies</strong> Python · asyncio · FastAPI · PostgreSQL · TimescaleDB · PyArrow · Docker
        </p>

        <p><strong>Domain</strong> Real-Time AIS Telemetry · Time-Series Geospatial Data</p>

        <p><strong>Throughput</strong> ~200 msgs/sec sustained · 20B+ total messages stored</p>

        <p><strong>Architecture</strong> Async Ingest Pipeline · Internal Message Bus · Buffered Batch Inserts · Tiered
          Storage</p>

        <p><strong>Storage</strong> Indexed PostgreSQL (Hot) · Parquet Archive (Cold) · Time-Partitioned Compression</p>

        <p><strong>API</strong> REST + WebSocket Streaming · Vessel & Bounding-Box Queries · Millisecond Epoch
          Timestamps</p>

        <p><strong>Deployment</strong> Cloud Docker Service · Continuous Operation</p>

        <p><strong>Codebase Metrics</strong> Python: 11.235 LOC</p>

        <p><strong>Duration</strong> Ongoing</p>

      </section>

      {/* Problem */}
      <section>
        <h2>Problem</h2>

        <p>
        AIS data is typically gated behind expensive commercial brokers. Raw historical access at scale is
          difficult and costly, particularly for analysis tasks such as route reconstruction, anomaly detection,
          congestion analysis, or fleet optimisation.
        </p>

        <p>
          At European scale (~70,000 active vessels transmitting roughly once per minute), the system must
          handle on the order of 100M messages per day. Even with compression, this quickly reaches
          ~100GB per month of storage.
        </p>

        <p>
          The core technical challenge was building an architecture that can ingest continuously, store
          idempotently, serve low-latency historical queries, and scale horizontally without major redesign.
        </p>
      </section>

      {/* Architecture */}
      <section>
        <h2>Architecture</h2>

        <p>
          The platform is structured into three logical layers: ingest, storage, and API, supported by shared
          core infrastructure for logging, messaging, and monitoring.
        </p>

        <p>
          The ingest layer maintains multiple parallel WebSocket connections to AIS providers, performs
          normalization, validation, and short-window deduplication, and publishes a unified stream to an
          internal asynchronous message bus.
        </p>

        <p>
          The database layer subscribes to this bus and writes messages asynchronously using buffered batch
          inserts with conflict handling. Time-series data is stored in PostgreSQL (optionally TimescaleDB),
          with millisecond UTC timestamps and indexed lookups on vessel and time.
        </p>

        <p>
          Older data is automatically tiered to compressed Parquet archives using columnar storage,
          partitioned by time. Queries transparently merge hot database data and cold archive data,
          keeping the active dataset bounded while preserving full history.
        </p>
      </section>

      {/* API */}
      <section>
        <h2>API & Streaming</h2>

        <p>
          The API layer is built with FastAPI and exposes both REST and WebSocket interfaces.
          Historical queries support vessel-based and geographic time-range lookups, while live
          endpoints stream filtered updates by bounding box or fleet selection.
        </p>

        <p>
          All timestamps are handled as millisecond epoch values end-to-end, eliminating timezone
          inconsistencies and minimizing conversion overhead. Live delivery is isolated from ingest
          through the internal message bus, ensuring high write throughput does not degrade query performance.
        </p>
      </section>

      {/* Core Infrastructure */}
      <section>
        <h2>Core Infrastructure</h2>

        <p>
          Cross-cutting concerns are centralized. Structured logging provides consistent, event-coded,
          machine-parseable output across all subsystems. A lightweight async pub/sub message bus
          isolates producers and consumers and prevents backpressure from cascading through the system.
        </p>

        <p>
          A pluggable monitoring registry allows each subsystem to expose metrics independently.
          The API aggregates these into a single system snapshot, including ingest throughput,
          database size, vessel counts, CPU usage, memory footprint, and uptime.
        </p>
      </section>

      {/* Results */}
      <section>
        <h2>Results</h2>

        <p>
          The system operates continuously in the cloud, sustaining hundreds of messages per second
          without manual intervention. Historical queries over thousands of records return in sub-second
          timeframes, and storage growth is controlled through automated tiering.
        </p>

        <p>
          The architecture is fully modular: ingest, database, and API layers can be separated into
          independent services, and the in-memory bus can be replaced with a distributed transport
          (e.g., Redis or Kafka) without altering business logic.
        </p>
      </section>

      {/* Reflection */}
      <section>
        <h2>Engineering Focus</h2>

        <p>
          This project demonstrates practical experience with asynchronous systems design,
          high-throughput buffering, time-series schema modeling, columnar archival storage,
          and resilient API architecture.
        </p>

        <p>
          Beyond AIS specifically, the core achievement is the design of a scalable data
          infrastructure capable of ingesting, persisting, and serving large real-time
          streams reliably over long-running deployments.
        </p>
      </section>

      {/* Image Section */}
        <section className="project-images">
            <img src={img1} alt="Render 1"/>
            <img src={img2} alt="Render 2"/>
            <img src={img3} alt="Render 3"/>
            <img src={img4} alt="Render 4"/>
            <img src={img5} alt="Render 4"/>
        </section>

    </PageTemplate>
  );
}
