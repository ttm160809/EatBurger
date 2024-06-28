import { defineStore } from 'pinia';

import axios from 'axios';
import sweetAlertStore from './sweetAlertStore';

const sweetAlert = sweetAlertStore();
const { VITE_URL, VITE_NAME } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
  }),
  actions: {
    getCarts() {
      axios.get(`${VITE_URL}/v2/api/${VITE_NAME}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
        })
        .catch(() => {
          sweetAlert.swalError();
        });
    },
    addToCart(id, num) {
      const order = {
        product_id: id,
        qty: Number(num),
      };
      axios.post(`${VITE_URL}/v2/api/${VITE_NAME}/cart`, { data: order })
        .then(() => {
          this.getCarts();
          sweetAlert.successToast('カートに入れました');
        })
        .catch(() => {
          sweetAlert.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    deleteAllCart() {
      axios.delete(`${VITE_URL}/v2/api/${VITE_NAME}/carts`)
        .then(() => {
          this.getCarts();
          sweetAlert.successToast('商品が全て削除されました');
        })
        .catch(() => {
          sweetAlert.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    deleteCart(cart) {
      axios.delete(`${VITE_URL}/v2/api/${VITE_NAME}/cart/${cart.id}`)
        .then(() => {
          this.getCarts();
          sweetAlert.successToast('商品が削除されました');
        })
        .catch(() => {
          sweetAlert.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
    changeCartQty(cart) {
      const newQty = {
        product_id: cart.product_id,
        qty: cart.qty,
      };
      axios.put(`${VITE_URL}/v2/api/${VITE_NAME}/cart/${cart.id}`, { data: newQty })
        .then(() => {
          this.getCarts();
        })
        .catch(() => {
          sweetAlert.errorToast('お手数ですが、もう一度やり直してください');
        });
    },
  },
});
