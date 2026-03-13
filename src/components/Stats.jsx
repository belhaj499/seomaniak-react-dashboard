function Stats({ users }) {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Actif').length;
  const inactiveUsers = totalUsers - activeUsers;

  const stats = [
    { label: 'Total des utilisateurs', value: totalUsers },
    { label: 'Utilisateurs actifs', value: activeUsers },
    { label: 'Utilisateurs inactifs', value: inactiveUsers },
  ];

  return (
    <section className="ihsa2iyat">
      {stats.map((item) => (
        <div className="boite carte-stat" key={item.label}>
          <p>{item.label}</p>
          <h2>{item.value}</h2>
        </div>
      ))}
    </section>
  );
}

export default Stats;
