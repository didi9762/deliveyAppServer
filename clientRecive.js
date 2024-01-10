import WebSocket from 'ws';

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImRpZGkiLCJpYXQiOjE1MTYyMzkwMjJ9.QQtZFto9uXFKebk6QtHOmf8LzXQrbcXEQpIK8GlmAVo' 

class DeliveryGuy {
  constructor(userId,online,clientSocket) {
    this.userId = userId;
    this.serverAddress = `wss://10.100.50.165:8765?token=${token}`; 
    this.getMessages =  true;
    this.sendMessage  = false;
    this.online = online
    this.socket = new WebSocket(this.serverAddress);
    this.clientSocket = clientSocket

    
    this.socket.addEventListener('open', () => {
    
      console.log(`${this.userId} Connected to the server`);
      this.initiateCommunication();
    });
    
    this.socket.addEventListener('message', (event) => {
      console.log(`Received message: ${JSON.parse(event.data)}`);
      const parsedObject = JSON.parse(event.data);
     const newMassion ={
    name:parsedObject.name,
    address:parsedObject.address,
    price:parsedObject.price}
      this.clientSocket.send(newMassion)
    });

    this.socket.addEventListener('close', () => {
      this.online = false
      console.log('Connection closed');
    });
  }


  initiateCommunication() {
    console.log(this.clientSocket);
    this.socket.send(JSON.stringify({get:this.getMessages,send:this.sendMessages,id:this.userId}))
  }
  isOnline() {
    return this.online;
  }
 
}




function goOnline(userId,online){
  const newD = new DeliveryGuy(userId,online);
return newD
}

goOnline()
