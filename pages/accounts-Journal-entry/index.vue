<template>
  <div>
    <v-card
      ><v-card-text>
        <v-simple-table>
          <div
            v-for="(input, index) in all_account"
            :key="`phoneInput-${index}`"
            class="input wrapper flex items-center"
          >
            <tr>
              <th>
                <v-autocomplete
                  v-model="input.account"
                  outlined
                  :items="accountNames"
                  item-text="label"
                  item-value="id"
                  dense
                  label="Account"
                >
                </v-autocomplete>
              </th>
              <th>
                <v-text-field
                  v-model="input.debit"
                  outlined
                  dense
                  label="Debit"
                  hide-details="auto"
                ></v-text-field>
              </th>
              <th>
                <v-text-field
                  outlined
                  dense
                  label="Credit"
                  hide-details="auto"
                ></v-text-field>
              </th>
              <th>
                <v-text-field
                  v-model="input.description"
                  outlined
                  dense
                  label="Description"
                  hide-details="auto"
                ></v-text-field>
              </th>
              <th>
                <v-text-field
                  v-model="input.tax"
                  outlined
                  dense
                  label="Tax"
                  hide-details="auto"
                ></v-text-field>
              </th>
              <th>
                <v-text-field
                  v-model="input.name"
                  outlined
                  dense
                  label="Name"
                  hide-details="auto"
                ></v-text-field>
              </th>
            </tr>
          </div>
        </v-simple-table>
      </v-card-text>

      <v-row justify="space-around">
        <v-btn tile color="success" @click="addField(input, all_account)">
          add line
        </v-btn>
        <v-btn tile color="success" @click="removeField(input, all_account)">
          Clean Line
        </v-btn>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "AddRemove",
  data() {
    return {
      all_account: [{ account: "" }, { account: "" }, { account: "" }],
    };
  },
  methods: {
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
  },
  computed: {
    accountNames() {
      return this.$store.state.chartofaccount.accountNames;
    },
  },
  mounted() {
    this.$store.dispatch("chartofaccount/accountNames");
  },
};
</script>
