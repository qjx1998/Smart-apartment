<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key" />
        </transition>
        <change-password v-if="changingPasswordVisible" />
    </section>
</template>

<script>
import changePassword from './change.password/change.password.vue';
export default {
    name: 'AppMain',
    components: { changePassword },
    computed: {
        key() {
            return this.$route.fullPath;
        },
        changingPasswordVisible() {
            return this.$store.getters.changingPasswordVisible;
        }
    }
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  background-color: #f0f0f0;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
