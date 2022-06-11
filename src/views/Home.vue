<template>
  <div>
    <v-carousel
      cycle
      height="790"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="require('../assets/' + slide)"
      >
      </v-carousel-item>
    </v-carousel>
    <v-container>
      <selling></selling>
      <v-divider class="my-10"></v-divider>
      <p class="text-h4 mt-5 mb-5 ml-2">可以在家尝试的食谱</p>
      <v-row>
        <v-col lg="3" v-for="(item, i) in card" :key="i">
          <homeCard :item="item"></homeCard>
        </v-col>
      </v-row>
      <v-divider class="my-10"></v-divider>

      <p class="text-h4 mt-5">好物推荐</p>
      <scrollCard></scrollCard>
    </v-container>

  </div>
</template>

<script>
import homeCard from "../components/homeCard.vue";
import scrollCard from "../components/scrollCard.vue";
import selling from "../components/homeSellingBest.vue";
export default {
  components: {
    homeCard,
    scrollCard,
    selling,
  },
  data() {
    return {
      slides: ["taier.png", "diantaixaing.jpg", "vuou.jpg"],

      card: [
        {
          title: "美妙汉堡",
          text: "马上享用美味点心！",
          color: "black",
          img: "newfood22.jpg",
          introImg: "newfood2.jpg",
          content: [
            {
              title: "材料",
              text: [
                "600克VÄRLDSKLOK 瓦勒克罗 素碎肉",
                "2茶匙熏制辣椒粉",
                "半茶匙盐",
                "2撮黑胡椒",
                "煎制使用菜籽油",
              ],
            },
            {
              title: "制作步骤",
              text: [
                "1. 把冰冻的碎肉铺在一张大浅盘上，解冻30分钟左右。不需要完全达到室温。",
                "2. 混合所有材料。用冷水打湿双手（避免粘手），做出四个汉堡肉饼的形状。",
                "3. 肉饼用菜籽油中火煎2-3分钟，直到两面都变硬。",
                "4. 加热汉堡面包，然后在汉堡里加上你喜欢的调味酱料。",
              ],
            },
          ],
        },
        {
          title: "番茄酱素肉丸",
          text: "不妨试试这些美味多汁的素肉丸，经典的地中海风味配菜",
          color: "#afbe87",
          img: "newfood11.jpg",
          introImg: "newfood.jpg",
          content: [
            {
              title: "材料",
              text: [
                "500克VÄRLDSKLOK 瓦勒克罗 素碎肉",
                "150克菲达奶酪",
                "2瓣压好的蒜",
                "半茶匙黑胡椒粉",
                "1茶匙盐",
                "半茶匙黑胡椒粉",
              ],
            },
            {
              title: "制作步骤",
              text: [
                "1. 把冰冻的碎肉铺在一张大浅盘上，解冻30分钟左右。不需要完全达到室温",
                "2. 将菲达奶酪切碎放入素碎肉中，然后搅拌。",
                "3. 双手打湿，将混合物揉成丸子形状。",
                "4. 倒油将素肉球炸至金黄色。",
                "5. 倒入番茄酱，慢炖10分钟。必要时加入适量清水。",
              ],
            },
          ],
        },
        {
          title: "一杯好茶，一口甜梨",
          text: "伯爵红茶的丝丝苦涩与梨的甘甜交融，带来愉悦享受。",
          color: "#9c5b3b",
          img: "newfood5.webp",
          introImg: "newfood5.webp",
          content: [
            {
              title: "材料",
              text: [
                "3个梨子（如安久梨或康富伦斯啤梨）",
                "3袋EGENTID 依根提德 伯爵红茶",
                "100毫升马斯卡泊尼乳酪",
                "100毫升法式鲜奶油",
                "4汤匙切碎的开心果",
                "蜂蜜",
              ],
            },
            {
              title: "制作步骤",
              text: [
                "1. 用削皮刀削去梨皮，纵向切成约2厘米厚的片（约4片）。",
                "2. 将茶包放入1.5至2升的锅中，加入600毫升水和糖。煮沸然后关火，静置4分钟。",
                "3. 取出茶包。把锅放回炉灶上，用中火慢炖。加入梨，盖上锅盖。慢炖15-20分钟。",
                "4. 混合马斯卡泊尼乳酪和法式鲜奶油。梨变软后，从锅中取出。在梨片上放上一层马斯卡泊尼乳酪和法式鲜奶油，一大勺刚煮过的梨汁和少量蜂蜜。撒上切碎的开心果。趁热享用。",
              ],
            },
          ],
        },
        {
          title: "西冷牛排粒杏鲍菇",
          text: "当西冷牛排遇见杏鲍菇丁，柔韧与脆滑的口感巧妙合一",
          color: "#fb5b35",
          img: "newfood4.jpg",
          introImg: "newfood4.jpg",
          content: [
            {
              title: "材料",
              text: [
                "200克西冷牛排（一块）",
                "150克杏鲍菇",
                "30克青椒",
                "10克黄油",
                "10毫升红酒",
                "5克黑胡椒碎",
                "15克洋葱",
                "2克食盐",
              ],
            },

            {
              title: "制作步骤",
              text: [
                "1. 牛排解冻，同步切好青椒丁、黄椒丁、红椒丁洋葱粒和杏鲍菇丁备用。",
                "2. 将解冻好的牛排（用厨房纸吸干表面水分）切成块。",
                "3. 在密封袋中加入食盐、红酒和生粉，再将牛肉也加入其中，密封腌制5分钟。",
                "4. 锅中放入黄油块，化开后倒入牛肉翻炒。",
                "5. 牛肉炒熟盛出，保留锅内底油，将洋葱粒、杏鲍菇丁依次加入翻炒，炒熟后加入彩椒丁。",
                "6. 将牛肉倒回锅中，加上盐和黑胡椒调味，炒匀后关火装盘即可。",
              ],
            },
          ],
        },
      ],
    };
  },
  created() {},
};
</script>

<style>

</style>