import React, { useEffect, useState } from 'react';

const ChatbotPopup = () => {
  const [landbotLoaded, setLandbotLoaded] = useState(false);

  useEffect(() => {
    const initLandbot = () => {
      if (!landbotLoaded) {
        const script = document.createElement('script');
        script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
        script.async = true;
        script.onload = () => {
          if (window.Landbot) {
            const chatbot = new window.Landbot.Popup({
              configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2628357-FVBW2SJN7YQV1HW4/index.json',
            });
            setLandbotLoaded(true);
            window.chatbotInstance = chatbot;
          }
        };
        document.body.appendChild(script);
      }
    };

    initLandbot();

    return () => {
      // Ensure the chatbot instance exists and has not been destroyed already
      if (window.chatbotInstance && typeof window.chatbotInstance.destroy === 'function') {
        try {
          window.chatbotInstance.destroy(); // Safely destroy the chatbot instance
        } catch (error) {
          console.error("Error during Landbot destruction: ", error);
        } finally {
          delete window.chatbotInstance; // Clean up the reference
        }
      }

      // Remove the script from the document
      const script = document.querySelector('script[src="https://cdn.landbot.io/landbot-3/landbot-3.0.0.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [landbotLoaded]);

  return null; // This component doesn't render anything visible
};

export default ChatbotPopup;
