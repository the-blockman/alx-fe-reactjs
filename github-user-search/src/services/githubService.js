import axios from "axios";

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
