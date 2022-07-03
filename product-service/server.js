import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

import productService from './service.js';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

// import file proto yang dibuat
const PROTO_PATH = './product.proto';

// Load file proto dengan protoLoader serta masukan optionsnya
const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const productPackage = grpc.loadPackageDefinition(packageDef);

// Inisiasi server baru dari grpc
const server = new grpc.Server();

// Menambahkan service kedalam server
// ! Pastikan nama service sama dengan yang ada di file proto
server.addService(productPackage.ProductService.service, {
  getProduct: productService.getProduct,
  getAllProduct: productService.getAllProduct,
});

// Jalankan server di port 7000
server.bindAsync(
  '127.0.0.1:7000',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) console.log('Error: ', error);
    server.start();
    console.log('Server running at 127.0.0.1:7000');
  },
);
