import AlertMessage from '../../components/common/AlertMessage';
import FormCard from '../../components/common/FormCard';
import FormField from '../../components/common/FormField';
import { useOptions } from '../../hooks/useOptions';
import { useResourceForm } from '../../hooks/useResourceForm';
import { productService, saleService, userService } from '../../services';
import { toDateTimeLocal } from '../../utils/format';
import SaleLinesEditor, { emptyLine } from './SaleLinesEditor';

const initialValues = { userId: '', date: toDateTimeLocal(), lines: [emptyLine()] };

const toPayload = (v) => ({
  userId: Number(v.userId),
  date: new Date(v.date).toISOString(),
  details: v.lines.map((line) => ({
    productId: Number(line.productId),
    quantity: Number(line.quantity),
    ...(line.price !== '' && { price: Number(line.price) }),
  })),
});

const fromEntity = (sale) => ({
  userId: sale.userId,
  date: toDateTimeLocal(sale.date),
  lines: sale.details?.length
    ? sale.details.map((d) => ({ productId: d.productId, quantity: d.quantity, price: Number(d.price) }))
    : [emptyLine()],
});

export default function SaleForm() {
  const form = useResourceForm({
    service: saleService,
    initialValues,
    fromEntity,
    toPayload,
    redirectTo: '/ventas',
    entityName: 'Venta',
  });
  const { options: users, error: usersError } = useOptions(userService);
  const { options: products, error: productsError } = useOptions(productService);
  const { values, setValues, handleChange } = form;
  const optionsError = usersError || productsError;

  return (
    <FormCard title="venta" icon="cart-plus" cancelTo="/ventas" onSubmit={form.handleSubmit} {...form}>
      <div className="col-12">
        <AlertMessage message={optionsError && `No se pudieron cargar los datos: ${optionsError}`} variant="warning" />
      </div>
      <FormField
        label="Usuario"
        name="userId"
        value={values.userId}
        onChange={handleChange}
        required
        options={users.map((u) => ({ value: u.id, label: `${u.nombre} (${u.rol})` }))}
      />
      <FormField label="Fecha" name="date" type="datetime-local" value={values.date} onChange={handleChange} required />
      <SaleLinesEditor
        lines={values.lines}
        products={products}
        onChange={(lines) => setValues((current) => ({ ...current, lines }))}
      />
    </FormCard>
  );
}
