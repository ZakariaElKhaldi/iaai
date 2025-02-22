import { motion } from 'framer-motion'
import Breadcrumb from '../../components/common/Breadcrumb'

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ name: 'Terms of Service', path: '/terms' }]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-slate-300">
                Welcome to IAAI Academy. By accessing and using our platform, you agree to be bound
                by these Terms of Service. Please read them carefully before proceeding.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">2. Definitions</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>"Platform" refers to IAAI Academy's website and services</li>
                <li>"User" refers to any individual accessing or using the Platform</li>
                <li>"Content" refers to all materials available on the Platform</li>
                <li>"Service" refers to educational services provided through the Platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
              <p className="text-slate-300 mb-4">
                To access certain features of the Platform, you must register for an account.
                You agree to:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any security breaches</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p className="text-slate-300 mb-4">
                All content on the Platform is protected by intellectual property rights.
                Users may not:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Copy or reproduce any content without permission</li>
                <li>Modify or create derivative works</li>
                <li>Distribute or publicly display content</li>
                <li>Use content for commercial purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">5. User Conduct</h2>
              <p className="text-slate-300 mb-4">
                Users must adhere to the following guidelines:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>Respect other users and their rights</li>
                <li>Do not engage in harmful or disruptive behavior</li>
                <li>Do not upload malicious content or software</li>
                <li>Do not attempt to breach platform security</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">6. Payments and Refunds</h2>
              <p className="text-slate-300 mb-4">
                Payment terms and conditions:
              </p>
              <ul className="list-disc list-inside text-slate-300 space-y-2">
                <li>All payments are processed securely</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Prices are subject to change with notice</li>
                <li>Some services may require subscription</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">7. Termination</h2>
              <p className="text-slate-300">
                We reserve the right to terminate or suspend access to our Service immediately,
                without prior notice or liability, for any reason whatsoever, including without
                limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">8. Changes to Terms</h2>
              <p className="text-slate-300">
                We reserve the right to modify these terms at any time. We will notify users
                of any changes by updating the date at the top of these terms and by maintaining
                a changelog accessible through the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Contact Information</h2>
              <p className="text-slate-300">
                If you have any questions about these Terms, please contact us at:
                <br />
                Email: support@iaai-academy.com
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

export default Terms 