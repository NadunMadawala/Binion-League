<script>

import BobImage from "../assets/AvatarImages/Bob.png";
import DaveImage from "../assets/AvatarImages/Dave.png";
import JerryImage from "../assets/AvatarImages/Jerry.png";
import KevinImage from "../assets/AvatarImages/Kevin.png";
import PhillImage from "../assets/AvatarImages/Phill.png";
import StuartImage from "../assets/AvatarImages/Stuart.png";
import TomImage from "../assets/AvatarImages/Tom.png";
import CarlImage from "../assets/AvatarImages/Carl.png";

export default {
    data() {
    return {
      avatars: {
        Bob: BobImage,
        Dave: DaveImage,
        Jerry: JerryImage,
        Kevin: KevinImage,
        Phill:  PhillImage,
        Stuart: StuartImage,
        Tom:  TomImage,
        Carl:CarlImage,
      },
    };
  },
  methods: {
    getImagePath(value) {
      return this.avatars[value];
    },
  },

  props: {
    matched: {
      type: Boolean,
      default: false,
    },
    position: {
      type: Number,
      Required: true,
    },
    value: {
      type: String,
      Required: true,
    },

    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };
    return {
      selectCard,
    };
  },
};
</script>

<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <!-- {{ value }} -->
       <img :src="getImagePath(value)" :alt="value" class="avatar-image"/>
      <img v-if="matched" src="../assets/check.png" class="checkmark"> </img>
    </div>

    <div v-else class="card-face is-back">
      <!-- Back -->
    </div>
  </div>
</template>

<style>
.card {
  position: relative;
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-face.is-front {
  background: red;
  color: white;
  background-color: #fff;
  align-content: center;
}

.card-face.is-back {
  /* background: blue; */
  background-image: url("../assets/cardback.jpeg");
  color: white;
  background-repeat: no-repeat;
  background-size: cover;
}
.checkmark{
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: 20px;
    width: 20px;
}
.avatar-image {
  width: 60px;
  height: 110px;
  object-fit: scale-down; /* Keeps the aspect ratio intact */

}
</style>
