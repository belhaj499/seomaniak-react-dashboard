import { useState } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const storageKey = 'dashboard-users';

const getSavedUsers = () => {
  const savedUsers = localStorage.getItem(storageKey);

  if (!savedUsers) {
    return [];
  }

  try {
    return JSON.parse(savedUsers);
  } catch (error) {
    return [];
  }
};

const normalizeUser = (user) => {
  const roleMap = {
    Developer: 'Développeur',
    Designer: 'Designer',
    Manager: 'Manager',
  };

  const statusMap = {
    Active: 'Actif',
    Inactive: 'Inactif',
  };

  return {
    ...user,
    role: roleMap[user.role] || user.role,
    status: statusMap[user.status] || user.status,
  };
};

function App() {
  const [users, setUsers] = useState(() => getSavedUsers().map(normalizeUser));
  const [editingUser, setEditingUser] = useState(null);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem(storageKey, JSON.stringify(updatedUsers));
  };

  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    saveUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    saveUsers(updatedUsers);
    setEditingUser(null);
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    saveUsers(updatedUsers);

    if (editingUser && editingUser.id === id) {
      setEditingUser(null);
    }
  };

  const handleSubmit = (userData) => {
    if (editingUser) {
      updateUser({
        ...editingUser,
        ...userData,
      });
      return;
    }

    addUser(userData);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="safha-dashboard">
      <div className="conteneur">
        <Header />
        <Stats users={users} />

        <div className="layout-kbir">
          <UserForm
            editingUser={editingUser}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
          />
          <UserList users={users} onEdit={handleEdit} onDelete={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
