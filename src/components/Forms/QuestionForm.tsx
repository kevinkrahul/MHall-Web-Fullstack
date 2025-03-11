"use client";
import { useEffect, useState } from "react";

interface Question {
  id: string;
  text: string;
  answers: string;
}

export default function QuestionForm() {
  const [formData, setFormData] = useState({ text: "", answers: "" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null); // Track editing question ID

  // Fetch questions from API
  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/questions");
      const data = await res.json();
      setQuestions(data);
    }
    fetchQuestions();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing question
      const response = await fetch(`/api/questions/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Question updated successfully!");
        setEditingId(null);
      } else {
        alert("Error updating question.");
      }
    } else {
      // Create new question
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Question added successfully!");
      } else {
        alert("Error adding question.");
      }
    }

    setFormData({ text: "", answers: "" });
    window.location.reload(); // Refresh list
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/questions/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Question deleted successfully!");
      setQuestions(questions.filter((q) => q.id !== id)); // Remove from state
    } else {
      alert("Error deleting question.");
    }
  };

  // Handle edit
  const handleEdit = (question: Question) => {
    setEditingId(question.id);
    setFormData({ text: question.text, answers: question.answers });
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="text"
          placeholder="Enter question"
          value={formData.text}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <textarea
          name="answers"
          placeholder="Enter answer"
          value={formData.answers}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update Question" : "Submit"}
        </button>
      </form>

      {/* List of Questions */}
      <h2 className="text-xl font-bold">Questions</h2>
      <ul className="space-y-2">
        {questions.map((question) => (
          <li key={question.id} className="border p-3 flex justify-between items-center">
            <div>
              <p className="font-semibold">{question.text}</p>
              <p className="text-gray-600">{question.answers}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(question)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(question.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
