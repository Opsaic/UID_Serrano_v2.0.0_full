import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function MarketingFooter() {
  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Showcase", href: "#showcase" },
      { label: "Pricing", href: "#pricing" },
      { label: "Updates", href: "#updates" },
    ],
    Company: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" },
    ],
    Resources: [
      { label: "Documentation", href: "#docs" },
      { label: "Help Center", href: "#help" },
      { label: "Community", href: "#community" },
      { label: "Partners", href: "#partners" },
    ],
    Legal: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "Compliance", href: "#compliance" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-accent" />
              <span className="text-xl font-semibold">UID Serrano</span>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-sm leading-relaxed">
              Revolutionizing custom door manufacturing with AR visualization and intelligent project management.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-primary-foreground/70">
              © {new Date().getFullYear()} UID Serrano. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#privacy" className="text-sm text-primary-foreground/70 hover:text-accent">
                Privacy Policy
              </Link>
              <Link href="#terms" className="text-sm text-primary-foreground/70 hover:text-accent">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
