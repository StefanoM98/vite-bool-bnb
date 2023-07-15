<script>
export default {
  name: "Loader",
};
</script>
<template>
      <div class="position-absolute ms_position">
        <div class="loader_content">
          <div class="transform"><div class="loader"></div></div>
        
          <p>loading</p>
          <div class="words">
            <span class="word">houses</span>
            <span class="word">hotels</span>
            <span class="word">apartments</span>
            <span class="word">lofts</span>
            <span class="word">houses</span>
          </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
.ms_position {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loader_content {
  color: black;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 25px;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  height: 40px;
  padding: 10px 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-radius: 8px;
}

.words {
  overflow: hidden;
}

.word {
  display: block;
  height: 100%;
  padding-left: 6px;
  color: #00ace3;
  animation: spin_4991 4s infinite;
}

@keyframes spin_4991 {
  10% {
    -webkit-transform: translateY(-105%);
    transform: translateY(-105%);
  }

  25% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  35% {
    -webkit-transform: translateY(-205%);
    transform: translateY(-205%);
  }

  50% {
    -webkit-transform: translateY(-200%);
    transform: translateY(-200%);
  }

  60% {
    -webkit-transform: translateY(-305%);
    transform: translateY(-305%);
  }

  75% {
    -webkit-transform: translateY(-300%);
    transform: translateY(-300%);
  }

  85% {
    -webkit-transform: translateY(-405%);
    transform: translateY(-405%);
  }

  100% {
    -webkit-transform: translateY(-400%);
    transform: translateY(-400%);
  }
}

.loader {
  position: absolute;
  width: 44.8px;
  height: 44.8px;
  position: relative;
  transform: rotate(45deg);
}

.transform {
  padding-right: 20px;
  transform: translate(0, -40%);
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 0 50%;
  background: #0000;
  background-image: radial-gradient(
    circle 11.2px at 50% 50%,
    #0000 94%,
    #01abe3
  );
}

.loader:after {
  animation: pulse-ytk0dhmd 1s infinite;
  transform: perspective(336px) translateZ(0px);
}

@keyframes pulse-ytk0dhmd {
  to {
    transform: perspective(336px) translateZ(168px);
    opacity: 0;
  }
}
</style>
