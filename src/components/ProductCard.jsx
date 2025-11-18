function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-slate-800/50 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors">
      <div className="aspect-square bg-slate-900/50 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="text-slate-400 text-sm">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-2 min-h-[3.2rem]">{product.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 min-h-[2.5rem]">{product.description || '—'}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-400 font-bold text-lg">${product.price?.toFixed ? product.price.toFixed(2) : product.price}</span>
          <button onClick={() => onAdd(product)} className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg px-3 py-1.5">Add</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
