import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Cookie, BarChart, Target, Settings } from "lucide-react"

export const metadata = {
  title: "Cookie Policy - Viek Tech",
  description: "Learn how Viek Technologies uses cookies and similar technologies on our website.",
}

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Cookie,
      title: "Strictly Necessary Cookies",
      description: "These cookies are essential for the website to function properly. They enable basic functions like page navigation, access to secure areas, and remembering your preferences. The website cannot function properly without these cookies.",
      examples: ["Session cookies", "Authentication cookies", "Security cookies"],
    },
    {
      icon: BarChart,
      title: "Analytics Cookies",
      description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.",
      examples: ["Google Analytics", "Page view tracking", "User behavior analysis"],
    },
    {
      icon: Target,
      title: "Marketing Cookies",
      description: "These cookies are used to track visitors across websites to display relevant advertisements. They help measure the effectiveness of advertising campaigns.",
      examples: ["Advertising cookies", "Social media cookies", "Retargeting cookies"],
    },
    {
      icon: Settings,
      title: "Functional Cookies",
      description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings. They may be set by us or third-party providers.",
      examples: ["Language preferences", "Region settings", "Theme preferences"],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary border-primary/20">
            LEGAL
          </Badge>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and provide a better user experience, as well as to provide information to the website owners.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, personalize content, and serve targeted advertisements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
              <div className="grid gap-4 mt-6">
                {cookieTypes.map((cookie) => (
                  <Card key={cookie.title} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <cookie.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{cookie.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{cookie.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {cookie.examples.map((example) => (
                              <span
                                key={example}
                                className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How Long Do Cookies Last?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Cookies can be classified by their lifespan:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Session Cookies:</strong> These are temporary and are deleted when you close your browser.</li>
                <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them. They help us recognize you when you return to our website.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In addition to our own cookies, we may also use third-party cookies to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Analyze website traffic and user behavior</li>
                <li>Provide social media features</li>
                <li>Deliver personalized advertisements</li>
                <li>Enable certain website functionalities</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties may combine information collected from our website with other information they have collected from other websites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong>Cookie Consent Banner:</strong> When you first visit our website, you can accept all cookies, reject non-essential cookies, or customize your preferences.</li>
                <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can usually find these in the &quot;Options&quot; or &quot;Preferences&quot; menu.</li>
                <li><strong>Opt-Out Tools:</strong> Some third parties provide opt-out tools for their cookies and tracking technologies.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please note that blocking or deleting cookies may affect your experience on our website and limit the functionality of certain features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Updates to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to periodically review this page for the latest information on our cookie practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-foreground font-medium">Viek Technologies</p>
                <p className="text-muted-foreground">Email: info@viektech.com</p>
                <p className="text-muted-foreground">Address: Accra, Ghana</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
