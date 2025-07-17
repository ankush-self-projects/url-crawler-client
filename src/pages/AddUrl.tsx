import { FC, useState, FormEvent } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { addUrl } from '../services/urlService';
import { useAuth } from '../contexts/AuthContext';
import { isValidUrl } from '../utils/validateUrl';
import axios from 'axios';

const AddUrl: FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }
    setLoading(true);
    try {
      if (!token) throw new Error('Not authenticated');
      await addUrl(url);
      setSuccess('URL added successfully!');
      setUrl('');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add URL.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Add URL</Typography>
        <TextField
          label="URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
          fullWidth
        />
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Adding...' : 'Add URL'}
        </Button>
      </Box>
    </Container>
  );
};

export default AddUrl; 