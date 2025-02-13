import React from "react";

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                {/* Left Section: Brand */}
                <div style={styles.brand}>
                    <h2 style={styles.title}>CVD Risk Prediction</h2>
                    <p style={styles.tagline}>Empowering heart health through AI insights.</p>
                </div>

                {/* Center Section: Navigation Links */}
                <div style={styles.navLinks}>
                    <a href="/" style={styles.link}>Home</a>
                    <a href="/about" style={styles.link}>About</a>
                    <a href="/contact" style={styles.link}>Contact</a>
                    <a href="/privacy" style={styles.link}>Privacy Policy</a>
                </div>

                {/* Right Section: Social Media */}
                <div style={styles.socialMedia}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>

            {/* Copyright Section */}
            <div style={styles.copyright}>
                <p>© {new Date().getFullYear()} CVD Risk Prediction. All rights reserved.</p>
            </div>
        </footer>
    );
};

// Footer Styles
const styles = {
    footer: {
        backgroundColor: "#13361C",
        color: "#ffffff",
        padding: "20px 0",
        marginTop: "30px",
        textAlign: "center",
    },
    container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: "1100px",
        margin: "auto",
    },
    brand: {
        flex: "1",
        textAlign: "left",
        paddingLeft: "20px",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "5px",
    },
    tagline: {
        fontSize: "0.9rem",
        color: "#CC9A48",
    },
    navLinks: {
        flex: "1",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
    },
    link: {
        color: "#ffffff",
        textDecoration: "none",
        fontSize: "1rem",
        transition: "color 0.3s",
    },
    socialMedia: {
        flex: "1",
        textAlign: "right",
        paddingRight: "20px",
    },
    icon: {
        color: "#ffffff",
        fontSize: "1.2rem",
        margin: "0 10px",
        transition: "color 0.3s",
    },
    copyright: {
        marginTop: "15px",
        fontSize: "0.9rem",
        color: "#EAEAEA",
    },
};

export default Footer;
