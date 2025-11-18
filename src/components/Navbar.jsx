import { useState } from 'react'

function Navbar({ onSearch, cartCount, onOpenCart }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="h-8 w-8" />
          <span className="text-white font-bold text-lg">BlueStore</span>
        </a>

        <form onSubmit={submit} className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-800/70 text-slate-100 placeholder-slate-400 border border-slate-700/60 rounded-xl py-2.5 pl-4 pr-28 outline-none focus:border-blue-500"
            />
            <div className="absolute right-1 top-1 bottom-1 flex items-center gap-2">
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg px-3 py-1.5">Search</button>
              <button type="button" onClick={() => onSearch('')} className="text-slate-300 hover:text-white text-sm px-2">Clear</button>
            </div>
          </div>
        </form>

        <button onClick={onOpenCart} className="relative ml-4 inline-flex items-center gap-2 text-slate-200 hover:text-white">
          <span className="i-lucide-shopping-cart" aria-hidden />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="ml-1 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Navbar
