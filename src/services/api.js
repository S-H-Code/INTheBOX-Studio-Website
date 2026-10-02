/**
 * API Service for INTheBOX Studio
 * Communicates with /api/enquiries on Express backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const submitEnquiry = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit enquiry');
    }
    return data;
  } catch (error) {
    console.error('[API Submit Error]:', error);
    throw error;
  }
};

export const fetchEnquiries = async (filter = {}) => {
  try {
    const params = new URLSearchParams(filter).toString();
    const res = await fetch(`${BASE_URL}/api/enquiries?${params}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to fetch enquiries');
    }
    return data;
  } catch (error) {
    console.error('[API Fetch Error]:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    return await res.json();
  } catch (error) {
    return { status: 'offline', error: error.message };
  }
};
