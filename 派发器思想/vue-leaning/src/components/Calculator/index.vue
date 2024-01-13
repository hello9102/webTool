<script>
import CalResult from "./Result.vue";
import CalButton from "./Button.vue";
import CalInput from "./Input.vue";

import dispatch from "@/dispatchers/calculator";

export default {
  name: "Calculator",
  components: {
    CalResult,
    CalInput,
    CalButton,
  },
  data() {
    return {
      firstNumber: 0,
      secondNumber: 0,
      curMethod: "plus",
      result: 0,
    };
  },
  methods: {
    dispatch(...args) {
      dispatch(this)(...args);
    },
  },
};
</script>
<template>
  <div>
    <cal-result :result="result" />
    <div class="inputs">
      <cal-input field="firstNumber" @dispatch="dispatch" />
      <cal-input field="secondNumber" @dispatch="dispatch" />
    </div>
    <div class="buttons">
      <cal-button
        innerText="+"
        method="plus"
        :curMethod="curMethod"
        @dispatch="dispatch"
      />
      <cal-button
        innerText="-"
        method="minus"
        :curMethod="curMethod"
        @dispatch="dispatch"
      />
      <cal-button
        innerText="*"
        method="mul"
        :curMethod="curMethod"
        @dispatch="dispatch"
      />
      <cal-button
        innerText="/"
        method="div"
        :curMethod="curMethod"
        @dispatch="dispatch"
      />
    </div>
  </div>
</template>

<style scoped></style>
