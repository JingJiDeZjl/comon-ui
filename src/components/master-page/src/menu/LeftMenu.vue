<template>
	<div class="cmpSkeleton">
		<el-menu theme="dark" @select="selectSubMenu">
			<template v-for="menuItem in menu">
				<!--二级菜单-->
				<template v-if="!menuItem.children">
					<el-menu-item :index="menuItem['url']" :key="menuItem['url'] + '_left'"
						:class="menuItem['url'] == lastPath ? 'current is-active' : ''"
					>
						<i :class="'fa fa-' + menuItem['icon']" aria-hidden="true"></i>
						<span class="menu-text">{{menuItem['name']}}</span>
					</el-menu-item>
				</template>
				<!--三级菜单-->
				<template v-else>
					<el-submenu index="">
				    <template slot="title">
							<i :class="'fa fa-' + menuItem['icon']" aria-hidden="true"></i>
							{{menuItem.name}}
						</template>
				    <el-menu-item
							v-for="subMenuItem in menuItem.children"
							:index="subMenuItem['url']"
							:key="subMenuItem['url'] + '_submenu'"
						>
				    	<span class="menu-text">{{subMenuItem['name']}}</span>
				    </el-menu-item>
				  </el-submenu>
				</template>
			</template>
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
	}
</style>
