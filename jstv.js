function main(item) {
    try {
        const url = item.url || "";
        
        // 获取参数
        const id = ku9.getQuery(url, 'id');
        
        // 频道映射表
        const channelMap = {
            'jsws': 'jsws_live',
            'jscs': 'jscs_live', 
            'jszy': 'jszy_live',
            'jsys': 'jsys_live',
            'jsxw': 'jsxw_live',
            'jsjy': 'jsjy_live',
            'jsty': 'jsxx_live',
            'jsgj': 'jsgj_live',
            'ymkt': 'ymkt_live',
            'nj1': 'nanjing',
            'njlh': 'luhe',
            'wx1': 'wuxi',
            'wxjy': 'jiangyin',
            'xz1': 'xuzhou',
            'xzpz': 'pizhou',
            'xzxy': 'xinyi',
            'xzjw': 'jiawang',
            'xzts': 'tongshan',
            'cz1': 'changzhou',
            'czwj': 'wujin',
            'sz1': 'suzhou',
            'szcs': 'changshu',
            'szwj': 'wujiang',
            'szzjg': 'zhangjiagang',
            'nt1': 'nantong',
            'lyg1': 'lianyungang',
            'lygdh': 'donghai',
            'ha1': 'huaian',
            'haxy': 'xuyi',
            'hahz': 'hongze',
            'yc1': 'yancheng',
            'ycxs': 'xiangshui',
            'yz1': 'yangzhou',
            'yzhj': 'hanjiang',
            'zj1': 'zhenjiang',
            'zjjr': 'jurong',
            'tz1': 'taizhou',
            'tzjj': 'jingjiang',
            'tztx': 'taixing',
            'tzxh': 'xinghua',
            'sq1': 'suqian',
            'sqsy': 'siyang'
        };
        
        // 检查频道ID是否支持
        if (!channelMap[id]) {
            const supportedIds = Object.keys(channelMap).join(', ');
            return JSON.stringify({'error': `不支持的频道ID: ${id}，支持的频道有: ${supportedIds}`});
        }
        
        // 构建m3u8地址
        const m3u8Url = `https://zjcn-live-play.jstv.com/live/${channelMap[id]}.m3u8`;
        const headers = {
            'referer': 'https://api.chinaaudiovisual.cn/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };
        
        // 发送请求获取m3u8内容
        const response = ku9.request(m3u8Url, 'GET', headers, '', true);
        
        if (response.code !== 200) {
            return JSON.stringify({'error': `请求失败，状态码: ${response.code}`});
        }
        
        // 处理m3u8内容，补全ts文件路径
        const urlParts = m3u8Url.split('/');
        const baseUrl = urlParts.slice(0, urlParts.length - 1).join('/') + '/';
        const processedM3u8 = response.body.replace(/(.*?.ts)/gi, baseUrl + '$1');
        
        return JSON.stringify({
            'm3u8': processedM3u8,
            'headers': JSON.stringify(headers)
        });
        
    } catch (e) {
        return JSON.stringify({'error': `脚本执行错误: ${e.message}`});
    }
}
