import Image from "next/image";
import Link from "next/link";
import React from "react";

import FooterBg from "../../../public/rightcircle.svg";
import Logo from "./Logo";
import facebook from "../../../public/facebook.svg";
import instagram from "../../../public/instagram.svg";
import twitter from "../../../public/twitter.svg";
import linkdin from "../../../public/linkding.svg";
import leftCorner from "../../../public/leftcorner.svg";
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#27272A] pt-20 pb-8 relative overflow-hidden text-white/90">
      <div className="nav-container">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
          {/* First column */}
          <div className="flex flex-col gap-3 md:gap-5 max-w-96">
            <Link href="/" aria-label="Home">
              <Logo textColor="white" className="w-32 md:w-52" />
            </Link>
            <div>
              <p className="text-white text-[16px]">
                Claimly helps you understand where you stand with your insurance
                claim. Upload your documents and receive a plain-English report
                created by an insurance specialist.
              </p>
              <p className="text-white text-[14px] mt-4">
                General Information only - not legal or financial advice.
              </p>
            </div>

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
            <ul className="space-y-2 md:space-y-2 text-[16px]">
              <li>
                <Link href="/" className="footer-link text-white text-[16px]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link text-white text-[16px]">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="footer-link text-white text-[16px]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link text-white text-[16px]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy_policy"
                  className="footer-link text-white text-[16px]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms_condition"
                  className="footer-link text-white text-[16px]"
                >
                  Terms of condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Fourth column - Social */}
          <div className="flex flex-col justify-end gap-3.5">
            {/* <h4 className="text-lg mb-4 text-white font-semibold">Follow Us</h4>
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
            </ul> */}

            <p className="text-white text-[16px] text-xs mt-6">
              © 2026 Claimly. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-white/40 max-w-[1500] mx-auto mt-20"></div>

      <div className="mx-auto max-w-[800px]">
        <p className="text-white text-[14px] text-center mt-8">
          Claimly does not provide financial or legal advice. If you need
          specific financial or legal advice, you should seek the advice of a
          qualified expert. All information contained on this website is for
          information purposes only.
        </p>
      </div>

      {/* Background decoration */}
      <div className="absolute top-6 right-6 hidden md:block pointer-events-none">
        <Image src={FooterBg} alt="Footer Background" />
      </div>
      <div className="absolute bottom-0 hidden md:block pointer-events-none">
        <Image src={leftCorner} alt="Footer Background" />
      </div>
    </footer>
  );
};

export default Footer;
