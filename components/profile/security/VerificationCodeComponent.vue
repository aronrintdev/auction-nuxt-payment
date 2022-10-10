<template>
  <div class="verification-code">
    <div>
      <input ref="code_1" v-model="code_1" type="text" class="txt" tabindex="1" @input="input" @keydown="listen">
      <input ref="code_2" v-model="code_2" type="text" class="txt" tabindex="2" @input="input" @keydown="listen">
      <input ref="code_3" v-model="code_3" type="text" class="txt" tabindex="3" @input="input" @keydown="listen">
      <input ref="code_4" v-model="code_4" type="text" class="txt" tabindex="4" @input="input" @keydown="listen">
      <input ref="code_5" v-model="code_5" type="text" class="txt" tabindex="5" @input="input" @keydown="listen">
    </div>
  </div>
</template>

<script>
export default {
  name: 'VerificationCodeComponent',
  data() {
    return {
      code_1: '',
      code_2: '',
      code_3: '',
      code_4: '',
      code_5: ''
    }
  },
  mounted() {
    this.$refs.code_1.focus()
  },
  methods: {
    listen(e) {
      const input = e.keyCode;
      const index = parseInt(e.target.getAttribute('tabindex'));
      // if backspace key is pressed
      if (input === 8) {
        console.debug('backspace')
        this.erase(index)
      }

      // checking for only number 0-9
      const onlyDigits = input <= 57 && input >= 48;
      if (!onlyDigits) {
        e.preventDefault()
      }

      if (this.hasValue(index)) {
        e.preventDefault()
        this.move(index + 1)
      }
    },
    input(e) {
      if (e.target.value.length === 5) {
        this.splitAndSpread(e.target.value);
        this.move(5)
        return;
      }

      const index = parseInt(e.target.getAttribute('tabindex'));
      this.move(index + 1)
    },
    erase(index) {
      switch (index) {
        case 1:
          this.code_1 = '';
          break;
        case 2:
          this.code_2 = '';
          break;
        case 3:
          this.code_3 = '';
          break;
        case 4:
          this.code_4 = '';
          break;
        case 5:
          this.code_5 = '';
          break;
      }
      this.move(index - 1);
    },
    move(index) {
      if (index > 5 && index < 1) {
        return;
      }

      this.$refs[`code_${index}`]?.focus()
    },
    hasValue(index) {
      let value = '';
      switch (index) {
        case 1:
          value = this.code_1;
          break;
        case 2:
          value = this.code_2;
          break;
        case 3:
          value = this.code_3;
          break;
        case 4:
          value = this.code_4;
          break;
        case 5:
          value = this.code_5;
          break;
      }

      return value !== '';
    },
    splitAndSpread(value) {
      const codes = value.split('');
      this.code_1 = codes[0];
      this.code_2 = codes[1];
      this.code_3 = codes[2];
      this.code_4 = codes[3];
      this.code_5 = codes[4];
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.verification-code
  .txt
    width: 40px
    border: none
    text-align: center
    border-bottom: 1px solid $color-gray-47
    @include body-13-regular
    padding: 10px 0

    &:focus
      outline: none
  @media (max-width: 767px)
    .txt
      width: 35px

</style>
