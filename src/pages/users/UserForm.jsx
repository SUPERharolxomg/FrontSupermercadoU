import FormCard from '../../components/common/FormCard';
import FormField from '../../components/common/FormField';
import { useResourceForm } from '../../hooks/useResourceForm';
import { userService } from '../../services';
import { ROLES } from './roles';

const initialValues = { nombre: '', email: '', password: '', rol: 'CLIENTE' };

const toPayload = (v) => {
  const payload = { nombre: v.nombre.trim(), email: v.email.trim(), rol: v.rol };
  // Al editar, la contraseña solo se envía si se escribió una nueva
  if (v.password) payload.password = v.password;
  return payload;
};

const fromEntity = (u) => ({ nombre: u.nombre ?? '', email: u.email ?? '', rol: u.rol ?? 'CLIENTE', password: '' });

export default function UserForm() {
  const form = useResourceForm({
    service: userService,
    initialValues,
    fromEntity,
    toPayload,
    redirectTo: '/usuarios',
    entityName: 'Usuario',
  });
  const { values, handleChange, isEdit } = form;

  return (
    <FormCard title="usuario" icon="person-plus" cancelTo="/usuarios" onSubmit={form.handleSubmit} {...form}>
      <FormField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} required placeholder="Ej: Ana Pérez" />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} required placeholder="ana@marketsoft.com" />
      <FormField
        label={isEdit ? 'Nueva contraseña' : 'Contraseña'}
        name="password"
        type="password"
        autoComplete="new-password"
        value={values.password}
        onChange={handleChange}
        required={!isEdit}
        help={isEdit ? 'Déjala vacía para conservar la contraseña actual.' : undefined}
      />
      <FormField
        label="Rol"
        name="rol"
        value={values.rol}
        onChange={handleChange}
        required
        options={ROLES.map((rol) => ({ value: rol, label: rol }))}
      />
    </FormCard>
  );
}
