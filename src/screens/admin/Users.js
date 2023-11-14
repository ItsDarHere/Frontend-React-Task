import React, { useEffect, useState } from "react";

const Users = () => {
  const [userData, setUserData] = useState([]);

  const handleRemoveChange = async (userId) => {
    try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user/delete/" + userId,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      };
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/read", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
    <div className="header-container mt-5 mb-5">
        <h1 className="feedback-heading" style={{textAlign: 'center' }}>
            Users List Here
        </h1>
    </div>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleRemoveChange(user.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </div>
  );
};

export default Users;
