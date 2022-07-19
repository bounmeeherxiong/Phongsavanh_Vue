<template>
  <div v-if="filter.length === 0"></div>
  <!-- <div>
    <div v-for="item in children" :key="item.Account_id"> -->
  <!-- <test-component
        :children="children"
        :id="item.Account_id"
        :level="level * 2"
      /> -->
  <!-- </div>
  </div> -->
  <div v-else>
    <div v-for="item in children" :key="item.Account_id">
      <tr>
        <td>{{ item.ChartAccountName }}</td>
        <td>{{ item.DetailType }}</td>
        <td>{{ item.Balance }}</td>
        <td>{{ item.Description }}</td>
      </tr>
      <TestComponent
        :children="allAccounts.children"
        :id="item.Account_id"
        :level="20"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filter: null,
    };
  },
  props: {
    children: {
      type: Array,
      Object,
      default: () => {},
    },
    id: {
      type: [String, Number],
      default: "",
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  created() {
    this.filter = this.children.filter((el) => el.parent_id == this.id);
  },
};
</script>
