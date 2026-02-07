import axios from "axios";

const githubApi = axios.create({
  baseURL: "https://api.github.com",
});

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

  const response = await githubApi.get(
    `/search/users?q=${query}&page=${page}&per_page=10`,
  );

  return response.data.items;
};
