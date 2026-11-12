import { IdCard, KeyRound, Mail, MapPin, Phone, Save, UserRound } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, FormGrid, SectionHeading, TextField } from '../../components/ui'
import { useAuth } from '../../hooks/useAuth.js'
import { isEmail, required, useForm } from '../../hooks/useForm.js'
import { useToast } from '../../hooks/useToast.js'

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;

  @media ${({ theme }) => theme.media.md} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`

const profileRules = {
  name: required(),
  email: isEmail,
  phone: (v) => (!v || String(v).replace(/\D/g, '').length >= 8 ? undefined : 'Ingresá un teléfono válido'),
  document: (v) => (!v || String(v).replace(/\D/g, '').length >= 7 ? undefined : 'Ingresá un DNI o CUIT válido'),
}

const passwordRules = {
  current: required(),
  next: (v) => (String(v).length >= 4 ? undefined : 'Mínimo 4 caracteres'),
  confirm: (v, values) => (v === values.next ? undefined : 'Las contraseñas no coinciden'),
}

const emptyPasswords = { current: '', next: '', confirm: '' }

// "Mis datos": edición del perfil y cambio de contraseña
function ProfilePage() {
  const { user, updateProfile, changePassword } = useAuth()
  const { showToast } = useToast()
  const [initialProfile] = useState(() => ({
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
    document: user.document ?? '',
    city: user.city ?? '',
  }))
  const profile = useForm(initialProfile, profileRules)
  const passwords = useForm(emptyPasswords, passwordRules)

  const handleProfile = (event) => {
    event.preventDefault()
    if (!profile.validate()) return
    updateProfile(profile.values)
    showToast({ title: 'Datos actualizados', message: 'Tus cambios se guardaron correctamente.' })
  }

  const handlePassword = (event) => {
    event.preventDefault()
    if (!passwords.validate()) return
    const error = changePassword(passwords.values.current, passwords.values.next)
    if (error) {
      showToast({ title: 'No se pudo cambiar la contraseña', message: error, tone: 'danger' })
      return
    }
    passwords.reset(emptyPasswords)
    showToast({ title: 'Contraseña actualizada', message: 'La próxima vez ingresá con la nueva contraseña.' })
  }

  return (
    <Layout>
      <Card $padding={28}>
        <SectionHeading title="Datos personales" subtitle="Se usan para completar tus reservas." spacing={20} />
        <Form onSubmit={handleProfile} noValidate>
          <FormGrid>
            <TextField
              label="Nombre y apellido"
              name="name"
              icon={UserRound}
              autoComplete="name"
              value={profile.values.name}
              onChange={profile.handleChange}
              error={profile.errors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              autoComplete="email"
              value={profile.values.email}
              onChange={profile.handleChange}
              error={profile.errors.email}
            />
            <TextField
              label="Teléfono"
              name="phone"
              type="tel"
              icon={Phone}
              autoComplete="tel"
              value={profile.values.phone}
              onChange={profile.handleChange}
              error={profile.errors.phone}
            />
            <TextField
              label="DNI / CUIT"
              name="document"
              icon={IdCard}
              value={profile.values.document}
              onChange={profile.handleChange}
              error={profile.errors.document}
            />
            <TextField
              label="Ciudad"
              name="city"
              icon={MapPin}
              autoComplete="address-level2"
              value={profile.values.city}
              onChange={profile.handleChange}
            />
            <TextField label="Usuario" value={user.username} disabled hint="El nombre de usuario no se puede cambiar." />
          </FormGrid>
          <Actions>
            <Button type="submit" icon={Save}>
              Guardar cambios
            </Button>
          </Actions>
        </Form>
      </Card>

      <Card $padding={28}>
        <SectionHeading title="Contraseña" spacing={20} />
        <Form onSubmit={handlePassword} noValidate>
          <TextField
            label="Contraseña actual"
            name="current"
            type="password"
            icon={KeyRound}
            autoComplete="current-password"
            value={passwords.values.current}
            onChange={passwords.handleChange}
            error={passwords.errors.current}
          />
          <TextField
            label="Nueva contraseña"
            name="next"
            type="password"
            icon={KeyRound}
            autoComplete="new-password"
            value={passwords.values.next}
            onChange={passwords.handleChange}
            error={passwords.errors.next}
          />
          <TextField
            label="Repetir nueva contraseña"
            name="confirm"
            type="password"
            icon={KeyRound}
            autoComplete="new-password"
            value={passwords.values.confirm}
            onChange={passwords.handleChange}
            error={passwords.errors.confirm}
          />
          <Button type="submit" variant="secondary" fullWidth>
            Cambiar contraseña
          </Button>
        </Form>
      </Card>
    </Layout>
  )
}

export default ProfilePage
