export default function Loading({ text = 'Cargando...' }) {
  return (
    <div className="text-center py-5 text-secondary">
      <div className="spinner-border text-success mb-2" role="status" />
      <div>{text}</div>
    </div>
  );
}
