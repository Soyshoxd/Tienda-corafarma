import { getSliders } from '@/lib/firebase-cache';
import SliderClient from './slider-client';

export default async function ImageSlider() {
  // Obtener imágenes desde caché/Firebase
  const images = await getSliders();

  return <SliderClient images={images} />;
}
