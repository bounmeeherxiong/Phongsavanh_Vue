<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field label="Search Account" outlined dense clearable>
                </v-text-field>
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
                  Add Account
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
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Accounts</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.Category_id"
                    outlined
                    dense
                    label="Select Account Type"
                    :items="categories"
                    item-text="Category_name"
                    item-value="Category_id"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.DetailType"
                    outlined
                    dense
                    label="Name Accounts"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.Category_id"
                    outlined
                    dense
                    label="Detail Type"

                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.DetailType"
                    outlined
                    dense
                    label="Description"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6"> </v-col>
                <v-col cols="12" sm="6">
                  <v-checkbox
                    v-model="checkbox"
                    label="Is sub-account"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6"> </v-col>
                <v-col cols="12" sm="6">
                  <v-autocomplete
                    v-model="values"
                    :items="items"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Enter parent account"
                    multiple
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      form: {},
      headers: [
        { text: "Name", value: "" },
        { text: "Type", value: "" },
        { text: "BALANCE", value: "" },
        { text: "DETAIL TYPE", value: "action" },
      ],
    };
  },
  computed: {
    categories(){
      return this.$store.state.chart_of_account.categories;
    }
  },
  mounted() {
    this.$store.dispatch("chart_of_account/categories")
  },

};
</script>

