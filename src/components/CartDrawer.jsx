import { useMemo } from 'react'

function CartDrawer({ open, items, onClose, onInc, onDec, onCheckout }) {
  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items])

  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700/60 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-slate-700/60 flex items-center justify-between">
          <h2 className="text-white font-semibold">Your Cart</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-white">Close</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-slate-400">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 bg-slate-800/50 border border-slate-700/60 rounded-xl p-3">
                <div className="h-16 w-16 bg-slate-800 flex items-center justify-center overflow-hidden rounded-lg">
                  {it.image ? <img src={it.image} alt={it.title} className="h-full w-full object-cover"/> : <span className="text-slate-500 text-xs">No image</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{it.title}</p>
                  <p className="text-slate-400 text-sm">${it.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onDec(it.id)} className="px-2 py-1 bg-slate-700 text-white rounded">-</button>
                  <span className="text-white w-6 text-center">{it.qty}</span>
                  <button onClick={() => onInc(it.id)} className="px-2 py-1 bg-slate-700 text-white rounded">+</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-white mb-3">
            <span>Total</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button disabled={items.length===0} onClick={onCheckout} className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg">Checkout</button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
