import Image from "next/image";
import Link from "next/link";
import React from "react";

import FooterBg from "../../../public/rightcircle.svg";
import taskalleyLogo from "../../../public/footerlogo.svg";
import facebook from "../../../public/facebook.svg";
import instagram from "../../../public/instagram.svg";
import twitter from "../../../public/twitter.svg";
import linkdin from "../../../public/linkding.svg";
import leftCorner from "../../../public/leftcorner.svg";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#27272A] pt-20 pb-20 px-6 md:px-10 tracking-wide relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* First column */}
          <div className="flex flex-col gap-3 md:gap-5 max-w-96">
            <Link href="/" aria-label="Home">
              <Image src={taskalleyLogo} alt="Taskalley Logo" priority />
            </Link>
            <p className="text-white text-[14px]">
              Claimly helps you understand where you stand with your insurance
              claim. Upload your documents and receive a plain-English report
              created by an insurance specialist.
            </p>
            <p className="text-white text-[14px]">
             General Information only - not legal or financial advice.
            </p>

            {/* <a
              href="tel:+01234567899"
              className="text-white text-sm hover:text-slate-400 transition"
            >
              Phone: +012 (345) 678 99
            </a>

            <a
              href="mailto:support@taskalley.com"
              className="text-white text-sm hover:text-slate-400 transition"
            >
              Email: support@taskalley.com
            </a> */}
          </div>

          {/* Second column */}
          {/* <div>
            <h4 className="text-lg mb-4 text-white font-semibold">Resources</h4>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="footer-link">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div> */}

          {/* Third column */}
          <div>
            <h4 className="text-lg mb-4 text-white font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-4">
              <li>
                <Link href="/" className="footer-link text-white text-xs">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browseservice" className="footer-link text-white text-xs">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link text-white text-xs">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link text-white text-xs">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link text-white text-xs">
                  Privacy Policy  
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link text-white text-xs">
                  Terms of condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth column - Social */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-lg mb-4 text-white font-semibold">
              Follow Us
            </h4>
            <ul className="flex items-center gap-6">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-icon"
                >
                  <Image src={facebook} alt="Facebook" />
                </a>
              </li>

              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="social-icon"
                >
                  <Image src={twitter} alt="Twitter" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="social-icon"
                >
                  <Image src={linkdin} alt="YouTube" />
                </a>
              </li>

              <li>
                <a
                  href="https://www.behance.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="social-icon"
                >
                  <Image src={instagram} alt="Behance" />
                </a>
              </li>
            </ul>

            <p className="text-white text-xs mt-14">
             © General Information only - not legal or financial advice.
            </p>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-6 right-6 hidden md:block pointer-events-none">
        <Image src={FooterBg} alt="Footer Background" />
      </div>
      <div className="absolute bottom-0 left-6 hidden md:block pointer-events-none">
        <Image src={leftCorner} alt="Footer Background" />
      </div>
    </footer>
  );
};

export default Footer;
