import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Privacy.module.css';
import React from 'react';

const Privacy = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy - 01Hestia Academy</title>
        <meta name="description" content="Privacy policy for 01Hestia Academy" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.description}>
          At 01Hestia Academy, we value your privacy. This privacy policy explains how we handle your personal information.
        </p>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            01Hestia Academy (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our services.
          </p>
        </section>
        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>
            We collect information about you when you create an account, subscribe to our services, or interact with our website. The types of information we may collect include:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Your name, email address, and payment information.</li>
            <li><strong>Account Information:</strong> Information about your subscription and account status.</li>
            <li><strong>Usage Information:</strong> Information about how you use our services.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Account Management:</strong> To create and manage your account.</li>
            <li><strong>Subscription Services:</strong> To process your subscription payments and manage your subscription status.</li>
            <li><strong>Communication:</strong> To send you updates, newsletters, and other information related to your subscription.</li>
            <li><strong>Improvement:</strong> To analyze how you use our services and improve our offerings.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>4. Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties except as necessary to provide our services, comply with the law, or protect our rights. This includes:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party service providers who assist with payment processing, data analysis, and other functions.</li>
            <li><strong>Legal Compliance:</strong> When required by law, regulation, or legal process.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no internet-based service can be completely secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>
        <section className={styles.section}>
          <h2>6. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting us at <a href="mailto:admin@reneturcios.com">admin@reneturcios.com</a>.
          </p>
        </section>
        <section className={styles.section}>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
        <section className={styles.section}>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:admin@reneturcios.com">admin@reneturcios.com</a>.
          </p>
        </section>
        <div className={styles.buttonContainer}>
          <Link href="/">
            <button className={styles.button}>Back to Home</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Privacy;