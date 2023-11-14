import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FeedBackListing = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [commnetData, setCommentData] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleCommentChange = (value) => {
    setComments(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/feedback/read",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCommentData = async () => {
      // alert("ok")

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/comment/readbyid/" + selectedFeedback.id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setCommentData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchCommentData();
  }, [selectedFeedback]);

  const handleCommentSubmit = async (comment) => {
    comment.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    const data = {
      comments: comments,
      selectedFeedback: selectedFeedback,
      user: user,
    };
    // console.log(data);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/comment/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // Update the response message
        setResponseMessage("Successfully Added Comment");
        // fetchCommentData();
      } else {
        console.error("API Error:", response.status);

        // Update the response message for invalid comment
        setResponseMessage("Error Occured");
      }
    } catch (error) {
      console.error("An error occurred:", error);

      // Update the response message for errors
      setResponseMessage("An error occurred");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="table-responsive">
      <h1 className="feedback-heading" style={{ textAlign: "center" }}>
        Feedback Items List
      </h1>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Items</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Vote Count</th>
            <th>Submiited By</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={feedback.id}>
              <td>{index + 1}</td>
              <td>{feedback.items}</td>
              <td>{feedback.title}</td>
              <td>{feedback.description}</td>
              <td>{feedback.category}</td>
              <td>{feedback.vote_count}</td>
              <td>{feedback.user.name}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedFeedback(feedback);
                    setShowModal(true);
                  }}
                >
                  Add Comments
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Comment modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Comments for Feedback ID: {selectedFeedback?.items}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleCommentSubmit}>
            {/* Display the response message */}
            {responseMessage && (
              <p className="text-center text-danger">{responseMessage}</p>
            )}
            <ReactQuill
              value={comments}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image", "code-block"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "link",
                "image",
                "code-block",
              ]}
            />
            <br />
            <button type="submit">Submit Comment</button>
          </form>
          <h5>All Comments</h5>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Comment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {commnetData.map((comment, index) => (
                <tr key={comment.id}>
                  <td>{comment.user.name}</td>
                  <td
                    dangerouslySetInnerHTML={{ __html: comment.comment }}
                  ></td>
                  <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeedBackListing;
