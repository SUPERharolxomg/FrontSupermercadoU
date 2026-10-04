import FormCard from '../../components/common/FormCard';
import FormField from '../../components/common/FormField';
import { useResourceForm } from '../../hooks/useResourceForm';
import { providerService } from '../../services';

const initialValues = { nombre: '', nit: '', telefono: '', email: '', direccion: '' };

// Los campos opcionales vacíos se envían como null para no romper la validación de email
const toPayload = (v) => ({
  nombre: v.nombre.trim(),
  nit: v.nit.trim(),
  telefono: v.telefono.trim() || null,
  email: v.email.trim() || null,
  direccion: v.direccion.trim() || null,
});

const fromEntity = (p) => ({
  nombre: p.nombre ?? '',
  nit: p.nit ?? '',
  telefono: p.telefono ?? '',
  email: p.email ?? '',
  direccion: p.direccion ?? '',
});

export default function ProviderForm() {
  const form = useResourceForm({
    service: providerService,
    initialValues,
    fromEntity,
    toPayload,
    redirectTo: '/proveedores',
    entityName: 'Proveedor',
  });
  const { values, handleChange } = form;

  return (
    <FormCard title="proveedor" icon="truck" cancelTo="/proveedores" onSubmit={form.handleSubmit} {...form}>
      <FormField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} required placeholder="Ej: Distribuidora Andina" />
      <FormField label="NIT" name="nit" value={values.nit} onChange={handleChange} required placeholder="Ej: 900123456-1" />
      <FormField label="Teléfono" name="telefono" type="tel" value={values.telefono} onChange={handleChange} />
      <FormField label="Email" name="email" type="email" value={values.email} onChange={handleChange} />
      <FormField label="Dirección" name="direccion" value={values.direccion} onChange={handleChange} col="col-12" />
    </FormCard>
  );
}
