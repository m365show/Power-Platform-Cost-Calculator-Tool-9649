import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiX, FiSend, FiUser, FiBot, FiRotateCcw } = FiIcons;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hi! I\'m your Power Platform assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    'hello': 'Hello! Welcome to the Power Platform Cost Calculator. I can help you with estimates, features, and pricing questions.',
    'hi': 'Hi there! I\'m here to help you understand Power Platform costs and features. What would you like to know?',
    'help': 'I can help you with:\n• Understanding Power Platform costs\n• Explaining app features\n• Guidance on project scope\n• Timeline estimates\n• Platform tool selection',
    'pricing': 'Our Power Platform estimates range from $3,000 to $50,000+ depending on complexity, features, and user count. Use our calculator for a detailed estimate!',
    'cost': 'Costs depend on several factors:\n• Company size\n• App complexity\n• Number of users\n• Platform tools needed\n• Timeline urgency\n\nStart the calculator to get your custom estimate!',
    'power apps': 'Power Apps lets you build custom business applications without extensive coding. Perfect for forms, workflows, and mobile apps.',
    'power automate': 'Power Automate handles workflow automation, approvals, and business process automation. Great for reducing manual tasks!',
    'power bi': 'Power BI provides business intelligence with interactive dashboards, reports, and data visualization capabilities.',
    'dataverse': 'Dataverse is a secure, cloud-based data platform that stores and manages data used by business applications.',
    'timeline': 'Typical project timelines:\n• Simple apps: 6-8 weeks\n• Medium complexity: 8-12 weeks\n• Complex solutions: 12-24 weeks\n\nUrgent projects can be expedited with additional resources.',
    'features': 'Popular Power Platform features include:\n• Custom forms and data entry\n• Approval workflows\n• Business intelligence dashboards\n• Mobile optimization\n• Third-party integrations\n• AI and Copilot capabilities',
    'login': 'You can create an account to save your estimates and access additional features. Click the "Create Account" button in the navigation.',
    'support': 'For technical support or detailed consultations, contact us at pp@m365.show or request a consultation through the calculator.',
    'demo': 'You can start using the calculator immediately - no registration required! Registered users can save estimates and access team features.',
    'start': 'Ready to get started? Click "Start Calculator" to begin your Power Platform cost estimation. It takes about 5-7 minutes to complete.'
  };

  const getResponse = (userMessage) => {
    const normalizedMessage = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (normalizedMessage.includes(key)) {
        return response;
      }
    }

    // Fallback responses based on keywords
    if (normalizedMessage.includes('thank')) {
      return 'You\'re welcome! Feel free to ask if you have any other questions about Power Platform development.';
    }

    if (normalizedMessage.includes('bye') || normalizedMessage.includes('goodbye')) {
      return 'Goodbye! Don\'t forget to try our calculator for your Power Platform cost estimate. Have a great day!';
    }

    // Default response
    return 'I\'m here to help with Power Platform questions! Try asking about:\n• Pricing and costs\n• Platform features (Power Apps, Power Automate, Power BI)\n• Project timelines\n• Getting started\n\nOr type "help" for more options.';
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: getResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        message: 'Hi! I\'m your Power Platform assistant. How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  const quickActions = [
    { label: 'Pricing Info', message: 'Tell me about pricing' },
    { label: 'Features', message: 'What features are available?' },
    { label: 'Get Started', message: 'How do I get started?' },
    { label: 'Timeline', message: 'How long does a project take?' }
  ];

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <SafeIcon icon={isOpen ? FiX : FiMessageCircle} className="text-2xl" />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiBot} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-medium">Power Platform Assistant</h3>
                  <p className="text-sm text-primary-100">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={resetChat}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                  title="Reset chat"
                >
                  <SafeIcon icon={FiRotateCcw} className="text-lg" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                >
                  <SafeIcon icon={FiX} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-2 ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    <SafeIcon icon={message.type === 'user' ? FiUser : FiBot} className="text-sm" />
                  </div>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2"
                >
                  <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <SafeIcon icon={FiBot} className="text-sm" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(action.message);
                        setTimeout(() => {
                          document.getElementById('chatbot-input').focus();
                        }, 100);
                      }}
                      className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={sendMessage} className="flex space-x-2">
                <input
                  id="chatbot-input"
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SafeIcon icon={FiSend} className="text-sm" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;