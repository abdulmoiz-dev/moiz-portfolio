import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';

function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const [nameError, setNameError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasNameError = name.trim() === '';
    const hasContactError = contact.trim() === '';
    const hasMessageError = message.trim() === '';

    setNameError(hasNameError);
    setContactError(hasContactError);
    setMessageError(hasMessageError);

    if (hasNameError || hasContactError || hasMessageError) return;

    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'c9f14d70-bf07-41a2-b7bc-de6f98df80e0',
          name,
          email: contact,
          message,
          subject: `New Contact Form Submission from ${name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Thanks! Your message has been sent successfully.');
        setName('');
        setContact('');
        setMessage('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: '#000000',
      }}
    >
      <Box
        sx={{
          maxWidth: '1100px',
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
          gap: { xs: 5, md: 9 },
          alignItems: 'center',
        }}
      >
        {/* Left Side */}
        <Box>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              mb: 2.5,
              px: 2,
              py: 0.8,
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.06)',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.5px',
            }}
          >
            GET IN TOUCH
          </Box>

          <Box
            component="h1"
            sx={{
              m: 0,
              mb: 2.5,
              fontSize: { xs: '40px', md: '56px' },
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-2px',
              color: '#ffffff',
            }}
          >
            Let's talk about
            <Box
              component="span"
              sx={{
                display: 'block',
                background:
                  'linear-gradient(90deg, #ffffff 0%, #888888 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              your project.
            </Box>
          </Box>

          <Box
            component="p"
            sx={{
              m: 0,
              maxWidth: '470px',
              color: '#999999',
              fontSize: '17px',
              lineHeight: 1.7,
            }}
          >
            Have a question, need more information, or want to discuss
            a project? Send us a message and we'll get back to you.
          </Box>
        </Box>

        {/* Form */}
        <Box
          component="form"
          onSubmit={sendEmail}
          noValidate
          sx={{
            p: { xs: 2.5, md: 4 },
            background: '#111111',
            border: '1px solid #292929',
            borderRadius: '20px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              fullWidth
              required
              label="Your Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              error={nameError}
              helperText={nameError ? 'Please enter your name' : ''}
              sx={fieldStyles}
            />

            <TextField
              fullWidth
              required
              label="Email / Phone"
              placeholder="you@example.com"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
                setContactError(false);
              }}
              error={contactError}
              helperText={
                contactError ? 'Please enter your email or phone number' : ''
              }
              sx={fieldStyles}
            />
          </Box>

          <TextField
            fullWidth
            required
            label="Message"
            placeholder="Tell us about your project..."
            multiline
            rows={7}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setMessageError(false);
            }}
            error={messageError}
            helperText={messageError ? 'Please enter your message' : ''}
            sx={{
              ...fieldStyles,
              mb: 2,
            }}
          />

          {success && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: '10px',
                background: '#102016',
                border: '1px solid #1d4d2d',
                color: '#8ee6a5',
                fontSize: '14px',
              }}
            >
              {success}
            </Box>
          )}

          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: '10px',
                background: '#201010',
                border: '1px solid #4d1d1d',
                color: '#ff8e8e',
                fontSize: '14px',
              }}
            >
              {error}
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            endIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            sx={{
              py: 1.5,
              borderRadius: '10px',
              textTransform: 'none',
              fontSize: '16px',
              fontWeight: 700,
              background: '#ffffff',
              color: '#000000',
              boxShadow: 'none',
              '&:hover': {
                background: '#e5e5e5',
                boxShadow: '0 10px 30px rgba(255,255,255,0.12)',
              },
              '&.Mui-disabled': {
                background: '#444444',
                color: '#888888',
              },
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const fieldStyles = {
  '& .MuiInputLabel-root': {
    color: '#888888',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ffffff',
  },

  '& .MuiOutlinedInput-root': {
    color: '#ffffff',
    background: '#0b0b0b',
    borderRadius: '10px',

    '& fieldset': {
      borderColor: '#292929',
    },

    '&:hover fieldset': {
      borderColor: '#555555',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#ffffff',
    },
  },

  '& .MuiOutlinedInput-input::placeholder': {
    color: '#555555',
    opacity: 1,
  },

  '& .MuiFormHelperText-root': {
    color: '#ff6b6b',
  },
};

export default Contact;