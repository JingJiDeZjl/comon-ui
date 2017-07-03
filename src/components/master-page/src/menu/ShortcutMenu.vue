<template>
	<ul class="cmpSkeleton right">
		<!--兄弟系统-->
		<li v-if="otherplt && otherplt.length">
			<a>其他系统</a>
			<ul class="dd-menu">
				<li v-for="(menuItem, index) in otherplt">
					<a :href="menuItem['url']">{{menuItem['description']}}</a>
				</li>
			</ul>
		</li>
		<!--当前用户信息-->
		<li v-if="user.user_name && user.user_role">
			<a href="javascript:void(0)">
				{{user.user_name}} ({{user.user_role}})<b class="caret"></b>
			</a>
			<ul class="dd-menu">
				<li><a href="/site/logout">退出</a></li>
			</ul>
		</li>
		<!--城市列表-->
		<li v-if="city.ids && city.ids.length">
			<a>{{user.city_name}}</a>
			<ul class="dd-menu">
				<li v-for="(id, index) in city.ids">
					<a :href="'/site/switch-city?city_id=' + id">{{city.names[index]}}</a>
				</li>
			</ul>
		</li>
	</ul>
</template>


<script>
	export default {
		props: {
			otherplt: {
	      type: Array
	    },
			user: {
	      type: Object
	    },
			city: {
	      type: Object
	    }
		}
	}
</script>


<style lang="scss" scoped>
	.cmpSkeleton{
		> li{
	    float: left;
			position: relative;
	    text-align: center;
	    padding: 0px 10px;
			cursor: pointer;
			> a{
				color: #bfcbd9;
			}
			&:hover{
				>a{
					color:#FFFFFF;
				}
		    background-color: rgba(28, 38, 55, 0.55);
				.dd-menu{
					display: block;
				}
			}
		}
		.dd-menu{
      position: absolute;
			display: none;
	    top: 38px;
	    right: 0;
	    z-index: 2000;
	    float: left;
	    min-width: 130px;
	    padding: 5px 0;
	    margin: 2px 0 0;
	    text-align: left;
	    background-color: #fff;
	    border: 1px solid rgba(0, 0, 0, 0.15);
	    border-radius: 0px 0px 4px 4px;
	    max-height: 500px !important;
	    overflow: auto !important;
			li{
				a{
	        display: block;
			    padding: 3px 20px;
			    clear: both;
			    font-weight: 400;
			    white-space: nowrap;
			    font-size: 14px;
			    line-height: 34px;
			    cursor: pointer;
			    color: rgba(28, 38, 55, 1);
					&:hover{
				    background-color: rgb(38, 50, 69);
						color:#FFFFFF;
					}
				}
			}
		}
		.caret {
	    display: inline-block;
	    width: 0;
	    height: 0;
	    margin-left: 2px;
	    vertical-align: middle;
	    border-top: 4px solid;
	    border-right: 4px solid transparent;
	    border-left: 4px solid transparent;
		}
	}
</style>
