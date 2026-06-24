// Mechanical first-pass migration; behavior is guarded by domain compatibility tests.
// @ts-nocheck
const demoIds = ["M12", "M20", "M31"];
const interactiveIds = [
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",
  "M10",
  "M11",
  "M12",
  "M13",
  "M14",
  "M15",
  "M16",
  "M17",
  "M18",
  "M19",
  "M20",
  "M21",
  "M22",
  "M23",
  "M24",
  "M25",
  "M26",
  "M27",
  "M28",
  "M29",
  "M30",
  "M31",
  "M32",
  "M33",
  "M34",
  "M35",
  "M36",
  "M37",
  "M38",
  "M39"
];
const knowledgeGroups = [
  { name: "运算与数感", ids: ["K01", "K02", "K03", "K04", "K05", "K06", "K07", "K08", "K09"] },
  { name: "数量关系", ids: ["K10", "K11"] },
  { name: "应用题模型", ids: ["K12", "K13", "K14", "K15", "K16", "K17", "K18", "K19", "K20", "K21"] },
  { name: "时间", ids: ["K22", "K23"] },
  { name: "分数", ids: ["K24", "K25", "K26", "K27"] },
  { name: "测量", ids: ["K28", "K29", "K30", "K31", "K32", "K33", "K34", "K35"] },
  { name: "图形", ids: ["K36", "K37"] },
  { name: "统计", ids: ["K38"] },
  { name: "样板动画", ids: ["K12", "K20", "K31"] }
];
const balancedRouteSeeds = [
  { group: "运算与数感", id: "M01" },
  { group: "数量关系", id: "M10" },
  { group: "时间", id: "M22" },
  { group: "测量", id: "M28" },
  { group: "图形", id: "M36" }
];
const lessonChecklist = [
  { id: "model", label: "看懂模型", prompt: "孩子能指出题目里的关键量和关系。" },
  { id: "variant", label: "做对子题", prompt: "孩子至少独立完成一个子题并能检查答案。" },
  { id: "explain", label: "能讲方法", prompt: "孩子能用自己的话复述为什么这样做。" }
];
const chickenRabbitLegLiftFrames = {
  chicken: {
    animalName: "鸡",
    remainingStandingLegs: 0,
    states: {
      standing: ["原始站立，所有腿可见", "assets/chicken-rabbit/chicken-00-standing.png"],
      prepare: ["准备抬腿", "assets/chicken-rabbit/chicken-01-prepare.png"],
      "lift-two-legs": ["抬起两条腿", "assets/chicken-rabbit/chicken-02-lift-two-legs.png"],
      "hold-result": ["抬腿后保持结果", "assets/chicken-rabbit/chicken-03-hold-result.png"]
    }
  },
  rabbit: {
    animalName: "兔",
    remainingStandingLegs: 2,
    states: {
      standing: ["原始站立，所有腿可见", "assets/chicken-rabbit/rabbit-00-standing.png"],
      prepare: ["准备抬腿", "assets/chicken-rabbit/rabbit-01-prepare.png"],
      "lift-two-legs": ["抬起两条腿", "assets/chicken-rabbit/rabbit-02-lift-two-legs.png"],
      "hold-result": ["抬腿后保持结果", "assets/chicken-rabbit/rabbit-03-hold-result.png"]
    }
  }
};
const trainBridgeFrames = {
  "before-bridge": [
    "车头到桥前",
    "车头还没上桥，准备开始计算完整通过距离。",
    "assets/train-bridge/train-bridge-00-before-bridge.png"
  ],
  "head-on-bridge": [
    "车头上桥",
    "车头开始过桥，但车尾还在桥外，不能只看桥长。",
    "assets/train-bridge/train-bridge-01-head-on-bridge.png"
  ],
  "whole-train-on-bridge": [
    "整车在桥上",
    "火车已经占住桥面，继续前进还要让车尾离开桥。",
    "assets/train-bridge/train-bridge-02-whole-train-on-bridge.png"
  ],
  "tail-off-bridge": [
    "车尾离桥",
    "车尾刚离开桥，火车完整通过，路程是车长加桥长。",
    "assets/train-bridge/train-bridge-03-tail-off-bridge.png"
  ]
};
const moduleImageFrameSets = {
  M01: {
    frames: {
      start: ["起点", "把起始数量送上运算传送带。", "assets/module-frames/m01-operation-conveyor/m01-operation-conveyor-00-start.png"],
      "first-operation": ["第一步", "先通过第一个运算门，得到中间结果。", "assets/module-frames/m01-operation-conveyor/m01-operation-conveyor-01-first-operation.png"],
      "second-operation": ["第二步", "中间结果继续通过第二个运算门。", "assets/module-frames/m01-operation-conveyor/m01-operation-conveyor-02-second-operation.png"],
      "answer-check": ["验算终点", "终点检查每一步是否按顺序完成。", "assets/module-frames/m01-operation-conveyor/m01-operation-conveyor-03-answer-check.png"]
    }
  },
  M02: {
    frames: {
      "loose-terms": ["看条件", "把题目条件放到运算树的叶子上。", "assets/module-frames/m02-operation-tree/m02-operation-tree-00-loose-terms.png"],
      "parentheses-first": ["括号优先", "括号托盘里的数量先合并。", "assets/module-frames/m02-operation-tree/m02-operation-tree-01-parentheses-first.png"],
      "climb-tree": ["向上计算", "括号结果再送到外层运算。", "assets/module-frames/m02-operation-tree/m02-operation-tree-02-climb-tree.png"],
      "root-answer": ["根节点答案", "树根亮起，表示整个式子完成。", "assets/module-frames/m02-operation-tree/m02-operation-tree-03-root-answer.png"]
    }
  },
  M03: {
    frames: {
      "place-groups": ["按位摆放", "百十个位先分开放。", "assets/module-frames/m03-place-value-multiply/m03-place-value-multiply-00-place-groups.png"],
      "copy-groups": ["逐位复制", "一位数乘每个数位的数量。", "assets/module-frames/m03-place-value-multiply/m03-place-value-multiply-01-copy-groups.png"],
      "partial-products": ["部分积", "每个数位得到自己的部分积。", "assets/module-frames/m03-place-value-multiply/m03-place-value-multiply-02-partial-products.png"],
      "merge-product": ["合并", "把部分积合并成最终积。", "assets/module-frames/m03-place-value-multiply/m03-place-value-multiply-03-merge-product.png"]
    }
  },
  M04: {
    frames: {
      "whole-array": ["整块阵列", "先看到完整长方形阵列。", "assets/module-frames/m04-area-array-multiply/m04-area-array-multiply-00-whole-array.png"],
      "split-tens-ones": ["拆成四块", "按几十和几切成四个部分。", "assets/module-frames/m04-area-array-multiply/m04-area-array-multiply-01-split-tens-ones.png"],
      "partial-areas": ["部分面积", "分别计算四块部分面积。", "assets/module-frames/m04-area-array-multiply/m04-area-array-multiply-02-partial-areas.png"],
      "join-area": ["合并面积", "四块面积相加回到总面积。", "assets/module-frames/m04-area-array-multiply/m04-area-array-multiply-03-join-area.png"]
    }
  },
  M05: {
    frames: {
      pile: ["总量", "先看到要平均分的总量。", "assets/module-frames/m05-sharing-trays/m05-sharing-trays-00-pile.png"],
      share: ["平均分", "把物品平均放进托盘。", "assets/module-frames/m05-sharing-trays/m05-sharing-trays-01-share.png"],
      exchange: ["换低位", "分不完的高位换成低一位继续分。", "assets/module-frames/m05-sharing-trays/m05-sharing-trays-02-exchange.png"],
      remainder: ["商和余数", "每份一样多，剩下的进入余数杯。", "assets/module-frames/m05-sharing-trays/m05-sharing-trays-03-remainder.png"]
    }
  },
  M06: {
    frames: {
      estimate: ["估商", "用接近的整十数先估一个商。", "assets/module-frames/m06-trial-quotient/m06-trial-quotient-00-estimate.png"],
      "try-slider": ["试商", "滑杆选出一个试商。", "assets/module-frames/m06-trial-quotient/m06-trial-quotient-01-try-slider.png"],
      "compare-product": ["比较乘积", "试商乘除数后与被除数比较。", "assets/module-frames/m06-trial-quotient/m06-trial-quotient-02-compare-product.png"],
      adjust: ["调整", "偏大或偏小就移动滑杆。", "assets/module-frames/m06-trial-quotient/m06-trial-quotient-03-adjust.png"]
    }
  },
  M07: {
    frames: {
      triangle: ["关系三角", "三个相关量站在三角的三个角。", "assets/module-frames/m07-inverse-triangle/m07-inverse-triangle-00-triangle.png"],
      "known-two": ["已知两个", "先放入已知的两个量。", "assets/module-frames/m07-inverse-triangle/m07-inverse-triangle-01-known-two.png"],
      "find-missing": ["求缺角", "用乘除关系找到缺少的量。", "assets/module-frames/m07-inverse-triangle/m07-inverse-triangle-02-find-missing.png"],
      "reverse-check": ["反向验算", "反向走一遍检查是否回到原量。", "assets/module-frames/m07-inverse-triangle/m07-inverse-triangle-03-reverse-check.png"]
    }
  },
  M08: {
    frames: {
      "number-line": ["定位", "把原数放到数轴区间里。", "assets/module-frames/m08-estimation-zoom/m08-estimation-zoom-00-number-line.png"],
      zoom: ["放大", "放大观察它靠近哪个整十整百。", "assets/module-frames/m08-estimation-zoom/m08-estimation-zoom-01-zoom.png"],
      "compare-distance": ["比距离", "比较到左右端点的距离。", "assets/module-frames/m08-estimation-zoom/m08-estimation-zoom-02-compare-distance.png"],
      snap: ["吸附近似数", "靠近哪边就估到哪边。", "assets/module-frames/m08-estimation-zoom/m08-estimation-zoom-03-snap.png"]
    }
  },
  M10: {
    frames: {
      "single-item": ["看单价", "先确定每件商品的价钱。", "assets/module-frames/m10-shopping/m10-shopping-00-single-item.png"],
      "add-items": ["放入数量", "同样的商品放几件，数量就是几。", "assets/module-frames/m10-shopping/m10-shopping-01-add-items.png"],
      checkout: ["合并付款", "把每件商品的价钱合起来。", "assets/module-frames/m10-shopping/m10-shopping-02-checkout.png"],
      "total-price": ["得到总价", "总价 = 单价 × 数量。", "assets/module-frames/m10-shopping/m10-shopping-03-total-price.png"]
    }
  },
  M11: {
    frames: {
      start: ["从起点出发", "先确定速度、时间和出发点。", "assets/module-frames/m11-speed/m11-speed-00-start.png"],
      "one-unit": ["走过一段时间", "速度表示每一份时间走过的路程。", "assets/module-frames/m11-speed/m11-speed-01-one-unit.png"],
      "multi-unit": ["连续走多段", "几份时间就累加几段同样的路程。", "assets/module-frames/m11-speed/m11-speed-02-multi-unit.png"],
      arrive: ["到达终点", "路程 = 速度 × 时间。", "assets/module-frames/m11-speed/m11-speed-03-arrive.png"]
    }
  },
  M13: {
    frames: {
      "compare-bars": ["比较线段", "先把两个量画成可比较的线段。", "assets/module-frames/m13-line-segments/m13-line-segments-00-compare-bars.png"],
      "equal-units": ["分成相同份", "大数由几个相同的一份组成。", "assets/module-frames/m13-line-segments/m13-line-segments-01-equal-units.png"],
      "show-total": ["看和", "和倍题把两条线段合起来看总量。", "assets/module-frames/m13-line-segments/m13-line-segments-02-show-total.png"],
      "show-difference": ["看差", "差倍题看多出的那几份。", "assets/module-frames/m13-line-segments/m13-line-segments-03-show-difference.png"]
    }
  },
  M14: {
    frames: {
      "original-total": ["看原来总量", "先找原来一共有多少和分成几份。", "assets/module-frames/m14-unit-rate/m14-unit-rate-00-original-total.png"],
      "find-one-unit": ["求一份", "用总量除以份数，得到一份量。", "assets/module-frames/m14-unit-rate/m14-unit-rate-01-find-one-unit.png"],
      "copy-unit": ["复制一份量", "新份数有几份，就复制几个一份量。", "assets/module-frames/m14-unit-rate/m14-unit-rate-02-copy-unit.png"],
      "new-total": ["得到新总量", "一份量乘新份数，得到新总量。", "assets/module-frames/m14-unit-rate/m14-unit-rate-03-new-total.png"]
    }
  },
  M15: {
    frames: {
      "empty-line": ["先看路线", "先把总长看成一条线。", "assets/module-frames/m15-planting/m15-planting-00-empty-line.png"],
      "mark-gaps": ["标出间隔", "总长除以间隔，先得到有几段。", "assets/module-frames/m15-planting/m15-planting-01-mark-gaps.png"],
      "plant-points": ["放上点", "端点情况决定点数要加、减还是不变。", "assets/module-frames/m15-planting/m15-planting-02-plant-points.png"],
      "count-points": ["数点和段", "点和间隔要分开数。", "assets/module-frames/m15-planting/m15-planting-03-count-points.png"]
    }
  },
  M16: {
    frames: {
      "pattern-start": ["看循环串", "先观察哪些颜色或图案在重复。", "assets/module-frames/m16-cycle/m16-cycle-00-pattern-start.png"],
      "cycle-block": ["圈出一组", "把完整重复的一组看成周期。", "assets/module-frames/m16-cycle/m16-cycle-01-cycle-block.png"],
      "full-groups": ["数完整组", "用目标序号先分出几个完整周期。", "assets/module-frames/m16-cycle/m16-cycle-02-full-groups.png"],
      remainder: ["看余数", "余数决定落在下一组的哪个位置。", "assets/module-frames/m16-cycle/m16-cycle-03-remainder.png"]
    }
  },
  M17: {
    frames: {
      input: ["输入", "把输入数放到流程起点。", "assets/module-frames/m17-flow-path/m17-flow-path-00-input.png"],
      "first-gate": ["第一道门", "按箭头经过第一步运算。", "assets/module-frames/m17-flow-path/m17-flow-path-01-first-gate.png"],
      "second-gate": ["第二道门", "继续经过第二步运算。", "assets/module-frames/m17-flow-path/m17-flow-path-02-second-gate.png"],
      reverse: ["逆向推回", "从结果倒着走，用相反运算回到输入。", "assets/module-frames/m17-flow-path/m17-flow-path-03-reverse.png"]
    }
  },
  M18: {
    frames: {
      categories: ["分清类别", "先把每一类选择分开放。", "assets/module-frames/m18-combinations/m18-combinations-00-categories.png"],
      "connect-one": ["一项配全部", "固定一项，再和另一类逐个搭配。", "assets/module-frames/m18-combinations/m18-combinations-01-connect-one.png"],
      matrix: ["排成矩阵", "用表格能看清是否不重不漏。", "assets/module-frames/m18-combinations/m18-combinations-02-matrix.png"],
      "all-cards": ["生成搭配卡", "每张卡表示一种完整搭配。", "assets/module-frames/m18-combinations/m18-combinations-03-all-cards.png"]
    }
  },
  M19: {
    frames: {
      "total-apples": ["先看总数", "把要分的苹果总数先固定。", "assets/module-frames/m19-apples/m19-apples-00-total-apples.png"],
      "minimum-each": ["每盒先放够", "先满足每盒至少几个的条件。", "assets/module-frames/m19-apples/m19-apples-01-minimum-each.png"],
      "distribute-leftovers": ["分配剩余", "剩下的苹果再有序放入盒子。", "assets/module-frames/m19-apples/m19-apples-02-distribute-leftovers.png"],
      "solution-cards": ["列出方案", "每一种分法都记录下来，避免重复和遗漏。", "assets/module-frames/m19-apples/m19-apples-03-solution-cards.png"]
    }
  },
  M21: {
    frames: {
      "surplus-plan": ["看多出的方案", "一种分法会多出一些，形成盈。", "assets/module-frames/m21-profit-loss/m21-profit-loss-00-surplus-plan.png"],
      "shortage-plan": ["看不够的方案", "另一种分法会不够，形成亏。", "assets/module-frames/m21-profit-loss/m21-profit-loss-01-shortage-plan.png"],
      "compare-gap": ["合并总差额", "盈和亏合起来就是总差额。", "assets/module-frames/m21-profit-loss/m21-profit-loss-02-compare-gap.png"],
      "split-gap": ["按每人差分组", "总差额除以每人差，得到人数。", "assets/module-frames/m21-profit-loss/m21-profit-loss-03-split-gap.png"]
    }
  },
  M22: {
    frames: {
      "calendar-page": ["看日历页", "先用日历页观察一个月有多少天。", "assets/module-frames/m22-calendar/m22-calendar-00-calendar-page.png"],
      "flip-months": ["翻看月份", "不同月份天数不完全一样。", "assets/module-frames/m22-calendar/m22-calendar-01-flip-months.png"],
      "february-short": ["观察二月", "二月比其他月份特殊，要单独判断。", "assets/module-frames/m22-calendar/m22-calendar-02-february-short.png"],
      "leap-extra": ["闰年多一天", "闰年二月会多出一天。", "assets/module-frames/m22-calendar/m22-calendar-03-leap-extra.png"]
    }
  },
  M23: {
    frames: {
      "start-time": ["标出开始", "先把开始时刻放到时间轴上。", "assets/module-frames/m23-elapsed-time/m23-elapsed-time-00-start-time.png"],
      "next-hour": ["补到整点", "跨小时题常先补到下一个整点。", "assets/module-frames/m23-elapsed-time/m23-elapsed-time-01-next-hour.png"],
      "full-hours": ["数完整小时", "中间的完整小时可以整段计算。", "assets/module-frames/m23-elapsed-time/m23-elapsed-time-02-full-hours.png"],
      "end-time": ["到达结束", "最后把各段经过时间合起来。", "assets/module-frames/m23-elapsed-time/m23-elapsed-time-03-end-time.png"]
    }
  },
  M24: {
    frames: {
      whole: ["确定整体", "先确定单位 1 是哪一个整体。", "assets/module-frames/m24-whole-part/m24-whole-part-00-whole.png"],
      "equal-parts": ["平均分", "把同一个整体平均分成几份。", "assets/module-frames/m24-whole-part/m24-whole-part-01-equal-parts.png"],
      "one-part": ["看一份", "其中的一份就是整体的一部分。", "assets/module-frames/m24-whole-part/m24-whole-part-02-one-part.png"],
      "rebuild-whole": ["合回整体", "所有部分合起来仍然是原来的整体。", "assets/module-frames/m24-whole-part/m24-whole-part-03-rebuild-whole.png"]
    }
  },
  M25: {
    frames: {
      whole: ["看完整整体", "分数讨论的是同一个完整整体。", "assets/module-frames/m25-fraction-parts/m25-fraction-parts-00-whole.png"],
      "divide-evenly": ["平均切分", "分母表示平均分成几份。", "assets/module-frames/m25-fraction-parts/m25-fraction-parts-01-divide-evenly.png"],
      "one-part": ["取一份", "几分之一表示取其中一份。", "assets/module-frames/m25-fraction-parts/m25-fraction-parts-02-one-part.png"],
      "several-parts": ["取几份", "分子表示取了其中的几份。", "assets/module-frames/m25-fraction-parts/m25-fraction-parts-03-several-parts.png"]
    }
  },
  M26: {
    frames: {
      "same-whole": ["同样整体", "比较分数时，整体必须一样大。", "assets/module-frames/m26-fraction-compare/m26-fraction-compare-00-same-whole.png"],
      "first-shade": ["涂出第一个分数", "先看第一个分数占了多少。", "assets/module-frames/m26-fraction-compare/m26-fraction-compare-01-first-shade.png"],
      "second-shade": ["涂出第二个分数", "再看第二个分数占了多少。", "assets/module-frames/m26-fraction-compare/m26-fraction-compare-02-second-shade.png"],
      "compare-shades": ["对齐比较", "把涂色部分对齐，就更容易看出大小。", "assets/module-frames/m26-fraction-compare/m26-fraction-compare-03-compare-shades.png"]
    }
  },
  M27: {
    frames: {
      "total-quantity": ["看总量", "先确定整体一共有多少个。", "assets/module-frames/m27-fraction-application/m27-fraction-application-00-total-quantity.png"],
      "equal-groups": ["平均分组", "按分母把总量平均分成几份。", "assets/module-frames/m27-fraction-application/m27-fraction-application-01-equal-groups.png"],
      "select-groups": ["取对应份数", "按分子选择其中几份。", "assets/module-frames/m27-fraction-application/m27-fraction-application-02-select-groups.png"],
      "answer-quantity": ["得到数量", "把选中的份数合起来，就是要求的数量。", "assets/module-frames/m27-fraction-application/m27-fraction-application-03-answer-quantity.png"]
    }
  },
  M28: {
    frames: {
      "ruler-start": ["看尺带", "先把长度放到尺带上观察。", "assets/module-frames/m28-length-conversion/m28-length-conversion-00-ruler-start.png"],
      "zoom-ticks": ["放大刻度", "放大后能看到更小的单位刻度。", "assets/module-frames/m28-length-conversion/m28-length-conversion-01-zoom-ticks.png"],
      "nested-units": ["单位嵌套", "米、分米、厘米是逐级变小的长度单位。", "assets/module-frames/m28-length-conversion/m28-length-conversion-02-nested-units.png"],
      "align-units": ["对齐换算", "换算时要从同一个起点对齐比较。", "assets/module-frames/m28-length-conversion/m28-length-conversion-03-align-units.png"]
    }
  },
  M29: {
    frames: {
      "empty-shape": ["看平面大小", "面积表示图形里面占的平面大小。", "assets/module-frames/m29-area-unit/m29-area-unit-00-empty-shape.png"],
      "one-tile": ["放一个单位", "一个单位正方形可以作为面积单位。", "assets/module-frames/m29-area-unit/m29-area-unit-01-one-tile.png"],
      "tile-cover": ["铺满图形", "用同样大小的方格铺满，不能重叠也不能漏空。", "assets/module-frames/m29-area-unit/m29-area-unit-02-tile-cover.png"],
      "measured-area": ["数出面积", "数一共有多少个单位正方形。", "assets/module-frames/m29-area-unit/m29-area-unit-03-measured-area.png"]
    }
  },
  M30: {
    frames: {
      "one-row": ["先看一行", "长方形面积可以先看一行有几格。", "assets/module-frames/m30-rectangle-area/m30-rectangle-area-00-one-row.png"],
      "stack-rows": ["叠成多行", "有几行，就有几组相同的一行。", "assets/module-frames/m30-rectangle-area/m30-rectangle-area-01-stack-rows.png"],
      "filled-grid": ["铺满长方形", "长和宽形成行列方格。", "assets/module-frames/m30-rectangle-area/m30-rectangle-area-02-filled-grid.png"],
      "highlight-sides": ["看长和宽", "长方形面积 = 长 × 宽。", "assets/module-frames/m30-rectangle-area/m30-rectangle-area-03-highlight-sides.png"]
    }
  },
  M31: {
    frames: {
      "original-shape": ["观察原图", "先看组合图形缺了哪一块。", "assets/module-frames/m31-composite-area/m31-composite-area-00-original-shape.png"],
      "cut-lines": ["画切割线", "可以切成几个长方形来相加。", "assets/module-frames/m31-composite-area/m31-composite-area-01-cut-lines.png"],
      "missing-corner": ["补成大长方形", "也可以先补成大长方形，再看缺角。", "assets/module-frames/m31-composite-area/m31-composite-area-02-missing-corner.png"],
      "subtract-area": ["大减小", "组合面积 = 大长方形面积 - 缺角面积。", "assets/module-frames/m31-composite-area/m31-composite-area-03-subtract-area.png"]
    }
  },
  M32: {
    frames: {
      "irregular-shape": ["观察不规则图形", "先看图形大致覆盖哪些地方。", "assets/module-frames/m32-area-estimate/m32-area-estimate-00-irregular-shape.png"],
      "overlay-grid": ["盖上透明网格", "用方格网帮助估计面积。", "assets/module-frames/m32-area-estimate/m32-area-estimate-01-overlay-grid.png"],
      "full-cells": ["数满格", "完整落在图形里的格子先直接数。", "assets/module-frames/m32-area-estimate/m32-area-estimate-02-full-cells.png"],
      "half-cells": ["合并半格", "边缘半格可以约两个合成一个整格。", "assets/module-frames/m32-area-estimate/m32-area-estimate-03-half-cells.png"]
    }
  },
  M33: {
    frames: {
      "area-grid": ["区分里面和边界", "里面的格子表示面积，不是周长。", "assets/module-frames/m33-perimeter-trace/m33-perimeter-trace-00-area-grid.png"],
      "trace-start": ["从一角开始描", "周长要沿外边线走。", "assets/module-frames/m33-perimeter-trace/m33-perimeter-trace-01-trace-start.png"],
      "trace-around": ["继续描一圈", "一边一边累加外圈长度。", "assets/module-frames/m33-perimeter-trace/m33-perimeter-trace-02-trace-around.png"],
      "perimeter-only": ["只看外圈", "周长是封闭图形一周边线的长度。", "assets/module-frames/m33-perimeter-trace/m33-perimeter-trace-03-perimeter-only.png"]
    }
  },
  M34: {
    frames: {
      plot: ["地块", "先看到长方形或正方形地块。", "assets/module-frames/m34-perimeter-fence/m34-perimeter-fence-00-plot.png"],
      "place-fence": ["铺围栏", "沿边界一段一段放围栏。", "assets/module-frames/m34-perimeter-fence/m34-perimeter-fence-01-place-fence.png"],
      "equal-sides": ["对边相等", "长方形对边成对相等。", "assets/module-frames/m34-perimeter-fence/m34-perimeter-fence-02-equal-sides.png"],
      "full-boundary": ["完整一周", "围栏围满一周就是周长。", "assets/module-frames/m34-perimeter-fence/m34-perimeter-fence-03-full-boundary.png"]
    }
  },
  M35: {
    frames: {
      "long-rectangle": ["长瘦长方形", "同一根围栏可以围成长瘦形状。", "assets/module-frames/m35-max-area/m35-max-area-00-long-rectangle.png"],
      "medium-rectangle": ["调整长和宽", "长变短、宽变宽，面积会变化。", "assets/module-frames/m35-max-area/m35-max-area-01-medium-rectangle.png"],
      "near-square": ["接近正方形", "同样周长下，长和宽越接近，面积通常越大。", "assets/module-frames/m35-max-area/m35-max-area-02-near-square.png"],
      "compare-areas": ["对比面积", "固定周长不代表面积固定。", "assets/module-frames/m35-max-area/m35-max-area-03-compare-areas.png"]
    }
  },
  M36: {
    frames: {
      "mirror-line": ["找到对称轴", "先看图形能否沿一条线折叠。", "assets/module-frames/m36-symmetry-tiling/m36-symmetry-tiling-00-mirror-line.png"],
      "reflected-shape": ["补出镜像", "对称轴两边到轴的距离相等。", "assets/module-frames/m36-symmetry-tiling/m36-symmetry-tiling-01-reflected-shape.png"],
      "rotate-flip": ["旋转翻转", "拼嵌时可以平移、旋转或翻转图形。", "assets/module-frames/m36-symmetry-tiling/m36-symmetry-tiling-02-rotate-flip.png"],
      "tile-board": ["铺满不重叠", "能无空隙无重叠地铺满，就是好的拼嵌。", "assets/module-frames/m36-symmetry-tiling/m36-symmetry-tiling-03-tile-board.png"]
    }
  },
  M37: {
    frames: {
      build: ["搭三角形", "三根可调杆搭出三角形。", "assets/module-frames/m37-triangle-classify/m37-triangle-classify-00-build.png"],
      "side-match": ["看边", "相等的边会一起亮起。", "assets/module-frames/m37-triangle-classify/m37-triangle-classify-01-side-match.png"],
      "angle-open": ["看角", "角度张开或收拢改变角分类。", "assets/module-frames/m37-triangle-classify/m37-triangle-classify-02-angle-open.png"],
      classify: ["分类", "边和角两个角度同时给三角形分类。", "assets/module-frames/m37-triangle-classify/m37-triangle-classify-03-classify.png"]
    }
  },
  M38: {
    frames: {
      "picture-table": ["看统计表", "先从统计表或图标数量获取数据。", "assets/module-frames/m38-bar-chart/m38-bar-chart-00-picture-table.png"],
      "scale-grid": ["确定刻度", "画条形图前要先看每格代表多少。", "assets/module-frames/m38-bar-chart/m38-bar-chart-01-scale-grid.png"],
      "bars-grow": ["画出柱子", "数据越大，柱子越高。", "assets/module-frames/m38-bar-chart/m38-bar-chart-02-bars-grow.png"],
      "read-value": ["读出数值", "读图时先看每格代表多少，再看柱子的高度。", "assets/module-frames/m38-bar-chart/m38-bar-chart-03-read-value.png"]
    }
  }
};

function summarizeBlueprint(blueprint) {
  const archetypes = blueprint.archetypes || [];
  return {
    knowledgeCount: (blueprint.knowledgeNodes || []).length,
    archetypeCount: archetypes.length,
    variantCount: archetypes.reduce((total, item) => total + item.variants.length, 0),
    inClassCount: archetypes.filter((item) => item.layer === "课内").length,
    extensionCount: archetypes.filter((item) => item.layer === "拔高").length
  };
}

function getDemoModules(blueprint) {
  return demoIds.map((id) => findArchetype(blueprint, id));
}

function getArchetypesByKnowledge(blueprint, knowledgeId) {
  const ids = blueprint.knowledgeToArchetypes[knowledgeId] || [];
  return ids.map((id) => findArchetype(blueprint, id));
}

function buildNavigatorModel(blueprint) {
  const knowledgeById = new Map(blueprint.knowledgeNodes.map((item) => [item.id, item]));
  const groups = knowledgeGroups.map((group) => ({
    name: group.name,
    items: group.ids.map((id) => knowledgeById.get(id)).filter(Boolean)
  }));
  const archetypeCards = blueprint.archetypes.map((item) => ({
    id: item.id,
    title: item.title,
    layer: item.layer,
    difficulty: item.difficulty,
    model: item.model,
    variantCount: item.variants.length,
    knowledgeIds: item.knowledgeIds,
    isDemo: interactiveIds.includes(item.id),
    hasImageFrames: moduleHasImageFrames(item.id)
  }));
  return {
    summary: summarizeBlueprint(blueprint),
    groups,
    archetypeCards,
    demoModules: getDemoModules(blueprint)
  };
}

function findArchetype(blueprint, archetypeId) {
  const archetype = (blueprint.archetypes || []).find((item) => item.id === archetypeId);
  if (!archetype) {
    throw new Error(`Unknown archetype: ${archetypeId}`);
  }
  return archetype;
}

function getInteractiveModuleIds() {
  return interactiveIds.slice();
}

function buildArchetypeDetail(blueprint, archetypeId) {
  const archetype = findArchetype(blueprint, archetypeId);
  const knowledgeById = new Map(blueprint.knowledgeNodes.map((item) => [item.id, item]));
  return {
    id: archetype.id,
    title: archetype.title,
    layer: archetype.layer,
    difficulty: archetype.difficulty,
    model: archetype.model,
    knowledgeNames: archetype.knowledgeIds
      .map((id) => knowledgeById.get(id))
      .filter(Boolean)
      .map((item) => item.name),
    variants: archetype.variants,
    animation: archetype.animationSpec,
    parentCoach: archetype.parentCoach,
    isInteractive: interactiveIds.includes(archetype.id),
    hasImageFrames: moduleHasImageFrames(archetype.id)
  };
}

function moduleHasImageFrames(moduleId) {
  return Boolean(moduleImageFrameSets[moduleId]) || moduleId === "M12" || moduleId === "M20" || moduleId === "M39";
}

function buildPracticePanel(blueprint, archetypeId) {
  const archetype = findArchetype(blueprint, archetypeId);
  const knowledgeById = new Map(blueprint.knowledgeNodes.map((item) => [item.id, item]));
  return {
    id: archetype.id,
    title: archetype.title,
    knowledgeNames: archetype.knowledgeIds
      .map((id) => knowledgeById.get(id))
      .filter(Boolean)
      .map((item) => item.name),
    variantCards: archetype.variants.map((variant) => ({
      id: variant.id,
      title: variant.title,
      prompt: variant.promptTemplate,
      steps: variant.solutionSteps,
      answerRule: variant.answerRule
    })),
    animationGuide: {
      scene: archetype.animationSpec.scene,
      revealSteps: archetype.animationSpec.revealSteps,
      childFeedback: archetype.animationSpec.childFeedback
    },
    coach: archetype.parentCoach
  };
}

function buildStudyRoute(blueprint, options = {}) {
  const mode = options.mode || "balanced";
  const totalMinutes = Number.isFinite(options.minutes) && options.minutes > 0 ? options.minutes : 20;
  const selected = mode === "extension"
    ? blueprint.archetypes.filter((item) => item.layer === "拔高").slice(0, 6).map((item) => ({ id: item.id, group: "拔高模型" }))
    : balancedRouteSeeds;
  const baseMinutes = Math.floor(totalMinutes / selected.length);
  const remainder = totalMinutes % selected.length;
  const items = selected.map((seed, index) => {
    const archetype = findArchetype(blueprint, seed.id);
    return {
      id: archetype.id,
      title: archetype.title,
      group: seed.group,
      layer: archetype.layer,
      difficulty: archetype.difficulty,
      minutes: baseMinutes + (index < remainder ? 1 : 0),
      action: `看动画，做第1个子题，再让孩子说出${archetype.model}`
    };
  });
  return {
    mode,
    totalMinutes,
    items,
    coachPrompt: `${totalMinutes}分钟陪练：先热身，再建模，最后让孩子复述方法。`
  };
}

function getLessonChecklist() {
  return lessonChecklist.map((item) => ({ ...item }));
}

function calculateRouteProgress(route, checksByModule = {}) {
  const checklist = getLessonChecklist();
  const items = route.items.map((item) => {
    const checks = checksByModule[item.id] || {};
    const checkedCount = checklist.filter((check) => checks[check.id] === true).length;
    return {
      id: item.id,
      checkedCount,
      totalChecks: checklist.length,
      completed: checkedCount === checklist.length
    };
  });
  const completedModules = items.filter((item) => item.completed).length;
  const completedChecks = items.reduce((total, item) => total + item.checkedCount, 0);
  const totalChecks = items.length * checklist.length;
  return {
    completedModules,
    totalModules: items.length,
    completedChecks,
    totalChecks,
    label: `${completedModules}/${items.length}`,
    items
  };
}

function buildPrintableCoachSheet(blueprint, route) {
  return {
    title: `${route.mode === "extension" ? "拔高" : "均衡"} ${route.totalMinutes} 分钟陪练单`,
    totalMinutes: route.totalMinutes,
    checklist: getLessonChecklist(),
    items: route.items.map((routeItem) => {
      const archetype = findArchetype(blueprint, routeItem.id);
      const firstVariant = archetype.variants[0];
      return {
        id: archetype.id,
        title: archetype.title,
        group: routeItem.group,
        minutes: routeItem.minutes,
        firstVariant: {
          title: firstVariant.title,
          prompt: firstVariant.promptTemplate,
          steps: firstVariant.solutionSteps,
          answerRule: firstVariant.answerRule
        },
        coach: archetype.parentCoach,
        model: archetype.model
      };
    })
  };
}

function getChickenRabbitLegLiftFrame({ animal, state }) {
  const animalFrames = chickenRabbitLegLiftFrames[animal];
  if (!animalFrames) {
    throw new Error(`Unknown chicken-rabbit animal: ${animal}`);
  }
  const frame = animalFrames.states[state];
  if (!frame) {
    throw new Error(`Unknown chicken-rabbit leg-lift state: ${state}`);
  }
  return {
    animal,
    animalName: animalFrames.animalName,
    state,
    stateLabel: frame[0],
    remainingStandingLegs: animalFrames.remainingStandingLegs,
    file: frame[1]
  };
}

function getTrainBridgeFrame(state) {
  const frame = trainBridgeFrames[state];
  if (!frame) {
    throw new Error(`Unknown train bridge frame state: ${state}`);
  }
  return {
    state,
    stateLabel: frame[0],
    teachingNote: frame[1],
    file: frame[2]
  };
}

function getModuleImageFrames(moduleId) {
  const frameSet = moduleImageFrameSets[moduleId];
  if (!frameSet) {
    throw new Error(`Unknown module image frame set: ${moduleId}`);
  }
  return Object.entries(frameSet.frames).map(([state, frame]) => ({
    moduleId,
    state,
    stateLabel: frame[0],
    teachingNote: frame[1],
    file: frame[2]
  }));
}

function getModuleImageFrame({ moduleId, state }) {
  const frameSet = moduleImageFrameSets[moduleId];
  if (!frameSet) {
    throw new Error(`Unknown module image frame set: ${moduleId}`);
  }
  const frameState = state || Object.keys(frameSet.frames)[0];
  const frame = frameSet.frames[frameState];
  if (!frame) {
    throw new Error(`Unknown module image frame state: ${moduleId}/${frameState}`);
  }
  return {
    moduleId,
    state: frameState,
    stateLabel: frame[0],
    teachingNote: frame[1],
    file: frame[2]
  };
}

function calculateSequentialOperations({ start, operations }) {
  assertPositive(start, "start");
  if (!Array.isArray(operations) || operations.length === 0) {
    throw new Error("operations must contain at least one operation");
  }
  let current = start;
  const steps = [];
  const equationParts = [String(start)];
  for (const [operator, value] of operations) {
    assertPositive(value, "operation value");
    if (operator === "multiply") {
      current *= value;
      equationParts.push("×", String(value));
    } else if (operator === "divide") {
      current /= value;
      equationParts.push("÷", String(value));
    } else {
      throw new Error(`Unknown sequential operator: ${operator}`);
    }
    steps.push(current);
  }
  return {
    result: current,
    steps,
    equation: `${equationParts.join(" ")} = ${formatNumber(current)}`
  };
}

function evaluateParenthesesExpression({ left, operator, right, outsideOperator, outside }) {
  assertPositive(left, "left");
  assertPositive(right, "right");
  assertPositive(outside, "outside");
  const inner = applyBasicOperator(left, operator, right);
  const result = applyNamedOperator(inner, outsideOperator, outside);
  return {
    inner,
    result,
    equation: `(${left} ${operator} ${right}) ${operatorSymbol(outsideOperator)} ${outside} = ${formatNumber(result)}`
  };
}

function multiplyByOneDigitParts({ number, multiplier }) {
  assertPositive(number, "number");
  assertPositive(multiplier, "multiplier");
  const parts = decomposePlaceValue(number)
    .filter((part) => part.value > 0)
    .map((part) => ({
      place: part.place,
      value: part.value,
      partial: part.value * multiplier
    }));
  const product = parts.reduce((total, part) => total + part.partial, 0);
  return {
    parts,
    product,
    equation: `${parts.map((part) => part.partial).join(" + ")} = ${product}`
  };
}

function multiplyByAreaParts({ a, b }) {
  assertPositive(a, "a");
  assertPositive(b, "b");
  const aParts = expandedParts(a);
  const bParts = expandedParts(b);
  const parts = [];
  const equationPieces = [];
  for (const left of aParts) {
    for (const right of bParts) {
      parts.push(left * right);
      equationPieces.push(`${left}×${right}`);
    }
  }
  const product = parts.reduce((total, value) => total + value, 0);
  return {
    parts,
    product,
    equation: `${equationPieces.join(" + ")} = ${product}`
  };
}

function divideWithRemainder({ dividend, divisor }) {
  assertPositive(dividend, "dividend");
  assertPositive(divisor, "divisor");
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  return {
    quotient,
    remainder,
    equation: `${dividend} = ${divisor} × ${quotient} + ${remainder}`
  };
}

function trialQuotient({ dividend, divisor, quotient }) {
  assertPositive(dividend, "dividend");
  assertPositive(divisor, "divisor");
  assertPositive(quotient, "quotient");
  const product = divisor * quotient;
  const difference = dividend - product;
  return {
    product,
    difference,
    status: product > dividend ? "too-high" : "fits",
    equation: `${divisor} × ${quotient} = ${product}`
  };
}

function verifyDivision({ divisor, quotient, remainder }) {
  assertPositive(divisor, "divisor");
  assertPositive(quotient, "quotient");
  if (!Number.isFinite(remainder) || remainder < 0) {
    throw new Error("remainder must be zero or positive");
  }
  const dividend = divisor * quotient + remainder;
  return {
    dividend,
    equation: `${divisor} × ${quotient} + ${remainder} = ${dividend}`
  };
}

function estimateNearest({ value, base }) {
  assertPositive(value, "value");
  assertPositive(base, "base");
  const estimate = Math.round(value / base) * base;
  return {
    estimate,
    difference: Math.abs(estimate - value),
    equation: `${value} ≈ ${estimate}`
  };
}

function snapToIntegerMultiple({ value, factor, min, max, step = 1 }) {
  assertFiniteNumber(value, "value");
  assertPositive(factor, "factor");
  assertFiniteNumber(min, "min");
  assertFiniteNumber(max, "max");
  assertPositive(step, "step");
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const normalizedStep = Math.max(1, Math.trunc(step));
  let best = null;
  for (let candidate = lower; candidate <= upper; candidate += normalizedStep) {
    if (candidate % factor !== 0) continue;
    if (
      best === null ||
      Math.abs(candidate - value) < Math.abs(best - value) ||
      (Math.abs(candidate - value) === Math.abs(best - value) && candidate > best)
    ) {
      best = candidate;
    }
  }
  if (best !== null) return best;
  return Math.min(upper, Math.max(lower, Math.round(value)));
}

function decomposePlaceValue(number) {
  assertPositive(number, "number");
  const digits = String(Math.trunc(number)).split("").map(Number);
  return digits.map((digit, index) => {
    const place = 10 ** (digits.length - index - 1);
    return {
      place,
      digit,
      value: digit * place
    };
  });
}

function buildPlaceValueToolModel({ number, focus = "rods" }) {
  const focusLabels = {
    rods: "算筹",
    abacus: "算盘",
    calculator: "计算器"
  };
  const placeNames = {
    1000: "千位",
    100: "百位",
    10: "十位",
    1: "个位"
  };
  const columns = decomposePlaceValue(number).map((part) => ({
    ...part,
    placeName: placeNames[part.place] || `${part.place}位`,
    lowerBeads: part.digit % 5,
    upperBeads: part.digit >= 5 ? 1 : 0,
    rodCount: part.digit
  }));
  return {
    number: Math.trunc(number),
    focus,
    focusLabel: focusLabels[focus] || focusLabels.rods,
    expandedEquation: columns.map((part) => `${part.digit}×${part.place}`).join(" + "),
    calculatorKeys: String(Math.trunc(number)).split(""),
    zeroPlaces: columns.filter((part) => part.digit === 0).map((part) => part.placeName),
    columns
  };
}

function calculateSpeedDistanceTime({ speed, time, distance }) {
  const provided = [
    ["speed", speed],
    ["time", time],
    ["distance", distance]
  ].filter(([, value]) => Number.isFinite(value) && value > 0);
  if (provided.length !== 2) {
    throw new Error("Provide exactly two positive values among speed, time, and distance");
  }
  if (Number.isFinite(speed) && Number.isFinite(time)) {
    assertPositive(speed, "speed");
    assertPositive(time, "time");
    const resultDistance = speed * time;
    return {
      distance: resultDistance,
      equation: `${speed} × ${time} = ${formatNumber(resultDistance)}`
    };
  }
  if (Number.isFinite(distance) && Number.isFinite(time)) {
    assertPositive(distance, "distance");
    assertPositive(time, "time");
    const resultSpeed = distance / time;
    return {
      speed: resultSpeed,
      equation: `${distance} ÷ ${time} = ${formatNumber(resultSpeed)}`
    };
  }
  assertPositive(distance, "distance");
  assertPositive(speed, "speed");
  const resultTime = distance / speed;
  return {
    time: resultTime,
    equation: `${distance} ÷ ${speed} = ${formatNumber(resultTime)}`
  };
}

function calculatePriceQuantityTotal({ price, quantity, total }) {
  const provided = [
    ["price", price],
    ["quantity", quantity],
    ["total", total]
  ].filter(([, value]) => Number.isFinite(value) && value > 0);
  if (provided.length !== 2) {
    throw new Error("Provide exactly two positive values among price, quantity, and total");
  }
  if (Number.isFinite(price) && Number.isFinite(quantity)) {
    assertPositive(price, "price");
    assertPositive(quantity, "quantity");
    const resultTotal = price * quantity;
    return {
      total: resultTotal,
      equation: `${price} × ${quantity} = ${formatNumber(resultTotal)}`
    };
  }
  if (Number.isFinite(total) && Number.isFinite(quantity)) {
    assertPositive(total, "total");
    assertPositive(quantity, "quantity");
    const resultPrice = total / quantity;
    return {
      price: resultPrice,
      equation: `${total} ÷ ${quantity} = ${formatNumber(resultPrice)}`
    };
  }
  assertPositive(total, "total");
  assertPositive(price, "price");
  const resultQuantity = total / price;
  return {
    quantity: resultQuantity,
    equation: `${total} ÷ ${price} = ${formatNumber(resultQuantity)}`
  };
}

function solveCyclePosition({ pattern, position }) {
  if (!Array.isArray(pattern) || pattern.length === 0) {
    throw new Error("pattern must contain at least one item");
  }
  assertPositive(position, "position");
  const length = pattern.length;
  const groups = Math.floor(position / length);
  const remainder = position % length;
  const itemIndex = remainder === 0 ? length - 1 : remainder - 1;
  return {
    groups,
    remainder,
    itemIndex,
    item: pattern[itemIndex],
    equation: `${position} ÷ ${length} = ${groups} 余 ${remainder}`
  };
}

function countCombinations(counts) {
  if (!Array.isArray(counts) || counts.length === 0) {
    throw new Error("counts must contain at least one category");
  }
  counts.forEach((count, index) => assertPositive(count, `counts[${index}]`));
  const total = counts.reduce((product, count) => product * count, 1);
  return {
    total,
    equation: `${counts.join(" × ")} = ${total}`
  };
}

function solveUnitRate({ total, count, newCount }) {
  assertPositive(total, "total");
  assertPositive(count, "count");
  assertPositive(newCount, "newCount");
  const unit = total / count;
  const result = unit * newCount;
  return {
    unit,
    result,
    equation: `${total} ÷ ${count} × ${newCount} = ${formatNumber(result)}`
  };
}

function runFlow({ start, steps }) {
  assertPositive(start, "start");
  assertFlowSteps(steps);
  let current = start;
  const values = [];
  const equationParts = [String(start)];
  for (const [operator, value] of steps) {
    assertPositive(value, "flow value");
    current = applyNamedOperator(current, operator, value);
    values.push(current);
    equationParts.push(operatorSymbol(operator), String(value));
  }
  return {
    result: current,
    values,
    equation: `${equationParts.join(" ")} = ${formatNumber(current)}`
  };
}

function reverseFlow({ output, steps }) {
  assertPositive(output, "output");
  assertFlowSteps(steps);
  let current = output;
  const values = [];
  const equationParts = [String(output)];
  for (const [operator, value] of steps.slice().reverse()) {
    assertPositive(value, "flow value");
    const inverse = inverseOperator(operator);
    current = applyNamedOperator(current, inverse, value);
    values.push(current);
    equationParts.push(operatorSymbol(inverse), String(value));
  }
  return {
    start: current,
    values,
    equation: `${equationParts.join(" ")} = ${formatNumber(current)}`
  };
}

function solveBorrowReturn({ borrowed, returned, remaining }) {
  assertPositive(borrowed, "borrowed");
  assertNonNegative(returned, "returned");
  assertNonNegative(remaining, "remaining");
  const afterBorrow = remaining - returned;
  if (afterBorrow < 0) {
    throw new Error("remaining must not be smaller than returned in this model");
  }
  const original = afterBorrow + borrowed;
  return {
    original,
    afterBorrow,
    borrowed,
    returned,
    remaining,
    forwardEquation: `${original} - ${borrowed} + ${returned} = ${remaining}`,
    reverseEquation: `${remaining} - ${returned} + ${borrowed} = ${original}`,
    reverseSteps: [remaining, afterBorrow, original]
  };
}

function buildBorrowReturnModel({ mode = "original", original, borrowed, returned, remaining }) {
  const labels = {
    original: "原来",
    borrowed: "借出",
    returned: "还回",
    remaining: "还剩"
  };
  if (!labels[mode]) {
    throw new Error("mode must be original, borrowed, returned, or remaining");
  }

  let answer;
  if (mode === "original") {
    const solved = solveBorrowReturn({ borrowed, returned, remaining });
    original = solved.original;
    borrowed = solved.borrowed;
    returned = solved.returned;
    remaining = solved.remaining;
    answer = {
      label: labels.original,
      value: original,
      unit: "本",
      equation: solved.reverseEquation
    };
  }

  if (mode === "borrowed") {
    assertPositive(original, "original");
    assertNonNegative(returned, "returned");
    assertNonNegative(remaining, "remaining");
    borrowed = original + returned - remaining;
    if (borrowed <= 0 || original - borrowed < 0) {
      throw new Error("borrowed must make the shelf count valid");
    }
    answer = {
      label: labels.borrowed,
      value: borrowed,
      unit: "本",
      equation: `${original} + ${returned} - ${remaining} = ${borrowed}`
    };
  }

  if (mode === "returned") {
    assertPositive(original, "original");
    assertPositive(borrowed, "borrowed");
    assertNonNegative(remaining, "remaining");
    const afterBorrow = original - borrowed;
    returned = remaining - afterBorrow;
    if (afterBorrow < 0 || returned < 0) {
      throw new Error("returned must make the shelf count valid");
    }
    answer = {
      label: labels.returned,
      value: returned,
      unit: "本",
      equation: `${remaining} - (${original} - ${borrowed}) = ${returned}`
    };
  }

  if (mode === "remaining") {
    assertPositive(original, "original");
    assertPositive(borrowed, "borrowed");
    assertNonNegative(returned, "returned");
    remaining = original - borrowed + returned;
    if (remaining < 0) {
      throw new Error("remaining must not be negative");
    }
    answer = {
      label: labels.remaining,
      value: remaining,
      unit: "本",
      equation: `${original} - ${borrowed} + ${returned} = ${remaining}`
    };
  }

  const afterBorrow = original - borrowed;
  const forwardEquation = `${original} - ${borrowed} + ${returned} = ${remaining}`;
  const reverseEquation = `${remaining} - ${returned} + ${borrowed} = ${original}`;
  const steps = [
    {
      id: "remaining",
      title: "现在",
      value: remaining,
      shelfCount: remaining,
      equation: `还剩 ${remaining}`,
      prompt: "先盯住题目最后一句：现在书架上还剩多少本。"
    },
    {
      id: "undo-return",
      title: "撤销还回",
      value: afterBorrow,
      shelfCount: afterBorrow,
      equation: `${remaining} - ${returned} = ${afterBorrow}`,
      prompt: `倒着走，先把后来还回的 ${returned} 本撤掉。`
    },
    {
      id: "undo-borrow",
      title: "撤销借出",
      value: original,
      shelfCount: original,
      equation: `${afterBorrow} + ${borrowed} = ${original}`,
      prompt: `继续倒着走，把借出的 ${borrowed} 本放回书架。`
    },
    {
      id: "verify",
      title: "正向验算",
      value: remaining,
      shelfCount: remaining,
      equation: forwardEquation,
      prompt: "最后正着播放一次，能回到还剩本数就说明答案可信。"
    }
  ];

  return {
    mode,
    modeLabel: labels[mode],
    original,
    borrowed,
    returned,
    remaining,
    afterBorrow,
    answer,
    forwardEquation,
    reverseEquation,
    reverseSteps: [remaining, afterBorrow, original],
    steps
  };
}

function buildBorrowReturnSceneState(model, step = "remaining") {
  const stepId = ["remaining", "undo-return", "undo-borrow", "verify"].includes(step) ? step : "remaining";
  const states = {
    remaining: {
      borrowedTray: 0,
      shelfCount: model.remaining,
      returnedTray: 0,
      borrowedLabel: "借出篮",
      shelfLabel: "现在还剩",
      returnedLabel: "还回篮",
      flow: "先看最后状态"
    },
    "undo-return": {
      borrowedTray: 0,
      shelfCount: model.afterBorrow,
      returnedTray: model.returned,
      borrowedLabel: "借出篮",
      shelfLabel: "撤销还回后",
      returnedLabel: "撤下的还回书",
      flow: `把还回的 ${model.returned} 本从书架拿走`
    },
    "undo-borrow": {
      borrowedTray: model.borrowed,
      shelfCount: model.original,
      returnedTray: 0,
      borrowedLabel: "放回的借出书",
      shelfLabel: "还原到原来",
      returnedLabel: "还回篮",
      flow: `把借出的 ${model.borrowed} 本放回书架`
    },
    verify: {
      borrowedTray: model.borrowed,
      shelfCount: model.remaining,
      returnedTray: model.returned,
      borrowedLabel: "正向借出",
      shelfLabel: "验算后还剩",
      returnedLabel: "正向还回",
      flow: "正着播放：原来 - 借出 + 还回"
    }
  };
  return {
    step: stepId,
    ...states[stepId]
  };
}

function getMonthInfo({ year, month }) {
  assertPositive(year, "year");
  assertPositive(month, "month");
  if (month > 12) {
    throw new Error("month must be between 1 and 12");
  }
  const isLeapYear = year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
  const commonDays = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return {
    year,
    month,
    days: commonDays[month - 1],
    isLeapYear
  };
}

function describeFraction({ parts, take }) {
  assertPositive(parts, "parts");
  assertPositive(take, "take");
  if (take > parts) {
    throw new Error("take must not be greater than parts");
  }
  return {
    numerator: take,
    denominator: parts,
    fraction: `${take}/${parts}`,
    unitFraction: `1/${parts}`,
    remainingParts: parts - take
  };
}

function countAppleDistributions({ apples, boxes, minPerBox = 0 }) {
  assertPositive(apples, "apples");
  assertPositive(boxes, "boxes");
  assertNonNegative(minPerBox, "minPerBox");
  const choices = [];
  collectDistributions(apples, boxes, minPerBox, [], choices);
  const remainingAfterMinimum = apples - minPerBox * boxes;
  return {
    ways: choices.length,
    choices,
    equation:
      boxes === 2
        ? `${apples} - ${minPerBox} × ${boxes} + 1 = ${choices.length}`
        : `共${choices.length}种`
  };
}

function solveProfitLoss({ short, left, moreEach, lessEach }) {
  assertPositive(short, "short");
  assertPositive(left, "left");
  assertPositive(moreEach, "moreEach");
  assertPositive(lessEach, "lessEach");
  const gap = short + left;
  const gapPerPerson = moreEach + lessEach;
  const people = gap / gapPerPerson;
  return {
    people,
    gap,
    gapPerPerson,
    equation: `(${short} + ${left}) ÷ (${moreEach} + ${lessEach}) = ${formatNumber(people)}`
  };
}

function buildProfitLossAdjustmentModel({
  mode = "mixed",
  shortage,
  surplus,
  highEach,
  lowEach,
  focus = "plans"
}) {
  assertPositive(shortage, "shortage");
  assertPositive(surplus, "surplus");
  assertPositive(highEach, "highEach");
  assertPositive(lowEach, "lowEach");
  const focusLabels = {
    plans: "看两次分法",
    gap: "合并总差额",
    split: "按每人差分组"
  };
  const modeLabels = {
    mixed: "一亏一盈",
    "double-surplus": "双盈",
    "double-shortage": "双亏"
  };
  const sameSide = mode !== "mixed";
  const totalGap = sameSide ? Math.abs(surplus - shortage) : shortage + surplus;
  const gapPerPerson = sameSide ? Math.abs(highEach - lowEach) : highEach + lowEach;
  const people = totalGap / gapPerPerson;
  const largerGap = Math.max(shortage, surplus);
  const smallerGap = Math.min(shortage, surplus);
  const largerEach = Math.max(highEach, lowEach);
  const smallerEach = Math.min(highEach, lowEach);
  const operationSymbol = sameSide ? "-" : "+";
  const planAState = mode === "double-surplus" ? "盈" : "亏";
  const planBState = mode === "mixed" || mode === "double-surplus" ? "盈" : "亏";
  return {
    mode,
    modeLabel: modeLabels[mode] || modeLabels.mixed,
    focus,
    focusLabel: focusLabels[focus] || focusLabels.plans,
    people,
    totalGap,
    gapPerPerson,
    equation: sameSide
      ? `(${largerGap} - ${smallerGap}) ÷ (${largerEach} - ${smallerEach}) = ${formatNumber(people)}`
      : `(${shortage} + ${surplus}) ÷ (${highEach} + ${lowEach}) = ${formatNumber(people)}`,
    planA: {
      label: "分法A",
      state: planAState,
      amount: sameSide ? largerGap : shortage,
      eachChange: sameSide ? largerEach : highEach
    },
    planB: {
      label: "分法B",
      state: planBState,
      amount: sameSide ? smallerGap : surplus,
      eachChange: sameSide ? smallerEach : lowEach
    },
    gapOperation: sameSide
      ? `${largerGap} ${operationSymbol} ${smallerGap} = ${totalGap}`
      : `${shortage} ${operationSymbol} ${surplus} = ${totalGap}`,
    eachOperation: sameSide
      ? `${largerEach} ${operationSymbol} ${smallerEach} = ${gapPerPerson}`
      : `${highEach} ${operationSymbol} ${lowEach} = ${gapPerPerson}`,
    groups: Array.from({ length: Math.min(24, Math.max(0, Math.round(people))) }, () => gapPerPerson)
  };
}

function calculateElapsedMinutes({ startHour, startMinute, endHour, endMinute }) {
  assertClock(startHour, startMinute, "start");
  assertClock(endHour, endMinute, "end");
  const start = startHour * 60 + startMinute;
  let end = endHour * 60 + endMinute;
  if (end < start) {
    end += 24 * 60;
  }
  const minutes = end - start;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return {
    minutes,
    hours,
    remainingMinutes,
    label: `${hours}小时${remainingMinutes}分`,
    equation: `${formatClock(endHour, endMinute)} - ${formatClock(startHour, startMinute)} = ${minutes}分`
  };
}

function calculateWholeFromUnitPart({ partValue, parts }) {
  assertPositive(partValue, "partValue");
  assertPositive(parts, "parts");
  const whole = partValue * parts;
  return {
    whole,
    equation: `${partValue} × ${parts} = ${whole}`
  };
}

function compareFractions({ aNum, aDen, bNum, bDen }) {
  assertPositive(aNum, "aNum");
  assertPositive(aDen, "aDen");
  assertPositive(bNum, "bNum");
  assertPositive(bDen, "bDen");
  const leftProduct = aNum * bDen;
  const rightProduct = bNum * aDen;
  const comparison = Math.sign(leftProduct - rightProduct);
  const symbol = comparison < 0 ? "<" : comparison > 0 ? ">" : "=";
  return {
    leftProduct,
    rightProduct,
    comparison,
    symbol,
    equation: `${aNum}/${aDen} ${symbol} ${bNum}/${bDen}`
  };
}

function calculateFractionQuantity({ total, parts, take }) {
  assertPositive(total, "total");
  assertPositive(parts, "parts");
  assertPositive(take, "take");
  if (take > parts) {
    throw new Error("take must not be greater than parts");
  }
  const unit = total / parts;
  const quantity = unit * take;
  return {
    unit,
    quantity,
    equation: `${total} ÷ ${parts} × ${take} = ${formatNumber(quantity)}`
  };
}

function calculateRectanglePerimeter({ length, width }) {
  assertPositive(length, "length");
  assertPositive(width, "width");
  if (length === width) {
    const perimeter = length * 4;
    return {
      perimeter,
      equation: `${length} × 4 = ${perimeter}`
    };
  }
  const perimeter = (length + width) * 2;
  return {
    perimeter,
    equation: `(${length} + ${width}) × 2 = ${perimeter}`
  };
}

function convertLength({ meters = 0, centimeters = 0 }) {
  assertNonNegative(meters, "meters");
  assertNonNegative(centimeters, "centimeters");
  const totalCentimeters = meters * 100 + centimeters;
  if (totalCentimeters <= 0) {
    throw new Error("length must be positive");
  }
  return {
    totalCentimeters,
    equation: `${meters}米${centimeters}厘米 = ${totalCentimeters}厘米`
  };
}

function calculateGridArea({ rows, cols, unitArea }) {
  assertPositive(rows, "rows");
  assertPositive(cols, "cols");
  assertPositive(unitArea, "unitArea");
  const cells = rows * cols;
  const area = cells * unitArea;
  return {
    cells,
    area,
    equation: `${rows} × ${cols} × ${unitArea} = ${formatNumber(area)}`
  };
}

function calculateRectangleArea({ length, width }) {
  assertPositive(length, "length");
  assertPositive(width, "width");
  const area = length * width;
  return {
    area,
    equation: `${length} × ${width} = ${area}`
  };
}

function estimateGridArea({ fullCells, halfCells, unitArea }) {
  assertNonNegative(fullCells, "fullCells");
  assertNonNegative(halfCells, "halfCells");
  assertPositive(unitArea, "unitArea");
  const equivalentCells = fullCells + halfCells / 2;
  const area = equivalentCells * unitArea;
  return {
    equivalentCells,
    area,
    equation: `${fullCells} + ${halfCells} ÷ 2 = ${formatNumber(equivalentCells)}`
  };
}

function sumPerimeterSegments(segments) {
  if (!Array.isArray(segments) || segments.length === 0) {
    throw new Error("segments must contain at least one length");
  }
  segments.forEach((segment, index) => assertPositive(segment, `segments[${index}]`));
  const perimeter = segments.reduce((total, segment) => total + segment, 0);
  return {
    perimeter,
    equation: `${segments.join(" + ")} = ${formatNumber(perimeter)}`
  };
}

function maximizeAreaForPerimeter({ perimeter }) {
  assertPositive(perimeter, "perimeter");
  const halfPerimeter = perimeter / 2;
  const width = Math.floor(halfPerimeter / 2);
  const length = halfPerimeter - width;
  const area = length * width;
  return {
    length,
    width,
    area,
    equation: length === width ? `${perimeter} ÷ 4 = ${formatNumber(length)}` : `${perimeter} ÷ 2 = ${formatNumber(halfPerimeter)}`
  };
}

function calculateTrainBridge({ trainLength, bridgeLength, speed }) {
  assertPositive(trainLength, "trainLength");
  assertPositive(bridgeLength, "bridgeLength");
  assertPositive(speed, "speed");
  const totalDistance = trainLength + bridgeLength;
  const time = totalDistance / speed;
  return {
    totalDistance,
    time,
    equation: `(${trainLength} + ${bridgeLength}) ÷ ${speed} = ${formatNumber(time)}`
  };
}

function solveSumTimes({ sum, times }) {
  assertPositive(sum, "sum");
  assertPositive(times, "times");
  const totalParts = times + 1;
  const unit = sum / totalParts;
  return {
    small: unit,
    large: unit * times,
    unit,
    totalParts,
    equation: `${sum} ÷ (${times} + 1) = ${formatNumber(unit)}`
  };
}

function solveDifferenceTimes({ difference, times }) {
  assertPositive(difference, "difference");
  assertPositive(times, "times");
  if (times <= 1) {
    throw new Error("times must be greater than 1 for difference-times problems");
  }
  const differenceParts = times - 1;
  const unit = difference / differenceParts;
  return {
    small: unit,
    large: unit * times,
    unit,
    differenceParts,
    equation: `${difference} ÷ (${times} - 1) = ${formatNumber(unit)}`
  };
}

function solvePlantingLine({ length, gap, mode }) {
  assertPositive(length, "length");
  assertPositive(gap, "gap");
  const intervals = length / gap;
  const pointRules = {
    both: {
      points: intervals + 1,
      equation: `${length} ÷ ${gap} + 1 = ${formatNumber(intervals + 1)}`
    },
    neither: {
      points: intervals - 1,
      equation: `${length} ÷ ${gap} - 1 = ${formatNumber(intervals - 1)}`
    },
    one: {
      points: intervals,
      equation: `${length} ÷ ${gap} = ${formatNumber(intervals)}`
    },
    circle: {
      points: intervals,
      equation: `${length} ÷ ${gap} = ${formatNumber(intervals)}`
    }
  };
  const rule = pointRules[mode];
  if (!rule) {
    throw new Error(`Unknown planting mode: ${mode}`);
  }
  return {
    intervals,
    points: rule.points,
    equation: rule.equation
  };
}

function solveChickenRabbitFromAllChickens({ heads, legs }) {
  assertPositive(heads, "heads");
  assertPositive(legs, "legs");
  const assumedLegs = heads * 2;
  const legDifference = legs - assumedLegs;
  const rabbits = legDifference / 2;
  const chickens = heads - rabbits;
  return {
    assumedLegs,
    legDifference,
    rabbits,
    chickens,
    equation: `(${legs} - ${heads} × 2) ÷ 2 = ${formatNumber(rabbits)}`
  };
}

function solveChickenRabbitFromAllRabbits({ heads, legs }) {
  assertPositive(heads, "heads");
  assertPositive(legs, "legs");
  const assumedLegs = heads * 4;
  const legDifference = assumedLegs - legs;
  const chickens = legDifference / 2;
  const rabbits = heads - chickens;
  return {
    assumedLegs,
    legDifference,
    chickens,
    rabbits,
    equation: `(${heads} × 4 - ${legs}) ÷ 2 = ${formatNumber(chickens)}`
  };
}

function calculateSplitArea(rectangles) {
  return rectangles.reduce((total, rect) => {
    assertPositive(rect.length, "length");
    assertPositive(rect.width, "width");
    return total + rect.length * rect.width;
  }, 0);
}

function calculateComplementArea({ outerLength, outerWidth, missingLength, missingWidth }) {
  assertPositive(outerLength, "outerLength");
  assertPositive(outerWidth, "outerWidth");
  assertPositive(missingLength, "missingLength");
  assertPositive(missingWidth, "missingWidth");
  const outerArea = outerLength * outerWidth;
  const missingArea = missingLength * missingWidth;
  const area = outerArea - missingArea;
  return {
    outerArea,
    missingArea,
    area,
    equation: `${outerLength} × ${outerWidth} - ${missingLength} × ${missingWidth} = ${area}`
  };
}

function mirrorPoint({ x, axisX }) {
  assertFiniteNumber(x, "x");
  assertFiniteNumber(axisX, "axisX");
  const distance = Math.abs(axisX - x);
  const mirrored = axisX + (axisX - x);
  return {
    x: mirrored,
    distance,
    equation: `${axisX} + (${axisX} - ${x}) = ${mirrored}`
  };
}

function classifyTriangle({ sides, angles }) {
  if (!Array.isArray(sides) || sides.length !== 3) {
    throw new Error("sides must contain three lengths");
  }
  if (!Array.isArray(angles) || angles.length !== 3) {
    throw new Error("angles must contain three angles");
  }
  sides.forEach((side, index) => assertPositive(side, `sides[${index}]`));
  angles.forEach((angle, index) => assertPositive(angle, `angles[${index}]`));
  const uniqueSides = new Set(sides).size;
  const bySides = uniqueSides === 1 ? "等边" : uniqueSides === 2 ? "等腰" : "不等边";
  const byAngles = angles.includes(90) ? "直角" : angles.some((angle) => angle > 90) ? "钝角" : "锐角";
  return {
    bySides,
    byAngles
  };
}

function readBarValue({ bars, scale }) {
  assertPositive(bars, "bars");
  assertPositive(scale, "scale");
  const value = bars * scale;
  return {
    value,
    equation: `${bars}格 × ${scale} = ${value}`
  };
}

function assertPositive(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a positive number`);
  }
}

function assertNonNegative(value, name) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${name} must be a non-negative number`);
  }
}

function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a finite number`);
  }
}

function assertClock(hour, minute, name) {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) {
    throw new Error(`${name} hour must be between 0 and 23`);
  }
  if (!Number.isInteger(minute) || minute < 0 || minute > 59) {
    throw new Error(`${name} minute must be between 0 and 59`);
  }
}

function assertFlowSteps(steps) {
  if (!Array.isArray(steps) || steps.length === 0) {
    throw new Error("steps must contain at least one operation");
  }
}

function collectDistributions(remaining, boxesLeft, minPerBox, prefix, choices) {
  if (boxesLeft === 1) {
    if (remaining >= minPerBox) {
      choices.push(prefix.concat(remaining));
    }
    return;
  }
  const maxForCurrent = remaining - minPerBox * (boxesLeft - 1);
  for (let value = minPerBox; value <= maxForCurrent; value += 1) {
    collectDistributions(remaining - value, boxesLeft - 1, minPerBox, prefix.concat(value), choices);
  }
}

function applyBasicOperator(left, operator, right) {
  if (operator === "+") return left + right;
  if (operator === "-") return left - right;
  if (operator === "×" || operator === "*") return left * right;
  if (operator === "÷" || operator === "/") return left / right;
  throw new Error(`Unknown operator: ${operator}`);
}

function applyNamedOperator(left, operator, right) {
  if (operator === "add") return left + right;
  if (operator === "subtract") return left - right;
  if (operator === "multiply") return left * right;
  if (operator === "divide") return left / right;
  throw new Error(`Unknown outside operator: ${operator}`);
}

function inverseOperator(operator) {
  if (operator === "add") return "subtract";
  if (operator === "subtract") return "add";
  if (operator === "multiply") return "divide";
  if (operator === "divide") return "multiply";
  throw new Error(`Unknown operator: ${operator}`);
}

function operatorSymbol(operator) {
  return {
    add: "+",
    subtract: "-",
    multiply: "×",
    divide: "÷"
  }[operator] || operator;
}

function expandedParts(number) {
  return decomposePlaceValue(number)
    .filter((part) => part.value > 0)
    .map((part) => part.value);
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function formatClock(hour, minute) {
  return `${hour}:${String(minute).padStart(2, "0")}`;
}

export {
  summarizeBlueprint,
  getDemoModules,
  getInteractiveModuleIds,
  getArchetypesByKnowledge,
  buildNavigatorModel,
  buildArchetypeDetail,
  buildPracticePanel,
  buildStudyRoute,
  buildPrintableCoachSheet,
  getLessonChecklist,
  calculateRouteProgress,
  getChickenRabbitLegLiftFrame,
  getTrainBridgeFrame,
  getModuleImageFrame,
  getModuleImageFrames,
  calculateSequentialOperations,
  evaluateParenthesesExpression,
  multiplyByOneDigitParts,
  multiplyByAreaParts,
  divideWithRemainder,
  trialQuotient,
  verifyDivision,
  estimateNearest,
  snapToIntegerMultiple,
  decomposePlaceValue,
  buildPlaceValueToolModel,
  calculateSpeedDistanceTime,
  calculatePriceQuantityTotal,
  solveCyclePosition,
  countCombinations,
  solveUnitRate,
  runFlow,
  reverseFlow,
  solveBorrowReturn,
  buildBorrowReturnModel,
  buildBorrowReturnSceneState,
  getMonthInfo,
  describeFraction,
  countAppleDistributions,
  solveProfitLoss,
  buildProfitLossAdjustmentModel,
  calculateElapsedMinutes,
  calculateWholeFromUnitPart,
  compareFractions,
  calculateFractionQuantity,
  calculateRectanglePerimeter,
  convertLength,
  calculateGridArea,
  calculateRectangleArea,
  estimateGridArea,
  sumPerimeterSegments,
  maximizeAreaForPerimeter,
  calculateTrainBridge,
  solveSumTimes,
  solveDifferenceTimes,
  solvePlantingLine,
  solveChickenRabbitFromAllChickens,
  solveChickenRabbitFromAllRabbits,
  calculateSplitArea,
  calculateComplementArea,
  mirrorPoint,
  classifyTriangle,
  readBarValue
};
