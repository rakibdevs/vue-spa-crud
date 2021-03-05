<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <div class="d-flex container justify-content-between pl-4 pr-4">
            <router-link to="/" class="navbar-brand">
                <img :src="`/images/weDevs-color-logo.png`" height="35"> | Products
            </router-link>
            <div class="navbar-nav">
                <li class="nav-item">
                    <router-link to="/products" class="nav-link">
                        Products
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/products/create" class="nav-link">
                        Add Product
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">
                        Login
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">
                        Register
                    </router-link>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Header",
};
</script>
