<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Search"
                  outlined
                  dense
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn color="primary">
                  <v-icon>mdi-magnify</v-icon>
                  Search
                </v-btn>
              </v-col>
              <v-col cols="12" md="3">
                <v-btn color="primary" @click="dialog = true">
                  <v-icon>mdi-plus</v-icon>
                  Add New
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="detail_categories"
          dense
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50],
          }"
        >
          <template #[`item.action`]="{ item }">
            <v-btn icon small>
              {{ item.id }}
              <v-icon> mdi-delete </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Detail for Category</v-card-title>
        <v-card-text>
          <div>
            <v-select
              v-model="form.Category_id"
              outlined
              dense
              label="Select Category"
              :items="categories"
              item-text="Category_name"
              item-value="Category_id"
            ></v-select>
          </div>
          <div>
            <v-text-field
              v-model="form.DetailType"
              outlined
              dense
              label="Detail for Category"
            ></v-text-field>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>
          <v-btn color="green darken-1" text @click="create"> Agree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      form: {},
      headers: [
        { text: "Name", value: "DetailType" },
        { text: "Type", value: "Category_name" },
        { text: "Action", value: "action" },
      ],
    };
  },
  computed: {
    detail_categories() {
      return this.$store.state.detail_category.detail_categories;
    },
    categories(){
      return this.$store.state.detail_category.categories;
    }
  },
  mounted() {
    this.$store.dispatch("detail_category/detail_categories");
    this.$store.dispatch("detail_category/categories")
  },
    methods: {
    create() {
      this.$store.dispatch("detail_category/createDetailCategories", this.form);
      this.dialog = false;
    },
  },
};
</script>
