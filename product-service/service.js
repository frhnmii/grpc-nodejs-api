import grpc from '@grpc/grpc-js';

// Data product sebagai simulasi dari database
const listProducts = [
  {
    id: '1112',
    name: 'macbook pro',
    price: 3000,
    quantity: 7,
  },
  {
    id: '1113',
    name: 'Iphone X',
    price: 2000,
    quantity: 3,
  },
  {
    id: '1114',
    name: 'Earphone',
    price: 500,
    quantity: 25,
  },
];

const getProduct = async (call, callback) => {
  try {
    // Ambil id yang dikirim dari client
    const { id } = call.request;

    // cari product dengan id yang diminta
    const product = listProducts.find((prod) => prod.id === id);

    // jika tidak ditemukan maka isi callback dengan menampilkan error message
    if (!product) {
      callback({
        code: 5,
        message: 'Product Not Found',
        status: grpc.status.NOT_FOUND,
      });
    }

    // jika ada, isi pertama dari callback dengan null, dan yang kedua dengan data product
    callback(null, product);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

const getAllProduct = async (call, callback) => {
  try {
    // isi pertama dari callback dengan null, dan yang kedua dengan data product
    callback(null, { products: listProducts });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

export default { getProduct, getAllProduct };
