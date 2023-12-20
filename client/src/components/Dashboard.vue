<template>
  <v-data-table :headers="headers" :items="factories" :show-expand="expanded">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Factories</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <div>
          <v-btn color="indigo-darken" class="mb-2" @click="add = true">
            Column
          </v-btn>
          <v-dialog v-model="add" width="500px">
            <v-card>
              <v-card-title>Add Column</v-card-title>
              <v-card-item>
                <v-text-field
                  v-model="name"
                  label="Column Name"
                  name="name"
                ></v-text-field>
              </v-card-item>
              <v-card-item>
                <v-text-field
                  v-model="type"
                  label="Data Type"
                  name="type"
                ></v-text-field>
              </v-card-item>
              <v-card-actions>
                <v-btn color="green" variant="text" @click="addColumn"
                  >Add</v-btn
                >
                <v-btn color="red" variant="text" @click="dropColumn"
                  >Drop</v-btn
                >
                <v-btn color="primary" variant="text" @click="add = false"
                  >Close</v-btn
                >
              </v-card-actions>
              <v-card-text>
                <p>
                  If you just write on name field and click on the drop button,
                  This column drop
                </p>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ props }">
            <v-btn dark class="mb-2" v-bind="props"> New Factory </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.firmName"
                      label="Firm Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.memberDate"
                      label="Member Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.memberEndDate"
                      label="Member End Date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.employeeCount"
                      label="Employee Count"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.isFreeMember"
                      label="Is Free Member?"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.unitUsing"
                      spellcheck="false"
                      label="Unit Using"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.dateRange"
                      label="Date Range"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.usage"
                      label="Usage"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editItem.usageFee"
                      label="Usage Fee"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="grey" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="grey" variant="text" @click="delItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="eItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="delItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:expanded-row="{ item }">
      <v-card>
        <v-card-title>
          <span class="headline">{{ item.name }}</span>
        </v-card-title>
        <v-card-item>Member Date: {{ item.memberDate }}</v-card-item>
        <v-card-item>Member End Date: {{ item.memberEndDate }}</v-card-item>
        <v-card-item>Employee Count: {{ item.employeeCount }}</v-card-item>
        <v-card-item>Is Free Member?: {{ item.isFreeMember }}</v-card-item>
        <v-card-item>Unit Using: {{ item.unitUsing }}</v-card-item>
        <v-card-item>Date Range: {{ item.dateRange }}</v-card-item>
        <v-card-item>Usage: {{ item.usage }}</v-card-item>
        <v-card-item>Usage Fee: {{ item.usageFee }}</v-card-item>
        <v-card-item>Discount Price: {{ item.discountPrice }}</v-card-item>
      </v-card>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { useAuthStore } from "@/store/auth";
import axios from "axios";
const authStore = useAuthStore();
/**
  *
  dateRange
  discountPrice
  firmName
  id
  isFreeMember
  memberDate
  memberEndDate
  unitUsing
  usage
  usageFee
  */
export default {
  data: () => ({
    showExpand: false,
    name: "",
    type: "",
    expanded: [],
    add: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Firm Name", key: "firmName" },
      { title: "Member Date", key: "memberDate" },
      { title: "Member End Date", key: "memberEndDate" },
      { title: "Employee Count", key: "employeeCount" },
      { title: "Free Member", key: "isFreeMember" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    factories: [],
    editedIndex: -1,
    editItem: {
      firmName: "",
      memberDate: "",
      memberEndDate: "",
      employeeCount: 0,
      isFreeMember: false,
      unitUsing: "",
      dateRange: "",
      usage: 0,
      usageFee: 0,
      discountPrice: false,
    },
    defaItem: {
      firmName: "",
      memberDate: "",
      memberEndDate: "",
      employeeCount: 0,
      isFreeMember: false,
      unitUsing: "",
      dateRange: "",
      usage: 0,
      usageFee: 0,
      discountPrice: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Factory" : "Edit Factory";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const response = await axios.get("http://localhost:3000/factories", {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      this.factories = response.data;
    },

    eItem(item) {
      this.editItem = Object.assign({}, item);
      console.log(this.editItem);
      this.editedIndex = this.editItem["id"];
      console.log(this.editedIndex);
      this.dialog = true;
    },

    delItem(item) {
      this.editItem = Object.assign({}, item);
      this.editedIndex = this.editItem["id"];
      this.dialogDelete = true;
    },

    async delItemConfirm() {
      console.log(this.editedIndex);
      const url = `http://localhost:3000/factories/${this.editedIndex}`;
      console.log(url);
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
      this.closeDelete();
      this.initialize();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editItem = Object.assign({}, this.defaItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editItem = Object.assign({}, this.defaItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        const url = `http://localhost:3000/factories/${this.editedIndex}`;
        console.log(this.editItem);
        await axios.patch(url, this.editItem, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
        });
        this.initialize();
      } else {
        const url = `http://localhost:3000/factories`;
        console.log(url);
        await axios.post(url, {
          headers: {
            Authorization: `Bearer ${authStore.accessToken}`,
          },
          data: this.editItem,
        });
      }
      this.close();
      this.initialize();
    },
    toggleDetails(item) {
      const index = this.expanded.indexOf(item.id);
      if (index === -1) {
        this.expanded.push(item.id);
      } else {
        this.expanded.splice(index, 1);
      }
    },
    async addColumn() {
      const data = {
        name: this.name,
        type: this.type,
      };
      const url = `http://localhost:3000/factories/addColumn`;
      await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
    },
    async dropColumn() {
      const url = `http://localhost:3000/factories/dropColumn/${this.name}`;
      await axios.post(url, {
        headers: {
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      });
    },
  },
};
</script>
