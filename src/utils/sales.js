/**
 * Total estimado de una venta, solo para mostrarlo mientras se llena el formulario.
 * El total definitivo lo calcula el backend.
 */
export function estimateSaleTotal(lines, products) {
  return lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === Number(line.productId));
    const price = line.price !== '' ? Number(line.price) : Number(product?.precio ?? 0);
    return sum + (Number(line.quantity) || 0) * price;
  }, 0);
}
