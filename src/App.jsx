import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API}/products`)
      const data = await res.json()
      setProducts(data)
      setFiltered(data)
    } catch (e) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => {
    const t = term.trim().toLowerCase()
    if (!t) { setFiltered(products); return }
    setFiltered(products.filter(p => p.title.toLowerCase().includes(t)))
  }

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(it => it.id === product.id)
      if (existing) {
        return prev.map(it => it.id === product.id ? { ...it, qty: it.qty + 1 } : it)
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }]
    })
  }

  const inc = (id) => setCart(prev => prev.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it))
  const dec = (id) => setCart(prev => prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it))

  const cartCount = useMemo(() => cart.reduce((s, it) => s + it.qty, 0), [cart])

  const checkout = async () => {
    try {
      const payload = {
        customer_name: 'Guest',
        customer_email: 'guest@example.com',
        customer_address: '123 Demo Street',
        items: cart.map(it => ({ product_id: it.id, quantity: it.qty }))
      }
      const res = await fetch(`${API}/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Checkout failed')
      const id = await res.json()
      alert(`Order placed! ID: ${id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Checkout failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar onSearch={handleSearch} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Featured Products</h1>

        {loading && (
          <div className="text-slate-300">Loading products...</div>
        )}
        {error && (
          <div className="text-red-400">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
