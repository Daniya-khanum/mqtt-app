import React, { useState } from 'react';
import ConnectionSettings from './components/ConnectionSettings';
import MainPage from './components/MainPage';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import mqttService from './components/mqttService';


const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [toast, setToast] = useState<React.RefObject<Toast>>(React.createRef());

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    mqttService.disconnect();
    setIsConnected(false);
  };

  return (
    <div className="p-d-flex p-jc-center p-ai-center p-mt-6">
      {isConnected ? (
        <>
          <Button label="Disconnect" onClick={handleDisconnect} className="p-mb-4" />
          <MainPage />
        </>
      ) : (
        <ConnectionSettings onConnect={handleConnect} />
      )}
      <Toast ref={toast} />
    </div>
  );
};

export default App;
