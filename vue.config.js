const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	// 全局样式↓=====================================================
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "@/assets/css/variables.scss";`,
				// 旧版本用prependData，新版比如cli5本用additionalData
			},
		},
	},
	// 全局样式↑=====================================================

	// 全局标题↓=====================================================
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = '锋团运营平台';
			return args;
		});
	},
	// 全局标题↑=====================================================
});
