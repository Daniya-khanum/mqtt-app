import mqtt, { MqttClient } from 'mqtt';

interface MQTTService {
  client: MqttClient | null;
  connect: (host: string, port: number, username: string, password: string) => void;
  disconnect: () => void;
  publish: (topic: string, message: string) => void;
  subscribe: (topic: string, callback: (topic: string, message: string) => void) => void;
}

class MQTTServiceImpl implements MQTTService {
  client: MqttClient | null = null;

  connect(host: string, port: number, username: string, password: string) {
    const url = `ws://${host}:${port}/mqtt`; // Adjust if using WebSocket
    console.log("Connecting to URL:", url);

    this.client = mqtt.connect(url, {
      username,
      password,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('Connection error:', error);
    });
  }

  disconnect() {
    this.client?.end();
  }

  publish(topic: string, message: string) {
    if (this.client) {
      this.client.publish(topic, message);
    }
  }

  subscribe(topic: string, callback: (topic: string, message: string) => void) {
    if (this.client) {
      this.client.subscribe(topic);
      this.client.on('message', (receivedTopic, message) => {
        callback(receivedTopic, message.toString());
      });
    }
  }
}

const mqttService = new MQTTServiceImpl();
export default mqttService;
