export default function BadgeEstado({ estado }) {
  const color = { aprobada: 'success', pendiente: 'warning', rechazada: 'danger', disponible: 'success', mantenimiento: 'secondary' }[estado] || 'secondary';
  return <span className={`badge text-bg-${color}`}>{estado}</span>;
}
