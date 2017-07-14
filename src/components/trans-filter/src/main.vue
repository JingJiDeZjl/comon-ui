<template>
  <div class="filterContent">
    <div v-for="(item,index) in filterArr">
      <div v-if="index==0">
        <svg @click.stop="svgChange(item,index)" data-step="$ALL"  style="cursor: pointer" width="107" height="57" xmlns="http://www.w3.org/2000/svg">
          <g>
            <title></title>
            <g fill="none" fill-rule="evenodd">
              <g :class="{ active: index == currentSvgIndex && clickable}" fill="#EAEFF4">
                <polygon points="0,0 107,0 107,44 53.5,57 0,44" style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"></polygon>
              </g>
            </g>
            <text fill="#000000" stroke="#6666ff" stroke-width="0" stroke-dasharray="null" stroke-linejoin="null" stroke-linecap="null" x="50%" y="23" font-size="14" font-family="Monospace" text-anchor="middle" xml:space="preserve">总转化率</text>
          <text xml:space="preserve" text-anchor="middle" font-size="14" y="39" x="48%" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#6666ff" fill="#000000">
            {{item.conversion}}
          </text>
          </g>
        </svg>
        <div class="filtertext">
          <div class="fu-arrow-container">
            <div class="event-title">{{item.title}}</div>
            <div class="sa-h-split"></div>
            <div class="div-inline" style="width: 85px; text-align: right;">{{item.number}}人</div>
          </div>
        </div>
      </div>
      <div v-else>
        <svg @click.stop="svgChange(item,index)" style="margin-top: 10px;cursor: pointer" data-step="0" width="100" height="44" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g fill="none" fill-rule="evenodd">
              <g :class="{ active: index == currentSvgIndex && clickable }" fill="#EAEFF4" >
                <polygon points="18,0 82,0 82,20 100,20 50,44 0,20 18,20 " style="stroke-width: 1; stroke: rgba(0,0,0,0.12);"></polygon>
              </g>
            </g>
            <text xml:space="preserve" text-anchor="middle" font-size="14px" id="" y="26" x="48%" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="0" stroke="#6666ff" fill="#000000">
              {{filterArr[index].conversion}}
            </text>
          </g>
        </svg>
        <div class="filtertext">
          <div class="fu-arrow-container">
            <div class="event-title">{{filterArr[index].title}}</div>
            <div class="sa-h-split"></div>
            <div class="div-inline" style="width: 85px; text-align: right;">{{filterArr[index].number}} 人</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .filterContent{
    width: 260px;
    height: 30px;
    margin: 0 auto;
    .filtertext{
      height: 30px;
      background: red;
      font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
      background: rgba(0,0,0,0.03);
      border: 1px solid rgba(0,0,0,0.06);
      font-weight: 300;
      color: #777c7c;
      .fu-arrow-container {
        width: 100%;
        height: 100%;
        position: relative;
        text-overflow: ellipsis;
        overflow-x: hidden;
        display: inline-block;
        white-space: nowrap;
        .event-title{
          position: absolute;
          left: 5%;
          top:6px;
          display: inline-block;
        }
        .div-inline{
          position: absolute;
          right: 5%;
          top:5px;
          display: inline-block;
        }
        .sa-h-split {
          height: 16px;
          display: inline-block;
          position: absolute;
          left: 65%;
          top:10px;
          border-right: 1px solid rgba(0,0,0,0.12);
        }
      }
    }
  }
  .active{
    fill: #20a0ff;
  }
</style>
<script>
  export default{
    name: 'CuTanrsFilter',
    props: {
      filterArr: '',
      clickable: ''
    },
    computed: {
    },
    data () {
      return {
        fristFilter: [],
        currentSvgIndex: 0
      }
    },
    methods: {
      svgChange (item, index) {
        this.currentSvgIndex = index
        this.$emit('svgChange', item, index)
      }
    },
    created () {
    }
  }
</script>
