import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const PROTO_PATH = 'product.proto';

const packageDef = protoLoader.loadSync(PROTO_PATH, options);
const productPackage = grpc.loadPackageDefinition(packageDef);

const client = new productPackage.ProductService(
  '127.0.0.1:7000',
  grpc.credentials.createInsecure(),
);

export default client;
