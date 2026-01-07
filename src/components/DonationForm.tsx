import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { DollarSign, Heart, Check } from 'lucide-react';

export function DonationForm() {
  const [formData, setFormData] = useState({
    donor_name: '',
    donor_email: '',
    amount: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const quickAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase
        .from('donations')
        .insert([
          {
            donor_name: formData.donor_name,
            donor_email: formData.donor_email,
            amount: parseFloat(formData.amount),
            message: formData.message
          }
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({
        donor_name: '',
        donor_email: '',
        amount: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to process donation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const selectAmount = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      amount: amount.toString()
    }));
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Make a Donation
          </h2>
          <p className="text-xl text-blue-700">
            Your contribution helps us continue our mission of transforming lives
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl">
          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-2 animate-fade-in">
              <Check className="w-5 h-5" />
              <span>Thank you for your generous donation!</span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label className="block text-blue-900 font-semibold mb-3 text-lg">
                Select Amount
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {quickAmounts.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => selectAmount(amount)}
                    className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                      formData.amount === amount.toString()
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Or enter custom amount"
                  required
                  min="1"
                  step="0.01"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/50"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="donor_name"
                value={formData.donor_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/50"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-900 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="donor_email"
                value={formData.donor_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/50"
                placeholder="john@example.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-blue-900 font-semibold mb-2">
                Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:outline-none transition-colors bg-white/50 resize-none"
                placeholder="Share why you're supporting our cause..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  Complete Donation
                </>
              )}
            </button>
          </form>

          <p className="text-center text-blue-600 text-sm mt-6">
            Your donation is secure and will be used to support our charitable programs
          </p>
        </div>
      </div>
    </section>
  );
}
