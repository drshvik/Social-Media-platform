export function Following({ users }) {
  return (
    <div>
      {users.map((user, index) => {
        return <Following key={index} user={user} />;
      })}
    </div>
  );
}

const Following = ({ user }) => {};
