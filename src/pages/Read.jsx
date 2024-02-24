import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold text-center bg-gray-200 py-4">
          Details of User
        </h3>
        <div className="px-6 py-4">
          <div className="mb-4">
            <strong>Name:</strong> {data.name}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {data.email}
          </div>
          <div className="mb-4">
            <strong>Mobile:</strong> {data.phone}
          </div>
          <div className="mb-4">
            <strong>Address:</strong> {data.address}
          </div>
          <div className="mb-4">
            <strong>Message:</strong> {data.message}
          </div>
          <div className="flex justify-between">
            <Link
              to={`/update/${id}`}
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </Link>
            <Link
              to={"/"}
              className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
