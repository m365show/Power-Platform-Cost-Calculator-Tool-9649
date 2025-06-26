import React from 'react';

const UserRoleManagement = () => {
  const roles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'CONSULTANT', 'VIEWER'];

  return (
    <div>
      <h2>User Role Management</h2>
      <p>This is a placeholder component. You can extend it to manage roles, permissions, etc.</p>
      <ul>
        {roles.map(role => (
          <li key={role}>{role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserRoleManagement;
