import { motion } from 'framer-motion'
import Breadcrumb from '../../components/common/Breadcrumb'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ name: 'Privacy Policy', path: '/privacy' }]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-slate-300">
                At IAAI Academy, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-white mt-4 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Name and contact information</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Educational history</li>
                <li>Profile information</li>
              </ul>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">Usage Data</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Log data and device information</li>
                <li>Course progress and completion</li>
                <li>Assessment results</li>
                <li>Interaction with other users</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-300 mb-4">We use the collected information for:</p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Providing and improving our services</li>
                <li>Personalizing your learning experience</li>
                <li>Processing payments and transactions</li>
                <li>Communicating with you about our services</li>
                <li>Analyzing platform usage and trends</li>
                <li>Ensuring platform security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">4. Information Sharing</h2>
              <p className="text-slate-300 mb-4">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Service providers and partners</li>
                <li>Educational institutions (with consent)</li>
                <li>Legal authorities when required</li>
                <li>Other users (based on your privacy settings)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
              <p className="text-slate-300 mb-4">
                We implement appropriate security measures:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-slate-300 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="text-slate-300">
                We use cookies and similar tracking technologies to enhance your experience.
                You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">8. Children's Privacy</h2>
              <p className="text-slate-300">
                Our platform is not intended for children under 13. We do not knowingly collect
                or maintain information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p className="text-slate-300">
                For privacy-related inquiries, please contact us at:
                <br />
                Email: privacy@iaai-academy.com
                <br />
                Address: 123 Tech Street, Innovation City, IC 12345
              </p>
            </section>
          </div>

          <div className="mt-12 p-4 bg-slate-800/50 rounded-lg">
            <p className="text-slate-300 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy 