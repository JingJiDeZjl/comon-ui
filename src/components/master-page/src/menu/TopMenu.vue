<template>
	<div class="top-menu left">
		<el-menu theme="dark" default-active="0"  mode="horizontal" @select="select">
		  <el-menu-item
				v-for="(menuItem, index) in menu"
				:index="index + ''"
				:key="'top_menu_' + index"
				class="top-menu-item"
			>
				{{menuItem['name']}}
			</el-menu-item>
		</el-menu>
	</div>
</template>


<script>
	export default {
		props: {
			menu: {
				type: Array
			},
			config: {
				type: Object
			}
		},
		data() {
      return {
        currentIndex: '0'
      }
		},
		methods: {
			select(index){
        if(this.currentIndex != index){
					this.$emit('select', this.menu[index], parseInt(this.currentIndex = index))
        }
      },
		}
	}
</script>


<style lang="scss" scoped>
	.top-menu-item{
    color: rgba(255, 255, 255, 0.5);
    height: 40px;
    line-height: 40px;
		margin-right: 2px;
		&:hover{
			color: rgba(255, 255, 255, 1);
			border-bottom:none!important;
		}
		&.is-active{
			color: rgb(255, 255, 255)!important;
			background-color: #1c2637!important;
	    border-bottom: 5px solid #20a0ff!important;
		}
	}
</style>
