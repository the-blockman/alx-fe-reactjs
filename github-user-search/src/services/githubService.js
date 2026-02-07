import axios from "axios";

// Basic search (Task 1)
export const fetchUserData = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export const fetchAdvancedUsers = async ({
  username,
  location,
  minRepos,
  page,
}) => {
  let query = username || "";

  if (location) {
    query += ` location:${location}`;
  }

  if (minRepos) {
    query += ` repos:>=${minRepos}`;
  }

  const response = await axios.get(
    `https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`,
  );

  return response.data.items;
};
