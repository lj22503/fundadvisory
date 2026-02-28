// AI基金投顾 Demo 应用逻辑

// 模拟基金数据
const fundData = [
    { name: "易方达消费行业", code: "110022", return: 18.5, volatility: 15.2, sharpe: 1.15, maxDrawdown: -12.3, type: "equity" },
    { name: "华夏沪深300ETF", code: "510300", return: 12.3, volatility: 18.5, sharpe: 0.65, maxDrawdown: -18.5, type: "index" },
    { name: "招商中证白酒", code: "161725", return: 22.1, volatility: 22.3, sharpe: 0.98, maxDrawdown: -25.6, type: "sector" },
    { name: "广发医疗保健", code: "004851", return: 8.7, volatility: 16.8, sharpe: 0.52, maxDrawdown: -21.4, type: "sector" },
    { name: "富国天惠成长", code: "161005", return: 15.2, volatility: 14.6, sharpe: 1.03, maxDrawdown: -15.2, type: "mixed" },
    { name: "南方现金增利", code: "202301", return: 2.8, volatility: 0.5, sharpe: 0, maxDrawdown: -0.1, type: "bond" },
    { name: "嘉实沪深300指数", code: "160706", return: 11.8, volatility: 18.2, sharpe: 0.62, maxDrawdown: -17.8, type: "index" },
    { name: "易方达中小盘", code: "110011", return: 16.3, volatility: 16.8, sharpe: 0.95, maxDrawdown: -14.5, type: "equity" }
];

// 风险测评题目
const riskQuestions = [
    {
        question: "您的年龄是？",
        options: ["25岁以下", "26-35岁", "36-45岁", "46-60岁", "60岁以上"],
        scores: [5, 4, 3, 2, 1]
    },
    {
        question: "您预计投资期限是？",
        options: ["1年以内", "1-3年", "3-5年", "5-10年", "10年以上"],
        scores: [1, 2, 3, 4, 5]
    },
    {
        question: "您能承受的最大亏损是？",
        options: ["不能亏损", "5%以内", "10%以内", "20%以内", "30%以上"],
        scores: [1, 2, 3, 4, 5]
    },
    {
        question: "当投资亏损20%时，您会？",
        options: ["全部卖出止损", "卖出大部分", "保持不变", "适当补仓", "加大投入"],
        scores: [1, 2, 3, 4, 5]
    }
];

// 测评状态
let currentQ = 0;
let totalScore = 0;
let chartInstance = null;

// 页面切换
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    if (id === 'portfolio') {
        setTimeout(initPortfolioChart, 100);
    }
}

// 渲染基金列表
function renderFunds(data = fundData) {
    const grid = document.getElementById('fundGrid');
    if (!grid) return;
    
    grid.innerHTML = data.map(fund => `
        <div class="fund-card">
            <div class="fund-header">
                <div>
                    <div class="fund-name">${fund.name}</div>
                    <div class="fund-code">${fund.code}</div>
                </div>
                <span class="fund-tag tag-${fund.type}">${getTypeLabel(fund.type)}</span>
            </div>
            <div class="fund-return">
                <div class="return-item">
                    <div class="return-value positive">${fund.return}%</div>
                    <div class="return-label">年化收益</div>
                </div>
                <div class="return-item">
                    <div class="return-value">${fund.volatility}%</div>
                    <div class="return-label">波动率</div>
                </div>
                <div class="return-item">
                    <div class="return-value">${fund.sharpe}</div>
                    <div class="return-label">夏普比率</div>
                </div>
            </div>
        </div>
    `).join('');
}

function getTypeLabel(type) {
    const map = { equity: '股票型', bond: '债券型', mixed: '混合型', index: '指数型', sector: '行业型' };
    return map[type] || type;
}

// 筛选基金
function filterFunds() {
    const type = document.getElementById('fundType').value;
    const perf = document.getElementById('performance').value;
    
    let filtered = [...fundData];
    
    if (type) {
        filtered = filtered.filter(f => f.type === type);
    }
    
    if (perf) {
        filtered.sort((a, b) => perf === 'return_desc' ? b.return - a.return : 
                        perf === 'return_asc' ? a.return - b.return :
                        perf === 'sharpe' ? b.sharpe - a.sharpe : b.return - a.return);
    }
    
    renderFunds(filtered);
}

// 风险测评
function startRiskQuiz() {
    currentQ = 0;
    totalScore = 0;
    document.getElementById('quizStart').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    renderQuestion();
}

function renderQuestion() {
    const q = riskQuestions[currentQ];
    document.getElementById('questionText').textContent = `Q${currentQ + 1}/${riskQuestions.length}: ${q.question}`;
    document.getElementById('progressBar').style.width = `${((currentQ + 1) / riskQuestions.length) * 100}%`;
    
    const optionsHtml = q.options.map((opt, idx) => `
        <button class="option-btn" onclick="selectOption(${idx})">${opt}</button>
    `).join('');
    document.getElementById('optionsContainer').innerHTML = optionsHtml;
}

function selectOption(idx) {
    totalScore += riskQuestions[currentQ].scores[idx];
    currentQ++;
    
    if (currentQ < riskQuestions.length) {
        renderQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    let type, desc, allocation;
    if (totalScore <= 8) {
        type = '保守型';
        desc = '您注重本金安全，建议以债券和货币基金为主。';
        allocation = [20, 60, 20];
    } else if (totalScore <= 12) {
        type = '稳健型';
        desc = '您在追求收益的同时注重风险控制，建议均衡配置。';
        allocation = [40, 45, 15];
    } else if (totalScore <= 16) {
        type = '成长型';
        desc = '您愿意承担一定风险换取更高收益，可增加权益类配置。';
        allocation = [60, 30, 10];
    } else {
        type = '进取型';
        desc = '您追求高收益并能承受较大波动，适合偏股型组合。';
        allocation = [80, 15, 5];
    }
    
    document.getElementById('riskType').textContent = type;
    document.getElementById('riskDesc').textContent = desc;
    document.getElementById('stockRatio').textContent = allocation[0] + '%';
    document.getElementById('bondRatio').textContent = allocation[1] + '%';
    document.getElementById('cashRatio').textContent = allocation[2] + '%';
}

// 资产配置计算器
function initPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return;
    
    const age = parseInt(document.getElementById('ageSlider')?.value || 35);
    const risk = parseInt(document.getElementById('riskSlider')?.value || 15);
    
    let stock = Math.max(20, 100 - age);
    if (risk < 10) stock = Math.min(stock, 30);
    else if (risk > 25) stock = Math.max(stock, 70);
    
    const bond = Math.round((100 - stock) * 0.7);
    const cash = 100 - stock - bond;
    
    if (chartInstance) chartInstance.destroy();
    
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['股票基金', '债券基金', '货币基金'],
            datasets: [{
                data: [stock, bond, cash],
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    // 更新建议文本
    const expectedReturn = (stock * 0.08 + bond * 0.04 + cash * 0.02).toFixed(1);
    const expectedRisk = (stock * 0.15 + bond * 0.05).toFixed(1);
    
    const suggestion = document.getElementById('allocationSuggestion');
    if (suggestion) {
        suggestion.innerHTML = `
            <h4>配置建议</h4>
            <p>基于年龄${age}岁和风险承受度${risk}%：</p>
            <ul>
                <li><strong>股票基金 ${stock}%</strong>：追求长期增值</li>
                <li><strong>债券基金 ${bond}%</strong>：稳定收益、降低波动</li>
                <li><strong>货币基金 ${cash}%</strong>：流动性储备</li>
            </ul>
            <p>预期年化收益：<strong>${expectedReturn}%</strong> | 预期波动率：<strong>${expectedRisk}%</strong></p>
        `;
    }
}

// AI 聊天
function sendChat() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const text = input.value.trim();
    if (!text) return;
    
    // 用户消息
    messages.innerHTML += `<div class="message user"><div class="message-content">${text}</div></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    
    // AI 回复
    setTimeout(() => {
        const reply = generateAIReply(text);
        messages.innerHTML += `<div class="message ai"><div class="message-content">${reply}</div></div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}

function generateAIReply(text) {
    const lower = text.toLowerCase();
    if (lower.includes('风险') || lower.includes('亏损')) {
        return '根据您的风险测评，建议将股票基金配置控制在40%以内，同时搭配债券基金平滑波动。您可以在"风险测评"模块进行完整测试。';
    } else if (lower.includes('推荐') || lower.includes('买什么')) {
        return '根据当前市场情况，建议您关注：\n1. 易方达消费行业（110022）- 长期业绩优秀\n2. 华夏沪深300ETF（510300）- 宽基指数，分散风险\n您可以在"基金筛选"模块查看更多详情。';
    } else if (lower.includes('收益') || lower.includes('赚钱')) {
        return '历史数据显示，股债平衡配置组合过去5年年化收益约8-12%，最大回撤控制在15%以内。但过往业绩不代表未来表现，投资需谨慎。';
    } else {
        return '我是您的AI基金顾问，可以帮您：\n• 评估投资风险偏好\n• 推荐适合的基金产品\n• 制定资产配置方案\n请告诉我您想了解什么？';
    }
}

// 监听回车发送
function handleChatKey(e) {
    if (e.key === 'Enter') sendChat();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderFunds();
    
    // 滑块事件
    const ageSlider = document.getElementById('ageSlider');
    const riskSlider = document.getElementById('riskSlider');
    
    if (ageSlider) {
        ageSlider.addEventListener('input', () => {
            document.getElementById('ageValue').textContent = ageSlider.value;
            initPortfolioChart();
        });
    }
    
    if (riskSlider) {
        riskSlider.addEventListener('input', () => {
            document.getElementById('riskValue').textContent = riskSlider.value;
            initPortfolioChart();
        });
    }
});
