<template>
	<div class="cmpSkeleton">
		<div>404 - Page Not Found</div>
		<div>{{url}}</div>
	</div>
</template>

<script>
	export default {
		name: 'CUPage404',
		computed: {
			url(){
				return this.$route.fullPath
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cmpSkeleton{
		text-align: center;
		padding: 50px;
		line-height: 36px;
		
	}
</style>
