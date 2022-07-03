import grpc from '@grpc/grpc-js';

// Import client grpc product
import productClient from './grpc/product.js';

const listOrder = [];

// Fungsi untuk memanggil service grpc lain (product)
const getProductByid = (id) => {
  return new Promise((resolve, reject) => {
    productClient.getProduct({ id }, (error, response) => {
      if (error) reject(error);
      resolve(response);
    });
  });
};

const createOrder = async (call, callback) => {
  try {
    // Ambil productId dan quantity yang dikirim dari client
    const { productId, quantity } = call.request;

    const product = await getProductByid(productId);

    // Ceck apakah quantity mencukupi
    if (product.quantity < quantity) {
      callback({
        code: 10,
        message: 'insufficient quantity',
        status: grpc.status.ABORTED,
      });
    } else {
      const totalPrice = product.price * quantity;

      // Tambah array list order dengan order baru
      listOrder.push({
        id: `ORD${new Date().valueOf()}`,
        product: {
          productId,
          quantity,
        },
        createdAt: new Date(),
        total: totalPrice,
      });
    }
    callback(null, { status: 'order success' });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

const getALlOrder = async (call, callback) => {
  try {
    callback(null, { orderList: listOrder });
  } catch (err) {
    console.log(err);
    callback(err);
  }
};

export default { createOrder, getALlOrder };
