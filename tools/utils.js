/** 常用工具类 */

/**
 * 判断浏览器类型
 * @returns {{iPhone: boolean, webApp: boolean, qq: boolean, trident: boolean, opera: boolean, chrome: boolean, safari: boolean, firefox: boolean, android: boolean, mobile: boolean, baidu: boolean, ios: boolean, mQQ: boolean, uc: boolean, webKit: boolean, gecko: boolean, weixin: boolean, weibo: boolean, winPhone: boolean, iPad: boolean, ie: boolean, presto: boolean}}
 */
export const getBrowser = () => {
    const u = navigator.userAgent;
    return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        opera: u.indexOf('Opera') > -1,
        chrome: u.indexOf('Chrome') > -1,
        firefox: u.indexOf('Firefox') > -1,
        safari: u.indexOf('Safari') > -1, //注意chrome浏览器此项也为true，非chrome且此项为true则可确定为Safari
        ie: u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1 && u.indexOf('Gecko') == -1,
        mobile: u.search(/AppleWebKit.*Mobile/) > -1, //是否为移动终端
        ios: u.search(/\(i[^;]+;( U;)? CPU.+Mac OS X/) > -1, //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        winPhone: u.search(/Windows Phone/) > -1, //windows phone终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否Safari web应用程序，没有头部与底部
        weibo: u.search(/WeiBo/i) > -1, //是否微博
        weixin: u.search(/MicroMessenger/i) > -1, //是否微信
        qq: u.search(/\sQQ/i) > -1, //是否QQ
        mQQ: u.search(/MQQBrowser/) > -1, //是否QQ手机浏览器
        uc: u.search(/UCBrowser/) > -1, //是否UC浏览器
        baidu: u.search(/baidu/) > -1, //是否百度浏览器
    };
};
/**
 * 判断是否是微信内置浏览器
 * @returns {boolean}
 */
export const isWeixin = () => navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
/**
 * 判断是否pc端浏览器
 * @returns {boolean}
 */
export const isPc = () => {
    return !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,);
};
