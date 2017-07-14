<template>
	<div class="master-page">
		<div class="header" v-if="isShowMenu">
			<div class="logo left">
				<img src="../../../assets/images/logo.png"/>
				<a href="/" :title="config.title || ''">{{config.title || ''}}</a>
			</div>
			<TopMenu :config="topMenuConfig" :menu="menu" @select="selectTopMenu"/>
			<ShortcutMenu :config="shortcutMenuConfig" :otherplt="config.otherPlt" :user="userInfo" :city="cityInfo"/>
		</div>
		<div class="left-menu" v-if="isShowLeftMenu">
			<LeftMenu
				:config="leftMenuConfig"
				:menu="subMenu"
				:activePath="activePath"
				@select="selectLeftMenu"
				:topMenuIndex="topMenuIndex"
			/>
		</div>
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
		name: 'CuMasterPage',
		props: {
			config: {
	      type: Object
	    }
		},
		data() {
			let subMenu = [];
			let activePath = ''
			if(this.config.menu && this.config.menu.data && this.config.menu.data.length){
				subMenu = this.config.menu.data[0]['children']
				if(subMenu && subMenu.length){
					activePath = subMenu[0]['url']
				}
			} else {
				console.warn('未配置菜单，请参考文档!')
			}
      return {
        transitionName: '',
				topMenuIndex: 0,
				subMenu: subMenu,
				activePath: activePath
      }
		},
		computed: {
      menu(){
				if(this.config && this.config.menu){
					return this.config.menu.data || []
				} else {
					return []
				}
      },
			topMenuConfig(){
				return this.config.menu['topMenu'] || {}
			},
			leftMenuConfig(){
				return this.config.menu['leftMenu'] || {}
			},
			shortcutMenuConfig(){
				return this.config.menu['shortcutMenu'] || {}
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
			},
			isShowMenu(){
				//若被嵌入到 iframe 则不显示菜单.
				return this.menu.length ;//&& window.top === window.self;
			},
			isShowLeftMenu(){
				return this.isShowMenu && this.subMenu && this.subMenu.length
			}
		},
		created(){},
		methods: {
			selectTopMenu(menuItem, index){
				this.topMenuIndex = index
				this.subMenu = this.menu[index]['children'] || []
				if(this.subMenu.length){
	        let path = this.subMenu[0]['url']
					this.activePath = path
					this.$nextTick(()=>{
						window.location.hash = path;
					})
				}
      },
      selectLeftMenu(path){
				this.activePath = path
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
		left:0;
		top:0;
		right:0;
		z-index: 100;
    width: 100%;
    overflow: visible;
    height: 40px;
    line-height: 40px;
    background-color: #324157;
		.logo{
	    width: 160px;
    	text-align: center;
			img{
		    height: 20px;
    		vertical-align: middle;
			}
			a {
        text-decoration: none;
		    color: #FFF;
		    font-size: 18px;
		    vertical-align: middle;
			}
		}
	}
	.left-menu{
    width: 160px;
    position: fixed;
		overflow: auto;
    left: 0;
    top: 40px;
    bottom: 0;
    z-index: 999;
	}
  .my-content{
    margin-top: 40px;
    padding: 10px;
		padding-left: 10px;
		// transition: padding-left 400ms;
		&.no-menu{
			margin-top: 0!important;
			padding-left: 0!important;
		}
  }
	.left-menu ~ .my-content{
		padding-left:170px;
	}
</style>

<style lang="scss">
	/* 使用 MasterPage, 则必须使用全局样式 */
	@import "./style/reset.scss";
	@import "./style/global.scss";
	@import "./style/element-ui.scss";
</style>
