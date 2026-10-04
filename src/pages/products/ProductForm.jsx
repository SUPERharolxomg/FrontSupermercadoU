import AlertMessage from '../../components/common/AlertMessage';
import FormCard from '../../components/common/FormCard';
import FormField from '../../components/common/FormField';
import { useOptions } from '../../hooks/useOptions';
import { useResourceForm } from '../../hooks/useResourceForm';
import { productService, providerService } from '../../services';

const initialValues = { nombre: '', precio: '', stock: '', categoria: '', providerId: '' };

const toPayload = (v) => ({
  nombre: v.nombre.trim(),
  precio: Number(v.precio),
  stock: Number(v.stock || 0),
  categoria: v.categoria.trim() || null,
  providerId: v.providerId ? Number(v.providerId) : null,
});

const fromEntity = (p) => ({
  nombre: p.nombre ?? '',
  precio: p.precio ?? '',
  stock: p.stock ?? '',
  categoria: p.categoria ?? '',
  providerId: p.providerId ?? '',
});

export default function ProductForm() {
  const form = useResourceForm({
    service: productService,
    initialValues,
    fromEntity,
    toPayload,
    redirectTo: '/productos',
    entityName: 'Producto',
  });
  const { options: providers, error: providersError } = useOptions(providerService);
  const { values, handleChange } = form;

  return (
    <FormCard title="producto" icon="box-seam" cancelTo="/productos" onSubmit={form.handleSubmit} {...form}>
      <div className="col-12">
        <AlertMessage message={providersError && `No se pudieron cargar los proveedores: ${providersError}`} variant="warning" />
      </div>
      <FormField label="Nombre" name="nombre" value={values.nombre} onChange={handleChange} required placeholder="Ej: Arroz 1kg" />
      <FormField label="Categoría" name="categoria" value={values.categoria} onChange={handleChange} placeholder="Ej: Granos" />
      <FormField label="Precio" name="precio" type="number" min="0.01" step="0.01" value={values.precio} onChange={handleChange} required col="col-md-4" />
      <FormField label="Stock" name="stock" type="number" min="0" step="1" value={values.stock} onChange={handleChange} required col="col-md-4" />
      <FormField
        label="Proveedor"
        name="providerId"
        value={values.providerId}
        onChange={handleChange}
        col="col-md-4"
        placeholder="Sin proveedor"
        options={providers.map((p) => ({ value: p.id, label: p.nombre }))}
      />
    </FormCard>
  );
}
