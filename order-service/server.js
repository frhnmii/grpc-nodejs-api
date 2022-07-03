import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import OrderService from './service.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// import file proto yang dibuat
const PROTO_PATH = './order.proto';

// Load file proto dengan protoLoader serta masukan optionsnya
const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const orderPackage = grpc.loadPackageDefinition(packageDef);

// Inisiasi server baru dari grpc
const server = new grpc.Server();

// Menambahkan service kedalam server
// ! Pastikan nama service sama dengan yang ada di file proto
server.addService(orderPackage.OrderService.service, {
  createNewOrder: OrderService.createOrder,
  getAllOrder: OrderService.getALlOrder,
});

// Jalankan server di port 8000
server.bindAsync(
  '127.0.0.1:8000',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    server.start();
    console.log('Server running at 127.0.0.1:8000');
  },
);
