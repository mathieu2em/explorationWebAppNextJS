import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Mathieu Perron Tattoo",
  description: "Terms of Service for Mathieu Perron professional tattoo services in St-Jean-de-Matha, Lanaudière.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            <p className="text-sm text-gray-400">Last Updated: January 2026</p>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Services</h2>
              <p>
                Mathieu Perron ("we," "us," or "our") provides professional tattoo artistry services at our studio
                in St-Jean-de-Matha, Lanaudière, Quebec. By booking an appointment or using our services, you agree
                to these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Age Requirements</h2>
              <p>
                All clients must be at least 18 years of age. Valid government-issued photo identification is required
                before any tattoo service can be provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Booking and Deposits</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>A non-refundable deposit may be required to secure your appointment</li>
                <li>The deposit will be applied to the final cost of your tattoo</li>
                <li>Cancellations must be made at least 48 hours in advance to reschedule</li>
                <li>No-shows or late cancellations will result in forfeiture of the deposit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Health and Safety</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>All equipment is sterile and single-use when applicable</li>
                <li>You must disclose any medical conditions, allergies, or medications</li>
                <li>We reserve the right to refuse service if you appear intoxicated or under the influence</li>
                <li>You must not be pregnant or nursing</li>
                <li>You must follow all provided aftercare instructions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Design and Intellectual Property</h2>
              <p>
                All custom designs created by Mathieu Perron remain the intellectual property of the artist.
                By receiving a tattoo, you receive a permanent license to display the artwork on your body, but
                the artist retains rights to photograph and display the work in their portfolio and marketing materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Touch-Ups and Corrections</h2>
              <p>
                One complimentary touch-up session may be provided within 3 months of the initial tattoo, subject to
                proper aftercare having been followed. Additional touch-ups or corrections may be subject to fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Liability</h2>
              <p>
                You acknowledge that tattooing involves inherent risks including infection, allergic reaction, and
                scarring. By proceeding with services, you agree to hold Mathieu Perron harmless from any complications
                arising from the tattoo, provided proper hygiene and safety protocols were followed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Payment</h2>
              <p>
                Payment is due in full upon completion of services. We accept cash, credit cards, and e-transfer.
                Prices are estimates and may vary based on the final design and session length.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Studio Policies</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please arrive on time for your appointment</li>
                <li>Guests may be limited in the studio area</li>
                <li>The studio is a professional environment - please be respectful</li>
                <li>We reserve the right to refuse service for any reason</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Website Use</h2>
              <p>
                This website (matha.tattoo) is for informational purposes. Interactive features such as the pain map
                and quiz are educational tools only and do not constitute medical advice. Actual pain levels vary by individual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms of Service at any time. Continued use of our services
                constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">12. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us through the contact form on this website
                or via our social media channels.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
