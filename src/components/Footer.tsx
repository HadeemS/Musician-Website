import { Link } from 'react-router-dom'
import SocialLinks from './SocialLinks'
import siteConfig from '../content/siteConfig.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-900 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Artist Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{siteConfig.artist.name}</h3>
            <p className="text-gray-400">{siteConfig.artist.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/music" className="text-gray-400 hover:text-white transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/videos" className="text-gray-400 hover:text-white transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link to="/tour" className="text-gray-400 hover:text-white transition-colors">
                  Tour
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <SocialLinks variant="footer" />
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {currentYear} {siteConfig.artist.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
