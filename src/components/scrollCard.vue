<template>
  <div class="horizontal-scrollbar-container">
    <div class="scroll-wrapper" ref="scroll">
      <div id="scrollItem" class="scroll-content">
        <div class="scroll-item" v-for="(item,i) in scrollItem" :key="i">
          <scrollCardItem :item = "item" ></scrollCardItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";

BScroll.use(ScrollBar);
import scrollCardItem from "./scrollCardItem.vue";

export default {
   data() {
    return {
      scrollItem: [
        { title: "玉米片虾排", img: "ikeafood3"  },
        { title: "芝士焗大虾", img: "ikeafood4"  },
        { title: "可颂",img: "ikeafood1"  },
        { title: "蔓越莓软欧包", img: "ikeafood2"  },
        { title: "炸薯条", img: "ikeafood6"  },
        { title: "烤鸡翅", img: "ikeafood5"  },
      ],
    };
  },
  components: {
    scrollCardItem,
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    //this.scroll.destroy();
  },
  methods: {
    init() {
      this.scroll = new BScroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        click: true,
        probeType: 3,
        
        scrollbar: {
          fade: false,
          interactive: true,
          scrollbarTrackClickable: true,
          scrollbarTrackOffsetType: "clickedPoint", // can use 'step'
        },
      });
      this.scroll.on("scrollEnd", () => {
       // console.log("scrollEnd");
      });
      this.scroll.on("scrollStart", () => {
        //console.log("scrollStart");
      });
      this.scroll.on("scroll", () => {
        //console.log("scroll");
      });
    },
  },
};
</script>

<style>
.horizontal-scrollbar-container .scroll-wrapper {
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  white-space:nowrap;
  margin-bottom: 50px;
  height:500px;
}
#scrollItem {
  display: inline-block;
  align-self: center;
  
}
.scroll-item {
  display: inline-block;
  width: 350px;
}
</style>