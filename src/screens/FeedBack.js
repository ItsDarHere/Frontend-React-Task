import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const FeedBack = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [vote, setVote] = useState("");
  const [item, setItem] = useState("");

  const [user, setUser] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // New state variable for the response message

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleVoteChange = (e) => {
    setVote(e.target.value);
  };
  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    const data = {
      title: title,
      description: description,
      category: category,
      vote: vote,
      item: item,
      user:user,
    };
    console.log(data);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/feedback/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Update the response message
        setResponseMessage("Successfully Added Feeback");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("API Error:", response.status);

        // Update the response message for invalid credentials
        setResponseMessage("Feedback for this item already exists for the user.");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      // Update the response message for errors
      setResponseMessage("An error occurred");
    }
  };

  return (
    <section
      className="h-100 "
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-xl-6 mt-4">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-12">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="/images/feedback1.png"
                        style={{ width: "155px" }}
                        alt="logo"
                      />
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p className="text-center">Please Fill This Feilds</p>
                      {/* Display the response message */}
                      {responseMessage && (
                        <p className="text-center text-danger">
                          {responseMessage}
                        </p>
                      )}
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Title
                        </label>
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Title"
                          value={title}
                          onChange={handleTitleChange}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example11">
                        Description
                        </label>
                        <input
                          type="text"
                          id="form3Example11"
                          className="form-control"
                          placeholder="Description"
                          value={description}
                          onChange={handleDescriptionChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="item" className="form-label">
                          Item:
                        </label>
                        <select
                          id="item"
                          name="item"
                          value={item}
                          onChange={handleItemChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select Item</option>
                          <option value="items 1">Item 1</option>
                          <option value="items 2">Item 2</option>
                          <option value="items 3">Item 3</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Vote:
                        </label>
                        <select
                          id="vote"
                          name="vote"
                          value={vote}
                          onChange={handleVoteChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select Vote</option>
                          <option value="1"> 1</option>
                          <option value="2"> 2</option>
                          <option value="3"> 3</option>
                          <option value="4"> 4</option>
                          <option value="5"> 5</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category:
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={category}
                          onChange={handleCategoryChange}
                          className="form-select"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Bug Report">Bug Report</option>
                          <option value="Feature Request">Feature Request</option>
                          <option value="Improvement">Improvement</option>
                        </select>
                      </div>
                      <div className="text-center mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Log in
                        </button>

                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedBack;
