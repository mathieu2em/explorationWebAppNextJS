import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Mathieu Perron Tattoo",
  description: "Privacy Policy for Mathieu Perron professional tattoo services and website matha.tattoo.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: January 2026</p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                Mathieu Perron ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you visit our website matha.tattoo or
                use our tattoo services in St-Jean-de-Matha, Lanaudière, Quebec.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-white mb-3 mt-4">Personal Information</h3>
              <p>When you contact us or book an appointment, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Age/Date of birth (for age verification)</li>
                <li>Tattoo design preferences and placement</li>
                <li>Medical information relevant to tattooing (allergies, conditions, medications)</li>
                <li>Photos of existing tattoos or reference images you provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3 mt-4">Automatically Collected Information</h3>
              <p>When you visit our website, we may automatically collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule and manage tattoo appointments</li>
                <li>Communicate with you about your tattoo project</li>
                <li>Create custom tattoo designs</li>
                <li>Maintain health and safety records as required by law</li>
                <li>Send appointment reminders and aftercare instructions</li>
                <li>Improve our website and services</li>
                <li>Respond to your inquiries</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Photography and Portfolio Use</h2>
              <p>
                We may photograph completed tattoos for our portfolio, website, and social media marketing.
                If you do not wish your tattoo to be photographed or shared publicly, please inform us before
                your appointment. We will always respect your wishes regarding photo sharing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
              <p>
                We do not sell, rent, or trade your personal information. We may share your information only in
                the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Email services, website hosting, analytics (Microsoft Clarity)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Emergency:</strong> To protect the safety of our clients or others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Third-Party Analytics</h2>
              <p>
                We use Microsoft Clarity to understand how visitors interact with our website. Clarity collects
                information about user behavior, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Pages visited</li>
                <li>Clicks and scrolling behavior</li>
                <li>Mouse movements</li>
                <li>Device and browser information</li>
              </ul>
              <p className="mt-3">
                This helps us improve the website experience. You can learn more about Microsoft Clarity's privacy
                practices at{" "}
                <a
                  href="https://privacy.microsoft.com/privacystatement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300"
                >
                  Microsoft Privacy Statement
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Social Media</h2>
              <p>
                Our website contains links to our social media profiles (Instagram, TikTok, Facebook). When you
                interact with us on social media, those platforms' privacy policies apply. We may feature content
                from our social media accounts on our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your information from unauthorized access,
                alteration, or destruction. However, no internet transmission is completely secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services and comply with
                legal obligations. Health and safety records are maintained according to Quebec health regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Object to or restrict certain processing of your information</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us through the contact form on our website or via
                our social media channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under 18 years of age. We do not knowingly collect
                personal information from minors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience.
                You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">13. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">14. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li>Website: matha.tattoo</li>
                <li>Location: St-Jean-de-Matha, Lanaudière, Quebec</li>
                <li>Social Media: @tattoomatha (Instagram), @mathieutattoomatha (TikTok)</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
