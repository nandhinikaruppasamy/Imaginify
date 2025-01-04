import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1>Welcome to Imaginify</h1>
        <p>
          Transform your images effortlessly with our AI-powered tools. Restore, edit, and create visuals that stand out!
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2>Our Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Image Restore</h3>
            <p>Revive old or damaged images with ease. Our AI-powered tool helps restore your images to their former glory with just a few clicks.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Generative Fill</h3>
            <p>Add creative elements to your image by describing them in words. Our AI generates new content that seamlessly fits into your image.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Image Edit</h3>
            <p>Easily erase unwanted objects from your images. Whether it's a distraction or an error, our tool makes it disappear effortlessly.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Image Gallery</h3>
            <p>Change the color of objects in your images to match your vision. Customize any element with a wide range of hues.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Background Remove</h3>
            <p>Remove or replace the background of any image. Create clean and professional-looking visuals with minimal effort.</p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Home;
