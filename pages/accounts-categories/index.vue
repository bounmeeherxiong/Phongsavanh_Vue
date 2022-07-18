<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer>
          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="3">
                <v-text-field
                  label="Search Category"
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
                  Add Category
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="categories"
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
        <v-card-title class="text-h5">Add New Category</v-card-title>

        <v-card-text>
          <div>
            <v-select
              v-model="form.Type_id"
              outlined
              dense
              label="Select Type"
              :items="types"
              item-text="Type_name"
              item-value="Type_id"
            ></v-select>
          </div>
          <div>
            <v-text-field
              v-model="form.Category_name"
              outlined
              dense
              label="Category Name"
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
        { text: "Name", value: "Category_name" },
        { text: "Type", value: "Type_name" },
        { text: "Created At", value: "CreteDate" },
        { text: "Action", value: "action" },
      ],
    };
  },
  computed: {
    categories() {
      return this.$store.state.category.categories;
    },
    types() {
      return this.$store.state.category.types;
    },
  },
  mounted() {
    this.$store.dispatch("category/categories");
    this.$store.dispatch("category/types");
  },
  methods: {
    create() {
      this.form.CreteDate = "2022-02-01";
      this.form.CreateStatus = 0;
      this.$store.dispatch("category/createCategory", this.form);
      this.dialog = false;
    },
  },
};
</script>
