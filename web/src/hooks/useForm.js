import { useCallback, useState } from 'react'

// Manejo simple de formularios controlados.
// rules: { campo: (valor, valores) => 'mensaje de error' | undefined }
export function useForm(initialValues, rules = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }, [])

  // Para usar directo en onChange de inputs, selects y checkboxes
  const handleChange = useCallback(
    (event) => {
      const { name, type, value, checked } = event.target
      setValue(name, type === 'checkbox' ? checked : value)
    },
    [setValue],
  )

  // Valida solo los campos indicados (útil en formularios por pasos)
  const validate = (fields = Object.keys(rules)) => {
    const nextErrors = {}
    fields.forEach((field) => {
      const message = rules[field]?.(values[field], values)
      if (message) nextErrors[field] = message
    })
    setErrors((prev) => ({ ...prev, ...Object.fromEntries(fields.map((f) => [f, nextErrors[f]])) }))
    return Object.keys(nextErrors).length === 0
  }

  const reset = useCallback((next = initialValues) => {
    setValues(next)
    setErrors({})
  }, [initialValues])

  return { values, errors, setValue, handleChange, validate, reset }
}

// Validaciones reutilizables
export const required = (message = 'Campo obligatorio') => (value) =>
  String(value ?? '').trim() ? undefined : message

export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '')) ? undefined : 'Ingresá un email válido'
