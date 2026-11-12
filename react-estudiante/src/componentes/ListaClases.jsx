import TarjetaClase from './TarjetaClase.jsx';
export default function ListaClases({ clases, cupos }) {
  if (!clases.length) return <p>No hay clases para estos filtros.</p>;
  return <div className="row g-3">{clases.map(clase =>
    <div className="col-md-6 col-lg-4" key={clase.id}><TarjetaClase clase={clase} disponibles={cupos(clase)} /></div>)}</div>;
}
