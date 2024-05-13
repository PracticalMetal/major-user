import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
            variant="h3"
            sx={{
              display: 'flex',
              alignSelf: 'center',
              textAlign: 'center',
            }}
          >
            IT Evening&nbsp;
            <Typography
              component="span"
              variant="h3"
              sx={{
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
Enhance your organizational efficiency with our smart notice board application, designed to help you stay informed about all essential events and announcements.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}