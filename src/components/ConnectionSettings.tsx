import React, { useState } from 'react';
import mqttService from './mqttService';
import { Button} from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';

const ConnectionSettings: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
    const [host, setHost] = useState<string>('');
    const [port, setPort] = useState<string>('1883'); // Changed to string
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    const handleConnect = () => {
      mqttService.connect(host, parseInt(port), username, password);
      onConnect();
    };
  
    return (
      <Card title="MQTT Connection Settings">
        <div className="p-field">
          <label htmlFor="host">Host</label>
          <InputText id="host" value={host} onChange={(e) => setHost(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="port">Port</label>
          <InputText id="port" value={port} onChange={(e) => setPort(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button label="Connect" onClick={handleConnect} />
      </Card>
    );
  };
  
  export default ConnectionSettings;