// 管理modal開關，需用到modal區塊時直接引入該檔案使用
import BsModal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new BsModal(
      (this.$refs.modal),
      {
        keyboard: true, /* false時,esc鍵盤不關閉 */
        backdrop: 'true', /* static時,空白處不關閉 */
      },
    );
  },
};
