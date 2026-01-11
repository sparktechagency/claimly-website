import Image from "next/image";
import images from "../../../public/hero 2-Photoroom.svg";

const PrivacyPolicy = () => {
  return (
    <div>
      {/* ===== HERO / HEADING ===== */}

      <div className="flex flex-col py-10 px-7 lg:py-20 lg:px-24 bg-linear-to-l from-[#DBEAFE] to-[#EFF6FF] xl:flex-row justify-between items-center  gap-10 ">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-10 justify-between items-center">
              {/* left */}
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl lg:text-[40px] leading-[120%] font-semibold">
                  {" "}
                  <span className="bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">
                    {" "}
                    Privacy
                  </span>{" "}
                  <span className="text-[#2563EB]">Policy</span>{" "}
                </h2>

                <p className="tracking-[1px] leading-[120%] text-color-secondary">
                  We protect your personal and claim information with secure
                  storage and strict access controls.
                </p>
              </div>

              {/* right */}
              <div className="w-">
                <Image
                  src={images}
                  alt="hro"
                  width={100}
                  height={100}
                  className="md:w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-28">
        <div className=" text-slate-700 space-y-6 text-sm lg:text-base leading-relaxed">
          <div className="space-y-1">
            <h3 className="font-semibold text-slate-900">🔒 Privacy Policy</h3>
            <p>Effective Date: January 2025</p>
            <p>Last Updated: January 2025</p>
          </div>

          <p>
            At Claimly, we value your privacy and are committed to protecting
            your personal information. This Privacy Policy explains how we
            collect, use, and safeguard your data when you use Claimly.
          </p>

          <p>
            By accessing or using Claimly, you agree to the terms outlined
            below.
          </p>

          {/* 1 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🧾 1. Information We Collect
            </h4>
            <p>We may collect the following information from users:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Personal Information:</strong> Name, email address, and
                password provided during registration.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use the
                platform, including claim submissions, document uploads, and
                dashboard activity.
              </li>
              <li>
                <strong>Communication Data:</strong> Messages, notifications,
                and updates exchanged within the platform.
              </li>
            </ul>
          </div>

          {/* 2 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🔐 2. How We Use Your Information
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Manage your account and provide access to Claimly features.
              </li>
              <li>
                Enable secure submission and tracking of insurance claims.
              </li>
              <li>Improve user experience and resolve technical issues.</li>
              <li>
                Send important updates, notifications, or account-related
                messages.
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🧠 3. Data Security
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                All data is protected using encryption and secure server-side
                authentication.
              </li>
              <li>
                Only authorized users, including the account holder and platform
                administrators, can access relevant information.
              </li>
            </ul>
          </div>

          {/* 4 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🧩 4. Data Sharing and Disclosure
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Claimly does not sell, trade, or share your personal information
                with third parties.
              </li>
              <li>
                Your data is used solely to facilitate claim management and
                communication.
              </li>
              <li>
                Limited information may be shared if required by law or for
                system maintenance.
              </li>
            </ul>
          </div>

          {/* 5 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🧭 5. User Responsibilities
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Keeping login credentials confidential.</li>
              <li>Using Claimly ethically and responsibly.</li>
              <li>
                Reporting unauthorized access or suspicious activity
                immediately.
              </li>
            </ul>
          </div>

          {/* 6 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              💬 6. Cookies and Tracking
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Claimly may use cookies to enhance user experience, store
                preferences, and improve platform performance.
              </li>
              <li>
                You can disable cookies in your browser settings, but some
                features may not function properly.
              </li>
            </ul>
          </div>

          {/* 7 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              🧾 7. Data Retention
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                User data is retained only as long as necessary to provide
                Claimly services.
              </li>
              <li>
                Information no longer needed is securely deleted or anonymized.
              </li>
            </ul>
          </div>

          {/* 8 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">🧩 8. Your Rights</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal information.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent for data processing where applicable.</li>
            </ul>
          </div>

          {/* 9 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">📩 9. Contact Us</h4>
            <p>
              If you have any questions about this Privacy Policy or your data:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Email: support@claimly.com (placeholder)</li>
              <li>Phone: +61 400 000 000 (placeholder)</li>
            </ul>
          </div>

          {/* 10 */}
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">
              ⚖️ 10. Policy Updates
            </h4>
            <p>
              Claimly may update this Privacy Policy periodically. All changes
              will be posted on this page with a new “Last Updated” date.
            </p>
          </div>

          <p className="pt-4 text-xs text-slate-500">
            © 2026 Claimly. All rights reserved. Your trust matters. We are
            committed to keeping your data secure and your claims process safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
