import React, { useState } from 'react';
import TagSuggestion from '../tagSuggestion/TagSuggestion';
import MainBlock from '../mainBlock/MainBlock';

function MainScreen({ videos, setTagFilter }) {
  const [username, setUsername] = useState('');

  const create = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username })
      });
      const users = await response.json();
      console.log(users);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="main-content">
      <TagSuggestion setTagFilter={setTagFilter} />
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={create}>Add</button><br />
      <MainBlock videos={videos} />
    </div>
  );
}

export default MainScreen;
