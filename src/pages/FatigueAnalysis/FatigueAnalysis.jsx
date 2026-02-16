import PageTemplate from "../Logic/PageTemplate.jsx";
import img1 from "./fatigue_spectrum.png"
import img2 from "./render1.png"
import img3 from "./render6.png"
import img4 from "./render10.png"
import img5 from "./render8.png"
import img6 from "./fem2.png"
import img7 from "./Hs_time_dubai.png"
import img8 from "./fem7.png"
import img9 from "./jonswap_northsea.png"

export default function FatigueAnalysis() {
  return (
      <PageTemplate title="TSHD Fatigue Analysis">

      {/* Overview */}
      <section>
        <p>
          Fatigue assessment of the trailing suction hopper dredger
          <em> Rotterdam</em> in the context of a potential Life Time Extension
          (LTE). The study evaluates cumulative fatigue damage in the primary
          hull structure by reconstructing operational loading history and
          combining global structural response with hotspot-based fatigue
          evaluation.
        </p>
      </section>

      {/* Meta */}
      <section className="project-meta">
        <h2>Project Information</h2>

        <p><strong>Role</strong> Structural Engineer · Fatigue Analyst</p>

        <p><strong>Scope</strong> Life Time Extension (LTE) Assessment · Hull Girder Fatigue Evaluation</p>

        <p><strong>Vessel Type</strong> Trailing Suction Hopper Dredger (TSHD)</p>

        <p><strong>Methodology</strong> AIS-Based Operational Reconstruction · Spectral Wave Analysis ·
        Euler–Bernoulli Beam Modelling · Hotspot Stress Evaluation · S–N Fatigue Assessment</p>

        <p><strong>Modelling Tools</strong> Python (Custom Computational Pipeline) · Rhino 3D · ANSYS Workbench</p>

        <p><strong>Data Volume</strong> 72M+ AIS Records · Hindcast Wave Data (North Sea & Persian Gulf)</p>

        <p><strong>Standards</strong> Bureau Veritas Fatigue Rules · Classification Compliance</p>

        <p><strong>Deliverables</strong> Global Stress Screening · Hotspot Identification ·
        Cumulative Fatigue Damage Estimation · Technical Decision Basis for LTE</p>

        <p><strong>Duration</strong> 4 Months</p>

        <p><strong>Stakeholders</strong> Van Oord · Bureau Veritas · CJOB</p>

      </section>


      {/* Problem Definition */}
      <section>
        <h2>Problem Definition & Structural Context</h2>

        <p>
          The vessel is approaching the end of its original 25-year design
          life. Although visible cracking is currently limited to known local
          details, fatigue damage develops progressively and remains
          undetectable until late stages.
        </p>

        <p>
          The key engineering question is not whether fatigue exists, but
          when it becomes structurally governing. A predictive assessment is
          required to determine the earliest fatigue-critical regions and to
          define a technical decision window for major retrofit or life
          extension investment.
        </p>
      </section>

      {/* Methodology */}
      <section>
        <h2>Methodology</h2>

        <p>
          A sequential fatigue assessment strategy was adopted, progressing
          from operational data reconstruction to global response modelling,
          hotspot identification, and local fatigue life estimation.
        </p>

        <p>
          The workflow was structured as follows:
        </p>

        <ul>
          <li>Consolidation of operational and environmental data</li>
          <li>Global longitudinal bending assessment</li>
          <li>Identification of fatigue-critical regions</li>
          <li>Local stress range extraction</li>
          <li>S–N based cumulative fatigue evaluation</li>
        </ul>

        <p>
          This tiered approach ensures that fatigue-critical regions are
          identified based on structural mechanics rather than arbitrary
          detail selection.
        </p>
      </section>


      {/* Data Reconstruction */}
      <section>
        <h2>Operational Data Reconstruction</h2>

        <p>
          Over 72 million AIS records were processed and enriched with loading
          condition classification (Full / Ballast) derived from operational
          logs. Each timestamp was mapped to encountered wave conditions using
          Copernicus hindcast datasets for both North Sea and Persian Gulf
          operations.
        </p>

        <p>
          Encountered wave periods were computed using vessel speed and
          heading, enabling reconstruction of stress-driving sea states.
          The resulting dataset provides a time-resolved loading history
          representative of approximately 11% of total vessel lifetime.
        </p>
      </section>

      {/* Global Structural Analysis */}
      <section>
        <h2>Global Structural Analysis</h2>

        <p>
          A 3D geometric hull model was developed in Rhino to determine
          sectional properties including neutral axis position and second
          moment of area (Ixx). The hull girder was idealised as an
          Euler–Bernoulli beam for longitudinal bending assessment.
        </p>

        <p>
          Still-water bending moments were computed for full and ballast
          conditions. Wave-induced bending response was evaluated using
          strip theory in the frequency domain, generating stress Response
          Amplitude Operators (RAOs) along the vessel length.
        </p>

        <p>
          Global stress ranges were used to screen for structurally
          governing regions prior to detailed hotspot evaluation.
        </p>
      </section>

      {/* Local Modelling */}
      <section>
        <h2>Local Modelling & Fatigue Evaluation</h2>

        <p>
          Fatigue-critical regions were selected based on elevated global
          stress range and geometric discontinuities. Local stress
          concentrations were evaluated using refined modelling to extract
          representative stress ranges at hotspot locations.
        </p>

        <p>
          Cumulative fatigue damage was assessed using S–N methodology in
          accordance with Bureau Veritas fatigue rules. Stress range
          distributions derived from reconstructed operational loading were
          combined with cycle counting to estimate fatigue life.
        </p>
      </section>

                {/* Modelling & Implementation */}
      <section>
        <h2>Modelling & Implementation</h2>

        <p>
          The computational workflow was implemented in Python, integrating
          structural mechanics, wave spectrum generation, and fatigue damage
          accumulation into a reproducible pipeline.
        </p>

        <p>
          Strip-theory calculations were implemented directly in code,
          including hydrodynamic transfer functions and spectral integration.
          Green’s function formulations were used to evaluate sectional load
          distribution and longitudinal stress response.
        </p>

        <p>
          The modelling framework allows parametric evaluation of loading
          conditions and provides transparency in all intermediate steps,
          from wave spectrum generation to final fatigue damage estimation.
        </p>
      </section>

                {/* Results */}
      <section>
        <h2>Results</h2>

        <p>
          The global analysis confirms longitudinal bending as the dominant
          fatigue-driving mechanism. Elevated stress amplitudes are observed
          in regions corresponding to structural transitions and previously
          inspected details.
        </p>

        <p>
          Detailed local fatigue life calculations are currently under
          completion. Preliminary results indicate that fatigue behaviour
          is governed by a limited number of structurally critical regions
          rather than distributed global degradation.
        </p>
      </section>

      {/* Engineering Reflection */}
      <section>
        <h2>Engineering Reflection</h2>

        <p>
          Fatigue assessment inherently involves uncertainty in operational
          history and environmental exposure. Conservative assumptions were
          applied where early-life data were unavailable.
        </p>

        <p>
          The study demonstrates the importance of combining operational
          data reconstruction with structural response modelling, rather
          than relying solely on rule-based estimations.
        </p>
      </section>

          {/* Image Section */}
        <section className="project-images">
          <img src={img1} alt="Render 1"/>
          <img src={img2} alt="Render 2"/>
          <img src={img3} alt="Render 3"/>
          <img src={img4} alt="Render 4"/>
          <img src={img5} alt="Render 5"/>
          <img src={img6} alt="Render 6"/>
          <img src={img7} alt="Render 7"/>
          <img src={img8} alt="Render 8"/>
          <img src={img9} alt="Render 9"/>
        </section>
      </PageTemplate>
  );
}
