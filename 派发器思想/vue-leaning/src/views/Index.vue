<script>
import Counter from "@/components/Counter/index.vue";
import Calculator from "@/components/Calculator/index.vue";
import TodoList from "@/components/TodoList/index.vue";

export default {
  name: "Index",
  components: {
    Counter,
    Calculator,
    TodoList,
  },
};
</script>
<template>
  <counter />
  <hr />
  <calculator />
  <hr />
  <todo-list />
</template>
