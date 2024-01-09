// storeManager.js
import WebSocket from 'ws';
import readline from 'readline';
import { v4 as uuidv4 } from 'uuid';
const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpZGkiLCJpYXQiOjE1MTYyMzkwMjJ9.QQtZFto9uXFKebk6QtHOmf8LzXQrbcXEQpIK8GlmAVo' 


class StoreManager {
  constructor() {
    this.serverAddress = `ws://127.0.0.1:8765?token=${token}`; 
    this.userId = 'store_manager_1'; 
    this.sendMessages = true;
    this.getMessages = false;
    this.socket = new WebSocket(this.serverAddress);

    this.socket.addEventListener('open', () => {
      console.log('Connected to the server');
      this.initiateCommunication();
    });

    this.socket.addEventListener('message', (event) => {
      console.log(`Received message: ${event.data}`);
    });

    this.socket.addEventListener('close', () => {
      console.log('Connection closed');
    });
  }

  initiateCommunication() {
    this.socket.send(JSON.stringify({ get: this.getMessages, send: this.sendMessages, id: this.userId }));
  }

  sendMessage(task) {
    task.id= uuidv4()
    task.sender = this.userId
    this.socket.send(JSON.stringify(task));
  }
}

const storeManager = new StoreManager();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const task = {
  open:true,
  save:false,
  close:false
};

rl.question('Enter task name: ', (name) => {
  task.name = name;

  rl.question('Enter task address: ', (address) => {
    task.address = address;

    rl.question('Enter task price: ', (price) => {
      task.price = price;

      rl.close();

      storeManager.sendMessage(task);
    });
  });
});

