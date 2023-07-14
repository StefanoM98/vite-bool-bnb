<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: "MessageForm",
    props: {
        apartment_id: Number,
    },
    data() {
        return {
            store,
            message: {
                name: '',
                email: '',
                text: '',
                state_message: false,
            },
            errors: [],
            success: false,
        }
    },
    methods: {
        sendMessage() {
            this.success = false;
            const message = {
                apartment_id: this.apartment_id,
                name: this.message.name,
                email: this.message.email,
                text: this.message.text,
                state_message: this.message.state_message,
            };

            axios.post(`${this.store.apiUrl}/messages`, message).then((response) => {
                this.message.name = '';
                this.message.email = '';
                this.message.text = '';
                this.message.state_message = false;
                this.success = true;
            }).catch((error) => {
                const res_errors = error.response.data.errors;
                for (const field in res_errors) {
                    this.errors.push(res_errors[field][0])
                }
            })
        }
    }
}
</script>

<template>
    <div v-if="errors.length" class="alert alert-danger d-flex justify-content-between">
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
        </button>
    </div>
    <div v-if="success" class="alert alert-success d-flex justify-content-between">
        Message has been sended correctly
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
        </button>
    </div>
    <div class="form-box d-flex flex-column p-2 rounded-4">
        <div class="box">
            <div class="message-box shadow-lg p-4 rounded-4">
                <!-- form detail  -->
                <form @submit.prevent="sendMessage">
                    <div class="modal-body">
                        <div class="my-4">
                            <h5 class="text-center fw-bold color-primary">
                                Do you need more informations?
                            </h5>
                        </div>

                        <div class="mb-3">
                            <label for="name" class="pb-2">Name</label>
                            <input type="text" id="name" v-model="message.name" class="form-control" minlength="3"
                                maxlength="100" required />
                        </div>

                        <div class="mb-3">
                            <label for="email" class="pb-2">Email</label>

                            <input type="email" id="email" v-model="message.email" class="form-control" minlength="5"
                                maxlength="100" required />
                        </div>
                        <div class="mb-3">
                            <label for="text" class="pb-2">Message</label>
                            <textarea id="text" v-model="message.text" class="form-control" minlength="4" maxlength="65535"
                                required></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn form-btn rounded-5 mt-2 fw-bold">
                            Send message
                        </button>
                    </div>
                </form>
                <!-- end form detail  -->
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@use "../../style/partials/variables.scss" as *;

.form-box {
  box-shadow: 1px 1px 10px 10px lightgray;

  .message-box {
    background-color: #f1f1f1;

    .form-control:focus {
      outline: none;
      box-shadow: none;
    }

    input:focus,
    textarea:focus {
      border-color: $dark_accent_color;
    }

    .form-btn {
      background-color: $dark_accent_color;
      color: #f1f1f1;
    }
  }
}
</style>