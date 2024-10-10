<template>
<div>
  <h1>Гарант</h1>
  <a href="https://t.me/mxBaza" class="image-link" target="_blank">
    <img :src="image" alt="">
  </a>

  Гарант - это лицо, принимающее на себя ответственность за выполнение, соблюдение и т.д. каких-либо обязательств в сделке двух или более лиц, а также осуществляющее надзор за их выполнением, соблюдением и т.п.
  <br>
  <br>
  <h3>
    Как работает гарант:</h3>
  <ul>

    <li>Лицо сделки или гарант создает конференцию в Телеграме (только ГАРАНТ) для обсуждения товара или услуги.</li>
    <li>Покупатель переводит гаранту деньги за товар (включая оплату гаранта).</li>
    <li>Продавец передает товар или информацию об услуге гаранту, гарант сверяет информацию о товаре или услуге с указанной.</li>
    <li>При соответствии информации с описанием, гарант передает деньги продавцу услуги или товара, а товар покупателю.</li>
  </ul>
  <br>
  <br>
  Холд - удержание средств у гаранта во время проведения сделки на n-е время<br><br>


  <a href="https://t.me/mxBaza" class="link-btn" target="_blank">
    Воспользоваться гарантом BAZA
  </a>
</div>



</template>

<script>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import image from '@/assets/pages-images/guarantee.png'

export default {
  name: "GuaranteeView.vue",
  components: {ButtonBlack},
  data() {
    return {
      image
    }
  }
}
</script>

<style scoped lang="scss">
.image-link {
  transition: .3s ease;
  width: 100%;
  display: block;
  img {
    transition: .3s ease;
  }

  &:hover {
    img {
      transform: scale(1.02);
    }
  }
}
h1 {
  margin-bottom: 30px;
}
img {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}
ul {
  li {
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.btn {
  padding: 10px;
  font-weight: 600;
  max-width: 300px;
}
</style>