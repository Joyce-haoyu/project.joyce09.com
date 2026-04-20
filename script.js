const CONFIG = {
    user: 'joyce-haoyu',
    repo: 'project.joyce09.com' // <--- 填入你的 GitHub 仓库名称，例如 projectjoyce09.com
};

// 为不同的项目随机分配一个有科技感的 Emoji，避免全是相同的图标
const ICONS = ['🎮', '🚀', '🌌', '⚡', '🧩', '🕹️', '✨', '🔥'];

async function loadProjects() {
    const grid = document.getElementById('project-grid');
    
    try {
        // 请求 GitHub API 获取 projects 文件夹的内容
        const res = await fetch(`https://api.github.com/repos/${CONFIG.user}/${CONFIG.repo}/contents/projects`);
        const data = await res.json();
        
        grid.innerHTML = ''; // 清除加载提示
        
        let count = 0;
        
        data.forEach((item, index) => {
            // 核心逻辑：只抓取“文件夹 (dir)”，忽略其他散落的文件
            if (item.type === 'dir') {
                count++;
                
                // 优化名称显示：把文件夹名 "plane-wars" 变成 "Plane Wars"
                const formatName = item.name.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                // 循环分配图标
                const icon = ICONS[index % ICONS.length];

                // 由于是 GitHub Pages，点击文件夹路径默认会读取里面的 index.html
                // target="_blank" 会在新标签页打开游戏，这样玩家关闭游戏后，作品集网页还在
                grid.innerHTML += `
                    <a href="projects/${item.name}/" class="project-card" target="_blank">
                        <div class="card-icon">${icon}</div>
                        <div class="card-title">${formatName}</div>
                        <div class="card-action">点击运行 ▶</div>
                    </a>
                `;
            }
        });
        
        if (count === 0) {
            grid.innerHTML = '<p class="loading">目前还没有上传作品哦，快去 projects 文件夹里添加吧！</p>';
        }

    } catch (err) {
        console.error(err);
        grid.innerHTML = '<p class="loading" style="color: #ff6b6b;">读取失败，请检查仓库名是否正确，或网络是否连通。</p>';
    }
}

// 页面加载完成后执行
window.onload = loadProjects;

