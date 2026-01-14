// components/slider-wrapper.jsx (SERVER)
import { getProductos } from "@/lib/firebase-cache";
import SliderProductos from "./sliderproductos";

export default async function SliderProductosWrapper() {
  const productos = await getProductos();

  return <SliderProductos productos={productos} />;
}
