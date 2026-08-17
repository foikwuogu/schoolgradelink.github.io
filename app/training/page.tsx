export default function TrainingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="mt-6 text-2xl font-bold">
        Cybersecurity & Infrastructure Training
      </h1>
      <p className="mt-2 text-sm">
        Workforce development programs for OT/ICS teams, executives, and
        academic institutions.
      </p>

      <section className="mt-6 grid gap-6 md:grid-cols-2 text-sm">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="font-semibold">Foundations of Cybersecurity</h2>
          <p className="mt-2">
            Core concepts, threat models, security principles, and digital
            hygiene.
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="font-semibold">Industrial Cybersecurity (OT/ICS)</h2>
          <p className="mt-2">
            Specialized training for SCADA, ICS, and OT teams in power and
            energy.
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="font-semibold">Executive Cyber Risk Workshops</h2>
          <p className="mt-2">
            Governance, compliance, and risk management for board members and
            executives.
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="font-semibold">Certification Prep & Academics</h2>
          <p className="mt-2">
            Curriculum design and security frameworks for schools and higher
            education.
          </p>
        </div>
      </section>
    </div>
  );
}
