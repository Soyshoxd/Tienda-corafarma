import { getMarcas } from '@/lib/firebase-cache';
import BrandSliderClient from './slider-marcas-client';

export default async function BrandSlider() {
  // Obtener marcas desde caché/Firebase
  const images = await getMarcas();

  return <BrandSliderClient images={images} />;
}
