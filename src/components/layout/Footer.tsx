const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-white">IAAI</span>
              <span className="text-sm text-slate-400">Academy</span>
            </div>
            <p className="mt-4 text-slate-400 max-w-md">
              Empowering the next generation of tech leaders through innovative AI-driven education and practical training.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Programs</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  IT Training
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Academic Support
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  Learning Clubs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:contact@iaai-academy.com" className="text-slate-400 hover:text-white transition-colors">
                  contact@iaai-academy.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-slate-400 hover:text-white transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="text-slate-400">
                123 Tech Street<br />
                Innovation City, IC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <button className="text-slate-400 hover:text-white transition-colors">
                FR | EN
              </button>
            </div>
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} IAAI Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 