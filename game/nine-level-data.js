window.NINE_LEVELS = [
  {
    "number": 1,
    "home": "海景公寓",
    "room": "城市公寓客厅",
    "capacity": 2,
    "background": "public/nine-homes/room-01.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E01",
            "caseId": "RC-038",
            "title": "空间文字游戏",
            "cue": "餐桌旁粉帘",
            "truth": "帘后厕所与厨房同框",
            "boundary": "报道只支持异常空间母题；虚构海景公寓",
            "zone": [
              12,
              22,
              16,
              43
            ],
            "items": [
              {
                "id": "E01-0",
                "src": "public/levels/level-01/E01-curtain.png"
              }
            ]
          },
          {
            "id": "E02",
            "caseId": "RC-040",
            "title": "隐藏占用",
            "cue": "柜旁多一双鞋",
            "truth": "折叠床与额外生活用品出现",
            "boundary": "受访者自述；角色与房间虚构",
            "zone": [
              34,
              27,
              15,
              39
            ],
            "items": [
              {
                "id": "E02-0",
                "src": "public/levels/level-01/E02-wardrobe-door.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E04",
          "src": "public/levels/level-01/E04-key-tag.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E04",
            "caseId": "RC-026",
            "title": "钥匙争议",
            "cue": "钥匙架上空出一钩",
            "truth": "缺失的备用钥匙位置显现",
            "boundary": "机构案例仅证明纠纷；不预判租客故意",
            "zone": [
              90,
              42,
              9,
              20
            ],
            "items": [
              {
                "id": "E04-0",
                "src": "public/levels/level-01/E04-key-tag.png"
              }
            ]
          },
          {
            "id": "E05",
            "caseId": "RC-027",
            "title": "擅自改造",
            "cue": "白墙边露出一条蓝色",
            "truth": "整面墙被改成蓝色",
            "boundary": "机构案例母题；具体房间虚构",
            "zone": [
              56,
              31,
              15,
              25
            ],
            "items": [
              {
                "id": "E05-0",
                "src": "public/levels/level-01/E05-wallpaper-edge.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E01",
          "src": "public/levels/level-01/E01-curtain.png"
        }
      }
    }
  },
  {
    "number": 2,
    "home": "校园宿舍",
    "room": "双人宿舍卧室",
    "capacity": 2,
    "background": "public/nine-homes/room-02.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E03",
            "caseId": "RC-052",
            "title": "限制使用",
            "cue": "客厅门把有第二把锁",
            "truth": "共享客厅被隔断",
            "boundary": "仅自述；改编为虚构隔断",
            "zone": [
              4,
              30,
              14,
              30
            ],
            "items": [
              {
                "id": "E03-0",
                "src": "public/levels/level-01/E03-partition-door.png"
              }
            ]
          },
          {
            "id": "E20",
            "caseId": "RC-051",
            "title": "换房",
            "cue": "房卡编号与广告图不同",
            "truth": "房号和窗景不相符",
            "boundary": "仅自述未独立核实；虚构房源和交易",
            "zone": [
              22,
              20,
              15,
              24
            ],
            "items": [
              {
                "id": "E20-0",
                "src": "public/levels/level-04/E20-room-keycard.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E06",
          "src": "public/levels/level-01/E06-bin-lid.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E06",
            "caseId": "RC-017",
            "title": "藏污",
            "cue": "垃圾桶旁有汁水痕",
            "truth": "发臭食物藏在桶底",
            "boundary": "室友自述；改编为虚构租客行为",
            "zone": [
              13,
              55,
              18,
              25
            ],
            "items": [
              {
                "id": "E06-0",
                "src": "public/levels/level-01/E06-bin-lid.png"
              }
            ]
          },
          {
            "id": "E10",
            "caseId": "RC-030",
            "title": "宠物痕迹",
            "cue": "地毯边有爪形凹印",
            "truth": "新抓痕与旧底色并列",
            "boundary": "机构案例；具体宠物与位置虚构",
            "zone": [
              39,
              67,
              22,
              22
            ],
            "items": [
              {
                "id": "E10-0",
                "src": "public/levels/level-02/E10-pawprint-rug.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E03",
          "src": "public/levels/level-01/E03-partition-door.png"
        }
      }
    }
  },
  {
    "number": 3,
    "home": "联排屋",
    "room": "合租厨房",
    "capacity": 3,
    "background": "public/nine-homes/room-03.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E08",
            "caseId": "RC-044",
            "title": "照片包装",
            "cue": "广告照片边缘与墙纹不齐",
            "truth": "照片里消失的污渍显现",
            "boundary": "源报道是房产销售；仅借图像修饰母题并虚构租房广告",
            "zone": [
              67,
              22,
              16,
              25
            ],
            "items": [
              {
                "id": "E08-0",
                "src": "public/levels/level-02/E08-listing-photo.png"
              },
              {
                "id": "E08-1",
                "src": "public/levels/level-02/E08-original-room-photo.png"
              }
            ]
          },
          {
            "id": "E09",
            "caseId": "RC-022",
            "title": "遮蔽设施",
            "cue": "插座上有同色厚漆",
            "truth": "被漆堵住的插孔露出",
            "boundary": "仅图帖未独立核实；不作安全合规判断",
            "zone": [
              82,
              40,
              12,
              20
            ],
            "items": [
              {
                "id": "E09-0",
                "src": "public/levels/level-02/E09-socket-cover.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E11",
          "src": "public/levels/level-02/E11-receipt-drawer.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E11",
            "caseId": "RC-013",
            "title": "转移家具",
            "cue": "沙发脚留下空位轮廓",
            "truth": "家具出售记录和空位出现",
            "boundary": "室友自述；改编为虚构租客不得直接指认真人",
            "zone": [
              42,
              68,
              20,
              22
            ],
            "items": [
              {
                "id": "E11-0",
                "src": "public/levels/level-02/E11-receipt-drawer.png"
              },
              {
                "id": "E11-1",
                "src": "public/levels/level-02/E11-sale-receipt.png"
              }
            ]
          },
          {
            "id": "E12",
            "caseId": "RC-032",
            "title": "清洁争因",
            "cue": "炉台下有虫影",
            "truth": "虫源与原有污点不同",
            "boundary": "机构案例含争因；结果由关内证据决定",
            "zone": [
              83,
              42,
              14,
              24
            ],
            "items": [
              {
                "id": "E12-0",
                "src": "public/levels/level-02/E12-stove-tray.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E08",
          "src": "public/levels/level-02/E08-listing-photo.png"
        }
      }
    }
  },
  {
    "number": 4,
    "home": "老式步梯公寓",
    "room": "旧浴室",
    "capacity": 3,
    "background": "public/nine-homes/room-04.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E13",
            "caseId": "RC-039",
            "title": "潮湿遮掩",
            "cue": "墙画边有水痕",
            "truth": "旧漏水线与蘑菇露出",
            "boundary": "媒体采访的受访者自述；蘑菇画面虚构",
            "zone": [
              18,
              18,
              20,
              30
            ],
            "items": [
              {
                "id": "E13-0",
                "src": "public/levels/level-03/E13-damp-painting.png"
              }
            ]
          },
          {
            "id": "E14",
            "caseId": "RC-020",
            "title": "刷漆遮霉",
            "cue": "新漆边缘鼓起",
            "truth": "旧霉斑从漆下出现",
            "boundary": "仅自述未独立核实；不鉴定霉菌类型",
            "zone": [
              70,
              20,
              17,
              28
            ],
            "items": [
              {
                "id": "E14-0",
                "src": "public/levels/level-03/E14-peeling-wall-sticker.png"
              },
              {
                "id": "E14-1",
                "src": "public/levels/level-03/E14-old-paint-skin.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E16",
          "src": "public/levels/level-03/E16-smoky-curtain.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E16",
            "caseId": "RC-034",
            "title": "隐蔽吸烟",
            "cue": "窗帘下有灰点",
            "truth": "局部烟灰和窗边痕迹出现",
            "boundary": "机构案例讨论局部异味；虚构烟灰证据",
            "zone": [
              11,
              28,
              17,
              38
            ],
            "items": [
              {
                "id": "E16-0",
                "src": "public/levels/level-03/E16-smoky-curtain.png"
              }
            ]
          },
          {
            "id": "E29",
            "caseId": "RC-033",
            "title": "气味藏匿",
            "cue": "地毯一角颜色不均",
            "truth": "受潮时气味线索出现",
            "boundary": "机构案例涉及争议范围；虚构视觉化气味",
            "zone": [
              40,
              69,
              23,
              22
            ],
            "items": [
              {
                "id": "E29-0",
                "src": "public/levels/level-05/E29-pet-smell-rug.png"
              },
              {
                "id": "E29-1",
                "src": "public/levels/level-05/E29-damp-cloth.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E13",
          "src": "public/levels/level-03/E13-damp-painting.png"
        }
      }
    }
  },
  {
    "number": 5,
    "home": "独栋洋房",
    "room": "阁楼卧室",
    "capacity": 4,
    "background": "public/nine-homes/room-05.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E15",
            "caseId": "RC-043",
            "title": "地毯伪装",
            "cue": "地毯一角颜色反常",
            "truth": "潮湿区域与广告干燥承诺冲突",
            "boundary": "媒体报道母题；虚构工具读数不作医学结论",
            "zone": [
              27,
              68,
              20,
              19
            ],
            "items": [
              {
                "id": "E15-0",
                "src": "public/levels/level-03/E15-damp-rug.png"
              },
              {
                "id": "E15-1",
                "src": "public/levels/level-03/E15-thermal-strip.png"
              }
            ]
          },
          {
            "id": "E19",
            "caseId": "RC-046",
            "title": "隐私疑点",
            "cue": "植物叶后有反光小点",
            "truth": "镜头状装置与电线显现",
            "boundary": "报道只记隐私忧虑且拍摄事实未完全确定；游戏不判违法",
            "zone": [
              68,
              20,
              16,
              29
            ],
            "items": [
              {
                "id": "E19-0",
                "src": "public/levels/level-04/E19-wired-plant.png"
              },
              {
                "id": "E19-1",
                "src": "public/levels/level-04/E19-camera-wire.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E22",
          "src": "public/levels/level-04/E22-tv-cover.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E22",
            "caseId": "RC-018",
            "title": "损坏遮盖",
            "cue": "电视被布盖住",
            "truth": "碎屏与入场完好状态对照",
            "boundary": "室友自述；改编为虚构租客",
            "zone": [
              62,
              56,
              19,
              25
            ],
            "items": [
              {
                "id": "E22-0",
                "src": "public/levels/level-04/E22-tv-cover.png"
              },
              {
                "id": "E22-1",
                "src": "public/levels/level-04/E22-tv-before-photo.png"
              }
            ]
          },
          {
            "id": "E23",
            "caseId": "RC-015",
            "title": "挪走家具",
            "cue": "客厅地板有沙发脚印",
            "truth": "家具被挤进卧室",
            "boundary": "室友自述；行为和损失需分开判定",
            "zone": [
              32,
              68,
              20,
              20
            ],
            "items": [
              {
                "id": "E23-0",
                "src": "public/levels/level-04/E23-moved-furniture-rug.png"
              },
              {
                "id": "E23-1",
                "src": "public/levels/level-04/E23-bedroom-door.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E15",
          "src": "public/levels/level-03/E15-damp-rug.png"
        }
      }
    }
  },
  {
    "number": 6,
    "home": "地下室套间",
    "room": "低层起居室",
    "capacity": 4,
    "background": "public/nine-homes/room-06.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E21",
            "caseId": "RC-041",
            "title": "污水遮掩",
            "cue": "水槽下柜门有旧湿线",
            "truth": "脏水倒灌路径显现",
            "boundary": "媒体采访自述；不复制真实住户经历",
            "zone": [
              13,
              38,
              16,
              28
            ],
            "items": [
              {
                "id": "E21-0",
                "src": "public/levels/level-04/E21-sink-cabinet.png"
              },
              {
                "id": "E21-1",
                "src": "public/levels/level-04/E21-water-valve.png"
              }
            ]
          },
          {
            "id": "E31",
            "caseId": "RC-049",
            "title": "系统性遮霉",
            "cue": "窗帘柜门墙角同时有斑点",
            "truth": "多个霉点属于同一持续问题",
            "boundary": "仅学生自述；具体场景与因果虚构",
            "zone": [
              43,
              16,
              16,
              25
            ],
            "items": [
              {
                "id": "E31-0",
                "src": "public/levels/level-06/E31-mold-curtain.png"
              },
              {
                "id": "E31-1",
                "src": "public/levels/level-06/E31-wallpaper-strip.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E28",
          "src": "public/levels/level-05/E28-frosted-window-latch.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E28",
            "caseId": "RC-031",
            "title": "冬季疏忽",
            "cue": "窗边有霜线",
            "truth": "离家期间窗开且温控关闭",
            "boundary": "机构案例；不自动认定损坏责任",
            "zone": [
              57,
              16,
              16,
              24
            ],
            "items": [
              {
                "id": "E28-0",
                "src": "public/levels/level-05/E28-frosted-window-latch.png"
              },
              {
                "id": "E28-1",
                "src": "public/levels/level-05/E28-clock.png"
              }
            ]
          },
          {
            "id": "E17",
            "caseId": "RC-014",
            "title": "食物藏匿",
            "cue": "冰箱门缝有彩色汤汁",
            "truth": "一周鱼咖喱与污渍出现",
            "boundary": "室友自述；改编为虚构房客",
            "zone": [
              18,
              43,
              17,
              27
            ],
            "items": [
              {
                "id": "E17-0",
                "src": "public/levels/level-03/E17-fridge-drawer.png"
              },
              {
                "id": "E17-1",
                "src": "public/levels/level-03/E17-food-container.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E21",
          "src": "public/levels/level-04/E21-sink-cabinet.png"
        }
      }
    }
  },
  {
    "number": 7,
    "home": "微型单间",
    "room": "一室多用空间",
    "capacity": 5,
    "background": "public/nine-homes/room-07.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E07",
            "caseId": "RC-042",
            "title": "时段门禁",
            "cue": "门把旁有倒走时钟",
            "truth": "中午门锁住且牌背写9至17禁行",
            "boundary": "报道核实招租条件；游戏门禁装置虚构",
            "zone": [
              77,
              32,
              17,
              28
            ],
            "items": [
              {
                "id": "E07-0",
                "src": "public/levels/level-02/E07-handle-clock.png"
              },
              {
                "id": "E07-1",
                "src": "public/levels/level-02/E07-door-sign.png"
              }
            ]
          },
          {
            "id": "E26",
            "caseId": "RC-037",
            "title": "无损扣款",
            "cue": "茶几上有小蜡烛",
            "truth": "未燃烛芯且无烟痕",
            "boundary": "机构案例摘要；金额和话术虚构",
            "zone": [
              28,
              55,
              18,
              23
            ],
            "items": [
              {
                "id": "E26-0",
                "src": "public/levels/level-05/E26-candle-dome.png"
              },
              {
                "id": "E26-1",
                "src": "public/levels/level-05/E26-clean-wick.png"
              },
              {
                "id": "E26-2",
                "src": "public/levels/level-05/E26-cleaning-cloth.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E24",
          "src": "public/levels/level-04/E24-shared-fridge-door.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E24",
            "caseId": "RC-016",
            "title": "占满共用空间",
            "cue": "冰箱门被挤出一条缝",
            "truth": "新购食物堵住通风口",
            "boundary": "室友自述；虚构共居规则",
            "zone": [
              8,
              39,
              18,
              30
            ],
            "items": [
              {
                "id": "E24-0",
                "src": "public/levels/level-04/E24-shared-fridge-door.png"
              },
              {
                "id": "E24-1",
                "src": "public/levels/level-04/E24-fridge-inner-drawer.png"
              }
            ]
          },
          {
            "id": "E30",
            "caseId": "RC-028",
            "title": "旧损伪新",
            "cue": "冰箱架前有胶条",
            "truth": "裂缝可能早已存在",
            "boundary": "机构案例；刻意设计误判不能自动扣款",
            "zone": [
              24,
              42,
              17,
              26
            ],
            "items": [
              {
                "id": "E30-0",
                "src": "public/levels/level-05/E30-cracked-fridge-shelf.png"
              },
              {
                "id": "E30-1",
                "src": "public/levels/level-05/E30-adhesive-strip.png"
              },
              {
                "id": "E30-2",
                "src": "public/levels/level-05/E30-before-photo.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E07",
          "src": "public/levels/level-02/E07-handle-clock.png"
        }
      }
    }
  },
  {
    "number": 8,
    "home": "青年长租公寓",
    "room": "共享客厅",
    "capacity": 5,
    "background": "public/nine-homes/room-08.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E25",
            "caseId": "RC-036",
            "title": "责任转嫁",
            "cue": "屋檐下有枯叶",
            "truth": "堵塞来自屋顶长期积叶",
            "boundary": "机构案例；关内责任规则虚构不作现实裁判",
            "zone": [
              17,
              21,
              18,
              26
            ],
            "items": [
              {
                "id": "E25-0",
                "src": "public/levels/level-05/E25-gutter-basket.png"
              },
              {
                "id": "E25-1",
                "src": "public/levels/level-05/E25-gutter-leaves.png"
              }
            ]
          },
          {
            "id": "E27",
            "caseId": "RC-047",
            "title": "押金拖延",
            "cue": "退租单被压在发票下",
            "truth": "退租完成后仍被写成未交钥匙",
            "boundary": "仅视频叙述未独立核实；不输出真实退款规则",
            "zone": [
              62,
              62,
              20,
              25
            ],
            "items": [
              {
                "id": "E27-0",
                "src": "public/levels/level-05/E27-invoice-stack.png"
              },
              {
                "id": "E27-1",
                "src": "public/levels/level-05/E27-key-receipt.png"
              },
              {
                "id": "E27-2",
                "src": "public/levels/level-05/E27-key-tray.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E18",
          "src": "public/levels/level-03/E18-freezer-drawer.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E18",
            "caseId": "RC-019",
            "title": "挪动他人食物",
            "cue": "冰箱顶有融水",
            "truth": "冷冻食品离开冷冻区",
            "boundary": "室友自述；人物与物品虚构",
            "zone": [
              82,
              42,
              16,
              28
            ],
            "items": [
              {
                "id": "E18-0",
                "src": "public/levels/level-03/E18-freezer-drawer.png"
              },
              {
                "id": "E18-1",
                "src": "public/levels/level-03/E18-grocery-bag.png"
              }
            ]
          },
          {
            "id": "E34",
            "caseId": "RC-012",
            "title": "腐坏藏匿",
            "cue": "柜门有污渍渗出",
            "truth": "大量腐坏食物与已清洁声明冲突",
            "boundary": "原故事为房东室友；改编为虚构租客不得称原人有此行为",
            "zone": [
              67,
              38,
              18,
              26
            ],
            "items": [
              {
                "id": "E34-0",
                "src": "public/levels/level-06/E34-meal-cupboard.png"
              },
              {
                "id": "E34-1",
                "src": "public/levels/level-06/E34-cleaning-log.png"
              },
              {
                "id": "E34-2",
                "src": "public/levels/level-06/E34-meal-box.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E25",
          "src": "public/levels/level-05/E25-gutter-basket.png"
        }
      }
    }
  },
  {
    "number": 9,
    "home": "后院小屋",
    "room": "改造车库单间",
    "capacity": 6,
    "background": "public/nine-homes/room-09.png",
    "roles": {
      "tenant": {
        "cases": [
          {
            "id": "E32",
            "caseId": "RC-045",
            "title": "结构包装",
            "cue": "球在地板上缓慢滚动",
            "truth": "地面倾斜与检查说法矛盾",
            "boundary": "媒体报道母题；物件和检查卡虚构",
            "zone": [
              38,
              68,
              20,
              16
            ],
            "items": [
              {
                "id": "E32-0",
                "src": "public/levels/level-06/E32-ball-level.png"
              },
              {
                "id": "E32-1",
                "src": "public/levels/level-06/E32-inspection-card.png"
              },
              {
                "id": "E32-2",
                "src": "public/levels/level-06/E32-rolling-ball.png"
              }
            ]
          },
          {
            "id": "E33",
            "caseId": "RC-056",
            "title": "叠加扣款",
            "cue": "桌上压着厚发票",
            "truth": "近全额扣款含重复和无关项",
            "boundary": "仅自述未独立核实；金额和指控虚构",
            "zone": [
              78,
              59,
              18,
              25
            ],
            "items": [
              {
                "id": "E33-0",
                "src": "public/levels/level-06/E33-deduction-stack.png"
              },
              {
                "id": "E33-1",
                "src": "public/levels/level-06/E33-deduction-sheet.png"
              },
              {
                "id": "E33-2",
                "src": "public/levels/level-06/E33-movein-photo.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E36",
          "src": "public/levels/level-06/E36-doorstop-latch.png"
        }
      },
      "landlord": {
        "cases": [
          {
            "id": "E36",
            "caseId": "RC-025",
            "title": "外因误判",
            "cue": "门框裂缝旁有撬痕",
            "truth": "第三方闯入迹象挑战租客损坏指控",
            "boundary": "机构案例；游戏不作现实责任裁决",
            "zone": [
              7,
              36,
              17,
              28
            ],
            "items": [
              {
                "id": "E36-0",
                "src": "public/levels/level-06/E36-doorstop-latch.png"
              },
              {
                "id": "E36-1",
                "src": "public/levels/level-06/E36-bent-latch.png"
              },
              {
                "id": "E36-2",
                "src": "public/levels/level-06/E36-doorstop.png"
              }
            ]
          },
          {
            "id": "E35",
            "caseId": "RC-007",
            "title": "小损夸大",
            "cue": "踢脚线旁有一小块口香糖",
            "truth": "真实小污点与夸大维修额分开",
            "boundary": "仅自述未独立核实；双方都不可自动赢",
            "zone": [
              34,
              72,
              24,
              15
            ],
            "items": [
              {
                "id": "E35-0",
                "src": "public/levels/level-06/E35-loose-baseboard.png"
              },
              {
                "id": "E35-1",
                "src": "public/levels/level-06/E35-condition-photo.png"
              },
              {
                "id": "E35-2",
                "src": "public/levels/level-06/E35-repair-invoice.png"
              }
            ]
          }
        ],
        "decoy": {
          "id": "decoy-E32",
          "src": "public/levels/level-06/E32-ball-level.png"
        }
      }
    }
  }
];
