export function buildCategorias({categorias}) {
  console.log(categorias);
  if (!Array.isArray(categorias)) return []

  return categorias
    .filter(cat => cat.parentId === null)
    .map(cat => ({
      ...cat,
      subcategorias: categorias.filter(
        sub => sub.parentId === cat.id
      )
    }))
    
}

