const CEO_IMAGE = new URL("../../public/images/ceo-Imadvertising.jpg", import.meta.url).href;

const PARAGRAPHS = [
  {
    eyebrow: "Who We Are",
    body: "At LM ADVERTISING, we bring ideas to life through creativity, strategy & smart design. Based in Prayagraj, we are a full-service advertising agency specializing in branding, printing, designing & complete OOH advertising solutions.",
  },
  {
    eyebrow: "What We Do",
    body: "From eye-catching hoardings, glow signs, and flex printing to logo design, brochures & brand identity creation – we handle everything under one roof. Our team is passionate about delivering quality, speed & innovation.",
  },
  {
    eyebrow: "Our Philosophy",
    body: "We believe advertising is not just about being seen, it's about being remembered. That's why we focus on building strong brand identities, attractive visuals, and clear communication that drives real results.",
  },
  {
    eyebrow: "Our Promise",
    body: "Your vision is our mission. Whether it's a small design job or a large-scale outdoor campaign, we're here to make your brand shine. Partner with us and take your business to the next level.",
  },
];

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    label: "Creative Strategy",
    year: "2019",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    label: "Brand Identity",
    year: "2021",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    label: "Outdoor Campaigns",
    year: "2023",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    label: "Full-Service Studio",
    year: "2025",
  },
];

const CEO_PROFILE = {
  name: "Mr. Abhishek Arya",
  role: "Founder & CEO, LM Advertising",
  image: CEO_IMAGE,
  message: <p>

    At LM ADVERTISING, our goal has always been simple — to create
    meaningful and impactful advertising that helps brands grow and
    connect with people. What started as a small idea has today become
    a trusted name in branding, designing, printing & outdoor advertising
    across Prayagraj.<br></br><br></br>
    I believe that creativity backed by purpose can change how
    businesses communicate. We don’t just make ads — we build
    identities, tell stories and turn ideas into results. Our team works with
    dedication, honesty and a passion for excellence in every project we
    do. We are here to support our clients with fresh ideas, reliable
    services and long term partnerships.<br></br><br></br>
    Thank you for trusting LM ADVERTISING. We look forward to growing
    with you and helping your brand make a lasting impression.,
  </p>
};

export {PARAGRAPHS,IMAGES,CEO_PROFILE};
