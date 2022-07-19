<template>
  <div>
    <v-card flat>
      <v-card-title>
        <v-spacer>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field label="Search" outlined dense clearable>
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
        <!-- <v-data-table
          :headers="headers"
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
        </v-data-table> -->
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Type</th>
              <th class="text-left">Balance</th>
              <th class="text-left">Detail Type</th>
            </tr>
          </thead>
          <tbody v-for="item in allAccounts.message" :key="item.Account_id">
            <tr>
              <td>{{ item.ChartAccountName }}</td>
              <td>{{ item.DetailType }}</td>
              <td>{{ item.Balance }}</td>
              <td>
                {{ item.Description }}
                <div
                  v-if="
                    allAccounts.children.filter(
                      (el) => el.parent_id === item.Account_id
                    ).length > 0
                  "
                >
                  <v-btn icon small @click="show(item.Account_id)">
                    <v-icon> mdi-pencil </v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showDetail">
      <v-card>
        <v-card-title>{{ selectedId }}</v-card-title>
        <v-card-text>
          <ul v-if="true">
            <li
              v-for="item in allAccounts.children.filter(
                (el) => el.parent_id == selectedId
              )"
              :key="item.Account_id"
            >
              {{ item }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Add Accounts</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.Category_id"
                    outlined
                    dense
                    label="Select Account Type"
                    :items="categories"
                    item-text="Category_name"
                    item-value="Category_id"
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.ChartAccountName"
                    outlined
                    dense
                    label="Name Accounts"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.DetailCategory_id"
                    :items="detailType"
                    item-text="DetailType"
                    item-value="Detail_id"
                    outlined
                    dense
                    label="Detail Type"
                    hide-details="auto"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.Description"
                    outlined
                    dense
                    label="Description"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="12">
                  <v-checkbox
                    v-model="checkbox"
                    label="Is sub-account"
                    dense
                    hide-details="auto"
                  ></v-checkbox>

                  {{ parentId }}
                  <v-autocomplete
                    v-model="parentId"
                    :items="accountNames"
                    outlined
                    item-text="label"
                    item-value="id"
                    dense
                    label="Enter Parent Account"
                    :disabled="!checkbox"
                  >
                    <template #selection="{ text }">
                      <span v-for="item in parents" :key="item.Account_id">
                        {{ item.ChartAccountName }} {{ text }} Sub
                      </span>
                    </template>
                    <template #item="{ item }">
                      {{ item.label }}
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="create"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import TestComponent from "../../components/TestComponent.vue";
export default {
  data() {
    return {
      dialog: false,
      checkbox: false,
      parentId: null,
      showDetail: false,
      selectedId: null,
      detailType: [],
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
    categories() {
      return this.$store.state.chart_of_account.categories;
    },
    accountNames() {
      return this.$store.state.chart_of_account.accountNames;
    },
    categoryDetail() {
      return this.$store.state.category.categoryDetail;
    },
    parents() {
      return this.$store.state.category.parents;
    },
    allAccounts() {
      return this.$store.state.chart_of_account.allAccounts;
    },
  },
  watch: {
    "form.Category_id"(value) {
      if (this.categoryDetail.length > 0) {
        const filter = this.categoryDetail.filter(
          (el) => el.Category_id === value
        );
        this.detailType = filter;
      }
    },
    parentId(value) {
      if (value) {
        this.$store.dispatch("category/allParents", value);
      }
    },
  },
  mounted() {
    this.$store.dispatch("chart_of_account/categories");
    this.$store.dispatch("chart_of_account/AccountName");
    this.$store.dispatch("chart_of_account/allAccounts");
    this.$store.dispatch("category/categoryDetails");
  },
  methods: {
    create() {
      this.form.CreateDate = "2022-02-01";
      this.form.CreateStatus = 0;
      this.form.parent_id = 0;
      this.form.Company_id = 1;
      this.form.Employee = 1;
      this.$store.dispatch("chart_of_account/CreateChartAccount", this.form);
      this.dialog = false;
    },
    show(id) {
      this.selectedId = id;
      this.showDetail = true;
    },
  },
  components: { TestComponent },
};
</script>

