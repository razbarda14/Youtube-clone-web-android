// authService.js
export const loginUser = async (username, password) => {
  if (!username || !password) {
    console.error('Username or password is missing.');
    return null;
  }

  try {
    // Make an API call to get user ID by username
    const response = await fetch(`http://localhost:8080/users/getUserId?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const { id } = await response.json();

      // Use the user ID to get the user details
      const userResponse = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (userResponse.ok) {
        const user = await userResponse.json();
        // Check if the passwords match
        if (user.password === password) {
          return user; // Return user object if valid
        } else {
          return null; // Invalid password
        }
      } else {
        return null; // User not found
      }
    } else {
      return null; // User not found
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};
