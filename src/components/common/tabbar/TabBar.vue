<template>
    <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>

<style>
#tab-bar {
  display:flex;
  position:fixed;
  right:0;
  left:0;
  bottom: 0;
  height: 49px;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(0,0,0,.1);
}

</style>
