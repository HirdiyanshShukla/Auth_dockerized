import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function InputField({ label, type = "text", value, onChange, error }) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"

  return (
    <div className="mb-4 relative"> {/* 🛠 Add relative here */}
      <label className="block mb-1 text-sm font-medium">{label}</label>
      
      <input
        type={isPassword && show ? "text" : type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 pr-10 border rounded-xl focus:outline-none focus:ring-2 ${
          error ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-400'
        }`}
      />

      {isPassword && (
        <div
          onClick={() => setShow(!show)}
          className="absolute right-3 top-9 text-gray-500 cursor-pointer text-lg"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
