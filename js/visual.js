fetch('world.zh.json')
  .then(response => response.json()) // 将文件内容转化为 JSON 对象
  .then(worldGeoJson => {
    // 注册地图数据
    echarts.registerMap('world', worldGeoJson);


    var countryCluster = {
        "安哥拉": 0,
        "奥地利": 4,
        "布隆迪": 0,
        "智利": 2,
        "中国": 4,
        "哥伦比亚": 2,
        "塞浦路斯": 2,
        "法国": 4,
        "格鲁吉亚": 2,
        "希腊": 1,
        "伊拉克": 0,
        "意大利": 1,
        "约旦": 2,
        "莱索托": 0,
        "马里": 0,
        "葡萄牙": 1,
        "卢旺达": 0,
        "塞内加尔": 0,
        "塞尔维亚": 2,
        "斯威士兰": 0,
        "瑞士": 4,
        "俄罗斯": 2,
        "英国": 4,
        "美国": 3
    };

    var mapData = Object.keys(countryCluster).map(function (country) {
        return {
            name: country,
            value: countryCluster[country]
        };
    });
    // 配置项
    var clusterColors = {
        0: '#DAA520', 
        1: 'rgba(195, 101, 200, 0.86)', 
        2: 'rgba(65, 123, 211, 0.86)', 
        3: 'rgba(107, 202, 78, 0.86)', 
        4: 'rgba(199, 81, 81, 0.86)', 
        '-1': '#20dbfd' 
    };
    
    // 配置项
    var option10 = {
        
        title: {
            text: '',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#F0F8FF',
                fontSize: 24
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var countryName = params.name;
                var cluster = countryCluster[countryName];
                return countryName + ': ' + (cluster !== undefined ? '类别 ' + cluster : '未分类');
            }
        },
        visualMap: {
            show: true,
            type: 'piecewise',
            pieces: [
                {value: -1, label: '暂未分类', color: clusterColors['-1']},
                {value: 0, label: '类别0', color: clusterColors[0] },
                {value: 1, label: '类别1', color: clusterColors[1]},
                {value: 2, label: '类别2', color: clusterColors[2]},
                {value: 3, label: '类别3', color: clusterColors[3]},
                {value: 4, label: '类别4', color: clusterColors[4]},
                
            ],
            left: 'right',
            orient: 'vertical',
            top: '350',
            textStyle: {
                color: '#20dbfd'
            },
            align: 'left'
        },
        graphic: {
            elements: [{
              type: 'text',
              left: 60,
              bottom: 200,
              style: {
                text: '审图号:GS(2023)2767号、GS京(2022)1061号、GS(2021)5443号',
                fontSize: 13,
                fontWeight: 'normal',
                fill: 'rgba(178, 166, 166, 0.22)',
                textAlign: 'center'
              }
            }]
          },
        series: [
            {
                name: '国家聚类',
                type: 'map',
                map: 'world',
                roam: true,
                center: [10, -35],
                // 关键修改：这里我们显式地为所有国家分配一个值
                data: function() {
                    // 获取世界所有国家名称
                    var allCountries = [];
                    if (worldGeoJson.features) {
                        allCountries = worldGeoJson.features.map(function(feature) {
                            return feature.properties.name;
                        });
                    }
                    
                    // 构建完整的数据集
                    var completeData = [];
                    allCountries.forEach(function(country) {
                        if (country in countryCluster) {
                            completeData.push({
                                name: country,
                                value: countryCluster[country]
                            });
                        } else {
                            completeData.push({
                                name: country,
                                value: -1  // 未分类的国家赋值为-1
                            });
                        }
                    });
                    return completeData;
                }(),
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    },
                    itemStyle: {
                        areaColor: '#fff'
                    }
                },
                itemStyle: {
                    borderColor: '#aaa'
                }
            }
        ]
      
    };

    // 渲染图表
    var myChart10 = echarts.init(document.getElementById('main10'));  
    myChart10.setOption(option10);  

  })
  .catch(error => console.error("加载地图数据失败:", error));







































//交通流量
var data = {
    id: 'multipleBarsLines',
    legendBar: ['高速公路', '城镇公路'],
    symbol: ' ', //数值是否带百分号        --默认为空 ''
    legendLine: ['环比', '同比'],
    xAxis: ['2014', '2015', '2016', '2017', '2018',
        '2019'
    ],
    yAxis: [
        [8, 10, 10, 11, 4, 13],
        [10, 7, 8, 8, 7, 9]
    ],
    lines: [
        [10, 10, 9, 11, 7, 4],
        [6, 12, 12, 2, 4, 4]
    ],
    barColor: ['#009883', '#e66922'], //柱子颜色 必填参数
    lineColor: ['#fd6665', '#fba73b'], // 折线颜色

}

var myData = (function test() {
    let yAxis = data.yAxis || []
    let lines = data.lines || []
    let legendBar = data.legendBar || []
    let legendLine = data.legendLine || []
    var symbol = data.symbol || ' '
    let seriesArr = []
    let legendArr = []
    yAxis && yAxis.forEach((item, index) => {
        legendArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index]
        })
        seriesArr.push({
            name: legendBar && legendBar.length > 0 && legendBar[index],
            type: 'bar',
            barGap: '0.5px',
            data: item,
            barWidth: data.barWidth || 12,
            label: {
                normal: {
                    show: false,
                    formatter: '{c}' + symbol,
                    position: 'top',
                    textStyle: {
                        color: '#000',
                        fontStyle: 'normal',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 11,
                    },
                },
            },
            itemStyle: { //图形样式
                normal: {
                    barBorderRadius:0,
                    borderWidth:1,
                    borderColor:'#ddd',
                    color: data.barColor[index]
                },
            }
        })
    })

    lines && lines.forEach((item, index) => {
        legendArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index]
        })
        seriesArr.push({
            name: legendLine && legendLine.length > 0 && legendLine[index],
            type: 'line',
            data: item,
            itemStyle: {
                normal: {
                    color: data.lineColor[index],
                    lineStyle: {
                        width: 2,//折线宽度
                        type: 'solid',
                    }
                }
            },
            label: {
                normal: {
                    show: false, //折线上方label控制显示隐藏
                    position: 'top',
                }
            },
            symbol: 'circle',
            symbolSize: 5
        })
    })

    return {
        seriesArr,
        legendArr
    }
})()
option1 = {



       
 grid: {
        left: '0',
		top: '30',
        right: '0',
        bottom: '10',
        containLabel: true
    },
        legend: {

            top: 0,

            textStyle: {

            color: "#fff",

        },

        itemWidth: 10,  // 设置宽度

        itemHeight: 10, // 设置高度

        },

        tooltip: {

            trigger: 'axis',

            axisPointer: { // 坐标轴指示器，坐标轴触发有效

                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'

            }

        },

        xAxis: {

            type: 'category',

            data: ["奥地利","瑞士","智利","中国","哥伦比亚","塞浦路斯","法国","英国","希腊","意大利","葡萄牙","美国"],

            axisTick: { //---坐标轴 刻度

                show: true, //---是否显示

            },

            axisLine: { //---坐标轴 轴线

                show: true, //---是否显示

                lineStyle: {

                    color: 'rgba(255,255,255,.1)',

                    width: 1,

                    type: 'dotted',

                },

            },

            axisLabel: {//X轴文字

                textStyle: {

                    fontSize: 6,

                    color: '#fff'

                },

            },

        },

        yAxis: {

            type: 'value',

            splitLine: {//分割线

                show: true,

                lineStyle: {
 color: 'rgba(255,255,255,.1)',

                    width: 1,
                    type: 'dotted'

                }

            },

            axisLabel: {//Y轴刻度值

                formatter: '{value}',

                textStyle: {

                    fontSize: 12,

                    color: '#fff'

                },

            },

            axisLine: { //---坐标轴 轴线

                show: false, //---是否显示

            },

        },

        series: [{

            name: 'z1',

            type: 'bar',

            data: [-2.93, -0.20 , 1.15, 4.88, -1.67, 0.29,-2.33,-2.39,-1.16,-1.66,-1.72,-2.45],

            barWidth: 7,
	
            barGap: 0.5, //柱子之间间距 //柱图宽度      两种情况都要设置，设置series 中对应数据柱形的itemStyle属性下的emphasis和normal的barBorderRadius属性初始化时候圆角  鼠标移上去圆角

            itemStyle: {

                normal: {
					barBorderRadius: 50,
                    color: "#446ACF",

                }

            },

        }, {

            name: 'z2',

            type: 'bar',
            data: [1.73, 3.70, 0.18, 0.71, -5.28,3.52, -0.75,2.06,-0.59,-0.31,1.20,-3.79],
            barWidth: 7, //柱图宽度
			barGap: 0.5,
            itemStyle: {

                normal: { //设置颜色的渐变
					barBorderRadius: 50,
                    color: "#4fb69d",

                }

            },

        }]

    };
//////////////////////交通流量 end

//交通工具流量
option2 = {
    
    tooltip: {//鼠标指上时的标线
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#fff'
            }
        }
    },
    legend: {
        icon: 'rect',
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ['经费支出', '科技论文', '成果登记','专利申请','市场成交额'],
        right: '10px',
        top: '0px',
        textStyle: {
            fontSize: 12,
            color: '#fff'
        }
    },
    grid: {
        x: 35,
        y: 25,
        x2: 8,
        y2: 25,
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: {
            lineStyle: {
                color: '#57617B'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize:8,
                color:'#fff',
            },
        },
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022']
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#57617B',
				
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            },
            textStyle: {
                color:'#fff',
            },
        },
        splitLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.2)',
				type:'dotted',
            }
        }
    }],
    series: [{
        name: '经费支出',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(100, 191, 21)'
            }
        },
        data:[0.201799067,0.253936228,0.304027906,0.341851864,0.379197616,0.427952385,0.490377463,0.557410539,0.637187277,0.709970159,0.825257473,0.916711775]
    }, {
        name: '科技论文',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(0,136,212)'
            }
        },
        data: [0.453774662,0.470079896,0.490135333,0.510842981,0.5679113,0.576063917,0.617560737,0.733898581,0.820642426,0.822028371,0.885863362,0.983694766]

    }, {
        name: '成果登记',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(219,50,51)'
            }
        },
        data: [0.194096352	,0.317198224	,0.329549364	,0.340409848	,0.375530329	,0.4327813,	0.449375072,	0.546480581	,0.593034875	,0.723409832,0.758366504,0.851229381]
    }, 
    {
        name: '专利申请',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(187, 52, 220)'
            }
        },
        data: [0.13695573,0.188820185,	0.177964754,	0.207405947,	0.352753685	,0.404502866,	0.422873064	,0.436709503,	0.460521826,	0.549655789	,0.740803373,	0.858845961
        ]
    },
    {
        name: '市场成交额',
        type: 'line',
        smooth: true,
        lineStyle: {
            normal: {
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
            }
        },
        itemStyle: {
            normal: {
                color: 'rgb(218, 128, 38)'
            }
        },
        data: [0.053604139,0.081531212,	0.098753944	,0.117244777,	0.138248113,	0.164467697	,0.198130841,	0.269440823	,0.347889312,	0.445564562	,0.596468143,	0.771634507
        ]
    },
]
};
//////////////////////交通工具流量 end

//本月发生事件1
// var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
// var data = [{
//         "name": "超速",
//         "value": 30
//     },
//     {
//         "name": "闯红灯",
//         "value": 30
//     },
//     {
//         "name": "闯禁行",
//         "value": 42
//     },
//     {
//         "name": "违停",
//         "value": 50
//     },
//     {
//         "name": "逆行",
//         "value": 34
//     }
// ];

// var max = data[0].value;
// data.forEach(function(d) {
//     max = d.value > max ? d.value : max;
// });

// var renderData = [{
//     value: [],
//     name: "告警类型TOP5",
//     symbol: 'none',
//     lineStyle: {
//         normal: {
//             color: '#ecc03e',
//             width: 2
//         }
//     },
//     areaStyle: {
//         normal: {
//             color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
//                 [{
//                     offset: 0,
//                     color: 'rgba(203, 158, 24, 0.8)'
//                 }, {
//                     offset: 1,
//                     color: 'rgba(190, 96, 20, 0.8)'
//                 }],
//                 false)
//         }
//     }
// }];


// data.forEach(function(d, i) {
//     var value = ['', '', '', '', ''];
//     value[i] = max,
//     renderData[0].value[i] = d.value;
//     renderData.push({
//         value: value,
//         symbol: 'circle',
//         symbolSize: 12,
//         lineStyle: {
//             normal: {
//                 color: 'transparent'
//             }
//         },
//         itemStyle: {
//             normal: {
//                 color: color[i],
//             }
//         }
//     })
// })
// var indicator = [];

// data.forEach(function(d) {
//     indicator.push({
//         name: d.name,
//         max: max,
//         color: '#fff'
//     })
// })


// option3 = {
//     tooltip: {
//         show: true,
//         trigger: "item"
//     },
//     radar: {
//         center: ["50%", "50%"],//偏移位置
//         radius: "80%",
//         startAngle: 40, // 起始角度
//         splitNumber: 4,
//         shape: "circle",
//         splitArea: {
//             areaStyle: {
//                 color: 'transparent'
//             }
//         },
//         axisLabel: {
//             show: false,
//             fontSize: 20,
//             color: "#000",
//             fontStyle: "normal",
//             fontWeight: "normal"
//         },
//         axisLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         indicator: indicator
//     },
//     series: [{
//         type: "radar",
//         data: renderData
//     }]
// }



// 第一个雷达图
var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131', '#9c27b0', '#3f51b5', '#4caf50', '#ff5722', '#607d8b', '#009688', '#cddc39'];

var data = [
{ "name": "奥地利", "z1_p": 0.21885, "z2_p": 0.00108 },
{ "name": "智利", "z1_p": 0.62517, "z2_p": 0.00721 },
{ "name": "中国", "z1_p": 0.00000, "z2_p": 0.82021 },
{ "name": "哥伦比亚", "z1_p": 0.33445, "z2_p": 0.65695 },
{ "name": "塞浦路斯", "z1_p": 0.00646, "z2_p": 0.56207 },
{ "name": "法国", "z1_p": 0.00000, "z2_p": 0.12737 },
{ "name": "希腊", "z1_p": 0.00000, "z2_p": 0.39750 },
{ "name": "意大利", "z1_p": 0.75326, "z2_p": 0.42214 },
{ "name": "葡萄牙", "z1_p": 0.20562, "z2_p": 0.13342 },
{ "name": "瑞士", "z1_p": 0.00069, "z2_p": 0.15781 },
{ "name": "英国", "z1_p": 0.00054, "z2_p": 0.01432 },
{ "name": "美国", "z1_p": 0.00077, "z2_p": 0.60555 }
];
var z1Color = '#ecc03e';
var z2Color = '#08c8ff';var maxZ1P = 0;
var maxZ2P = 0;
data.forEach(function(d) {
    maxZ1P = d.z1_p > maxZ1P ? d.z1_p : maxZ1P;
    maxZ2P = d.z2_p > maxZ2P ? d.z2_p : maxZ2P;
});

// Round max values to nearest higher 0.1 for better visualization
maxZ1P = Math.ceil(maxZ1P * 10) / 10;
maxZ2P = Math.ceil(maxZ2P * 10) / 10;

// Create two series for z1_p and z2_p
var renderData = [
{
    name: "z1_p",
    value: data.map(d => d.z1_p),
    symbol: 'none',
    lineStyle: {
        normal: {
        color: z1Color,
        width: 2
        }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(203, 158, 24, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(190, 96, 20, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
        normal: {
        color: z1Color
        }
    }
},
{
    name: "z2_p",
    value: data.map(d => d.z2_p),
    symbol: 'none',
    lineStyle: {
    normal: {
    color: z2Color,
    width: 2
    }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(8, 200, 255, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(8, 144, 255, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
    normal: {
    color: z2Color
    }
        }
    }
];

// Create indicators for each country
var indicator = data.map(function(d) {
    return {
        name: d.name,
        max: 1.0,  // Set max to 1.0 since values are probabilities
        color: '#fff'
    };
});

option3 = {
    title: {
        text: '社会变革→科技产出',
        left:'right',
        top:'0px',
        textStyle:{
            color: '#01f0ff',
            fontWeight:'normal',
            fontSize:15,
            fontFamily: 'Microsoft YaHei', 
            textBorderColor: 'rgba(255, 255, 255, 0.3)', // 文字描边颜色
            textBorderWidth: 2,          // 文字描边宽度
            textShadowColor: 'rgba(0, 0, 0, 0.5)', // 文字阴影颜色
            textShadowBlur: 3,           // 文字阴影模糊大小
            textShadowOffsetX: 1,        // 文字阴影X偏移
            textShadowOffsetY: 1        
            }
        },
    legend: {
    data: ['z1_p', 'z2_p'],
    textStyle: {
    color: '#fff'
    },
    orient: 'horizontal', 
    left: 'right',
    top: 'bottom',
    itemWidth: 25,
    itemHeight: 14,
    itemStyle: {
        borderWidth: 0
        },
        textStyle: {
        fontSize: 12,
        color: '#fff'
        }
    },
    tooltip: {
    show: true,
    trigger: "item",
    formatter: function(params) {
    return params.name + '<br/>' + params.seriesName + ': ' + params.value;
    }
    },
    radar: {
    center: ["50%", "50%"],
    radius: "70%",
    startAngle: 40,
    splitNumber: 4,
    shape: "circle",
    splitArea: {
    areaStyle: {
    color: 'transparent'
    }
    },
    axisLabel: {
    show: false
    },
    axisLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    splitLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    indicator: indicator
    },
    series: [{
    type: "radar",
    data: renderData
    }]
};

//第二个雷达图
var color1 = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131', '#9c27b0', '#3f51b5', '#4caf50', '#ff5722', '#607d8b', '#009688', '#cddc39'];

var data1 = [
    { "name": "奥地利", "z1_p": 0.64743, "z2_p": 0.44771 },
    { "name": "智利", "z1_p": 0.23886, "z2_p": 0.00002 },
    { "name": "中国", "z1_p": 0.00659, "z2_p": 0.00768 },
    { "name": "哥伦比亚", "z1_p": 0.23820, "z2_p": 0.01622 },
    { "name": "塞浦路斯", "z1_p": 0.57448, "z2_p": 0.97900 },
    { "name": "法国", "z1_p": 0.05288, "z2_p": 0.13124 },
    { "name": "希腊", "z1_p": 0.00001, "z2_p": 0.00756 },
    { "name": "意大利", "z1_p": 0.00000, "z2_p": 0.14231 },
    { "name": "葡萄牙", "z1_p": 0.15727, "z2_p": 0.71533 },
    { "name": "瑞士", "z1_p": 0.00026, "z2_p": 0.02409 },
    { "name": "英国", "z1_p": 0.11582, "z2_p": 0.86299 },
    { "name": "美国", "z1_p": 0.00007, "z2_p": 0.75246 }
  ];
  
var z1Color1 = '#ecc03e';
var z2Color2 = '#08c8ff';
var maxZ1P = 0;
var maxZ2P = 0;
data.forEach(function(d) {
    maxZ1P = d.z1_p > maxZ1P ? d.z1_p : maxZ1P;
    maxZ2P = d.z2_p > maxZ2P ? d.z2_p : maxZ2P;
});

// Round max values to nearest higher 0.1 for better visualization
maxZ1P = Math.ceil(maxZ1P * 10) / 10;
maxZ2P = Math.ceil(maxZ2P * 10) / 10;

// Create two series for z1_p and z2_p
var renderData1 = [
{
    name: "z1_p",
    value: data1.map(d => d.z1_p),
    symbol: 'none',
    lineStyle: {
        normal: {
        color: z1Color1,
        width: 2
        }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(203, 158, 24, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(190, 96, 20, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
        normal: {
        color: z1Color1
        }
    }
},
{
    name: "z2_p",
    value: data1.map(d => d.z2_p),
    symbol: 'none',
    lineStyle: {
    normal: {
    color: z2Color2,
    width: 2
    }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(8, 200, 255, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(8, 144, 255, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
    normal: {
    color: z2Color2
    }
        }
    }
];

// Create indicators for each country
var indicator1 = data1.map(function(d) {
    return {
        name: d.name,
        max: 1.0,  // Set max to 1.0 since values are probabilities
        color: '#fff'
    };
});

option31 = {
    title: {
        text: '社会变革→科技投入',
        left:'right',
        top:'0px',
        textStyle:{
            color: '#01f0ff',
            fontWeight:'normal',
            fontSize:15,
            fontFamily: 'Microsoft YaHei', 
            textBorderColor: 'rgba(255, 255, 255, 0.3)', // 文字描边颜色
            textBorderWidth: 2,          // 文字描边宽度
            textShadowColor: 'rgba(0, 0, 0, 0.5)', // 文字阴影颜色
            textShadowBlur: 3,           // 文字阴影模糊大小
            textShadowOffsetX: 1,        // 文字阴影X偏移
            textShadowOffsetY: 1        
            }
        },
    legend: {
    data1: ['z1_p', 'z2_p'],
    textStyle: {
    color: '#fff'
    },
    orient: 'horizontal', 
    left: 'right',
    top: 'bottom',
    itemWidth: 25,
    itemHeight: 14,
    itemStyle: {
        borderWidth: 0
        },
        textStyle: {
        fontSize: 12,
        color: '#fff'
        }
    },
    tooltip: {
    show: true,
    trigger: "item",
    formatter: function(params) {
    return params.name + '<br/>' + params.seriesName + ': ' + params.value;
    }
    },
    radar: {
    center: ["50%", "50%"],
    radius: "70%",
    startAngle: 40,
    splitNumber: 4,
    shape: "circle",
    splitArea: {
    areaStyle: {
    color: 'transparent'
    }
    },
    axisLabel: {
    show: false
    },
    axisLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    splitLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    indicator: indicator1
    },
    series: [{
    type: "radar",
    data: renderData1
    }]
};


//第三个雷达图
var color2 = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131', '#9c27b0', '#3f51b5', '#4caf50', '#ff5722', '#607d8b', '#009688', '#cddc39'];

var data2 = [
    { "name": "奥地利", "z1_p": 0.50033, "z2_p": 0.56431 },
    { "name": "智利", "z1_p": 0.53486, "z2_p": 0.15999 },
    { "name": "中国", "z1_p": 0.00000, "z2_p": 0.00000 },
    { "name": "哥伦比亚", "z1_p": 0.77693, "z2_p": 0.66071 },
    { "name": "塞浦路斯", "z1_p": 0.06722, "z2_p": 0.08476 },
    { "name": "法国", "z1_p": 0.00000, "z2_p": 0.16466 },
    { "name": "希腊", "z1_p": 0.00017, "z2_p": 0.00084 },
    { "name": "意大利", "z1_p": 0.13227, "z2_p": 0.61934 },
    { "name": "葡萄牙", "z1_p": 0.01292, "z2_p": 0.00000 },
    { "name": "瑞士", "z1_p": 0.47265, "z2_p": 0.95650 },
    { "name": "英国", "z1_p": 0.40765, "z2_p": 0.31882 },
    { "name": "美国", "z1_p": 0.57158, "z2_p": 0.75386 }
  ];
  
var z1Color21 = '#ecc03e';
var z2Color22 = '#08c8ff';var maxZ1P = 0;
var maxZ2P = 0;
data.forEach(function(d) {
    maxZ1P = d.z1_p > maxZ1P ? d.z1_p : maxZ1P;
    maxZ2P = d.z2_p > maxZ2P ? d.z2_p : maxZ2P;
});

// Round max values to nearest higher 0.1 for better visualization
maxZ1P = Math.ceil(maxZ1P * 10) / 10;
maxZ2P = Math.ceil(maxZ2P * 10) / 10;

// Create two series for z1_p and z2_p
var renderData2 = [
{
    name: "z1_p",
    value: data2.map(d => d.z1_p),
    symbol: 'none',
    lineStyle: {
        normal: {
        color: z1Color21,
        width: 2
        }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(203, 158, 24, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(190, 96, 20, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
        normal: {
        color: z1Color21
        }
    }
},
{
    name: "z2_p",
    value: data2.map(d => d.z2_p),
    symbol: 'none',
    lineStyle: {
    normal: {
    color: z2Color22,
    width: 2
    }
    },
    areaStyle: {
    normal: {
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
    [{
    offset: 0,
    color: 'rgba(8, 200, 255, 0.8)'
    }, {
    offset: 1,
    color: 'rgba(8, 144, 255, 0.8)'
    }],
    false)
    }
    },
    itemStyle: {
    normal: {
    color: z2Color22
    }
        }
    }
];

// Create indicators for each country
var indicator2 = data2.map(function(d) {
    return {
        name: d.name,
        max: 1.0,  // Set max to 1.0 since values are probabilities
        color: '#fff'
    };
});

option32 = {
    title: {
        text: '社会变革→投入产出比',
        left:'right',
        top:'0px',
        textStyle:{
            color: '#01f0ff',
            fontWeight:'normal',
            fontSize:15,
            fontFamily: 'Microsoft YaHei', 
            textBorderColor: 'rgba(255, 255, 255, 0.3)', // 文字描边颜色
            textBorderWidth: 2,          // 文字描边宽度
            textShadowColor: 'rgba(0, 0, 0, 0.5)', // 文字阴影颜色
            textShadowBlur: 3,           // 文字阴影模糊大小
            textShadowOffsetX: 1,        // 文字阴影X偏移
            textShadowOffsetY: 1        
            }
        },
    legend: {
    data: ['z1_p', 'z2_p'],
    textStyle: {
    color: '#fff'
    },
    orient: 'horizontal', 
    left: 'right',
    top: 'bottom',
    itemWidth: 25,
    itemHeight: 14,
    itemStyle: {
        borderWidth: 0
        },
        textStyle: {
        fontSize: 12,
        color: '#fff'
        }
    },
    tooltip: {
    show: true,
    trigger: "item",
    formatter: function(params) {
    return params.name + '<br/>' + params.seriesName + ': ' + params.value;
    }
    },
    radar: {
    center: ["50%", "50%"],
    radius: "70%",
    startAngle: 40,
    splitNumber: 4,
    shape: "circle",
    splitArea: {
    areaStyle: {
    color: 'transparent'
    }
    },
    axisLabel: {
    show: false
    },
    axisLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    splitLine: {
    show: true,
    lineStyle: {
    color: "rgba(255, 255, 255, 0.5)"
    }
    },
    indicator: indicator2
    },
    series: [{
    type: "radar",
    data: renderData2
    }]
};
//////////////////////本月发生事件1 end
//本月发生事件2
// var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131'];
// var data = [{
//         "name": "超速",
//         "value": 15
//     },
//     {
//         "name": "闯红灯",
//         "value": 14
//     },
//     {
//         "name": "闯禁行",
//         "value": 23
//     },
//     {
//         "name": "违停",
//         "value": 2
//     },
//     {
//         "name": "逆行",
//         "value": 50
//     }
// ];

// var max = data[0].value;
// data.forEach(function(d) {
//     max = d.value > max ? d.value : max;
// });

// var renderData = [{
//     value: [],
//     name: "告警类型TOP5",
//     symbol: 'none',
//     lineStyle: {
//         normal: {
//             color: '#ecc03e',
//             width: 2
//         }
//     },
//     areaStyle: {
//         normal: {
//             color: new echarts.graphic.LinearGradient(0, 0, 1, 0,
//                 [{
//                     offset: 0,
//                     color: 'rgba(203, 158, 24, 0.8)'
//                 }, {
//                     offset: 1,
//                     color: 'rgba(190, 96, 20, 0.8)'
//                 }],
//                 false)
//         }
//     }
// }];


// data.forEach(function(d, i) {
//     var value = ['', '', '', '', ''];
//     value[i] = max,
//     renderData[0].value[i] = d.value;
//     renderData.push({
//         value: value,
//         symbol: 'circle',
//         symbolSize: 12,
//         lineStyle: {
//             normal: {
//                 color: 'transparent'
//             }
//         },
//         itemStyle: {
//             normal: {
//                 color: color[i],
//             }
//         }
//     })
// })
// var indicator = [];

// data.forEach(function(d) {
//     indicator.push({
//         name: d.name,
//         max: max,
//         color: '#fff'
//     })
// })


// option31 = {
//     tooltip: {
//         show: true,
//         trigger: "item"
//     },
//     radar: {
//         center: ["50%", "50%"],//偏移位置
//         radius: "80%",
//         startAngle: 40, // 起始角度
//         splitNumber: 4,
//         shape: "circle",
//         splitArea: {
//             areaStyle: {
//                 color: 'transparent'
//             }
//         },
//         axisLabel: {
//             show: false,
//             fontSize: 20,
//             color: "#000",
//             fontStyle: "normal",
//             fontWeight: "normal"
//         },
//         axisLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         splitLine: {
//             show: true,
//             lineStyle: {
//                 color: "rgba(255, 255, 255, 0.5)"
//             }
//         },
//         indicator: indicator
//     },
//     series: [{
//         type: "radar",
//         data: renderData
//     }]
// }
//////////////////////本月发生事件2 end



//国家产出
var spirit = '../images.ksh45.png';

var maxData = 200;

option4 = {
   "title": {
      "text": " ",
      "left": "center",
      "y": "10",
      "textStyle": {
        "color": "#fff"
      }
    },
    
    "grid": {
      "left": 30,
      "top": 0,
      "bottom": 10
    },
    "tooltip": {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      "formatter": "{b0}:{c0}"
    },
    "xAxis": {
      "max": 100,
      "splitLine": {
        "show": false
      },
      "axisLine": {
        "show": false
      },
      "axisLabel": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    "yAxis": [
      {
        "type": "category",
        "inverse": false,
        "data": [
          "美国",
          "德国",
          "挪威",
          "冰岛",
          "日本",
        ],
        "axisLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "margin": -4,
          "textStyle": {
            "color": "#fff",
            "fontSize": 16.25
          }
        }
      },
    
    ],
    "series": [
      {
        "type": "pictorialBar",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbolClip": true,
        "symbolSize": 22.5,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "symbolBoundingData": 300,
        "data": [
          11.18,
          44.72,
          86.81,
          100.33,
          53.51,
          
        ],
        "z": 10
      },
      {
        "type": "pictorialBar",
        "itemStyle": {
          "normal": {
            "opacity": 0.3
          }
        },
        "label": {
          "normal": {
            "show": false
          }
        },
        "animationDuration": 0,
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolSize": 22.5,
        "symbolBoundingData": 300,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "data": [
          11.18,
          44.72,
          86.81,
          100.33,
          53.51,
          
        ],
        "z": 5
      }
    ]
};


// Make dynamic data.
// function random() {
//     return +(Math.random() * (maxData - 10)).toFixed(1);
// }
// setInterval(function () {
//     var dynamicData = [random(), random(), random(), random(),random(), random(), random(), random(),random(),random()];
//     myChart.setOption({
//         series: [{
//             data: dynamicData.slice()
//         }, {
//             data: dynamicData.slice()
//         }]
//     })
// }, 3000)
//////////////////////收费站收费排行2 end

//收费站收费排行2
var spirit = '../images.ksh45.png';

var maxData = 200;

option41 = {
   "title": {
      "text": " ",
      "left": "center",
      "y": "10",
      "textStyle": {
        "color": "#fff"
      }
    },
    
    "grid": {
      "left": 30,
      "top": 0,
      "bottom": 10
    },
    "tooltip": {
      "trigger": "item",
      "textStyle": {
        "fontSize": 12
      },
      "formatter": "{b0}:{c0}"
    },
    "xAxis": {
      "max": 100,
      "splitLine": {
        "show": false
      },
      "axisLine": {
        "show": false
      },
      "axisLabel": {
        "show": false
      },
      "axisTick": {
        "show": false
      }
    },
    "yAxis": [
      {
        "type": "category",
        "inverse": false,
        "data": [
          "英国",
          "中国",
          "法国",
          "丹麦",
          "印度",
        ],
        "axisLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "margin": -4,
          "textStyle": {
            "color": "#fff",
            "fontSize": 16.25
          }
        }
      },
    
    ],
    "series": [
      {
        "type": "pictorialBar",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbolClip": true,
        "symbolSize": 22.5,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "symbolBoundingData": 300,
        "data": [
          40.90,
          46.71,
          50.17,
          46,
          221.03,
          
        ],
        "z": 10
      },
      {
        "type": "pictorialBar",
        "itemStyle": {
          "normal": {
            "opacity": 0.3
          }
        },
        "label": {
          "normal": {
            "show": false
          }
        },
        "animationDuration": 0,
        "symbolRepeat": "fixed",
        "symbolMargin": "5%",
        "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAADYElEQVR4nO2dz0sUYRjHP7tIdAmxQ1LdlhCKMohAIsgiyEuHjkUEFQTlpejS/xCCBB06RBGBBKIG4cGyH0qHBKE9eKyFqBQPRQeNCt06vGNY7bq7szPfeZLnAwuzM+/zgw/DDvMu70wOIVveLscJOwycA44A24CfwAfgKXAbeFVvovlC/o/vuVwuTj+x0FWiYdGbgXvA8RrjHgAXgIVaCbMU3SKr1BhtwEtgZx1jTwI7gG7ga5pNNUO+9pBMuEN9klfYD9xMqZdEsCj6AHAiRtxZYFeyrSSHRdGnYsblCD8jJrEoek8TsbsT6yJhLIrelFFsqlgUPZtRbKpYFP2kidjxxLpIGIuiB4AvMeLmgJGEe0kMi6I/AVdjxPVSx91hVlgUDXAXuEaY16jFMnAJeJhqR01iVTTAdeAYUFxjzBRwCLgl6agJrM51rDAO7AP2EmbxthPO8vfAc2Ams84axLpoCGKLrH1mm8eC6KPAGaAL2Fpj7AZgY7T9DfhRY/wc4eflPmH+OjOynI8uEGbpukXlJ4Dz84V8aWWHcj46q4thFzCNTjJRren2UrlLWPM3WYjuAMYIk/tq2oCx9lK5Q11YLboFGARaxXVX0woMtpfK0uuTWvRFoFNcsxKdhF5kqEX3iuuthbQXtehG/gdMG2kvlm/B1xUuWoSLFmFF9CRwg2TnM4pRzskEc8bGiugR4ArhNjkpJqKcJv51sSJ63eOiRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEWvTHKvs/p1izWu5qvaSCWvTlCvtmgeEUaw5TeUVtpV5SQy16COgBRoHXhMWb3aS7PnAhqjEQ1RwFeuYL+aEUa/5DFmtYHkefOEwQVmcBvKD+FQNvgNN/P+pHiV8MRbhoES5ahIsW4aJFuGgRLlqEixbhokW4aBEuWoSLFuGiRbhoES5ahIsW4aJFuGgRLlqEixbhokVYEx3nudGKXE1jTfS6xUWLcNEiXLQIFy3CRYtw0SJctAgXLcJFi3DRIv430eUq2+axJvp7jePPqmzHySXFmuhHwFKVYzNA/6rv/VR/s9BSlMsM1kTPEN4DPkU4I8vAO6APOAgsrhq7GO3ri8aUo5ipKIep1zv9AtipgOACGIrLAAAAAElFTkSuQmCC",
        "symbolSize": 22.5,
        "symbolBoundingData": 300,
        "symbolPosition": "start",
        "symbolOffset": [
          20,
          0
        ],
        "data": [
          40.90,
          46.71,
          50.17,
          46,
          221.03,
          
        ],
        "z": 5
      }
    ]
};


// Make dynamic data.
// function random() {
//     return +(Math.random() * (maxData - 10)).toFixed(1);
// }
// setInterval(function () {
//     var dynamicData = [random(), random(), random(), random(),random(), random(), random(), random(),random(),random()];
//     myChart.setOption({
//         series: [{
//             data: dynamicData.slice()
//         }, {
//             data: dynamicData.slice()
//         }]
//     })
// }, 3000)
//////////////////////收费站收费排行2 end

//产出国家比例

var shadowColor = '#374b86';
var value = 80;
option5 = {
    
    title: {
        //text: `${value}万辆`,
        text: `低产出国家`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: { 
                        colorStops: [{
                            offset: 0,
                            color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 155,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}

var shadowColor = '#374b86';
var value = 85;
option6 = {
    
    title: {
        //text: `${value}万辆`,
        text: `中产出国家`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: { 
                        colorStops: [{
                            offset: 0,
                            color: '#DA70D6' || '#DDA0DD' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#28d3d0' || '#8B008B' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#DA70D6' || '#DDA0DD' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#28d3d0' || '#8B008B' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 80,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}

var shadowColor = '#374b86';
var value = 46;
option7 = {
    
    title: {
        //text: `${value}万辆`,
        text: `高产出国家`,
        subtext: '',
        left: 'center',
        top: 'center',//top待调整
        textStyle: {
            color: '#fff',
            fontSize: 16,
            fontFamily: 'PingFangSC-Regular'
        },
        subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
        },
        itemGap: -1//主副标题间距
    },

    series: [{
        name: 'pie1',
        type: 'pie',
        clockWise: true,
        radius: ['65%', '70%'],
        itemStyle: {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                }
            }
        },
        hoverAnimation: false,
        data: [{
            value: value,
            name: 'completed',
            itemStyle: {
                normal: {
                    borderWidth: 8,
                    borderColor: { 
                    colorStops: [{
                            offset: 0,
                            color: '#90EE90' || '#cc9a00' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }]
                    },
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#90EE90' || '#cc9a00' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }]
                    },
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            }
        }, {
            name: 'gap',
            value: 230,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
        }]
    }]
}
////////////////////// end




var originalData = {
    'Variable': ['GERD_pct_GDP_L1', 'Input_Output_Ratio_L1', 'Share_L1', 'Weighted_Research_Output_L1', 'human_capital_L1'],
    'AG.LND.CROP.ZS': [-1.10, 0.03, 1.53, 2.70, 0.01],
    'NE.RSB.GNFS.ZS': [-3.48, 0.12, -16.02, 14.02, -0.66],
    'SL.EMP.1524.SP.MA.NE.ZS': [12.68, -0.02, 6.38, -4.28, -0.26],
    'SL.EMP.1524.SP.MA.ZS': [11.75, 0.00, 20.31, -7.00, -0.27],
    'SL.EMP.1524.SP.NE.ZS': [7.08, 0.03, 10.35, 3.09, -0.25],
    'SL.EMP.1524.SP.ZS': [6.75, 0.06, 23.90, 0.47, -0.30],
    'SL.TLF.ACTI.1524.FE.ZS': [-2.79, 0.16, 19.22, 15.24, -0.56],
    'SL.TLF.ACTI.1524.MA.NE.ZS': [9.35, 0.01, 3.16, 1.42, -0.51],
    'SL.TLF.ACTI.1524.NE.ZS': [3.11, 0.06, 6.87, 8.32, -0.47],
    'SL.TLF.ACTI.1524.ZS': [-11.61, 0.09, -12.73, 13.34, -0.51],
    'z1': [-1.21, -0.02, -0.67, -3.87, 0.13],
    'z2': [1.77, -0.00, -0.43, 0.71, -0.02]
    };
    
    // 转置数据，使经济指标成为维度
    var dimensions = Object.keys(originalData).filter(key => key !== 'Variable');
    var series = originalData['Variable'];
    var transposedData = {};
    
    // 为每个系列创建数据对象
    series.forEach(function(seriesName, idx) {
    transposedData[seriesName] = {};
    dimensions.forEach(function(dim) {
    transposedData[seriesName][dim] = originalData[dim][idx];
    });
    });
    
    // 计算所有数值的最大和最小值，用于雷达图刻度的设置
    var allValues = [];
    for (var key in originalData) {
    if (key !== 'Variable') {
    allValues = allValues.concat(originalData[key]);
    }
    }
    var maxValue = Math.max(...allValues);
    var minValue = Math.min(...allValues);
    // 向上/下取整，并增加一些边距
    var max = Math.ceil(maxValue) + 2;
    var min = Math.floor(minValue) - 2;
    
    // 定义一组鲜明的颜色，确保每个系列都容易区分
    var colorPalette = [
    'rgba(174, 70, 176, 0.86)', '#7cffb2', '#fddd60', '#ff6e76', '#58d9f9'
    ];
    
    // 创建雷达图的指标（现在是经济指标作为维度）
    var indicator = dimensions.map(function(dim) {
    return {
    name: dim,
    max: max,
    min: min
    };
    });
    
    // 准备系列数据
    var seriesData = [];
    
    series.forEach(function(seriesName, index) {
    // 为每个系列收集所有维度的值
    var values = dimensions.map(function(dim) {
    return transposedData[seriesName][dim];
    });
    
    seriesData.push({
        name: seriesName,
        value: values,
        symbolSize: 5,
        lineStyle: {
            width: 2,
            color: colorPalette[index % colorPalette.length]
        },
        itemStyle: {
            color: colorPalette[index % colorPalette.length]
        },
        areaStyle: {
            opacity: 0.2,
            color: colorPalette[index % colorPalette.length]
        }
    });
    });
    
    option9 = {
    tooltip: {
    trigger: 'item',
    formatter: function(params) {
    var res = params.seriesName + '<br/>';
    var values = params.value;
    for (var i = 0; i < values.length; i++) {
    res += indicator[i].name + ': ' + values[i].toFixed(2) + '<br/>';
    }
    return res;
    }
    },
    radar: {
    shape: 'circle',
    radius: '80%',
    center: ['50%', '50%'],
    indicator: indicator,
    splitArea: {
    areaStyle: {
    color: ['rgba(63, 81, 173, 0.87)', 'rgba(192, 196, 139, 0.86)']
    }
    },
    axisName: {
    fontSize: 11,
    formatter: function(value) {
    // 处理长文本，添加换行
    if (value.length > 15) {
    return value.substring(0, 12) + '...';
    }
    return value;
    },
    rich: {
    value: {
    fontSize: 10,
    lineHeight: 12
    }
    }
    },
    axisLine: {
    lineStyle: {
        
        color: 'rgba(255, 255, 255, 0.47)'
    }
    },
    splitLine: {
    lineStyle: {
    color: 'rgba(0, 0, 0, 0.2)'
    }
    }
    },
    series: [{
    type: 'radar',
    data: seriesData
    }]
    };












