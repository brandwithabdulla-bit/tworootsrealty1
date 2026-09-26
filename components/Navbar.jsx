'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Image from 'next/image';
import { countryCodes } from '@/data/countries';
import SearchableCountrySelect from '@/components/SearchableCountrySelect';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Request a Call Back');
  const [modalSubtitle, setModalSubtitle] = useState('Our advisory team will contact you shortly.');
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('+971');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [requirement, setRequirement] = useState('');
  const [callbackErrors, setCallbackErrors] = useState({});
  const [callbackStatus, setCallbackStatus] = useState('idle'); // idle | loading | success
  const pathname = usePathname();
  
  // Do not render navbar on studio route
  if (pathname?.startsWith('/studio')) {
    return null;
  }
  
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

  // Global listener to trigger callback / speak to advisor modal
  useEffect(() => {
    const handleOpenCallback = (e) => {
      const title = e?.detail?.title || 'Speak to an Advisor';
      const subtitle = e?.detail?.subtitle || 'Our senior advisory team will connect with you to guide your property decisions.';
      setModalTitle(title);
      setModalSubtitle(subtitle);
      setCallbackStatus('idle');
      setCallbackErrors({});
      setIsCallbackOpen(true);
    };

    window.addEventListener('open-callback-modal', handleOpenCallback);

    const checkHash = () => {
      if (typeof window !== 'undefined' && (window.location.hash === '#callback' || window.location.hash === '#speak-to-advisor')) {
        handleOpenCallback({
          detail: {
            title: window.location.hash === '#speak-to-advisor' ? 'Speak to an Advisor' : 'Request a Call Back',
            subtitle: window.location.hash === '#speak-to-advisor'
              ? 'Our senior advisory team will connect with you to guide your property decisions.'
              : 'Our advisory team will contact you shortly.'
          }
        });
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('open-callback-modal', handleOpenCallback);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const openCallbackModal = (title = 'Request a Call Back', subtitle = 'Our advisory team will contact you shortly.') => {
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setCallbackStatus('idle');
    setCallbackErrors({});
    setIsCallbackOpen(true);
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required.';
    if (!countryCode) errors.countryCode = 'Please select a country code.';
    if (!phoneNumber.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^[0-9\s()-]{5,20}$/.test(phoneNumber.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email address is required.';
    }
    if (!requirement) {
      errors.requirement = 'Please select your requirement.';
    }

    if (Object.keys(errors).length > 0) {
      setCallbackErrors(errors);
      return;
    }

    setCallbackStatus('loading');
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: `${countryCode} ${phoneNumber.trim()}`,
          countryCode,
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          requirement,
          variant: 'callback',
          context: modalTitle,
          consent: true
        })
      });
    } catch {
      // Demo resilience
    }
    setCallbackStatus('success');
  };

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
                <Link href="/map" onClick={closeAllMenus}>Dubai Real Estate Map</Link>
                <Link href="/insights?category=blogs" onClick={closeAllMenus}>Blogs & Guides</Link>
                <Link href="/insights?category=investment" onClick={closeAllMenus}>Investment Insights</Link>
                <Link href="/gallery" onClick={closeAllMenus}>Gallery</Link>
              </div>
            </div>

            <Link href="/contact" className={styles.navLink} onClick={closeAllMenus}>Contact Us</Link>
          </div>

          {/* Desktop Actions */}
          <div className={styles.desktopActions}>
            <button 
              onClick={() => openCallbackModal('Request a Call Back', 'Our advisory team will contact you shortly.')} 
              className={styles.primaryBtn}
            >
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
                  <Link href="/map" onClick={closeAllMenus}>Dubai Real Estate Map</Link>
                  <Link href="/insights?category=blogs" onClick={closeAllMenus}>Blogs & Guides</Link>
                  <Link href="/insights?category=investment" onClick={closeAllMenus}>Investment Insights</Link>
                  <Link href="/gallery" onClick={closeAllMenus}>Gallery</Link>
                </div>
              )}
            </div>

            <Link href="/contact" onClick={closeAllMenus}>Contact Us</Link>
            <button 
              onClick={() => { 
                closeAllMenus(); 
                openCallbackModal('Request a Call Back', 'Our advisory team will contact you shortly.'); 
              }} 
              className={styles.mobilePrimaryBtn}
            >
              Get a Call Back <span className={styles.btnArrow}>↗</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Callback / Speak to Advisor Modal */}
      {isCallbackOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsCallbackOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className={styles.closeBtn} onClick={() => setIsCallbackOpen(false)} aria-label="Close dialog">✕</button>
            
            {callbackStatus === 'success' ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 className="secondary-font">Request Submitted</h3>
                <p className={styles.successMsg}>
                  Thank you, <strong>{fullName}</strong>! Your request has been received. Our team will connect with you at <strong>{countryCode} {phoneNumber}</strong> shortly.
                </p>
                <button 
                  type="button" 
                  className={styles.submitBtn} 
                  onClick={() => setIsCallbackOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="secondary-font">{modalTitle}</h3>
                <p>{modalSubtitle}</p>
                <form className={styles.callbackForm} onSubmit={handleCallbackSubmit}>
                  <div className={styles.formField}>
                    <label htmlFor="callback-fullname" className={styles.fieldLabel}>Full Name *</label>
                    <input 
                      id="callback-fullname"
                      type="text" 
                      placeholder="Enter your full name" 
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (callbackErrors.fullName) setCallbackErrors(prev => ({ ...prev, fullName: undefined }));
                      }}
                      required 
                    />
                    {callbackErrors.fullName && <span className={styles.fieldError}>{callbackErrors.fullName}</span>}
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="callback-phone" className={styles.fieldLabel}>Phone Number *</label>
                    <div className={styles.phoneInputGroup}>
                      <SearchableCountrySelect
                        id="callback-country-code"
                        name="countryCode"
                        value={countryCode}
                        onChange={(val) => {
                          setCountryCode(val);
                          if (callbackErrors.countryCode) setCallbackErrors(prev => ({ ...prev, countryCode: undefined }));
                        }}
                        theme="dark"
                        required
                        ariaLabel="Country Code"
                      />
                      <input 
                        id="callback-phone"
                        type="tel" 
                        placeholder="50 123 4567" 
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (callbackErrors.phone) setCallbackErrors(prev => ({ ...prev, phone: undefined }));
                        }}
                        required 
                        className={styles.phoneNumberInput}
                      />
                    </div>
                    {callbackErrors.countryCode && <span className={styles.fieldError}>{callbackErrors.countryCode}</span>}
                    {callbackErrors.phone && <span className={styles.fieldError}>{callbackErrors.phone}</span>}
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="callback-email" className={styles.fieldLabel}>Email Address *</label>
                    <input 
                      id="callback-email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (callbackErrors.email) setCallbackErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      required 
                    />
                    {callbackErrors.email && <span className={styles.fieldError}>{callbackErrors.email}</span>}
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="callback-requirement" className={styles.fieldLabel}>Select Requirement *</label>
                    <select 
                      id="callback-requirement"
                      value={requirement}
                      onChange={(e) => {
                        setRequirement(e.target.value);
                        if (callbackErrors.requirement) setCallbackErrors(prev => ({ ...prev, requirement: undefined }));
                      }}
                      required
                    >
                      <option value="">Select Requirement</option>
                      <option value="buy">Buying Property</option>
                      <option value="sell">Selling Property</option>
                      <option value="invest">Investment Advisory</option>
                      <option value="other">Other Enquiry</option>
                    </select>
                    {callbackErrors.requirement && <span className={styles.fieldError}>{callbackErrors.requirement}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={callbackStatus === 'loading'}
                  >
                    {callbackStatus === 'loading' ? 'Submitting…' : (
                      <>
                        Submit Request <span className={styles.btnArrow}>↗</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
