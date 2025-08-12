export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md border inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
