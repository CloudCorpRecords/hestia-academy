import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Terms.module.css';
import React from 'react';

const Terms = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Terms of Service - 01Hestia Academy</title>
        <meta name="description" content="Terms of service for 01Hestia Academy" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Terms of Service</h1>
        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to 01Hestia Academy. By accessing or using our services, you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our services.
          </p>
        </section>
        <section className={styles.section}>
          <h2>2. Use of Services</h2>
          <p>
            You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services:
          </p>
          <ul>
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2>3. Accounts and Subscription</h2>
          <p>
            To access certain features of our services, you may be required to create an account and subscribe. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>
        <section className={styles.section}>
          <h2>4. Intellectual Property</h2>
          <p>
            Our services and their entire contents, features, and functionality are owned by 01Hestia Academy and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
          </p>
        </section>
        <section className={styles.section}>
          <h2>5. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
          </p>
        </section>
        <section className={styles.section}>
          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, in no event shall 01Hestia Academy, its affiliates, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services.
          </p>
        </section>
        <section className={styles.section}>
          <h2>7. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which 01Hestia Academy operates, without regard to its conflict of law provisions.
          </p>
        </section>
        <section className={styles.section}>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>
        <section className={styles.section}>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:admin@reneturcios.com">admin@reneturcios.com</a>.
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

export default Terms;