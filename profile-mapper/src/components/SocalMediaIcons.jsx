import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, IconButton } from '@mui/material';

const SocalMediaIcons = () => {
    const icons = [{ label: 'Facebook', id: 'facebook', icon: <FacebookOutlinedIcon /> },
    { label: 'Instagram', id: 'instagram', icon: <InstagramIcon /> },
    { label: 'LinkedIn', id: 'linkedin', icon: <LinkedInIcon /> },
    { label: 'Git', id: 'git', icon: <GitHubIcon /> }
    ]
    return (
        <>
            {
                icons.map((item) => <IconButton key={item.id} aria-label={item.label}
                    sx={{
                        backgroundColor: 'custom.iconBackground',
                        borderRadius: '50%',
                        transition: 'transform 0.2s ease',
                        p:1,
                        '&:hover': {
                            transform: 'scale(1.2)',
                            backgroundColor: '',
                            color: 'white',
                        },
                    }}>{React.cloneElement(item.icon, { sx: { fontSize: '2rem', color: '#fff' } })}</IconButton>)
            }
        </>
    )
}

export default SocalMediaIcons