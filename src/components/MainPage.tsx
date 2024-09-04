import React, { useState } from 'react';
import mqttService from './mqttService';
import { Button} from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';

const MainPage: React.FC = () => {
  const [publishTopic, setPublishTopic] = useState('');
  const [publishMessage, setPublishMessage] = useState('');
  const [subscribeTopic, setSubscribeTopic] = useState('');
  const [publishedMessages, setPublishedMessages] = useState<any[]>([]);
  const [subscribedMessages, setSubscribedMessages] = useState<any[]>([]);

  const handlePublish = () => {
    mqttService.publish(publishTopic, publishMessage);
    setPublishedMessages([...publishedMessages, { topic: publishTopic, message: publishMessage }]);
  };

  const handleSubscribe = () => {
    mqttService.subscribe(subscribeTopic, (topic, message) => {
      setSubscribedMessages([...subscribedMessages, { topic, message }]);
    });
  };

  return (
    <div className="p-grid">
      <div className="p-col-12 p-md-6">
        <Card title="Publish">
          <div className="p-field">
            <label htmlFor="publishTopic">Topic</label>
            <InputText id="publishTopic" value={publishTopic} onChange={(e) => setPublishTopic(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="publishMessage">Message</label>
            <InputText id="publishMessage" value={publishMessage} onChange={(e) => setPublishMessage(e.target.value)} />
          </div>
          <Button label="Publish" onClick={handlePublish} />
          <DataTable value={publishedMessages} header="Published Messages">
            <Column field="topic" header="Topic" />
            <Column field="message" header="Message" />
          </DataTable>
        </Card>
      </div>
      <div className="p-col-12 p-md-6">
        <Card title="Subscribe">
          <div className="p-field">
            <label htmlFor="subscribeTopic">Topic</label>
            <InputText id="subscribeTopic" value={subscribeTopic} onChange={(e) => setSubscribeTopic(e.target.value)} />
          </div>
          <Button label="Subscribe" onClick={handleSubscribe} />
          <DataTable value={subscribedMessages} header="Subscribed Messages">
            <Column field="topic" header="Topic" />
            <Column field="message" header="Message" />
          </DataTable>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;
