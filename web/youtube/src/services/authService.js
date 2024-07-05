const API_URL = 'http://localhost:8080/auth';

export const registerUser = async (username, displayName, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, displayName, password }),
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { user, token } = await response.json();
      localStorage.setItem('token', token); // Store the token
      return user; // Return the user object
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

export const fetchProtectedData = async (route) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:8080/${route}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Failed to fetch protected data');
  }
};
