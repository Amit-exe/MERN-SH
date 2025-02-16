const InputField = ({ name, type, placeholder, value, onChange, error }) => {
  return (
    <input
      name={name} // ✅ Add this to correctly update the state
      className={`p-3 rounded-xl text-white placeholder-gray-300 bg-gray-700 ${
        error ? "border-2 border-red-500" : "border-2 border-transparent"
      }`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
