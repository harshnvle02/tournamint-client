import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { Facebook, Instagram, Twitter, GitHub } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <Typography variant="body1">
                Follow GameHost and stay updated!
            </Typography>
            <Box className="social-icons">
                <Facebook className="social-icon" />
                <Instagram className="social-icon" />
                <Twitter className="social-icon" />
                <GitHub className="social-icon" />
            </Box>
            <Box className="footer-links">
                <Link href="#" className="footer-link">Privacy Policy</Link>
                <Link href="#" className="footer-link">Terms of Service</Link>
                <Link href="#" className="footer-link">Contact Us</Link>
            </Box>
            <Typography variant="body2" className="footer-copy">
                &copy; 2024-2025 GameHost. All Rights Reserved.
            </Typography>
        </div>
    );
};


export default Footer;



