import { NavLink } from 'react-router-dom';
import { useAuth, useTheme } from '../contextos.jsx';
export default function Navbar({ titulo }) {
  const { usuario, logout } = useAuth();
  const { oscuro, alternar } = useTheme();
  return <nav className="navbar navbar-expand navbar-dark bg-dark"><div className="container flex-wrap gap-2">
    <NavLink className="navbar-brand fw-bold" to="/">{titulo}</NavLink>
    <div className="d-flex align-items-center flex-wrap gap-3">
      <NavLink to="/catalogo">Catálogo</NavLink>
      <NavLink to="/mis-matriculas">Mis matrículas</NavLink>
      <NavLink to="/nueva-matricula">Matricularme</NavLink>
      {usuario ? <button className="btn btn-sm btn-outline-light" onClick={logout}>Salir: {usuario.nombre}</button> : <NavLink to="/login">Iniciar sesión</NavLink>}
      <button className="btn btn-sm btn-outline-warning" onClick={alternar}>{oscuro ? 'Modo claro' : 'Modo oscuro'}</button>
    </div>
  </div></nav>;
}
