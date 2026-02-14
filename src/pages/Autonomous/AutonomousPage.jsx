import PageTemplate from "../Logic/PageTemplate.jsx";

export default function AutonomousVesselPage() {
  return (
      <PageTemplate title="Autonomous Vessel – Modular Conversion Kit">
        <section className="project-meta">
          <h2>Project Information</h2>

          <p><strong>Role</strong> System Architect · Control Engineer · Embedded Developer</p>

          <p><strong>Core Technologies</strong> Python · HTML · CSS · JavaScript · WebSockets</p>

          <p><strong>Hardware Platform</strong> Raspberry Pi 5 (8GB) · NEMA34 Stepper Motors · Custom Power Electronics
          </p>

          <p><strong>Sensors</strong> GPS · 9-axis IMU · Compass · FPV Camera · 4G Modem</p>

          <p><strong>Control Systems</strong> PID Controllers (Steering & Throttle) · Sensor Fusion (GPS + IMU) ·
            State-Based Autonomy Logic</p>

          <p><strong>Architecture</strong> Distributed Control Stack · VM Relay Server · Reverse Proxy · Token-Based
            Auth · VPN Tunnel</p>

          <p><strong>Safety Systems</strong> Manual Kill Switches · Software Failsafes · Collision-Based Shutdown ·
            Dual-Algorithm Cross-Validation</p>

          <p><strong>Mechanical Integration</strong> Retrofit Steering & Throttle Actuation · Custom Mounting Systems ·
            60V Power Conversion</p>

          <p><strong>Testing</strong> Simulation Environment · KPI-Based Tuning · 10+ Live Iterations · Autonomous Sea
            Trials (30+ km/h)</p>

          <p><strong>Duration</strong> 3 Months</p>

        </section>

        <section>
          <h2>Overview</h2>
          <p>
            Maritime autonomy is advancing rapidly, yet fully crewless vessels
            remain rare outside specialized military or research applications.
            During a three-month university project, I set out to explore whether
            vessel autonomy could be engineered with minimal resources by
            converting an existing boat rather than designing a custom hull.
          </p>

          <p>
            The result was a modular conversion kit capable of transforming a
            conventional small vessel into a semi- or fully autonomous platform.
            The objective was not to build a polished commercial product, but to
            demonstrate that autonomy is technically feasible, scalable, and
            approachable.
          </p>
        </section>

        <section>
          <h2>System Concept</h2>
          <p>
            Instead of building a dedicated USV, the project focused on a retrofit
            architecture combining mechanical actuators, onboard computation, and
            remote communication. Steering and throttle were automated using
            custom-built mechanisms designed to be universally adaptable, robust,
            and non-destructive to the original controls.
          </p>

          <p>
            The kit supports multiple autonomy modes:
          </p>

          <ul>
            <li>Remote control over 4G</li>
            <li>Cruise control and velocity hold</li>
            <li>Waypoint-based path following</li>
            <li>Obstacle detection and evasive rerouting</li>
            <li>Manual override for docking and fine maneuvers</li>
          </ul>

          <p>
            The approach enables rapid conversion of second-hand vessels,
            significantly reducing cost and engineering lead time compared to
            purpose-built autonomous boats.
          </p>
        </section>

        <section>
          <h2>System Architecture</h2>
          <p>
            The system was implemented as a distributed real-time control stack.
            A web-based frontend (HTML, CSS, JavaScript) communicated through
            WebSockets to a public relay server hosted on a virtual machine.
            The relay forwarded commands and telemetry to an onboard Raspberry
            Pi 5 (8GB), acting as the vessel’s central PLC.
          </p>

          <p>
            A reverse proxy enabled bidirectional communication. Security tokens
            and VPN tunnelling were implemented to demonstrate cybersecurity
            considerations, although encryption introduced measurable latency.
            End-to-end connectivity was achieved over 4G, enabling effectively
            unlimited operational range where signal was available.
          </p>
        </section>

        <section>
          <h2>Hardware & Sensors</h2>
          <p>
            The hardware stack prioritized accessibility and budget constraints.
            Hobby-grade components were selected to prove feasibility within the
            limited timeframe.
          </p>

          <ul>
            <li>PLC: Raspberry Pi 5 (8GB)</li>
            <li>GPS (Ultimate GPS V3)</li>
            <li>9-axis IMU</li>
            <li>PiCam4 for FPV</li>
            <li>4G modem</li>
            <li>NEMA34 stepper motors (60V, 6A each)</li>
          </ul>

          <p>
            A custom power system was built using dual 12V batteries with voltage
            conversion to supply the motor drivers. Mechanical steering and
            throttle assemblies were designed and fabricated in collaboration
            with stakeholders, prioritizing strength, responsiveness, and rapid
            installation.
          </p>
        </section>

        <section>
          <h2>Control Algorithms</h2>
          <p>
            Autonomy was implemented through layered processing pipelines.
            Sensor inputs were handled asynchronously, normalized, and passed
            into interpretation layers before reaching a master decision module.
            A secondary parallel algorithm ran alongside the primary logic. If
            both outputs diverged beyond a defined margin, decisions were
            escalated for reassessment.
          </p>

          <p>
            Steering and throttle were regulated through PID controllers.
            GPS provided global position reference, while the IMU and compass
            handled short-term motion and heading stabilization. The accelerometer
            was particularly useful for rapid heading changes, acceleration, and
            wave-induced disturbances, while GPS compensated for long-term drift.
          </p>

          <p>
            The vessel successfully executed waypoint-based path following and
            performed obstacle avoidance maneuvers before rejoining its route.
            Docking and undocking were handled via remote control.
          </p>
        </section>

        <section>
          <h2>Testing & Results</h2>
          <p>
            The vessel was tested and iterated upon more than ten times during
            the final month. It successfully drove both semi-autonomously and
            fully autonomously, including path-following missions and evasive
            obstacle behavior. A demonstration race reached speeds exceeding
            30 km/h under autonomous control.
          </p>

          <p>
            Multiple safety systems were implemented:
          </p>

          <ul>
            <li>Manual kill switches</li>
            <li>Software-triggered failsafes</li>
            <li>Collision-based emergency stops</li>
            <li>Interface-based override</li>
          </ul>

          <p>
            A separate simulation environment was built to rigorously test
            algorithms. An internal KPI-based scoring system allowed iterative
            tuning before live deployment.
          </p>
        </section>

        <section>
          <h2>Engineering Challenges</h2>
          <p>
            The primary challenge was integrating custom mechanical control
            hardware with existing vessel systems while maintaining modularity
            and rapid build time. Achieving sufficient steering torque without
            introducing excessive sensitivity required several redesigns.
          </p>

          <p>
            Network latency was another major hurdle. Approximately one second
            delay was observed during remote control due to multi-stage routing
            and encryption. While manageable for autonomy modes, it significantly
            impacted reactive manual control.
          </p>

          <p>
            Future iterations would prioritize industrial-grade hardware,
            improved steering sensitivity, smoother throttle linkage, and
            reduced network latency.
          </p>
        </section>

        <section>
          <h2>Impact</h2>
          <p>
            The final demonstration event attracted over 30 stakeholders from
            various companies and agencies. The vessel autonomously navigated
            around the port while guests observed. A local reporter conducted
            interviews, and a podcast followed. Combined promotional content
            reached over 50,000 views.
          </p>

          <p>
            The project led to invitations to present at a conference in Germany
            and facilitated discussions with maritime system architects and
            defense stakeholders. It demonstrated that small-scale autonomy is
            technically achievable and sparked continued collaboration within
            the field.
          </p>
        </section>

      </PageTemplate>
  );
}
