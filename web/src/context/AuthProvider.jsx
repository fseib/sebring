import { useCallback, useEffect, useMemo, useState } from 'react'
import baseUsers from '../data/users.js'
import { AuthContext } from './AuthContext.js'

const SESSION_KEY = 'sebring:session'
const PROFILES_KEY = 'sebring:profiles'

// Campos que el usuario puede editar desde "Mis datos"
const PROFILE_FIELDS = ['name', 'email', 'phone', 'document', 'city']

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    if (value == null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Sin acceso a localStorage: los datos solo duran mientras la pestaña esté abierta
  }
}

// Lo que se expone a la app: nunca la contraseña
function toPublic({ password: _password, ...user }) {
  return user
}

// Autenticación de demo: usuarios hardcodeados en data/users.js + cambios guardados en el navegador
export function AuthProvider({ children }) {
  // { [userId]: { name, email, ..., password } } con lo que cada usuario modificó
  const [overrides, setOverrides] = useState(() => readJson(PROFILES_KEY, {}))
  const [userId, setUserId] = useState(() => readJson(SESSION_KEY, null)?.id ?? null)

  const accounts = useMemo(() => baseUsers.map((u) => ({ ...u, ...overrides[u.id] })), [overrides])
  const account = accounts.find((u) => u.id === userId) ?? null
  const user = useMemo(() => (account ? toPublic(account) : null), [account])

  useEffect(() => writeJson(PROFILES_KEY, overrides), [overrides])
  useEffect(() => writeJson(SESSION_KEY, userId == null ? null : { id: userId }), [userId])

  // Devuelve el usuario logueado o null si las credenciales no coinciden
  const login = useCallback(
    (username, password) => {
      const found = accounts.find((u) => u.username === username.trim().toLowerCase() && u.password === password)
      if (!found) return null
      setUserId(found.id)
      return toPublic(found)
    },
    [accounts],
  )

  const logout = useCallback(() => setUserId(null), [])

  const updateProfile = useCallback(
    (data) => {
      if (userId == null) return
      const changes = Object.fromEntries(PROFILE_FIELDS.map((field) => [field, String(data[field] ?? '').trim()]))
      setOverrides((prev) => ({ ...prev, [userId]: { ...prev[userId], ...changes } }))
    },
    [userId],
  )

  // Devuelve un mensaje de error o null si se pudo cambiar
  const changePassword = useCallback(
    (current, next) => {
      if (!account) return 'No hay una sesión activa.'
      if (account.password !== current) return 'La contraseña actual no es correcta.'
      setOverrides((prev) => ({ ...prev, [account.id]: { ...prev[account.id], password: next } }))
      return null
    },
    [account],
  )

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      logout,
      updateProfile,
      changePassword,
    }),
    [user, login, logout, updateProfile, changePassword],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
