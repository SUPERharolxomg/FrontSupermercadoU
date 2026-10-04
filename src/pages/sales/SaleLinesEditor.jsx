import { formatCurrency } from '../../utils/format';
import { estimateSaleTotal } from '../../utils/sales';

export const emptyLine = () => ({ productId: '', quantity: 1, price: '' });

/** Editor de las líneas (detalles) de una venta: producto, cantidad y precio opcional. */
export default function SaleLinesEditor({ lines, products, onChange }) {
  const updateLine = (index, field, value) =>
    onChange(lines.map((line, i) => (i === index ? { ...line, [field]: value } : line)));

  const addLine = () => onChange([...lines, emptyLine()]);
  const removeLine = (index) => onChange(lines.filter((_, i) => i !== index));

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label className="form-label mb-0">
          Productos<span className="text-danger ms-1">*</span>
        </label>
        <button type="button" className="btn btn-sm btn-outline-success" onClick={addLine}>
          <i className="bi bi-plus-lg me-1" />
          Agregar producto
        </button>
      </div>

      <div className="table-responsive border rounded">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ minWidth: 200 }}>Producto</th>
              <th style={{ width: 110 }}>Cantidad</th>
              <th style={{ width: 160 }}>Precio unitario</th>
              <th className="text-end">Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lines.map((line, index) => {
              const product = products.find((p) => p.id === Number(line.productId));
              const unitPrice = line.price !== '' ? Number(line.price) : Number(product?.precio ?? 0);
              return (
                <tr key={index}>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={line.productId}
                      onChange={(e) => updateLine(index, 'productId', e.target.value)}
                      required
                    >
                      <option value="">Seleccione...</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre} (stock: {p.stock})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      className="form-control form-control-sm"
                      value={line.quantity}
                      onChange={(e) => updateLine(index, 'quantity', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      className="form-control form-control-sm"
                      placeholder={product ? String(Number(product.precio)) : 'Precio actual'}
                      value={line.price}
                      onChange={(e) => updateLine(index, 'price', e.target.value)}
                    />
                  </td>
                  <td className="text-end text-nowrap">{formatCurrency((Number(line.quantity) || 0) * unitPrice)}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      title="Quitar"
                      onClick={() => removeLine(index)}
                      disabled={lines.length === 1}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-semibold">
                Total estimado
              </td>
              <td className="text-end fw-bold text-success text-nowrap">{formatCurrency(estimateSaleTotal(lines, products))}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="form-text">
        Si dejas el precio vacío se usa el precio actual del producto. El total definitivo y el descuento de stock los hace el servidor.
      </div>
    </div>
  );
}
