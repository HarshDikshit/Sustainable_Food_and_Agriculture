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
          // @ts-ignore
          new window.Landbot.Popup({
            configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2628357-FVBW2SJN7YQV1HW4/index.json',
          });
          setLandbotLoaded(true);
        };
        document.body.appendChild(script);
      }
    };

    window.addEventListener('mouseover', initLandbot, { once: true });
    window.addEventListener('touchstart', initLandbot, { once: true });

    return () => {
      window.removeEventListener('mouseover', initLandbot);
      window.removeEventListener('touchstart', initLandbot);
    };
  }, [landbotLoaded]);

  return null; // This component doesn't render anything visible
};

export default ChatbotPopup;