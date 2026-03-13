import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  email: '',
  role: 'Développeur',
  status: 'Actif',
};

function UserForm({ editingUser, onSubmit, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
      });
      return;
    }

    setFormData(emptyForm);
  }, [editingUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData(emptyForm);
  };

  return (
    <section className="boite">
      <div className="ras-boite">
        <h2>{editingUser ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
        <p>Remplissez le formulaire pour gérer les utilisateurs.</p>
      </div>

      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="groupe-input">
          <label htmlFor="name">Nom</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Entrez le nom complet"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="groupe-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Entrez l'adresse email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid-form">
          <div className="groupe-input">
            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Développeur">Développeur</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="groupe-input">
            <label htmlFor="status">Statut</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
        </div>

        <div className="actions-form">
          <button className="btn btn-principal" type="submit">
            {editingUser ? 'Modifier' : 'Ajouter'}
          </button>

          {editingUser && (
            <button
              className="btn btn-thani"
              type="button"
              onClick={onCancelEdit}
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default UserForm;
