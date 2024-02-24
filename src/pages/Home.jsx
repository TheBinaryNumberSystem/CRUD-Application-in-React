import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          setData(data.filter((user) => user.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center my-7">List of Users</h1>
      <div className="overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="mx-auto max-w-lg">
            <input
              type="text"
              className="bg-gray-200 text-gray-800 border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
              onChange={handleSearch}
              placeholder="Search by name"
            />
          </div>

          <Link
            to="/create"
            className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Add +
          </Link>
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Sl. No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone No.</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="border px-4 py-2 text-center">{d.id}</td>
                <td className="border px-4 py-2">{d.name}</td>
                <td className="border px-4 py-2">{d.email}</td>
                <td className="border px-4 py-2 text-center">{d.phone}</td>
                <td className="border px-4 py-2">{d.address}</td>
                <td className="border px-4 py-2">{d.message}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <Link
                    to={`/read/${d.id}`}
                    className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
