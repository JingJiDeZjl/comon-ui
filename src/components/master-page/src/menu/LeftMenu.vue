<template>
	<div class="cmpSkeleton">
		<el-menu theme="dark" @select="selectSubMenu">
			<el-menu-item
				v-for="menuItem in menu"
				:index="menuItem['url']"
				:key="menuItem['url'] + '_left'"
				:class="menuItem['url'] == lastPath ? 'current is-active' : ''"
			>
				<i :class="'el-icon-' + menuItem['icon']"></i>
				<span class="name">{{menuItem['name']}}</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>


<script>
	export default {
		props: {
			menu: {
				type: Array
			}
		},
		data() {
			return {
				lastPath: ''
			}
		},
		computed: {},
		watch: {},
		mounted(){},
		methods: {
			selectSubMenu(path){
				this.$emit('select', path)
      }
		}
	}
</script>


<style lang="scss" scoped>
	.cmpSkeleton{
    width: 160px;
    background: #324157;
    position: fixed;
    left: 0;
    top: 40px;
    bottom: 0;
    z-index: 999;
    &.collapsed{
      width: 50px;
      .el-menu-item{
        padding-left: 14px !important;
        position: relative;
        i{
          font-size: 22px;
          vertical-align: middle;
        }
        .name{
          display: none;
        }
        &:hover{
          .name{
            display: block;
            background: #48576a;
            width: auto;
            position: absolute;
            top:0;
            left: 100%;
            z-index: 999999;
            padding: 0px 10px;
          }
        }
      }
      ~ .my-content{
        padding-left: 55px;
      }
    }
	}
</style>
