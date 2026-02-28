import React from 'react'


const Footer = () => {
  return (
      <div className="relative z-50 bg-[url('/footer.svg')] bg-cover bg-center bg-no-repeat  bg-[#111111] py-16 px-6 sm:px-12 border-t border-white/10 text-stone-300 font-sans mt-auto">
        <div className="max-w-350 mx-auto flex flex-col justify-between h-full min-h-[40vh]">
          {/* Top Divider inside container */}
          <div className="w-full h-px bg-white/10 mb-12"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8 px-2 md:px-0">
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">Seismic</h2>
            <h3 className="text-3xl md:text-5xl text-white font-medium max-w-lg leading-tight md:text-left">
              Build products users can trust
            </h3>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row justify-end gap-16 md:gap-32 mb-16 w-full px-2 md:px-0">
            <div>
              <h4 className="text-white font-medium mb-4 text-base">Builders</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://explorer-1.seismicdev.net/" className="hover:text-white transition-colors">Explorer</a></li>
                <li><a href="mailto:hello@seismic.systems" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 text-base">Socials</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://x.com/SeismicSys" className="hover:text-white transition-colors">X</a></li>
                <li><a href="https://www.linkedin.com/company/seismicsys/" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="https://discord.com/invite/seismic" className="hover:text-white transition-colors">Discord</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4 text-base">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="https://www.figma.com/design/qcJGJ6G34qM9OEym3OaCBq/Seismic-Brand-Kit?node-id=5-39&t=6PVlh6zxKGYEi5E8-1" className="hover:text-white transition-colors">Brand Kit</a></li>
                <li><a href="https://docs.seismic.systems/appendix/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="https://docs.seismic.systems/appendix/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-stone-300 px-2 md:px-0 gap-4 font-medium tracking-wide">
            <p>©2026</p>
            <p>New York City</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
  )
}

export default Footer