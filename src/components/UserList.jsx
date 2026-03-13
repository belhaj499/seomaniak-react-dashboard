function UserList({ users, onEdit, onDelete }) {
  return (
    <section className="boite">
      <div className="ras-boite">
        <h2>Liste des utilisateurs</h2>
        <p>{users.length} utilisateurs enregistrés dans le local storage.</p>
      </div>

      {users.length === 0 ? (
        <div className="message-khawi">
          <p>Aucun utilisateur ajouté pour le moment.</p>
        </div>
      ) : (
        <div className="boite-table">
          <table className="table-users">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className={
                        user.status === 'Actif'
                          ? 'hala active'
                          : 'hala inactive'
                      }
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-table">
                      <button
                        className="btn btn-thani"
                        type="button"
                        onClick={() => onEdit(user)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-mas7"
                        type="button"
                        onClick={() => onDelete(user.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default UserList;
