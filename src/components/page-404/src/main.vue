<template>
	<div class="page-404">
		<div>
			<img src="../../../assets/images/page404.png" />
		</div>
		<div class="message">{{ message || '你访问的页面不存在！' }}</div>
		<div>
			<el-button @click="refresh">刷新重试</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'CuPage404',
		props: ['message'],
		computed: {
			url(){
				return this.$route.fullPath
			}
		},
		methods: {
			refresh(){
				window.location.reload()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-404{
		text-align: center;
		padding-top: 8%;
		.message{
			letter-spacing: 1px;
	    font-size: large;
	    color: #99a0ab;
	    margin: 25px 0px;
		}
	}
</style>
