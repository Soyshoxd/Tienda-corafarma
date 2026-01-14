export function getDiscountedPrice(precio,descuento) {
    if (!descuento || descuento <= 0) return precio;

    return Math.round(precio - (precio * (descuento / 100)));
}