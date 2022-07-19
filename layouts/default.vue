<template>
  <v-app dark style="background-color: #fafafa">
    <v-navigation-drawer v-model="drawer" app width="280">
      <v-list v-for="(item, i) in items" :key="i" dense class="py-0" tile flat>
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          no-action
          color="primary"
        >
          <template #activator>
            <v-list-item-title v-text="item.title" />
          </template>
          <v-list-item
            v-for="(subItem, subI) in item.children"
            :key="subI"
            exact
            :to="subItem.to"
            link
          >
            <v-list-item-title v-text="subItem.title" />
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :to="item.to"
          router
          exact
          dense
          active-class="primary white--text"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense color="primary">
      <!-- Left side nav -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text" />
      <v-btn :to="'/'" text plain color="white">{{ title }}</v-btn>

      <!-- Right side nav -->
      <v-spacer />
      <v-btn icon color="primary" :to="'/my-profile'">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <!-- Notification list -->
      <!-- Logout -->
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app> </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "Default",
  data() {
    return {
      title: "Control Panel",
      drawer: true,
      notifications: [],
      items: [
        {
          icon: "mdi-monitor-dashboard",
          title: "ໜ້າຫຼັກ",
          to: "/",
        },
        {
          icon: "mdi-cog",
          title: "ການຕັ້ງຄ່າ",
          children: [
            {
              title: "ຜູ້ໃຊ້ລະບົບ",
              to: "/admin",
            },
            {
              title: "ພະນັກງານ",
              to: "/staffs",
            },
            {
              title: "ປະເພດ",
              to: "/accounts-categories",
            },
            {
              title: "ລາຍລະອຽດຂອງປະເພດ",
              to: "/accounts-detail-categories",
            }
          ],
        },
        {
          icon: "mdi-cellphone-cog",
          title: "ຈັດການຂໍ້ມູນບັນຊີ",
          children: [
            {
              title: "ຕາຕະລາງບັນຊີ",
              to: "/accounts-chart",
            },
            {
              title: "ລົງບັນຊີ",
              to: "/accounts-Journal-entry",
            },
          ],
        },
        {
          icon: "mdi-poll",
          title: "ລາຍງານ",
          to: "/manual-adjustment",
        },
      ],
    };
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },

  async mounted() {},
  methods: {},
};
</script>

<style>
* {
  font-family: "Phetsarath OT" !important;
}
</style>
