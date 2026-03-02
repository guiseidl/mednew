import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    const hoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

    const consultasHoje = [
        { id: 1, paciente: 'Carlos Mendes', idade: 45, hora: '09:00', motivo: 'Dor no peito', status: 'concluida', consultas_anteriores: 3 },
        { id: 2, paciente: 'Fernanda Oliveira', idade: 32, hora: '10:30', motivo: 'Check-up geral', status: 'em_andamento', consultas_anteriores: 0 },
        { id: 3, paciente: 'Roberto Lima', idade: 58, hora: '14:00', motivo: 'Retorno — hipertensão', status: 'agendada', consultas_anteriores: 7 },
        { id: 4, paciente: 'Ana Paula Costa', idade: 27, hora: '15:30', motivo: 'Palpitações', status: 'agendada', consultas_anteriores: 1 },
        { id: 5, paciente: 'Marcos Souza', idade: 61, hora: '17:00', motivo: 'Exame de resultado', status: 'agendada', consultas_anteriores: 4 },
    ];

    const proximoPaciente = consultasHoje.find(c => c.status === 'agendada');

    const alertas = [
        { tipo: 'cancelamento', msg: 'João Silva cancelou a consulta das 11:00', tempo: '15 min atrás' },
        { tipo: 'confirmacao', msg: 'Ana Paula confirmou presença para 15:30', tempo: '1h atrás' },
    ];

    const statusLabel = {
        concluida: { label: 'Concluída', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
        em_andamento: { label: 'Em andamento', color: '#14b8a6', bg: 'rgba(20,184,166,0.12)' },
        agendada: { label: 'Agendada', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard Médico — MedNew" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
                :root {
                    --navy: #0a1628; --teal: #0d9488; --teal-light: #14b8a6;
                    --gray: #94a3b8; --border: rgba(255,255,255,0.08); --card: rgba(255,255,255,0.04);
                }
                .md-dash {
                    min-height: 100vh; background: var(--navy);
                    font-family: 'DM Sans', sans-serif; color: #fff;
                    padding: 2rem 5%; position: relative;
                }
                .md-dash::before {
                    content: ''; position: fixed; inset: 0; pointer-events: none;
                    background: radial-gradient(ellipse 70% 50% at 80% 0%, rgba(13,148,136,0.12) 0%, transparent 60%),
                                radial-gradient(ellipse 50% 40% at 0% 90%, rgba(13,148,136,0.07) 0%, transparent 60%);
                }
                .md-dash::after {
                    content: ''; position: fixed; inset: 0; pointer-events: none;
                    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .md-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; }

                /* HEADER */
                .md-header {
                    display: flex; align-items: flex-start; justify-content: space-between;
                    margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border);
                    flex-wrap: wrap; gap: 1rem;
                }
                .md-header-sub { font-size: 0.78rem; font-weight: 700; color: var(--teal-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; }
                .md-header h1 { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 700; letter-spacing: -0.02em; }
                .md-header-date { font-size: 0.85rem; color: var(--gray); margin-top: 0.25rem; font-weight: 300; text-transform: capitalize; }
                .md-header-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
                .md-btn-primary {
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; padding: 0.65rem 1.3rem; border-radius: 10px;
                    font-size: 0.88rem; font-weight: 600; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .md-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }
                .md-btn-outline {
                    background: var(--card); border: 1px solid var(--border);
                    color: var(--gray); padding: 0.65rem 1.3rem; border-radius: 10px;
                    font-size: 0.88rem; font-weight: 500; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    transition: border-color 0.2s, color 0.2s;
                }
                .md-btn-outline:hover { border-color: rgba(13,148,136,0.4); color: #fff; }

                /* STATS */
                .md-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2rem; }
                .md-stat {
                    background: var(--card); border: 1px solid var(--border);
                    border-radius: 16px; padding: 1.25rem 1.5rem;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .md-stat:hover { border-color: rgba(13,148,136,0.3); transform: translateY(-2px); }
                .md-stat-icon { font-size: 1.4rem; margin-bottom: 0.6rem; }
                .md-stat-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--teal-light); }
                .md-stat-label { font-size: 0.75rem; color: var(--gray); margin-top: 0.15rem; }

                /* MAIN GRID */
                .md-grid { display: grid; grid-template-columns: 1fr 360px; gap: 1.5rem; }
                .md-col { display: flex; flex-direction: column; gap: 1.5rem; }

                /* CARD */
                .md-card {
                    background: var(--card); border: 1px solid var(--border);
                    border-radius: 20px; padding: 1.5rem; position: relative; overflow: hidden;
                }
                .md-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                }
                .md-card-title {
                    font-size: 0.95rem; font-weight: 600; margin-bottom: 1.25rem;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .md-card-title a { font-size: 0.78rem; color: var(--teal-light); text-decoration: none; }
                .md-card-title a:hover { text-decoration: underline; }

                /* CONSULTA ROW */
                .md-consulta {
                    display: flex; align-items: center; gap: 1rem;
                    padding: 0.9rem 1rem; border-radius: 12px; margin-bottom: 0.6rem;
                    background: rgba(255,255,255,0.02); border: 1px solid var(--border);
                    transition: border-color 0.2s, background 0.2s;
                }
                .md-consulta:last-child { margin-bottom: 0; }
                .md-consulta:hover { border-color: rgba(13,148,136,0.25); background: rgba(13,148,136,0.03); }
                .md-consulta.em_andamento { border-color: rgba(20,184,166,0.35); background: rgba(20,184,166,0.05); }
                .md-hora-badge {
                    min-width: 52px; text-align: center;
                    font-size: 0.88rem; font-weight: 700; color: var(--teal-light);
                    background: rgba(13,148,136,0.1); border-radius: 8px; padding: 0.4rem 0.5rem;
                }
                .md-consulta-info { flex: 1; }
                .md-consulta-nome { font-size: 0.9rem; font-weight: 600; }
                .md-consulta-detalhe { font-size: 0.75rem; color: var(--gray); margin-top: 0.1rem; }
                .md-badge {
                    font-size: 0.65rem; font-weight: 700; padding: 0.2rem 0.6rem;
                    border-radius: 100px; letter-spacing: 0.05em; text-transform: uppercase;
                    white-space: nowrap;
                }
                .md-consulta-actions { display: flex; gap: 0.4rem; }
                .md-action-btn {
                    font-size: 0.75rem; padding: 0.3rem 0.7rem; border-radius: 7px;
                    border: 1px solid var(--border); background: none; color: var(--gray);
                    cursor: pointer; font-family: 'DM Sans', sans-serif;
                    transition: border-color 0.2s, color 0.2s, background 0.2s;
                }
                .md-action-btn:hover { border-color: var(--teal); color: var(--teal-light); }
                .md-action-btn.primary {
                    background: rgba(13,148,136,0.15); border-color: rgba(13,148,136,0.3);
                    color: var(--teal-light);
                }
                .md-action-btn.primary:hover { background: rgba(13,148,136,0.25); }

                /* PRÓXIMO PACIENTE */
                .md-proximo {
                    background: rgba(13,148,136,0.06); border-color: rgba(13,148,136,0.2);
                }
                .md-proximo-avatar {
                    width: 64px; height: 64px; border-radius: 16px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.6rem; margin: 0 auto 0.75rem;
                }
                .md-proximo-nome { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; text-align: center; }
                .md-proximo-meta { font-size: 0.78rem; color: var(--gray); text-align: center; margin-bottom: 1rem; }
                .md-proximo-info {
                    background: rgba(255,255,255,0.04); border-radius: 10px;
                    padding: 0.85rem 1rem; margin-bottom: 1rem;
                }
                .md-proximo-info-row {
                    display: flex; justify-content: space-between; align-items: center;
                    font-size: 0.8rem; padding: 0.25rem 0;
                }
                .md-proximo-info-row span:first-child { color: var(--gray); }
                .md-proximo-info-row span:last-child { font-weight: 600; }
                .md-time-badge {
                    background: rgba(13,148,136,0.12); border: 1px solid rgba(13,148,136,0.25);
                    border-radius: 10px; padding: 0.75rem; text-align: center; margin-bottom: 1rem;
                }
                .md-time-badge-hora { font-size: 1.5rem; font-weight: 700; color: var(--teal-light); }
                .md-time-badge-sub { font-size: 0.72rem; color: var(--gray); }
                .md-enter-btn {
                    width: 100%; padding: 0.8rem;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; border: none; border-radius: 10px;
                    font-size: 0.9rem; font-weight: 600; cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
                }
                .md-enter-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }

                /* AÇÕES RÁPIDAS */
                .md-quick { display: flex; flex-direction: column; gap: 0.6rem; }
                .md-quick-btn {
                    display: flex; align-items: center; gap: 0.85rem;
                    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
                    border-radius: 12px; padding: 0.85rem 1rem; text-decoration: none;
                    color: #fff; transition: border-color 0.2s, background 0.2s, transform 0.2s;
                }
                .md-quick-btn:hover { border-color: rgba(13,148,136,0.35); background: rgba(13,148,136,0.05); transform: translateX(3px); }
                .md-quick-icon {
                    width: 36px; height: 36px; border-radius: 9px;
                    background: rgba(13,148,136,0.12); display: flex; align-items: center;
                    justify-content: center; font-size: 1rem; flex-shrink: 0;
                }
                .md-quick-label { font-size: 0.85rem; font-weight: 600; }
                .md-quick-sub { font-size: 0.7rem; color: var(--gray); }

                /* ALERTAS */
                .md-alerta {
                    display: flex; align-items: flex-start; gap: 0.75rem;
                    padding: 0.85rem; background: rgba(255,255,255,0.02);
                    border: 1px solid var(--border); border-radius: 10px; margin-bottom: 0.6rem;
                }
                .md-alerta:last-child { margin-bottom: 0; }
                .md-alerta.cancelamento { border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.04); }
                .md-alerta.confirmacao { border-color: rgba(16,185,129,0.2); background: rgba(16,185,129,0.04); }
                .md-alerta-icon { font-size: 1.1rem; flex-shrink: 0; margin-top: 0.05rem; }
                .md-alerta-msg { font-size: 0.82rem; line-height: 1.4; }
                .md-alerta-tempo { font-size: 0.72rem; color: var(--gray); margin-top: 0.2rem; }

                /* FATURAMENTO */
                .md-fat-num { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--teal-light); }
                .md-fat-sub { font-size: 0.78rem; color: var(--gray); margin-bottom: 1rem; }
                .md-fat-bar { height: 6px; background: rgba(255,255,255,0.06); border-radius: 100px; margin-bottom: 0.4rem; overflow: hidden; }
                .md-fat-fill { height: 100%; border-radius: 100px; background: linear-gradient(90deg, var(--teal), var(--teal-light)); }
                .md-fat-row { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--gray); }

                @media (max-width: 1024px) {
                    .md-grid { grid-template-columns: 1fr; }
                    .md-stats { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 600px) {
                    .md-stats { grid-template-columns: repeat(2, 1fr); }
                    .md-consulta-actions { display: none; }
                }
            `}</style>

            <div className="md-dash">
                <div className="md-inner">

                    {/* HEADER */}
                    <div className="md-header">
                        <div>
                            <div className="md-header-sub">✦ Área do Médico</div>
                            <h1>Olá, Dr. {user.name.split(' ')[0]}! 🩺</h1>
                            <div className="md-header-date">{hoje}</div>
                        </div>
                        <div className="md-header-actions">
                            <a href="#" className="md-btn-outline">📅 Minha disponibilidade</a>
                            <a href="#" className="md-btn-outline">👥 Meus pacientes</a>
                            <a href="#" className="md-btn-primary">💊 Emitir receita</a>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="md-stats">
                        <div className="md-stat">
                            <div className="md-stat-icon">📅</div>
                            <div className="md-stat-num">5</div>
                            <div className="md-stat-label">Consultas hoje</div>
                        </div>
                        <div className="md-stat">
                            <div className="md-stat-icon">📆</div>
                            <div className="md-stat-num">23</div>
                            <div className="md-stat-label">Esta semana</div>
                        </div>
                        <div className="md-stat">
                            <div className="md-stat-icon">📊</div>
                            <div className="md-stat-num">87</div>
                            <div className="md-stat-label">Este mês</div>
                        </div>
                        <div className="md-stat">
                            <div className="md-stat-icon">⭐</div>
                            <div className="md-stat-num">4.9</div>
                            <div className="md-stat-label">Avaliação média</div>
                        </div>
                        <div className="md-stat">
                            <div className="md-stat-icon">💰</div>
                            <div className="md-stat-num">R$&nbsp;8,4k</div>
                            <div className="md-stat-label">Faturamento mês</div>
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="md-grid">

                        {/* COLUNA ESQUERDA */}
                        <div className="md-col">

                            {/* AGENDA DO DIA */}
                            <div className="md-card">
                                <div className="md-card-title">
                                    <span>📋 Agenda de Hoje</span>
                                    <a href="#">Ver agenda completa →</a>
                                </div>

                                {consultasHoje.map((c) => {
                                    const s = statusLabel[c.status];
                                    return (
                                        <div key={c.id} className={`md-consulta ${c.status}`}>
                                            <div className="md-hora-badge">{c.hora}</div>
                                            <div className="md-consulta-info">
                                                <div className="md-consulta-nome">{c.paciente}</div>
                                                <div className="md-consulta-detalhe">
                                                    {c.idade} anos · {c.motivo}
                                                    {c.consultas_anteriores > 0 && (
                                                        <span style={{marginLeft:'0.5rem', color:'var(--teal-light)'}}>
                                                            · {c.consultas_anteriores} consultas anteriores
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span
                                                className="md-badge"
                                                style={{color: s.color, background: s.bg, border: `1px solid ${s.color}33`}}
                                            >
                                                {s.label}
                                            </span>
                                            <div className="md-consulta-actions">
                                                <button className="md-action-btn">📁 Prontuário</button>
                                                {c.status === 'agendada' && (
                                                    <button className="md-action-btn primary">🎥 Entrar</button>
                                                )}
                                                {c.status === 'em_andamento' && (
                                                    <button className="md-action-btn primary">🎥 Continuar</button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* ALERTAS */}
                            <div className="md-card">
                                <div className="md-card-title"><span>🔔 Notificações de Hoje</span></div>
                                {alertas.map((a, i) => (
                                    <div key={i} className={`md-alerta ${a.tipo}`}>
                                        <div className="md-alerta-icon">
                                            {a.tipo === 'cancelamento' ? '❌' : '✅'}
                                        </div>
                                        <div>
                                            <div className="md-alerta-msg">{a.msg}</div>
                                            <div className="md-alerta-tempo">{a.tempo}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* COLUNA DIREITA */}
                        <div className="md-col">

                            {/* PRÓXIMO PACIENTE */}
                            {proximoPaciente && (
                                <div className="md-card md-proximo">
                                    <div className="md-card-title"><span>👤 Próximo Paciente</span></div>
                                    <div className="md-proximo-avatar">👤</div>
                                    <div className="md-proximo-nome">{proximoPaciente.paciente}</div>
                                    <div className="md-proximo-meta">{proximoPaciente.idade} anos</div>

                                    <div className="md-proximo-info">
                                        <div className="md-proximo-info-row">
                                            <span>Motivo</span>
                                            <span>{proximoPaciente.motivo}</span>
                                        </div>
                                        <div className="md-proximo-info-row">
                                            <span>Consultas anteriores</span>
                                            <span style={{color:'var(--teal-light)'}}>{proximoPaciente.consultas_anteriores}</span>
                                        </div>
                                    </div>

                                    <div className="md-time-badge">
                                        <div className="md-time-badge-hora">{proximoPaciente.hora}</div>
                                        <div className="md-time-badge-sub">horário agendado</div>
                                    </div>

                                    <div style={{display:'flex', gap:'0.6rem', marginBottom:'0.6rem'}}>
                                        <button className="md-action-btn" style={{flex:1, padding:'0.6rem'}}>📁 Ver prontuário</button>
                                    </div>
                                    <button className="md-enter-btn">🎥 Entrar na chamada</button>
                                </div>
                            )}

                            {/* AÇÕES RÁPIDAS */}
                            <div className="md-card">
                                <div className="md-card-title"><span>⚡ Ações Rápidas</span></div>
                                <div className="md-quick">
                                    <a href="#" className="md-quick-btn">
                                        <div className="md-quick-icon">📅</div>
                                        <div>
                                            <div className="md-quick-label">Minha disponibilidade</div>
                                            <div className="md-quick-sub">Gerencie seus horários</div>
                                        </div>
                                    </a>
                                    <a href="#" className="md-quick-btn">
                                        <div className="md-quick-icon">👥</div>
                                        <div>
                                            <div className="md-quick-label">Meus pacientes</div>
                                            <div className="md-quick-sub">Histórico e prontuários</div>
                                        </div>
                                    </a>
                                    <a href="#" className="md-quick-btn">
                                        <div className="md-quick-icon">💊</div>
                                        <div>
                                            <div className="md-quick-label">Emitir receita</div>
                                            <div className="md-quick-sub">Receitas e atestados digitais</div>
                                        </div>
                                    </a>
                                    <a href="#" className="md-quick-btn">
                                        <div className="md-quick-icon">💰</div>
                                        <div>
                                            <div className="md-quick-label">Faturamento</div>
                                            <div className="md-quick-sub">Relatórios financeiros</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* FATURAMENTO */}
                            <div className="md-card">
                                <div className="md-card-title"><span>💰 Faturamento do Mês</span></div>
                                <div className="md-fat-num">R$ 8.400</div>
                                <div className="md-fat-sub">Meta: R$ 12.000 · 70% atingido</div>
                                <div className="md-fat-bar">
                                    <div className="md-fat-fill" style={{width:'70%'}} />
                                </div>
                                <div className="md-fat-row">
                                    <span>R$ 0</span>
                                    <span style={{color:'var(--teal-light)', fontWeight:600}}>R$ 8.400</span>
                                    <span>R$ 12.000</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}