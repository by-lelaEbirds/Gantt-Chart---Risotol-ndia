// --- 1. OS DADOS (Extraídos do seu texto) ---

const projectData = {
    // Configurações do Gráfico
    // Datas de início e fim de TODO o projeto para calcular a escala
    projectStart: '2026-01-01',
    projectEnd: '2026-06-30',
    
    // Definição das Propostas
    proposals: [
        {
            id: "P1",
            title: "Proposta 1: Fluxo de Trabalho Digital com Análise de IA",
            colorClass: "bar-p1",
            labelClass: "label-p1",
            borderColor: "var(--color-p1)",
            summary: {
                duration: "~17 semanas (Go-Live)",
                cost: "R$ 23.120 - R$ 91.800+"
            },
            tasks: [
                { name: "Fase 1: Configuração Plataforma Workflow & Análise", start: "2026-01-06", end: "2026-01-24" },
                { name: "Fase 2: Desenvolvimento da Integração", start: "2026-01-27", end: "2026-04-04" },
                { name: "Fase 3: Configuração API IA e Infraestrutura", start: "2026-04-07", end: "2026-04-18" },
                { name: "Fase 4: Testes Integrados e Implantação", start: "2026-04-21", end: "2026-05-02" },
                { name: "Fase 5: Operação e Manutenção (Contínua)", start: "2026-05-05", end: null }
            ],
            costs: [
                { item: "Software de Workflow", value: "R$ 5.000 - R$ 30.000 / ano" },
                { item: "Desenvolvimento (108-216h c/ Conting.)", value: "R$ 10.800 - R$ 32.400" },
                { item: "API de IA Premium", value: "R$ 960 - R$ 9.600+ / ano" },
                { item: "Infraestrutura", value: "R$ 360 - R$ 1.800 / ano" },
                { item: "Manutenção (5-10h/mês)", value: "R$ 6.000 - R$ 18.000 / ano" }
            ]
        },
        {
            id: "P2",
            title: "Proposta 2: Automação de Tarefas com Robô (RPA)",
            colorClass: "bar-p2",
            labelClass: "label-p2",
            borderColor: "var(--color-p2)",
            summary: {
                duration: "~14 semanas (Go-Live)",
                cost: "R$ 26.400 - R$ 85.800+ (Open Source)"
            },
            tasks: [
                { name: "Fase 1: Seleção/Configuração Plataforma RPA & Análise", start: "2026-01-06", end: "2026-01-31" },
                { name: "Fase 2: Desenvolvimento do Robô", start: "2026-02-03", end: "2026-03-28" },
                { name: "Fase 3: Configuração Infraestrutura (VM)", start: "2026-03-03", end: "2026-03-07" },
                { name: "Fase 4: Testes e Implantação", start: "2026-03-31", end: "2026-04-11" },
                { name: "Fase 5: Operação e Manutenção (Contínua)", start: "2026-04-14", end: null }
            ],
            costs: [
                { item: "Software RPA (Licença)", value: "R$ 0 (Open Source) a R$ 60.000+" },
                { item: "Desenvolvimento (72-180h c/ Conting.)", value: "R$ 7.200 - R$ 27.000" },
                { item: "Infraestrutura (VM)", value: "R$ 1.200 - R$ 4.800 / ano" },
                { item: "Manutenção (ALTA, 15-30h+/mês)", value: "R$ 18.000 - R$ 54.000+ / ano" }
            ]
        },
        {
            id: "P3",
            title: "Proposta 3: Plataforma Inteligente de Consultas (MVP)",
            colorClass: "bar-p3",
            labelClass: "label-p3",
            borderColor: "var(--color-p3)",
            summary: {
                duration: "~23 semanas (Início Piloto)",
                cost: "R$ 48.120 - R$ 156.000+"
            },
            tasks: [
                { name: "Fase 1: Design e Planejamento", start: "2026-01-06", end: "2026-01-31" },
                { name: "Fase 2: Desenvolvimento Backend (Python/IA)", start: "2026-02-03", end: "2026-04-25" },
                { name: "Fase 3: Desenvolvimento Frontend (Node/Chat UI)", start: "2026-02-10", end: "2026-04-18" },
                { name: "Fase 4: Integração, Infraestrutura e Testes Finais", start: "2026-04-28", end: "2026-05-23" },
                { name: "Fase 5: Implantação Piloto e Ajustes", start: "2026-05-26", end: "2026-06-13" },
                { name: "Fase 6: Operação Piloto e Manutenção (Contínua)", start: "2026-06-16", end: null }
            ],
            costs: [
                { item: "Desenvolvimento (MVP 288-576h c/ Conting.)", value: "R$ 28.800 - R$ 86.400" },
                { item: "API de IA (Gemini Flash)", value: "R$ 360 - R$ 6.000+ / ano" },
                { item: "Infraestrutura (Nuvem PaaS)", value: "R$ 960 - R$ 9.600+ / ano" },
                { item: "Manutenção (15-30h/mês)", value: "R$ 18.000 - R$ 54.000 / ano" }
            ]
        }
    ]
};


// --- 2. FUNÇÕES HELPER (Para datas) ---

/** Converte string YYYY-MM-DD para um objeto Date (UTC) */
function parseDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr + 'T00:00:00');
}

/** Calcula a diferença de dias entre duas datas */
function diffDays(dateStart, dateEnd) {
    const diffTime = dateEnd - dateStart;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/** Formata data para DD/MM */
function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' });
}

// --- 3. FUNÇÕES DE RENDERIZAÇÃO ---

/** Função principal que roda quando o HTML está pronto */
document.addEventListener('DOMContentLoaded', () => {
    renderSummaryCards(projectData.proposals);
    renderGanttChart(projectData);
    renderCostTables(projectData.proposals);
});

/** Renderiza os cartões de resumo de custo */
function renderSummaryCards(proposals) {
    const container = document.getElementById('summary-container');
    if (!container) return;
    
    let html = '';
    proposals.forEach(prop => {
        html += `
            <article class="summary-card" style="border-color: ${prop.borderColor};">
                <h3>${prop.title}</h3>
                <p><strong>Duração Estimada:</strong> ${prop.summary.duration}</p>
                <p class="cost-value">${prop.summary.cost}</p>
            </article>
        `;
    });
    container.innerHTML = html;
}

/** Renderiza as tabelas de detalhamento de custo */
function renderCostTables(proposals) {
    const container = document.getElementById('cost-container');
    if (!container) return;

    let html = '';
    proposals.forEach(prop => {
        const costRows = prop.costs.map(cost => `
            <tr>
                <td>${cost.item}</td>
                <td>${cost.value}</td>
            </tr>
        `).join('');

        // Pega o custo total do resumo
        const totalCost = prop.summary.cost;

        html += `
            <div class="cost-table-wrapper">
                <h3 style="border-color: ${prop.borderColor};">${prop.title}</h3>
                <table class="cost-table">
                    <thead>
                        <tr>
                            <th>Componente de Custo</th>
                            <th>Estimativa (Ano 1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${costRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total Estimado (Ano 1)</td>
                            <td>${totalCost}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    });
    container.innerHTML = html;
}

/** Renderiza o Gráfico de Gantt completo */
function renderGanttChart(data) {
    const container = document.getElementById('gantt-container');
    if (!container) return;

    const projStart = parseDate(data.projectStart);
    const projEnd = parseDate(data.projectEnd);
    const totalDays = diffDays(projStart, projEnd) + 1; // +1 para ser inclusivo

    // --- Cria o Header dos Meses ---
    const months = [];
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let currentDate = new Date(projStart);
    
    while (currentDate <= projEnd) {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const startOfMonth = new Date(year, month, 1);
        let endOfMonth = new Date(year, month + 1, 0); // último dia do mês

        // Clampa as datas para o início/fim do projeto
        const monthStart = (startOfMonth < projStart) ? projStart : startOfMonth;
        const monthEnd = (endOfMonth > projEnd) ? projEnd : endOfMonth;
        
        const daysInMonth = diffDays(monthStart, monthEnd) + 1;
        
        months.push({
            name: `${monthNames[month]} ${year}`,
            days: daysInMonth
        });
        
        currentDate = new Date(year, month + 1, 1);
    }
    
    // Define a largura fracionária de cada mês no grid
    const monthColumns = months.map(m => `${m.days}fr`).join(' ');
    const monthHeaderHtml = months.map(m => `<div class="gantt-month">${m.name}</div>`).join('');

    // --- Cria as Linhas (Labels e Barras) ---
    let labelsHtml = '';
    let timelineHtml = '';
    let totalRows = 0;

    data.proposals.forEach(prop => {
        totalRows++;
        // Adiciona a linha de título da proposta
        labelsHtml += `<div class="gantt-label gantt-label-group ${prop.labelClass}" style="grid-row: ${totalRows}">${prop.title}</div>`;
        
        prop.tasks.forEach(task => {
            if (task.start && task.end) { // Só desenha tarefas com início e fim
                totalRows++;
                const taskStart = parseDate(task.start);
                const taskEnd = parseDate(task.end);
                
                // Calcula o offset e a duração em dias
                const startDay = diffDays(projStart, taskStart) + 1;
                const durationDays = diffDays(taskStart, taskEnd) + 1;

                // Adiciona a label da tarefa
                labelsHtml += `<div class="gantt-label" style="grid-row: ${totalRows}">${task.name}</div>`;
                
                // Adiciona a barra da tarefa
                timelineHtml += `
                    <div classclass="gantt-bar ${prop.colorClass}" 
                         style="grid-row: ${totalRows}; grid-column: ${startDay} / span ${durationDays};">
                         
                         <span class="bar-title">${task.name}</span>
                         <span class="bar-dates">${formatDate(taskStart)} - ${formatDate(taskEnd)}</span>
                    </div>
                `;
            } else if (task.start) {
                // Tarefas contínuas (ex: Manutenção)
                totalRows++;
                 labelsHtml += `<div class="gantt-label" style="grid-row: ${totalRows}">${task.name}</div>`;
                 // Deixa a linha da timeline vazia
            }
        });
    });

    // --- Monta o HTML Final do Gráfico ---
    container.innerHTML = `
        <header class="gantt-header">
            <div class="gantt-header-label">Fases do Projeto</div>
            <div class="gantt-header-months" style="grid-template-columns: ${monthColumns};">
                ${monthHeaderHtml}
            </div>
        </header>

        <aside class="gantt-labels" style="grid-template-rows: repeat(${totalRows}, 60px);">
            ${labelsHtml}
        </aside>

        <div class="gantt-timeline" style="grid-template-columns: repeat(${totalDays}, 1fr); grid-template-rows: repeat(${totalRows}, 60px);">
            ${timelineHtml}
        </div>
    `;
}
