import "../styles/UserManagement.css";
import { useEffect, useState } from "react";
import {
  getUsers,
  getUserStats,
} from "../../api/adminService.js";


const UserManagement = () => {

  
const [users, setUsers] = useState([]);
const [stats, setStats] = useState({});

useEffect(() => {
  loadUsers();
  loadStats();
}, []);

const loadUsers = async () => {
  const data = await getUsers();
  setUsers(data.content);
};

const loadStats = async () => {
  const data = await getUserStats();
  setStats(data);
};
  return (
    <div className="admin-users-page">

      <div className="admin-page-header">
        <div>
          <h2>User Management</h2>
          <p>Monitor platform users</p>
        </div>

        <button className="admin-export-btn">
          Export Data
        </button>
      </div>

      <div className="admin-user-stats">

        <div className="admin-user-card">
          <h4>Total Users</h4>
<h2>{stats.totalUsers}</h2>
        </div>

        <div className="admin-user-card">
          <h4>Total Owners</h4>
<h2>{stats.totalOwners}</h2>
        </div>

        <div className="admin-user-card">
          <h4>Total Agents</h4>
<h2>{stats.totalAgents}</h2>
        </div>

        <div className="admin-user-card">
          <h4>Verified Users</h4>
<h2>{stats.verifiedUsers}</h2>        </div>

      </div>

      <div className="admin-user-table-wrapper">

        <table className="admin-user-table">

          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

         <tbody>
  {users.map((user) => (
    <tr key={user.id}>
      <td>{user.fullName}</td>

      <td>{user.phone}</td>

      <td>
        {user.enabled ? "Active" : "Disabled"}
      </td>

      <td>
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      <td>
        View
      </td>
    </tr>
  ))}
</tbody>

        </table>

      </div>
    </div>
  );
};

export default UserManagement;