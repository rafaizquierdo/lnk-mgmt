import React from 'react';
import { Check } from 'lucide-react';

interface PricingPlanProps {
  onSelectPlan: (plan: 'free' | 'paid') => void;
}

export const PricingPlans: React.FC<PricingPlanProps> = ({ onSelectPlan }) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
      {/* Free Plan */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-blue-500 transition-all">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Free Plan</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-gray-500">/month</span>
          </div>
        </div>
        <ul className="mt-8 space-y-4">
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span>1 Active Short URL</span>
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span>Unlimited URL Updates</span>
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span>Basic Support</span>
          </li>
        </ul>
        <button
          onClick={() => onSelectPlan('free')}
          className="mt-8 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors"
        >
          Get Started
        </button>
      </div>

      {/* Paid Plan */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
          <div className="mt-4">
            <span className="text-4xl font-bold text-white">$3.99</span>
            <span className="text-blue-100">/month</span>
          </div>
        </div>
        <ul className="mt-8 space-y-4 text-white">
          <li className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Unlimited Short URLs</span>
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Unlimited URL Updates</span>
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Custom Domains</span>
          </li>
          <li className="flex items-center">
            <Check className="h-5 w-5 mr-2" />
            <span>Priority Support</span>
          </li>
        </ul>
        <button
          onClick={() => onSelectPlan('paid')}
          className="mt-8 w-full py-3 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};