<template>
  <div>
    <v-btn
      v-if="type == 'create'"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click.stop="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-btn flat v-else-if="type == 'show'" @click.stop="show">
      Show
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <form @submit.prevent="saveContact">
          <v-card-title class="grey lighten-4 py-4 title">
            Create contact
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                  <v-avatar size="40px" class="mr-3">
                    <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt="">
                  </v-avatar>
                  <v-text-field placeholder="Name" v-model="form.name"></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-text-field prepend-icon="business" placeholder="Company" v-model="form.company"></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-text-field placeholder="Job title" v-model="form.job_title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="mail" placeholder="Email" v-model="form.email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field type="tel" prepend-icon="phone" placeholder="0000 - 0000" v-model="form.phone"
                  mask="#### - ####"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field prepend-icon="notes" placeholder="Notes" v-model="form.notes"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-btn flat color="primary">More</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
            <v-btn flat type="submit">{{ type == 'create' ? 'Create' : 'Update' }}</v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import db from "../plugins/firebaseInit.js";
import uuidv4 from "uuid/v4";
import { format } from "libphonenumber-js";

export default {
  name: "Modal",
  props: {
    type: {
      type: String,
      default: "create",
      required: true
    },
    contact: [Object, Array]
  },
  data() {
    return {
      dialog: false,
      form: {
        name: "",
        email: "",
        phone: "",
        company: "",
        job_title: "",
        notes: ""
      }
    };
  },
  methods: {
    show() {
      db
        .collection("contacts")
        .doc(this.contact.id)
        .get()
        .then(doc => {
          this.form = doc.data();
          this.form.id = doc.id;
        });
      this.dialog = true;
    },
    saveContact() {
      if (this.type == "create") {
        db
          .collection("contacts")
          .add({
            name: this.form.name,
            email: this.form.email,
            phone: format(this.form.phone, "SV", "International"),
            company: this.form.company,
            job_title: this.form.job_title,
            notes: this.form.notes,
            slug: uuidv4()
          })
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            this.dialog = false;
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
      } else {
        db
          .collection("contacts")
          .doc(this.contact.id)
          .update({
            name: this.form.name,
            email: this.form.email,
            phone: format(this.form.phone, "SV", "International"),
            company: this.form.company,
            job_title: this.form.job_title,
            notes: this.form.notes,
            slug: uuidv4()
          })
          .then(() => {
            this.dialog = false;
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
      }
    }
  }
};
</script>

<style scoped>

</style>
