<template>
	<div class="master-page cmpSkeleton">
		<div class="header" v-if="isShowMenu">
			<div class="logo left">
				<a href="/" :title="config.title || ''">{{config.title || ''}}</a>
			</div>
			<TopMenu :menu="menu" @select="selectTopMenu"/>
			<ShortcutMenu :otherplt="config.otherPlt" :user="userInfo" :city="cityInfo"/>
		</div>
		<LeftMenu :menu="subMenu" v-if="isShowMenu" @select="selectLeftMenu"/>
		<div class="my-content" :class="{'no-menu': !isShowMenu}">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import TopMenu from './menu/TopMenu.vue'
	import LeftMenu from './menu/LeftMenu.vue'
	import ShortcutMenu from './menu/ShortcutMenu.vue'
	export default {
		name: 'CUMasterPage',
		props: {
			config: {
	      type: Object
	    }
		},
		data() {
			let subMenu = this.config.menu[0]['children']
      return {
        transitionName: '',
        isShowMenu: true,
				subMenu: subMenu
      }
		},
		computed: {
      menu(){
        return this.config ? this.config.menu : {}
      },
			userInfo(){
				return {
					user_name: this.config.user_name,
					user_role: this.config.role_name,
					city_name: this.config.city_name
				}
			},
			cityInfo(){
				let city_ids = this.config['city_ids'];
				let city_names = this.config['city_names'];
				return {
					ids: city_ids ? city_ids.split(',') : '',
					names: city_names ? city_names.split(',') : ''
				}
			}
		},
		created(){
			//若被嵌入到 iframe 则不显示菜单.
			this.isShowMenu = window.top === window.self;
		},
		methods: {
			selectTopMenu(menuItem, index){
				this.subMenu = this.menu[index]['children'] || []
				if(this.subMenu.length){
	        let path = this.subMenu[0]['url']
					this.$nextTick(()=>{
						this.selectLeftMenu(path)
					})
				}
      },
      selectLeftMenu(path){
				window.location.hash = path;
      }
		},
		components: {
			TopMenu, ShortcutMenu, LeftMenu
		}
	}
</script>

<style lang="scss" scoped>
	.header{
    position: fixed;
		top:0;
		z-index: 100;
    width: 100%;
    overflow: visible;
    height: 40px;
    line-height: 40px;
    min-height: 40px;
    background-color: #324157;
		.logo{
	    width: 160px;
    	text-align: center;
			a {
		    letter-spacing: 1px;
    		color: #FFF;
				font-size: 16px;
			}
		}
	}
  .my-content{
    margin-top: 40px;
    padding: 10px 10px 10px 170px;
		&.no-menu{
			margin-top: 0!important;
			padding-left: 0!important;
		}
  }
</style>

<style lang="scss">
	/* 使用 MasterPage, 则必须使用全局样式 */
	@import "./style/reset.scss";
	@import "./style/global.scss";
	@import "./style/element-ui.scss";
</style>
