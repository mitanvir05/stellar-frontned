import React, { useState } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [formData, setFormData] = useState({
    senderPublicKey: '',
    senderSecretKey: '',
    receiverPublicKey: '',
    amount: ''
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');

    try {
      const response = await axios.post('http://localhost:3000/send-payment', formData);
      setResponseMessage(`Transaction successful: ${response.data.transactionResult.hash}`);
    } catch (error) {
      setResponseMessage(`Transaction failed: ${error.response ? error.response.data.error : error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Send Stellar Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Sender Public Key</label>
          <input
            type="text"
            name="senderPublicKey"
            value={formData.senderPublicKey}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sender Secret Key</label>
          <input
            type="text"
            name="senderSecretKey"
            value={formData.senderSecretKey}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Receiver Public Key</label>
          <input
            type="text"
            name="receiverPublicKey"
            value={formData.receiverPublicKey}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Payment'}
          </button>
        </div>
      </form>
      {responseMessage && (
        <div className={`mt-4 p-4 rounded-lg text-center ${responseMessage.includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {responseMessage}
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
