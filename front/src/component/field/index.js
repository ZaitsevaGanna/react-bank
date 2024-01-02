import "./index.css";

export default function Field({ name, type, placeholder, action, white }) {
  // const action = (e) => {
  //   console.log(e.target.value);
  // };

  return (
    <div className="field">
      <label htmlFor={name} className="field_label">
        {name}
      </label>

      <input
        onInput={action}
        type={type}
        className={`field_input ${white ? `white` : ``}`}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
