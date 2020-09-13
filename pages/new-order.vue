<template>

  <section class="catalog-page">
    <div class="container">
      <h1 class="section-header mb-20">Создание заяки на технику</h1>
      <p class="section-sub-header mb-35">Опишите какая техника вам нужна</p>
      <div class="new-order">
        <p class="section-header f25">Основная задача</p>
        <el-input
          type="textarea"
          class="mb-35"
          placeholder="Введите название"
          v-model="textarea"
          maxlength="55"
          show-word-limit>
        </el-input>
        <p class="section-header f25">Детальное описание задачи:</p>
        <el-input
          type="textarea"
          class="mb-35"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="Введите название"
          v-model="text"
          maxlength="1000"
          show-word-limit>
        </el-input>
        <el-row class="mb-35" :gutter="25">
          <el-col :sm="8" :md="8" :lg="8">
            <p class="section-header f25">Цена</p>
            <el-input   placeholder="Введите цену:" v-model="input"></el-input>
          </el-col>
          <el-col :sm="8" :md="8" :lg="8">
            <p class="section-header f25">Категория</p>
            <el-select v-model="value" placeholder='Выберите'>
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :sm="8" :md="8" :lg="8">
            <p class="section-header f25">Срок</p>
            <el-date-picker
              v-model="value2"
              type="date"
              format="dd MMMM yyyy"
              placeholder="До какого срока:"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-row>
        <div class="new-order__done">
           <el-button type="primary">Разместить</el-button>
          <p class="new-order__done-text">Размещая проект, вы регистрируетесь и принимаете <a href="#">Пользовательское соглашение</a></p>
        </div>
      </div>
    </div>
  </section>




</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }

        },
        value2: '',
        option: [
          {value: 'Option1',label: 'Option1'},
          {value: 'Option1',label: 'Option1'},
        ],
        value: '',
        text:''
      }
    }
  }
</script>

