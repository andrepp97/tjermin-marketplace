import React, { useState } from 'react'

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <div className="w-full bg-[#F8FAFC] mt-28 py-14 px-4 sm:px-8 border-t border-slate-100">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1120] tracking-tight">
          Stay Updated
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-lg mx-auto">
          Subscribe to receive notifications about new inventory and special offers
        </p>

        <form
          onSubmit={handleSubscribe}
          className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full sm:flex-1 px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-[#1C355E] hover:bg-[#142746] rounded-lg transition-colors shadow-sm active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
