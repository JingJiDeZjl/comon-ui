<template>
  <div>
    <div v-if="model=='default'">
      <el-select @change ="selectChang" v-model="optionValue" placeholder="请选择">
        <el-option
          v-for="item in selectArr"
          :key="item.value"
          :label="item.label"
          :disabled="item.disabled"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div v-if="model=='normal'">
      <el-select @change ="selectChang" :multiple="checkable" clearable v-model="optionValue" filterable :placeholder="checkCount">
        <el-checkbox-group @change = "checkListChange" v-model="checkList">
          <el-option
            v-for="(item,index) in selectArr"
            :key="item.value"
            :label="item.label"
            :disabled="item.disabled"
            :value="item.value">
            <el-checkbox v-if="checkable" class="check"  :label="item.label" :key="item.value">{{item.label}}</el-checkbox>
            <span v-if="editable" @mouseover="mouseHover(index)" class="optionSpan">{{ item.label }}</span>
            <i v-if="editable && currentIndex==index"  @click.stop="editOption(item,index)" class="el-icon-edit myEdit"></i>
          </el-option>
        </el-checkbox-group>
      </el-select>
    </div>
    <div v-if="model=='dropdown'" class="tab-box">
      <div v-if="params.model == 'check'">
        <el-button @click="showToggle" style="float: left;margin-bottom: 2px" type="primary">
          {{params.buttonName}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <div v-if="showCheck" class="check">
          <el-checkbox-group @change = "checkListChange" :max="params.maxSelect" v-model="checkList">
            <div v-for="item in params.tabCheckList">
              <el-checkbox class="checkItem" :label="item.label" :key="item.value"></el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </div>
      <div v-if="params.model=='tab'">
        <el-button @click="showToggle" style="float: left;margin-bottom: 2px" type="primary">
          {{params.buttonName}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-tabs v-if="showTab" class="tab" v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane :label="params.tabName[0]" name="first">
            <el-checkbox-group @change = "checkListChange" :max="params.maxSelect" style="text-align:left;width: 100%;" v-model="checkList">
              <div v-for="item in params.tabPanList">
                <el-checkbox class="tab-checkbox" :label="item.label" :key="item.value"></el-checkbox>
              </div>
            </el-checkbox-group>
            <div class="splice-box"></div>
            <span @click="settingShow" class="bottom-span">坐标轴设置</span>
          </el-tab-pane>
          <el-tab-pane :label="params.tabName[1]" name="second">
            <el-checkbox-group  @change = "checkListChange" style="text-align:left;width: 100%;" v-model="checkList">
              <div v-for="item in params.tabPanList1">
                <el-checkbox class="tab-checkbox" :label="item.label" :key="item.value"></el-checkbox>
              </div>
            </el-checkbox-group>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dropdown v-if="params.model=='dropdown'" @command="dropdownChange" trigger="click">
        <el-button type="primary">
          {{params.buttonName}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.value" v-for="item in params.dropdown">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="model=='cascader'">
      <el-cascader
        expand-trigger="hover"
        :options="selectArr"
        v-model="selectedOptions"
        @change="selectCascaderChang">
      </el-cascader>
    </div>
    <div v-if="model=='group'" class="group">
      <el-select @change ="selectChang" clearable v-model="optionValue" filterable placeholder="请选择...">
        <el-option-group
          v-for="group in selectArr"
          :key="group.label"
          :disabled="group.disabled"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :disabled="item.disabled"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-option-group>
      </el-select>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .tab-box{
    position:relative;
    padding: 0px;
    width: 220px;
    margin: 0px auto;
    .check{
      position: absolute;
      display: block;
      top: 40px;
      z-index: 9999;
      background: #fff;
      left: 0px;
      width: 0px!important;
      height: auto !important;
      box-shadow: 0 6px 12px rgba(0,0,0,0.175);
      border: 1px solid #ccc;
      .checkItem{
        color: #777c7c!important;
        margin-left: 4px;
      }
    }
    .tab{
      position:absolute;
      top:37px;
      z-index: 9999;
      margin-top: 2px;
      background: #fff;
      clear: both;
      box-shadow: 0 6px 12px rgba(0,0,0,0.175);
      border: 1px solid #ccc;
      .splice-box{
        position:relative;
        clear:both;
        width: 100%;
        height: 1px;
        background: #ddd;
        margin-top: 4px
      }
      .bottom-span{
        float:left;
        margin-left: 8px;
        color: #20a0ff;
        cursor: pointer;
        margin-top: 8px
      }
      .tab-checkbox{
        margin-top: 3px;
        margin-left: 7px;
        width: 220px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
        color: #777c7c;
      }
    }
  }
  .check{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 100%;
    padding-left: 5px;
    padding-top: 10px;
    padding-right: 100%;
  }
  .optionSpan{
    width: 120px;
    float: left;
    padding: 1px 15px 8px 5px
  }
  .myEdit{
    color: #20a0ff;;
    float: right;
    padding: 4px 7px;
  }
</style>
<script>
  export default {
    name:'CuSelectOption',
    props: {
      selectArr: '',
      model: '',
      editable: false,
      checkable: false,
      params: ''
    },
    data () {
      return {
        optionValue: '',
        selectedOptions: [],
        currentIndex: '',
        checkList: [],
        showCheck: false,
        activeName: 'first',
        showTab: false,
        checkCount: '请选择...'
      }
    },
    created () {
    },
    methods: {
      selectChang () {
        this.$emit('selectChange', this.optionValue)
      },
      editOption (item, index) {
        this.currentIndex = index
        this.$emit('editOption', item)
      },
      mouseHover (index) {
        this.currentIndex = index
      },
      showToggle () {
        if (this.model === 'dropdown' && this.params.model === 'check') {
          this.showCheck = !this.showCheck
        }
        this.showTab = !this.showTab
      },
      checkListChange () {
        if (this.checkable) {
          this.checkCount = '共选中了' + this.checkList.length + '个'
        }
        this.$emit('checkListChange', this.checkList)
      },
      settingShow () {
        this.$emit('settingShow')
      },
      handleTabClick () {
        this.$emit('handleTabClick')
      },
      dropdownChange (val) {
        this.$emit('dropdownChange', val)
      },
      selectCascaderChang () {
        this.$emit('selectCascaderChang', this.selectedOptions)
      }
    }
  }
</script>
