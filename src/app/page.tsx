'use client'

import { useState } from 'react'
import { MainNavbar } from '@/components/layout/MainNavbar'
import { HomePage } from '@/components/pages/HomePage'
import { AboutPage } from '@/components/pages/AboutPage'
import { ServicesPage } from '@/components/pages/ServicesPage'
import { ContactPage } from '@/components/pages/ContactPage'
import { FAQPage } from '@/components/pages/FAQPage'
import { PrivacyPage } from '@/components/pages/PrivacyPage'
import { TermsPage } from '@/components/pages/TermsPage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />
      case 'about':
        return <AboutPage />
      case 'services':
        return <ServicesPage />
      case 'courses':
        return <HomePage onPageChange={setCurrentPage} />
      case 'contact':
        return <ContactPage />
      case 'faq':
        return <FAQPage />
      case 'privacy':
        return <PrivacyPage />
      case 'terms':
        return <TermsPage />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <MainNavbar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">LinguaSchool</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering global communication through expert language education. 
                Join thousands of students who have achieved their language goals with us.
              </p>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentPage('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => setCurrentPage('courses')} className="hover:text-white transition-colors">Courses</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setCurrentPage('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
                <li><button onClick={() => setCurrentPage('faq')} className="hover:text-white transition-colors">FAQ</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LinguaSchool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}