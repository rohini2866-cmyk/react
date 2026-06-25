import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("assignments"));
    if (savedData) {
      setAssignments(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("assignments", JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = () => {
    if (!subject || !title || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      subject,
      title,
      dueDate,
      status: "Pending",
    };

    setAssignments([...assignments, newAssignment]);
    setSubject("");
    setTitle("");
    setDueDate("");
  };

  const toggleStatus = (id) => {
    const updated = assignments.map((item) =>
      item.id === id
        ? {
            ...item,
            status:
              item.status === "Pending"
                ? "Submitted"
                : "Pending",
          }
        : item
    );

    setAssignments(updated);
  };

  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((item) => item.id !== id));
  };

  const filteredAssignments = assignments.filter(
    (item) =>
      item.subject.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      <div className="stats">
        <div className="card">
          <h3>Total Assignments</h3>
          <p>{assignments.length}</p>
        </div>

        <div className="card">
          <h3>Submitted</h3>
          <p>{submittedCount}</p>
        </div>

        <div className="card">
          <h3>Pending</h3>
          <p>{assignments.length - submittedCount}</p>
        </div>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="text"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={addAssignment}>
          Add Assignment
        </button>
      </div>

      <input
        className="search"
        type="text"
        placeholder="Search Assignment..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAssignments.map((item) => (
            <tr key={item.id}>
              <td>{item.subject}</td>
              <td>{item.title}</td>
              <td>{item.dueDate}</td>

              <td>
                <span
                  className={
                    item.status === "Submitted"
                      ? "submitted"
                      : "pending"
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>
                <button
                  className="submitBtn"
                  onClick={() => toggleStatus(item.id)}
                >
                  Toggle Status
                </button>

                <button
                  className="deleteBtn"
                  onClick={() => deleteAssignment(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;