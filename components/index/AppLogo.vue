<template>
  <div class="VueToIncrementLogo">
    <div class="VueToCurveLogo" :class="{ dark: darkMode, light: !darkMode }">
      <i class="curve" />
    </div>
    <div class="VueToPlusLogo" :class="{ dark: darkMode, light: !darkMode }">
      <i class="op_plus" :class="{ 'dark--plus': darkMode, 'light--plus': !darkMode }" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark;
    }
  }
};
</script>

<style scoped>
.light {
  background-color: #7393ea;
  box-shadow: 0 0 0 5px #fff;
}

.light--plus:before,
.light--plus:after {
  background-color: #fff;
}

.dark {
  background-color: #00bfa5;
  box-shadow: 0 0 0 5px #000;
}

.dark--plus:before,
.dark--plus:after {
  background-color: #000;
}

.VueToIncrementLogo {
  display: inline-block;
  animation: turn 2s linear forwards 2s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 220px;
}

.VueToPlusLogo {
  position: absolute;
  overflow: hidden;
  height: 180px;
  width: 180px;
  border-radius: 50%;
  animation-name: slide;
  animation-duration: 1.2s;
  animation-delay: 4s;
  animation-fill-mode: both;
}

.VueToCurveLogo {
  position: absolute;
  overflow: hidden;
  height: 180px;
  width: 180px;
  border-radius: 50%;
}

.op_plus {
  display: inline-block;
  position: relative;
  width: 80%;
  height: 80%;
}
.op_plus:before,
.op_plus:after {
  display: block;
  content: "";
  border-radius: 10px;
  position: absolute;
  height: 10px;
  top: 88px;
  margin: auto;
  animation-name: draw--horizontal;
  animation-duration: 1s;
  animation-delay: 0.8s;
  animation-fill-mode: both;
}
.op_plus:before {
  width: 10px;
  top: 20px;
  left: 70px;
  animation-name: draw--vertical;
  animation-duration: 1s;
  animation-delay: 0.8s;
  animation-fill-mode: both;
}

.curve {
  border-radius: 30%;
  width: 20px;
  height: 80%;
}

@keyframes turn {
  100% {
    transform: rotateX(0deg);
  }
}

@keyframes slide {
  from {
    left: 0;
  }

  to {
    left: 20px;
  }
}

@keyframes draw--horizontal {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

@keyframes draw--vertical {
  from {
    height: 0;
  }

  to {
    height: 100%;
  }
}
</style>
