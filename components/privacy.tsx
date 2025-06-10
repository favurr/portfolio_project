import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <>
      <h2 className='title'>Prvacy Policy</h2>
      <p>
        in this Portfolio, your privacy is of utmost importance to us. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you visit our website. Please read this policy
        carefully. By using our site, you agree to the collection and use of
        information in accordance with this policy.
      </p>
      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> When you use our contact form,
          we may collect your name, email address, and any other information you
          provide.
        </li>
        <li>
          <strong>Usage Data:</strong> We automatically collect certain
          information about your device, browsing actions, and patterns, such as
          your IP address, browser type, referring/exit pages, and operating
          system.
        </li>
        <li>
          <strong>Cookies:</strong> We use cookies and similar tracking
          technologies to enhance your experience and analyze site usage.
        </li>
      </ul>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide, operate, and maintain our website</li>
        <li>To improve, personalize, and expand our website</li>
        <li>To understand and analyze how you use our website</li>
        <li>
          To communicate with you, including responding to your inquiries and
          providing updates
        </li>
        <li>To detect and prevent fraud and abuse</li>
      </ul>
      <h2>Disclosure of Your Information</h2>
      <p>
        We do not sell, trade, or rent your personal information to third
        parties. We may share information with service providers who assist us
        in operating our website, conducting our business, or serving our users,
        so long as those parties agree to keep this information confidential. We
        may also disclose your information if required by law or to protect our
        rights.
      </p>
      <h2>Data Security</h2>
      <p>
        We implement a variety of security measures to maintain the safety of
        your personal information. However, please remember that no method of
        transmission over the Internet or method of electronic storage is 100%
        secure.
      </p>
      <h2>Third-Party Links</h2>
      <p>
        Our website may contain links to third-party sites. We are not
        responsible for the privacy practices or the content of such sites. We
        encourage you to review the privacy policies of any third-party sites
        you visit.
      </p>
      <h2>Children's Privacy</h2>
      <p>
        Our website is not intended for children under the age of 13. We do not
        knowingly collect personal information from children under 13. If you
        believe we have collected such information, please contact us
        immediately.
      </p>
      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page. Changes
        are effective when they are posted on this page.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        via the{' '}
        <Link href='/contact' className='font-bold'>
          contact form
        </Link>
        .
      </p>
      <p className='mt-8 text-xs text-muted-foreground'>
        Last updated: June 7, 2025
      </p>
    </>
  )
}
