'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const pathname = usePathname();
  
  // Only apply transparent header on homepage
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllMenus = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    setOpenMobileSubmenu(null);
  };

  // Close menus on route change
  useEffect(() => {
    closeAllMenus();
  }, [pathname]);

  const toggleSubmenu = (menu) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  const navClass = `${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${!isScrolled && isHomepage ? styles.transparent : ''}`;

  return (
    <>
      <nav className={navClass}>
        <div className={`container ${styles.navContainer}`}>
          
          {/* Logo */}
          <Link href="/" className={styles.logoWrapper} onClick={closeAllMenus}>
            <Image 
              src="/logo-final-black.png" 
              alt="Two Roots Realty" 
              width={180} 
              height={45} 
              className={styles.logoImage} 
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Links */}
          <div className={styles.desktopLinks}>
            <Link href="/" className={styles.navLink} onClick={closeAllMenus}>Home</Link>
            
            {/* About Dropdown */}
            <div 
              className={`${styles.dropdown} ${activeDropdown === 'about' ? styles.dropdownOpen : ''}`}
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span 
                className={styles.navLink} 
                onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              >
                About ▾
              </span>
              <div className={styles.dropdownMenu}>
                <Link href="/about" onClick={closeAllMenus}>About Us</Link>
                <Link href="/about/our-story" onClick={closeAllMenus}>Our Story</Link>
                <Link href="/about/team" onClick={closeAllMenus}>Founders & Team</Link>
              </div>
            </div>

            {/* Projects Mega Menu */}
            <div 
              className={`${styles.dropdown} ${styles.megaMenuTrigger} ${activeDropdown === 'projects' ? styles.megaMenuOpen : ''}`}
              onMouseEnter={() => setActiveDropdown('projects')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span 
                className={styles.navLink}
                onClick={() => setActiveDropdown(activeDropdown === 'projects' ? null : 'projects')}
              >
                Projects ▾
              </span>
              <div className={styles.megaMenu}>
                <div className={styles.megaMenuSection}>
                  <h4>Explore</h4>
                  <Link href="/projects" onClick={closeAllMenus}>All Projects</Link>
                  <Link href="/projects?filter=featured" onClick={closeAllMenus}>Featured Projects</Link>
                  <Link href="/projects?filter=new" onClick={closeAllMenus}>New Launches</Link>
                  <Link href="/projects?status=off-plan" onClick={closeAllMenus}>Off-Plan Projects</Link>
                  <Link href="/projects?status=ready" onClick={closeAllMenus}>Ready Projects</Link>
                </div>
                <div className={styles.megaMenuSection}>
                  <h4>Property Types</h4>
                  <Link href="/projects?type=apartments" onClick={closeAllMenus}>Apartments</Link>
                  <Link href="/projects?type=townhouses" onClick={closeAllMenus}>Townhouses</Link>
                  <Link href="/projects?type=villas" onClick={closeAllMenus}>Villas</Link>
                  <Link href="/projects?type=mansions" onClick={closeAllMenus}>Mansions</Link>
                  <Link href="/projects?type=commercial" onClick={closeAllMenus}>Commercial</Link>
                </div>
                <div className={styles.megaMenuSection}>
                  <h4>Discover</h4>
                  <Link href="/areas" onClick={closeAllMenus}>Popular Locations</Link>
                  <Link href="/projects?category=Branded%20Residences" onClick={closeAllMenus}>Branded Residences</Link>
                  <Link href="/projects?category=Waterfront" onClick={closeAllMenus}>Waterfront Projects</Link>
                </div>
              </div>
            </div>

            {/* Media Dropdown */}
            <div 
              className={`${styles.dropdown} ${activeDropdown === 'media' ? styles.dropdownOpen : ''}`}
              onMouseEnter={() => setActiveDropdown('media')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span 
                className={styles.navLink}
                onClick={() => setActiveDropdown(activeDropdown === 'media' ? null : 'media')}
              >
                Media ▾
              </span>
              <div className={styles.dropdownMenu}>
                <Link href="/insights" onClick={closeAllMenus}>All Media</Link>
                <Link href="/insights?category=blogs" onClick={closeAllMenus}>Blogs & Guides</Link>
                <Link href="/insights?category=investment" onClick={closeAllMenus}>Investment Insights</Link>
                <Link href="/gallery" onClick={closeAllMenus}>Gallery</Link>
              </div>
            </div>

            <Link href="/contact" className={styles.navLink} onClick={closeAllMenus}>Contact Us</Link>
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <button onClick={() => setIsCallbackOpen(true)} className={styles.primaryBtn}>
              Get a Call Back <span className={styles.btnArrow}>↗</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen1 : ''}`}></span>
            <span className={`${styles.bar} ${isMobileMenuOpen ? styles.barOpen2 : ''}`}></span>
          </button>

        </div>

        {/* Mobile Menu Slide Out */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileLinks}>
            <Link href="/" onClick={closeAllMenus}>Home</Link>
            
            <div>
              <button className={styles.mobileMenuTrigger} onClick={() => toggleSubmenu('about')}>
                About <span className={openMobileSubmenu === 'about' ? styles.caretOpen : ''}>▾</span>
              </button>
              {openMobileSubmenu === 'about' && (
                <div className={styles.mobileSubmenu}>
                  <Link href="/about" onClick={closeAllMenus}>About Us</Link>
                  <Link href="/about/our-story" onClick={closeAllMenus}>Our Story</Link>
                  <Link href="/about/team" onClick={closeAllMenus}>Founders & Team</Link>
                </div>
              )}
            </div>

            <div>
              <button className={styles.mobileMenuTrigger} onClick={() => toggleSubmenu('projects')}>
                Projects <span className={openMobileSubmenu === 'projects' ? styles.caretOpen : ''}>▾</span>
              </button>
              {openMobileSubmenu === 'projects' && (
                <div className={styles.mobileSubmenu}>
                  <Link href="/projects" onClick={closeAllMenus}>All Projects</Link>
                  <Link href="/projects?filter=featured" onClick={closeAllMenus}>Featured Projects</Link>
                  <Link href="/projects?filter=new" onClick={closeAllMenus}>New Launches</Link>
                  <Link href="/projects?status=off-plan" onClick={closeAllMenus}>Off-Plan Projects</Link>
                  <Link href="/projects?status=ready" onClick={closeAllMenus}>Ready Projects</Link>
                  <Link href="/areas" onClick={closeAllMenus}>Popular Locations</Link>
                  <Link href="/projects?category=Branded%20Residences" onClick={closeAllMenus}>Branded Residences</Link>
                  <Link href="/projects?category=Waterfront" onClick={closeAllMenus}>Waterfront Projects</Link>
                </div>
              )}
            </div>

            <div>
              <button className={styles.mobileMenuTrigger} onClick={() => toggleSubmenu('media')}>
                Media <span className={openMobileSubmenu === 'media' ? styles.caretOpen : ''}>▾</span>
              </button>
              {openMobileSubmenu === 'media' && (
                <div className={styles.mobileSubmenu}>
                  <Link href="/insights" onClick={closeAllMenus}>All Media</Link>
                  <Link href="/insights?category=blogs" onClick={closeAllMenus}>Blogs & Guides</Link>
                  <Link href="/insights?category=investment" onClick={closeAllMenus}>Investment Insights</Link>
                  <Link href="/gallery" onClick={closeAllMenus}>Gallery</Link>
                </div>
              )}
            </div>

            <Link href="/contact" onClick={closeAllMenus}>Contact Us</Link>
            <button 
              onClick={() => { closeAllMenus(); setIsCallbackOpen(true); }} 
              className={styles.mobilePrimaryBtn}
            >
              Get a Call Back <span className={styles.btnArrow}>↗</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Callback Modal */}
      {isCallbackOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsCallbackOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsCallbackOpen(false)}>✕</button>
            <h3 className="secondary-font">Request a Call Back</h3>
            <p>Our advisory team will contact you shortly.</p>
            <form className={styles.callbackForm} onSubmit={(e) => { e.preventDefault(); setIsCallbackOpen(false); }}>
              <input type="text" placeholder="Full Name" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="email" placeholder="Email Address" required />
              <select required>
                <option value="">Select Requirement</option>
                <option value="buy">Buying Property</option>
                <option value="sell">Selling Property</option>
                <option value="invest">Investment Advisory</option>
                <option value="other">Other Enquiry</option>
              </select>
              <button type="submit" className={styles.submitBtn}>
                Submit Request <span className={styles.btnArrow}>↗</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
