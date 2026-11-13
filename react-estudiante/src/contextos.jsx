import { createContext, useContext, useState } from 'react';
import datos from './data/db.json';
import { validarCorreo } from './core/validadores.js';

export const AuthContext = createContext(null);
export const ThemeContext = createContext(null);
export const useAuth = () => useContext(AuthContext);
export const useTheme = () => useContext(ThemeContext);

export function Proveedores({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [oscuro, setOscuro] = useState(false);
  function login(correo, password) {
    validarCorreo(correo);
    const encontrado = datos.usuarios.find(u => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password && u.rol === 'estudiante');
    if (!encontrado) throw new Error('Correo o contraseña incorrectos.');
    setUsuario(encontrado);
  }
  return <AuthContext.Provider value={{ usuario, login, logout: () => setUsuario(null) }}>
    <ThemeContext.Provider value={{ oscuro, alternar: () => setOscuro(v => !v) }}>{children}</ThemeContext.Provider>
  </AuthContext.Provider>;
}
