import React from 'react';
import { motion } from 'framer-motion';
import DiamondIcon from '@mui/icons-material/Diamond';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Box, Typography, Grid, useTheme, alpha, Container } from '@mui/material';

const GiveawayIntro = () => {
    const theme = useTheme();

    const benefits = [
        {
            icon: DiamondIcon,
            color: 'primary.main',
            bgColor: theme.palette.primary.main,
            bgAlpha: 0.06,
            borderAlpha: 0.12,
            title: 'Up to 2,500 Diamonds',
            desc: 'Bonus drops for selected winners',
            delay: 0.05,
        },
        {
            icon: TrendingUpIcon,
            color: 'secondary.main',
            bgColor: theme.palette.secondary.main,
            bgAlpha: 0.04,
            borderAlpha: 0.12,
            title: 'Fast Verification',
            desc: 'Valid entries processed quickly',
            delay: 0.12,
        },
        {
            icon: VerifiedUserIcon,
            color: 'primary.main',
            bgColor: theme.palette.info?.main || theme.palette.primary.main,
            bgAlpha: 0.04,
            borderAlpha: 0.12,
            title: 'Verified & Safe',
            desc: "We don't request account passwords",
            delay: 0.18,
        },
        {
            icon: LocalFireDepartmentIcon,
            color: 'warning.main',
            bgColor: theme.palette.warning?.main || theme.palette.secondary.main,
            bgAlpha: 0.04,
            borderAlpha: 0.12,
            title: 'Limited Slots',
            desc: 'Claim your spot while available',
            delay: 0.24,
        },
    ];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
            >
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                        <DiamondIcon
                            sx={{ fontSize: 60, color: 'primary.main', mb: 2, filter: `drop-shadow(0 0 15px ${theme.palette.primary.main})` }}
                        />
                    </motion.div>

                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '2rem', md: '3.5rem' },
                            fontWeight: 900,
                            background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2,
                            letterSpacing: '0.1em',
                        }}
                    >
                        CLAIM YOUR REWARDS
                    </Typography>

                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
                        🎮 Join thousands of players entering the diamond giveaway! Complete your Free Fire profile with your UID and email to enter our exclusive diamond draw. Limited slots available—don't miss out!
                    </Typography>

                    <Box sx={{ width: '100px', height: '4px', background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`, mx: 'auto', mt: 3, borderRadius: '2px' }} />
                </Box>

                {/* Benefits Grid */}
                <Container maxWidth={'lg'}>
                    <Box container spacing={2} sx={{ mb: 6, width: '100%', mx: 'auto', display: 'flex', gap: '20px', flexDirection: { xs: 'column', md: 'row' } }}>
                        {benefits.map((benefit, idx) => {
                            const IconComponent = benefit.icon;
                            return (
                                <Box key={idx} >
                                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: benefit.delay }}>
                                        <Box sx={{ p: 2.5, borderRadius: '12px', background: alpha(benefit.bgColor, benefit.bgAlpha), backdropFilter: 'blur(6px)', border: `1px solid ${alpha(benefit.bgColor, benefit.borderAlpha)}`, textAlign: 'center', '&:hover': { transform: 'translateY(-6px)' } }}>
                                            <IconComponent sx={{ fontSize: 28, color: benefit.color, mb: 1 }} />
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{benefit.title}</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{benefit.desc}</Typography>
                                        </Box>
                                    </motion.div>
                                </Box>
                            );
                        })}
                    </Box>
                </Container>
            </motion.div>
        </>
    );
};

export default GiveawayIntro;
