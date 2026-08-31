const features = [
  ["AI Voices", "Choose expressive voices that fit the personality and energy of your stream."],
  ["Voice Control", "Fine-tune voice preferences so messages sound consistent with your content."],
  ["Audience Controls", "Decide which interactions are read aloud and keep your stream experience under control."],
  ["Live Interaction", "Turn ordinary chat messages into moments your entire audience can hear and react to."],
  ["Creator Friendly", "Set up EchoStream around your workflow instead of changing the way you stream."],
  ["Built to Grow", "Start simple and expand your experience as your community and streaming needs grow."],
];

export default function FeaturesPage() {
  return (
    <main className="marketing-page">
      <section className="marketing-hero">
        <div>
          <span className="marketing-eyebrow">FEATURES</span>
          <h1>Everything you need to give your stream a voice.</h1>
          <p>Powerful interaction tools designed to make live audience engagement feel natural without getting in the way of your content.</p>
        </div>
      </section>
      <section className="marketing-content">
        <div className="marketing-feature-grid">
          {features.map(([title, description]) => (
            <article className="marketing-feature" key={title}>
              <h2>{title}</h2>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
