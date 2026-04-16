/* ═══════════════════════════════════════
   charts.js — Configuración de Chart.js
   ═══════════════════════════════════════ */

Chart.defaults.color       = '#8a9dc0';
Chart.defaults.borderColor = 'rgba(255,255,255,.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

const anim = { duration: 1400, easing: 'easeInOutQuart' };
const tip  = {
  backgroundColor: 'rgba(4,7,18,.97)',
  borderWidth: 1, padding: 10, cornerRadius: 8,
  titleFont: { size: 12 }, bodyFont: { size: 12 }
};

/* ── PIB ─────────────────────────────── */
new Chart('cPib', {
  type: 'bar',
  data: {
    labels: ['2019','2020','2021','2022','2023','2024','2025 ✦'],
    datasets: [{
      label: 'Crecimiento PIB (%)',
      data: [3.2, -7.0, 10.8, 7.5, 0.6, 1.7, 2.6],
      backgroundColor: ctx => {
        if (ctx.dataIndex === 6) return 'rgba(252,209,22,.5)';
        return ctx.dataset.data[ctx.dataIndex] < 0
          ? 'rgba(206,17,38,.65)' : 'rgba(79,158,255,.65)';
      },
      borderColor: ctx => {
        if (ctx.dataIndex === 6) return '#FCD116';
        return ctx.dataset.data[ctx.dataIndex] < 0 ? '#CE1126' : '#4f9eff';
      },
      borderWidth: 2, borderRadius: 8, borderSkipped: false
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false, animation: anim,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tip, borderColor: 'rgba(79,158,255,.4)',
        callbacks: { label: c => ` ${c.parsed.y > 0 ? '+' : ''}${c.parsed.y}%` }
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false } }
    }
  }
});

/* ── INFLACIÓN ───────────────────────── */
new Chart('cInf', {
  type: 'line',
  data: {
    labels: ['2019','2020','2021','2022','2023','2024','2025 ✦'],
    datasets: [
      {
        label: 'Inflación IPC (%)',
        data: [3.8, 1.61, 5.62, 13.12, 9.28, 5.20, 5.10],
        borderColor: '#ff6b35', backgroundColor: 'rgba(255,107,53,.1)',
        borderWidth: 3,
        pointBackgroundColor: ctx => ctx.dataIndex === 6 ? '#FCD116' : '#ff6b35',
        pointRadius: 5, pointHoverRadius: 8, tension: .4, fill: true
      },
      {
        label: 'Meta Banrep (3%)',
        data: [3,3,3,3,3,3,3],
        borderColor: 'rgba(252,209,22,.5)', borderWidth: 2,
        borderDash: [7,4], pointRadius: 0, fill: false
      }
    ]
  },
  options: {
    responsive: true, maintainAspectRatio: false, animation: anim,
    plugins: {
      legend: { labels: { boxWidth: 12, font: { size: 11 } } },
      tooltip: {
        ...tip, borderColor: 'rgba(255,107,53,.4)',
        callbacks: { label: c => ` ${c.dataset.label}: ${c.parsed.y}%` }
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false } }
    }
  }
});

/* ── CATEGORÍAS INFLACIÓN ────────────── */
new Chart('cCat', {
  type: 'bar',
  data: {
    labels: ['Alimentos','Salud','Educación','Vivienda','Transporte','Ropa'],
    datasets: [{
      label: 'Inflación %',
      data: [5.8, 7.2, 7.0, 4.8, 4.2, 3.5],
      backgroundColor: [
        'rgba(255,107,53,.82)','rgba(206,17,38,.82)','rgba(0,212,170,.82)',
        'rgba(79,158,255,.82)','rgba(252,209,22,.82)','rgba(139,92,246,.82)'
      ],
      borderRadius: 6, borderSkipped: false
    }]
  },
  options: {
    indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: anim,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => v + '%' } },
      y: { grid: { display: false } }
    }
  }
});

/* ── DESEMPLEO ───────────────────────── */
new Chart('cDesemp', {
  type: 'line',
  data: {
    labels: ['2019','2020','2021','2022','2023','2024','2025 ✦'],
    datasets: [{
      label: 'Tasa de desempleo (%)',
      data: [10.5, 15.9, 13.2, 11.3, 10.2, 10.6, 11.2],
      borderColor: '#00d4aa', backgroundColor: 'rgba(0,212,170,.1)',
      borderWidth: 3,
      pointBackgroundColor: ctx => ctx.dataIndex === 6 ? '#FCD116' : '#00d4aa',
      pointRadius: 5, pointHoverRadius: 8, tension: .4, fill: true
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false, animation: anim,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tip, borderColor: 'rgba(0,212,170,.4)',
        callbacks: { label: c => ` Desempleo: ${c.parsed.y}%` }
      }
    },
    scales: {
      y: { min: 8, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false } }
    }
  }
});

/* ── TASA BANREP ─────────────────────── */
new Chart('cTasa', {
  type: 'line',
  data: {
    labels: ["2019","2020","2021","Mar'22","Dic'22","Sep'23","Dic'23","Jun'24","Dic'24","Mar'25 ✦","Abr'25 ✦"],
    datasets: [{
      label: 'Tasa Banrep (%)',
      data: [4.25, 1.75, 1.75, 4.0, 12.0, 13.25, 13.0, 11.25, 9.25, 9.0, 8.75],
      borderColor: '#FCD116', backgroundColor: 'rgba(252,209,22,.1)',
      borderWidth: 3,
      pointBackgroundColor: ctx => ctx.dataIndex >= 9 ? '#ffffff' : '#FCD116',
      pointRadius: 5, pointHoverRadius: 8, tension: .4, fill: true
    }]
  },
  options: {
    responsive: true, maintainAspectRatio: false, animation: anim,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tip, borderColor: 'rgba(252,209,22,.4)',
        callbacks: { label: c => ` Tasa: ${c.parsed.y}%` }
      }
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { callback: v => v + '%' } },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    }
  }
});
