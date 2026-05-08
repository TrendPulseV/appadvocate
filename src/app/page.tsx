
"use client";
import { useState } from "react";

const BEEHIIV_PUB = "pub_80dd5cbc-9c5d-4d23-84ce-801357e791e8";

function WaitlistForm({ audience }: { audience: "developer" | "advocate" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const isDev = audience === "developer";
  const placeholder = isDev ? "your@company.com" : "your@email.com";
  const btnLabel = isDev ? "I want advocates" : "I want to advocate";
  const campaign = isDev ? "developer-waitlist" : "advocate-waitlist";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch(
        `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB}/subscriptions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEEHIIV_API_KEY ?? ""}`,
          },
          body: JSON.stringify({
            email,
            utm_source: "appadvocate.io",
            utm_medium: "waitlist",
            utm_campaign: campaign,
            custom_fields: [
              { name: "appadvocate_role", value: audience },
              { name: "appadvocate_waitlist", value: "true" },
            ],
          }),
        }
      );
      setStatus(res.ok || res.status === 201 ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div style={{
        padding: "14px 20px",
        background: "#f0fdf9",
        border: "1px solid #99f6e4",
        borderRadius: 10,
        color: "#0f766e",
        fontSize: 14,
        fontWeight: 500,
      }}>
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        style={{ flex: "1 1 220px", minWidth: 0 }}
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "12px 22px",
          background: isDev ? "var(--ink)" : "var(--teal)",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 14,
          whiteSpace: "nowrap",
          opacity: status === "loading" ? 0.7 : 1,
        }}
      >
        {status === "loading" ? "..." : btnLabel}
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <main>

      {/* ── Nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "0 32px",
        height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(250,249,246,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: "var(--ink)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>A</span>
          </div>
          <span style={{ fontWeight: 500, fontSize: 15, letterSpacing: "-0.01em" }}>
            AppAdvocate
          </span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#how" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>How it works</a>
          <a href="#developers" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>Developers</a>
          <a href="#advocates" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>Advocates</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{
        paddingTop: 140,
        paddingBottom: 100,
        paddingLeft: 32,
        paddingRight: 32,
        maxWidth: 900,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          padding: "5px 14px",
          borderRadius: 100,
          border: "1px solid var(--border)",
          fontSize: 12,
          color: "var(--muted)",
          marginBottom: 32,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          Now accepting applications
        </div>

        <h1 className="serif" style={{
          fontSize: "clamp(42px, 7vw, 78px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          marginBottom: 28,
          color: "var(--ink)",
        }}>
          Reviews that<br />
          <em style={{ color: "var(--teal)" }}>mean something.</em>
        </h1>

        <p style={{
          fontSize: "clamp(17px, 2.5vw, 21px)",
          color: "var(--muted)",
          maxWidth: 580,
          margin: "0 auto 48px",
          lineHeight: 1.6,
          fontWeight: 300,
        }}>
          We help developers earn 5 stars. Or get the exact, actionable feedback
          that tells them exactly why they didn&apos;t.
          Either way, they win. Either way, advocates are paid fairly.
        </p>

        {/* Dual CTA */}
        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <a href="#developers" style={{
            padding: "14px 28px",
            background: "var(--ink)",
            color: "white",
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 15,
            textDecoration: "none",
            border: "none",
          }}>
            I&apos;m a developer →
          </a>
          <a href="#advocates" style={{
            padding: "14px 28px",
            background: "white",
            color: "var(--ink)",
            borderRadius: 10,
            fontWeight: 500,
            fontSize: 15,
            textDecoration: "none",
            border: "1px solid var(--border)",
          }}>
            I want to advocate →
          </a>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 32px",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{
            fontSize: 12,
            color: "var(--muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}>
            How this started
          </p>
          <blockquote className="serif" style={{
            fontSize: "clamp(22px, 3.5vw, 32px)",
            lineHeight: 1.4,
            color: "var(--ink)",
            fontStyle: "italic",
            marginBottom: 32,
          }}>
            &ldquo;A user found a critical bug in my app. He emailed me.
            He didn&apos;t have to. I gave him a year of Pro free — out of appreciation.
            Then I thought: what if I could find people like him
            <em> before</em> the bug ever ships?&rdquo;
          </blockquote>
          <p style={{ fontSize: 14, color: "var(--muted)", fontStyle: "normal" }}>
            — Founder, AppAdvocate. 17 days after launching a health tracking app.
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how" style={{
        padding: "100px 32px",
        maxWidth: 960,
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: 12, letterSpacing: "0.08em",
          textTransform: "uppercase", color: "var(--muted)", marginBottom: 16,
        }}>
          The model
        </p>
        <h2 className="serif" style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          marginBottom: 64,
          color: "var(--ink)",
          lineHeight: 1.15,
          maxWidth: 520,
        }}>
          Three parties.<br />One honest agreement.
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 2,
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {[
            {
              num: "01",
              title: "The Network",
              label: "AppAdvocate",
              desc: "We recruit, vet, and manage advocates. We match them to developer campaigns by niche, experience, and platform. We are the trusted intermediary — the party both sides can rely on.",
              color: "var(--ink)",
            },
            {
              num: "02",
              title: "The Advocate",
              label: "Real users. Vetted.",
              desc: "Domain experts who know the product category inside out. Compensated with free access plus a fee for completed feedback. They leave a review when — and only when — they genuinely mean it.",
              color: "var(--teal)",
            },
            {
              num: "03",
              title: "The Developer",
              label: "Pays for truth.",
              desc: "Pays per campaign — not per review. Gets structured user research regardless of outcome. Gets authentic reviews when the product earns them. Never pays for fake.",
              color: "var(--amber)",
            },
          ].map(item => (
            <div key={item.num} style={{
              padding: "40px 36px",
              background: "white",
              borderRight: "1px solid var(--border)",
            }}>
              <div style={{
                fontSize: 11, letterSpacing: "0.1em",
                color: item.color, fontWeight: 500,
                marginBottom: 24, textTransform: "uppercase",
              }}>
                {item.num}
              </div>
              <h3 style={{
                fontSize: 20, fontWeight: 500,
                marginBottom: 6, color: "var(--ink)",
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: 12, color: item.color,
                fontWeight: 500, marginBottom: 16,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                {item.label}
              </p>
              <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* The key distinction */}
        <div style={{
          marginTop: 48,
          padding: "32px 36px",
          background: "var(--amber-light)",
          border: "1px solid #fde68a",
          borderRadius: 12,
        }}>
          <p style={{
            fontSize: 13, color: "var(--amber)",
            fontWeight: 500, textTransform: "uppercase",
            letterSpacing: "0.06em", marginBottom: 12,
          }}>
            The critical distinction
          </p>
          <p style={{ fontSize: 17, color: "#92400e", lineHeight: 1.6 }}>
            The agreement is for <strong>feedback</strong> — not reviews.
            The review is voluntary, based on genuine experience.
            This is structurally identical to how press and journalists work:
            early access, no obligation to be positive, the review is their editorial call.{" "}
            <strong>Not an incentivized review scheme. An honest feedback network.</strong>
          </p>
        </div>
      </section>

      {/* ── Developer Section ── */}
      <section id="developers" style={{
        background: "var(--ink)",
        color: "white",
        padding: "100px 32px",
      }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{
            fontSize: 12, letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase", marginBottom: 16,
          }}>
            For developers
          </p>
          <h2 className="serif" style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.1, marginBottom: 24,
            color: "white",
          }}>
            Stop begging for reviews.<br />
            <em style={{ opacity: 0.6 }}>Start earning them.</em>
          </h2>
          <p style={{
            fontSize: 18, color: "rgba(255,255,255,0.55)",
            marginBottom: 48, lineHeight: 1.65,
            maxWidth: 580, fontWeight: 300,
          }}>
            We match you with vetted advocates who actually know your product category.
            They test it for real. You get structured feedback regardless of outcome —
            and authentic reviews when your app earns them.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24, marginBottom: 56,
          }}>
            {[
              { price: "$2,500", label: "Starter", desc: "10 advocates · 4 weeks · feedback report" },
              { price: "$5,000", label: "Growth", desc: "25 advocates · debrief calls included" },
              { price: "$10,000", label: "Scale", desc: "50 advocates · full research package" },
            ].map(tier => (
              <div key={tier.label} style={{
                padding: "28px 24px",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 28, fontWeight: 300, marginBottom: 4, color: "white" }}>
                  {tier.price}
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "white", marginBottom: 8 }}>
                  {tier.label}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginBottom: 12 }}>
              Join the developer waitlist — we&apos;ll contact you when we&apos;re ready to run your campaign.
            </p>
            <WaitlistForm audience="developer" />
          </div>
        </div>
      </section>

      {/* ── Advocate Section ── */}
      <section id="advocates" style={{
        padding: "100px 32px",
        maxWidth: 760,
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: 12, letterSpacing: "0.08em",
          color: "var(--muted)", textTransform: "uppercase", marginBottom: 16,
        }}>
          For advocates
        </p>
        <h2 className="serif" style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          lineHeight: 1.1, marginBottom: 24, color: "var(--ink)",
        }}>
          Your opinion<br />
          <em style={{ color: "var(--teal)" }}>is worth something.</em>
        </h2>
        <p style={{
          fontSize: 18, color: "var(--muted)",
          marginBottom: 48, lineHeight: 1.65,
          maxWidth: 560, fontWeight: 300,
        }}>
          We don&apos;t want random clickers. We want people with real expertise
          who use the apps they review, know the category cold,
          and aren&apos;t afraid to say when something isn&apos;t good enough.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16, marginBottom: 56,
        }}>
          {[
            { label: "Free product access", desc: "Use the app throughout the campaign + 90 days after" },
            { label: "$50 per report", desc: "Paid for each completed structured feedback report" },
            { label: "$25 review bonus", desc: "If you leave an authentic review — only if you mean it" },
            { label: "Reputation score", desc: "Unlock higher-value campaigns as your track record builds" },
          ].map(item => (
            <div key={item.label} style={{
              padding: "24px",
              border: "1px solid var(--border)",
              borderRadius: 12,
              background: "white",
            }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, color: "var(--ink)" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>
          Join the advocate waitlist — tell us your niche and we&apos;ll match you to campaigns.
        </p>
        <WaitlistForm audience="advocate" />

        <p style={{
          marginTop: 20,
          fontSize: 13, color: "var(--muted)",
          fontStyle: "italic", lineHeight: 1.5,
        }}>
          We vet every advocate. If you can&apos;t describe your niche in detail,
          the vetting process will surface that. We&apos;d rather have 100 excellent advocates
          than 10,000 casual ones.
        </p>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "40px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 5,
            background: "var(--ink)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 12 }}>A</span>
          </div>
          <span style={{ fontSize: 14, fontWeight: 500 }}>AppAdvocate</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="mailto:hello@appadvocate.io" style={{
            fontSize: 13, color: "var(--muted)", textDecoration: "none",
          }}>
            hello@appadvocate.io
          </a>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            © 2026 AppAdvocate
          </span>
        </div>
      </footer>

    </main>
  );
}
