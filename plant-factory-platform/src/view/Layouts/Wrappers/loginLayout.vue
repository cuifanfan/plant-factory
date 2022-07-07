<template>
  <div class="bg">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg {
  position: relative;
  height: 100%;
  min-height: 600px;
}

.bg::after {
  position: absolute;
  content: "";
  display: block;
  height: 100%;
  width: 100%;
  background-image: url("../../../assets/images/title.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
  z-index: 0;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
