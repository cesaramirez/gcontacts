<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 v-for="contact in contacts" :key="contact.id">
        <v-card @click="show" raised>
          <v-card-text>
            <v-layout align-center>
              <v-flex xs1>
                <avatar :username="contact.name"></avatar>
              </v-flex>
              <v-flex xs4 class="body-2">{{ contact.name }}</v-flex>
              <v-flex xs3>{{ contact.email }}</v-flex>
              <v-flex xs2>{{ contact.phone }}</v-flex>
              <v-flex xs2>
                  Show
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import db from "../plugins/firebaseInit.js";
  import Avatar from "vue-avatar";

  export default {
    data() {
      return {
        contacts: []
      };
    },
    components: {
      Avatar
    },
    mounted() {
      db
        .collection("contacts")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone,
              job_title: doc.data().job_title,
              company: doc.data().company,
              slug: doc.data().slug
            };
            this.contacts.push(data);
          });
        });
    },
    methods: {
      show() {
        console.log('show');
      }
    }
  };

</script>

<style scoped>


</style>
