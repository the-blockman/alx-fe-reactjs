import { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);
    setPage(1);

    try {
      const data = await fetchAdvancedUsers({
        username,
        location,
        minRepos,
        page: 1,
      });
      setUsers(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    const moreUsers = await fetchAdvancedUsers({
      username,
      location,
      minRepos,
      page: nextPage,
    });

    setUsers((prev) => [...prev, ...moreUsers]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min repos"
          className="border p-2 rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">
          Looks like we cant find the user
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <div
            key={user.login}
            className="border rounded p-4 flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="block mx-auto mt-6 bg-gray-200 px-4 py-2 rounded"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default Search;
