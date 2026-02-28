// 模拟基金数据
const fundsData = [
    {
        id: 1,
        name: "华夏成长混合",
        code: "000001",
        type: "mixed",
        typeName: "混合型",
        risk: "medium",
        nav: 2.456,
        returns: { "1y": 15.23, "3y": 42.56, "5y": 68.92 },
        manager: "王亚伟",
        company: "华夏基金"
    },
    {
        id: 2,
        name: "易方达蓝筹精选",
        code: "005827",
        type: "equity",
        typeName: "股票型",
        risk: "high",
        nav: 3.128,
        returns: { "1y": 22.45, "3y": 58.32, "5y": 85.67 },
        manager: "张坤",
        company: "易方达基金"
    },
    {
        id: 3,
        name: "天弘余额宝",
        code: "000198",
        type: "money",
        typeName: "货币型",
        risk: "low",
        nav: 1.0,
        returns: { "1y": 2.15, "3y": 6.8, "5y": 12.5 },
        manager: "王登峰",
        company: "天弘基金"
    },
    {
        id: 4,
        name: "招商产业债券A",
        code: "217022",
        type: "bond",
        typeName: "债券型",
        risk: "low",
        nav: 1.523,
        returns: { "1y": 5.67, "3y": 18.45, "5y": 32.18 },
        manager: "马龙",
        company: "招商基金"
    },
    {
        id: 5,
        name: "沪深300ETF",
        code: "510300",
        type: "index",
        typeName: "指数型",
        risk: "medium",
        nav: 4.215,
        returns: { "1y": 8.92, "3y": 25.67, "5y": 45.23 },
        manager: "柳军",
        company: "华泰柏瑞基金"
    },
    {
        id: 6,
        name: "富国天惠成长",
        code: "161005",
        type: "mixed",
        typeName: "混合型",
        risk: "medium",
        nav: 2.856,
        returns: { "1y": 12.34, "3y": 35.67, "5y": 55.89 },
        manager: "朱少醒",
        company: "富国基金"
    },
    {
        id: 7,
        name: "中欧医疗健康A",
        code: "003095",
        type: "equity",
        typeName: "股票型",
        risk: "high",
        nav: 2.234,
        returns: { "1y": -5.23, "3y": 28.45, "5y": 72.34 },
        manager: "葛兰",
        company: "中欧基金"
    },
    {
        id: 8,
        name: "鹏华丰禄债券",
        code: "003547",
        type: "bond",
        typeName: "债券型",
        risk: "low",
        nav: 1.345,
        returns: { "1y": 4.56, "3y": 15.23, "5y": 28.67 },
        manager: "刘涛",
        company: "鹏华基金"
    }
];

// 风险测评问题
const riskQuestions = [
    {
        id: 1,
        question: "您的投资经验是？",
        options: [
            { value: 1, text: "没有经验，刚接触投资" },
            { value: 2, text: "1-3年投资经验" },
            { value: 3, text: "3-5年投资经验" },
            { value: 4, text: "5年以上投资经验" }
        ]
    },
    {
        id: 2,
        question: "您能接受的投资最大亏损幅度是？",
        options: [
            { value: 1, text: "不能承受亏损" },
            { value: 2, text: "10%以内" },
            { value: 3, text: "20%以内" },
            { value: 4, text: "30%以上" }
        ]
    },
    {
        id: 3,
        question: "您的投资目标是？",
        options: [
            { value: 1, text: "保本为主，收益其次" },
            { value: 2, text: "稳健增值" },
            { value: 3, text: "追求较高收益" },
            { value: 4, text: "追求高收益，可承担高风险" }
        ]
    },
    {
        id: 4,
        question: "您的投资期限是？",
        options: [
            { value: 1, text: "1年以内" },
            { value: 2, text: "1-3年" },
            { value: 3, text: "3-5年" },
            { value: 4, text: "5年以上" }
        ]
    },
    {
        id: 5,
        question: "如果您投资的基金下跌了20%，您会？",
        options: [
            { value: 1, text: "立即卖出止损" },
            { value: 2, text: "观望一段时间" },
            { value: 3, text: "适当加仓" },
            { value: 4, text: "大幅加仓抄底" }
        ]
    }
];

// 资产配置建议
const portfolioAllocations = {
    conservative: {
        name: "保守型",
        desc: "您偏好稳健的投资方式，以保本为主。",
        allocation: [
            { name: "货币基金", percent: 40, color: "#10b981" },
            { name: "债券基金", percent: 35, color: "#3b82f6" },
            { name: "混合基金", percent: 20, color: "#f59e0b" },
            { name: "股票基金", percent: 5, color: "#ef4444" }
        ]
    },
    moderate: {
        name: "稳健型",
        desc: "您希望在控制风险的前提下获得稳健收益。",
        allocation: [
            { name: "货币基金", percent: 20, color: "#10b981" },
            { name: "债券基金", percent: 30, color: "#3b82f6" },
            { name: "混合基金", percent: 30, color: "#f59e0b" },
            { name: "股票基金", percent: 20, color: "#ef4444" }
        ]
    },
    balanced: {
        name: "平衡型",
        desc: "您愿意承担一定风险以追求更好的收益。",
        allocation: [
            { name: "货币基金", percent: 10, color: "#10b981" },
            { name: "债券基金", percent: 20, color: "#3b82f6" },
            { name: "混合基金", percent: 35, color: "#f59e0b" },
            { name: "股票基金", percent: 35, color: "#ef4444" }
        ]
    },
    aggressive: {
        name: "进取型",
        desc: "您追求高收益，可以承受较大的市场波动。",
        allocation: [
            { name: "货币基金", percent: 5, color: "#10b981" },
            { name: "债券基金", percent: 15, color: "#3b82f6" },
            { name: "混合基金", percent: 30, color: "#f59e0b" },
            { name: "股票基金", percent: 50, color: "#ef4444" }
        ]
    }
};

// AI 助手预设回复
const aiResponses = {
    "hello": "您好！我是您的AI基金投顾助手，请问有什么可以帮助您的？",
    "你好": "您好！我是您的AI基金投顾助手，请问有什么可以帮助您的？",
    "推荐": "根据您的风险测评结果，我可以为您推荐合适的基金组合。您可以先完成风险测评，或者直接告诉我您的投资偏好。",
    "基金": "我们有多种类型的基金供您选择：股票型、债券型、混合型、指数型和货币型。您可以在基金筛选器中查看详细信息。",
    "风险": "投资风险与收益成正比。一般来说：\n- 货币型基金风险最低\n- 债券型基金风险较低\n- 混合型基金风险中等\n- 股票型基金风险较高",
    "收益": "基金收益受市场影响较大。历史数据显示，长期投资通常能获得更好的回报。建议根据自身情况制定投资计划。",
    "定投": "基金定投是很好的投资方式，可以平摊成本、降低风险。建议每月固定金额投资，长期坚持。",
    "默认": "感谢您的提问。我是AI基金投顾助手，可以帮您：\n1. 进行风险测评\n2. 推荐基金组合\n3. 解答投资相关问题\n请问您具体想了解什么？"
};
