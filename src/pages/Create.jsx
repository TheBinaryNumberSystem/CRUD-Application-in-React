import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setNextId(
          (Math.max(...res.data.map((user) => user.id)) + 1).toString()
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...values, id: nextId };
      await axios.post("http://localhost:3000/users", newUser);
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <h1 className="text-3xl font-semibold text-center bg-gray-200 py-4">
          Add a User
        </h1>
        <form onSubmit={handleSubmit} className="px-6 py-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter name..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone No:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter phone no..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter address..."
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 font-bold mb-2"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter message..."
              rows="3"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center">
            <button className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
