import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:'linear-gradient(180deg, #CEE5FD, #FFF)',
        backgroundSize: '100% 60%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 12 },
          pb: { xs: 8, sm: 0 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h2"
            sx={{
              display: 'flex',
            //   flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
            //   fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            IT Department&nbsp;
            <Typography
              component="span"
              variant="h2"
              sx={{
                // fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.main',
              }}
            >
              welcomes you
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            To build a culture of innovation and  research in students and make them capable to solve upcoming challenges of human life using computing.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}