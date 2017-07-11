<template>
	<el-menu :theme="theme || 'dark'"
		@select="selectSubMenu"
		:default-active="activePath"
		:key="'left_menu_' + topMenuIndex"
		style="height:100%"
	>
		<template v-for="menuItem in menu">
			<!--二级菜单-->
			<template v-if="!menuItem.children">
				<el-menu-item :index="menuItem['url']" :key="menuItem['url']">
					<i :class="'fa fa-' + menuItem['icon']" aria-hidden="true"></i>
					<span class="menu-text">{{menuItem['name']}}</span>
				</el-menu-item>
			</template>
			<!--三级菜单-->
			<template v-else>
				<el-submenu :index="menuItem['name']">
			    <template slot="title">
						<i :class="'fa fa-' + menuItem['icon']" aria-hidden="true"></i>
						<span class="menu-group-text">{{menuItem['name']}}</span>
					</template>
			    <el-menu-item
						v-for="subMenuItem in menuItem.children"
						:index="subMenuItem['url']"
						:key="subMenuItem['url']"
					>
			    	<span class="menu-text">{{subMenuItem['name']}}</span>
			    </el-menu-item>
			  </el-submenu>
			</template>
		</template>
	</el-menu>
</template>


<script>
	export default {
		props: {
			menu: {
				type: Array
			},
			config: {
				type: Object
			},
			activePath: {
				type: String
			},
			topMenuIndex: {
				type: Number
			}
		},
		computed: {
			theme(){
				return this.config['theme'] || 'dark'
			}
		},
		methods: {
			selectSubMenu(path){
				this.$emit('select', path)
      }
		}
	}
</script>


<style lang="scss" scoped>

</style>
