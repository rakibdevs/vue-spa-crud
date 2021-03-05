<template>
    <div class="container">
        <Form @submit="onSubmit" :validation-schema="schema">
            <div v-if="isLoading">
                <div class="text-center">
                  <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                  <br />
                  Fetching product
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <div v-if="!temp_image">
                            <img src="/images/select_product.png" class="product-image-display"  />
                            
                        </div>
                        <div class="product-image-display" v-else>
                            <img :src="temp_image" class="product-image-display" />
                        </div>
                                        
                        <ErrorMessage name="image" class="text-danger" />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="product-form-card">
                        <h4 class="vue-card-title ">Add Product</h4>
                        <div v-if="product !== null && !isLoading">
                            <div class="form-group">
                                <label>Product Name:</label>
                                <Field
                                  id="title"
                                  name="title"
                                  type="text"
                                  class="form-control"
                                  :value="product.title"
                                  @input="updateProductInputAction"
                                />
                                <ErrorMessage name="title" class="text-danger" />
                              </div>
                              <div class="form-group">
                                <label>Product Price:</label>
                                <Field
                                  name="price"
                                  type="number"
                                  class="form-control"
                                  :value="product.price"
                                  @input="updateProductInputAction"
                                />
                                <ErrorMessage name="price" class="text-danger" />
                              </div>
                            <div class="form-group">
                                <label>Description:</label>
                                <Field
                                  name="description"
                                  as="textarea"
                                  class="form-control"
                                  :value="product.description"
                                  @input="updateProductInputAction"
                                />
                                <ErrorMessage name="description" class="text-danger" />
                            </div>
                            <div class="form-group">
                              <router-link to="/products" class="btn btn-secondary mr-2"
                                >Cancel</router-link
                              >
                              <input
                                type="submit"
                                class="btn btn-primary"
                                value="Update"
                                v-if="!isUpdating"
                              />
                              <button class="btn btn-primary" type="button" disabled v-if="isUpdating">
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Saving...
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      id: null,
      temp_image: null
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },

  created: function () {
    this.id = this.$route.params.id;
    this.fetchDetailProduct(this.id);

  },

  computed: { ...mapGetters(["isUpdating", "updatedData", "product", "isLoading"]) },

  methods: {
    ...mapActions(["updateProduct", "updateProductInput", "fetchDetailProduct"]),
    onSubmit() {
      const { title, price, description } = this.product;
      // return false;
      this.updateProduct({
        id: this.id,
        title: title,
        price: price,
        image: null,
        description: description,
        user_id: 1,
      });
    },
    updateProductInputAction(e) {
      this.updateProductInput(e);
    },
  },

  watch: {
    updatedData: function () {
      if (this.updatedData !== null && !this.isUpdating) {
        this.$swal.fire({
          text: "Success, Product has been updated successfully !",
          icon: "success",
          position: "top-end",
          timer: 1000,
        });

        this.$router.push({ name: "Products" });
      }
    },
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      title: yup.string().required().min(5),
      price: yup.string().required(),
      description: yup.string().required().min(5),
    });

    return {
      schema,
    };
  },
};
</script>
