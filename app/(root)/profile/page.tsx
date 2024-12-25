"use client";

import React from "react";
import styles from "./DashboardPage.module.css";

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </header>

      <section className={styles.statsSection}>
        <h2>Quick Status</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>50</h3>
            <p>Total Credits</p>
          </div>
          <div className={styles.statCard}>
            <h3>12</h3>
            <p>Images Processed</p>
          </div>
          <div className={styles.statCard}>
            <h3>5</h3>
            <p>Features Used</p>
          </div>
        </div>
      </section>

      <section className={styles.updatesSection}>
        <h2>Latest Updates</h2>
        <ul>
          <li>🆕 New feature: Batch background removal is now available!</li>
          <li>🎉 Exciting updates to the generative fill tool for enhanced creativity.</li>
          <li>📢 Reminder: Check out the Object Recolor feature in the tools menu.</li>
        </ul>
      </section>

      <section className={styles.tipsSection}>
        <h2>Helpful Tips</h2>
        <ul>
          <li>💡 Use the Generative Fill tool for creative edits and enhancements.</li>
          <li>🚀 Upgrade your credits to unlock premium features and faster processing.</li>
          <li>📚 Visit the Help Center to learn more about using the platform effectively.</li>
        </ul>
      </section>
    </div>
  );
};

export default DashboardPage;
