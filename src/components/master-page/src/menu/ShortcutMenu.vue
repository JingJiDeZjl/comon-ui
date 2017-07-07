<template>
	<div class="shortcut-menu right">
		<!--兄弟系统-->
		<el-dropdown v-if="otherplt && otherplt.length" @command="gotoOtherPlt" class="select-box">
		  <span class="el-dropdown-link">
		    其它系统<i class="el-icon-caret-bottom"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item
					v-for="(menuItem, index) in otherplt"
					:key="'other-plt_' + menuItem['url']"
					:command="menuItem['url']"
				>
					{{menuItem['description']}}
				</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<!--当前用户信息-->
		<el-dropdown v-if="user.user_name && user.user_role" @command="onUserAction" class="select-box">
		  <span class="el-dropdown-link">
		    {{user.user_name}} ({{user.user_role}})<i class="el-icon-caret-bottom"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item command="logout">退出</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
		<!--城市列表-->
		<el-dropdown v-if="city.ids && city.ids.length" @command="onChangeCity" class="select-box">
		  <span class="el-dropdown-link">
		    {{user.city_name}}<i class="el-icon-caret-bottom"></i>
		  </span>
		  <el-dropdown-menu slot="dropdown">
		    <el-dropdown-item
					v-for="(id, index) in city.ids"
					:key="'city_list_' + id"
					:command="id"
				>
					{{city.names[index]}}
				</el-dropdown-item>
		  </el-dropdown-menu>
		</el-dropdown>
	</div>
</template>


<script>
	export default {
		props: {
			otherplt: {
	      type: Array
	    },
			config: {
				type: Object
			},
			user: {
	      type: Object
	    },
			city: {
	      type: Object
	    }
		},
		methods: {
			gotoOtherPlt(url){
				window.open(url)
			},
			onUserAction(cmd){
				if(cmd == 'logout'){
					window.location.href = '/site/logout'
				}
			},
			onChangeCity(cityID){
				window.location.href = '/site/switch-city?city_id=' + cityID
			}
		}
	}
</script>


<style lang="scss" scoped>
	.shortcut-menu{
		.select-box{
			margin-right: 8px;
		}
		.el-dropdown-link{
			color:#FFF;
			i{
				font-size: 10px;
				margin-left: 4px;
			}
		}
	}
</style>
