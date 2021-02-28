import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Element.Select.computed.readonly = function () {
  const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode));

  return !(this.filterable || this.multiple || !isIE) && !this.visible;
};

Vue.use(Element, { locale })
