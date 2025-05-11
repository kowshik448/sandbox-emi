export const TextInput = ({ title, state, setState }) => {
  return (
    <div>
      <div>{title}</div>
      <input
        type="number"
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder={title}
      />
    </div>
  );
};
