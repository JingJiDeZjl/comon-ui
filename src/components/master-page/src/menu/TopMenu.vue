<template>
	<ul class="cmpSkeleton left">
		<li
			v-for="(menuItem, index) in menu"
			:class="currentIndex == index ? 'current' : ''"
			@click="selectMenu(menuItem, index)"
		>
			<a>{{menuItem['name']}}</a>
		</li>
	</ul>
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
        currentIndex: 0
      }
		},
		methods: {
			selectMenu(menuItem, index){
        if(this.currentIndex != index){
          this.currentIndex = parseInt(index)
					this.$emit('select', menuItem, this.currentIndex)
        }
      },
		}
	}
</script>


<style lang="scss" scoped>
	.cmpSkeleton{
		> li{
	    float: left;
			position: relative;
	    min-width: 90px;
	    text-align: center;
	    padding: 0px 10px;
			cursor: pointer;
			> a{
				color: #bfcbd9;
			}
			&:hover, &.current{
				>a{
					color:#FFFFFF;
				}
			}
			&:hover{
		    background-color: rgba(28, 38, 55, 0.55);
			}
			&.current{
		    background-color: #1c2637;
			}
		}
	}
</style>
