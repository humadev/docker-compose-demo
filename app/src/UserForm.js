import React, { useState, useEffect } from "react";

function UserForm({ addUser, updateUser, editingUser, setEditingUser }) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: "", email: "" });
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, user);
    } else {
      addUser(user);
    }
    setEditingUser(null);
    setUser({ name: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />
      <label>Email:</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
    </form>
  );
}

export default UserForm;
