const Vue = require("vue/dist/vue");
const { clipboard } = require("electron");
const moment = require("moment");

moment.locale("fi");

new Vue({
  el: "#app",
  data: () => ({
    clip_history: [],
  }),
  mounted() {
    this.clip_history.push({
      text: clipboard.readText(),
      clipped: moment().calendar(),
    });
    setInterval(this.checkClipboard, 500);
  },
  methods: {
    checkClipboard() {
      const text = clipboard.readText();
      if (this.clip_history[this.clip_history.length - 1].text !== text) {
        this.clip_history.push({
          text,
          clipped: moment().calendar(),
        });
      }
    },
    clickedItem(item) {
      const idx = this.clip_history.indexOf(item);
      if (this.clip_history.length > 1) this.clip_history.splice(idx, 1);
      //   this.clip_history.unshift(item);
      clipboard.writeText(item.text);
      window.scrollTo(0, 0);
    },
  },
  computed: {
    reverseHistory() {
      return this.clip_history.slice().reverse();
    },
  },
});
