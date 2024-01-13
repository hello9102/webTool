<template>
  <counter-result :result="result" />
  <div>
    <counter-button innerText="+" action="PLUS" @dispatch="dispatch" />
    <counter-button innerText="-" action="MINUS" @dispatch="dispatch" />
  </div>
</template>
<script>
import CounterResult from "./Result.vue";
import CounterButton from "./Button.vue";
import dispatch from "@/dispatchers/counter";

export default {
  name: "Counter",
  components: {
    CounterResult,
    CounterButton,
  },
  data() {
    return {
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
<!-- <style></style> -->
