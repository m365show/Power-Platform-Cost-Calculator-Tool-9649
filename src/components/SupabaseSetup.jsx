import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useSupabase } from '../hooks/useSupabase';

const { FiDatabase, FiCheck, FiAlertCircle, FiExternalLink, FiCopy } = FiIcons;

function SupabaseSetup() {
  const { isConnected, loading, connectSupabase } = useSupabase();
  const [formData, setFormData] = useState({
    projectUrl: '',
    anonKey: ''
  });
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConnecting(true);
    setError('');

    const result = await connectSupabase(formData.projectUrl, formData.anonKey);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setConnecting(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking Supabase connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <SafeIcon icon={FiDatabase} className="text-6xl text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supabase Setup</h1>
          <p className="text-gray-600">Connect your Supabase project to enable user management and data storage</p>
        </div>

        {isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <SafeIcon icon={FiCheck} className="text-4xl text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-900 mb-2">Connected Successfully!</h2>
            <p className="text-green-700">Your Supabase project is connected and ready to use.</p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Connect Your Supabase Project</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiAlertCircle} className="text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900 mb-2">Setup Instructions:</h3>
                    <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                      <li>Create a new project in <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">Supabase</a></li>
                      <li>Go to Settings → API in your Supabase dashboard</li>
                      <li>Copy your Project URL and anon/public key</li>
                      <li>Paste them in the form below</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                <SafeIcon icon={FiAlertCircle} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    required
                    value={formData.projectUrl}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://your-project.supabase.co"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.projectUrl)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={!formData.projectUrl}
                  >
                    <SafeIcon icon={FiCopy} />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anonymous Key *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.anonKey}
                    onChange={(e) => setFormData({ ...formData, anonKey: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your anon/public key"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.anonKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={!formData.anonKey}
                  >
                    <SafeIcon icon={FiCopy} />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={connecting}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {connecting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <SafeIcon icon={FiDatabase} />
                    <span>Connect Supabase</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <a
                href="https://supabase.com/docs/guides/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center space-x-1"
              >
                <span>Need help getting started?</span>
                <SafeIcon icon={FiExternalLink} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupabaseSetup;