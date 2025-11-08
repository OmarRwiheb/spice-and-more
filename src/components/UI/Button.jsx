import React from 'react'

const Button = ({ children }) => {
  return (
    <div className="mt-10">
      <a
        href="/products"
        className="inline-block px-6 py-3 border-2 border-[#e0a800] text-white rounded-full font-semibold hover:bg-[#e0a800] transition"
      >
        {children}
      </a>
    </div>
  )
}

export default Button