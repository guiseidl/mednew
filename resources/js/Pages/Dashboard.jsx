import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    const proximasConsultas = [
        { id: 1, medico: 'Dr. Rafael Souza', especialidade: 'Cardiologia', data: '05 Mar, 2026', hora: '14:30', status: 'confirmada' },
        { id: 2, medico: 'Dra. Fernanda Lima', especialidade: 'Dermatologia', data: '12 Mar, 2026', hora: '10:00', status: 'aguardando' },
    ];

    const ultimasConsultas = [
        { id: 3, medico: 'Dr. Carlos Mota', especialidade: 'Clínica Geral', data: '20 Fev, 2026', avaliacao: 5 },
        { id: 4, medico: 'Dra. Ana Paula', especialidade: 'Neurologia', data: '10 Fev, 2026', avaliacao: 4 },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard — MedNew" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

                :root {
                    --navy: #0a1628; --teal: #0d9488; --teal-light: #14b8a6;
                    --gray: #94a3b8; --border: rgba(255,255,255,0.08);
                    --card-bg: rgba(255,255,255,0.04);
                }

                .mn-dash {
                    min-height: 100vh; background: var(--navy);
                    font-family: 'DM Sans', sans-serif; color: #fff;
                    padding: 2rem 5%; position: relative;
                }
                .mn-dash::before {
                    content: ''; position: fixed; inset: 0;
                    background: radial-gradient(ellipse 80% 60% at 70% -10%, rgba(13,148,136,0.12) 0%, transparent 60%),
                                radial-gradient(ellipse 60% 50% at -10% 80%, rgba(13,148,136,0.07) 0%, transparent 60%);
                    pointer-events: none; z-index: 0;
                }
                .mn-dash::after {
                    content: ''; position: fixed; inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px; pointer-events: none; z-index: 0;
                }
                .mn-dash-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }

                /* HEADER */
                .mn-dash-header {
                    display: flex; align-items: center; justify-content: space-between;
                    margin-bottom: 2.5rem; padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--border);
                }
                .mn-dash-greeting { }
                .mn-dash-greeting-sub { font-size: 0.82rem; color: var(--teal-light); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.3rem; }
                .mn-dash-greeting h1 { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; letter-spacing: -0.02em; }
                .mn-dash-greeting p { font-size: 0.88rem; color: var(--gray); margin-top: 0.25rem; font-weight: 300; }
                .mn-dash-actions { display: flex; gap: 0.75rem; }
                .mn-btn-primary {
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; padding: 0.65rem 1.4rem; border-radius: 10px;
                    font-size: 0.88rem; font-weight: 600; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.3);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .mn-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }
                .mn-btn-outline {
                    background: var(--card-bg); border: 1px solid var(--border);
                    color: var(--gray); padding: 0.65rem 1.4rem; border-radius: 10px;
                    font-size: 0.88rem; font-weight: 500; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    transition: border-color 0.2s, color 0.2s;
                }
                .mn-btn-outline:hover { border-color: rgba(13,148,136,0.4); color: #fff; }

                /* STATS */
                .mn-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
                .mn-stat-card {
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 16px; padding: 1.25rem 1.5rem;
                    transition: border-color 0.2s, transform 0.2s;
                }
                .mn-stat-card:hover { border-color: rgba(13,148,136,0.3); transform: translateY(-2px); }
                .mn-stat-card-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
                .mn-stat-card-num { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: var(--teal-light); }
                .mn-stat-card-label { font-size: 0.78rem; color: var(--gray); font-weight: 500; margin-top: 0.15rem; }

                /* GRID LAYOUT */
                .mn-dash-grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; }

                /* CARDS */
                .mn-card {
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 20px; padding: 1.5rem; position: relative; overflow: hidden;
                }
                .mn-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                }
                .mn-card-title {
                    font-size: 1rem; font-weight: 600; margin-bottom: 1.25rem;
                    display: flex; align-items: center; justify-content: space-between;
                }
                .mn-card-title a { font-size: 0.78rem; color: var(--teal-light); text-decoration: none; font-weight: 500; }
                .mn-card-title a:hover { text-decoration: underline; }

                /* CONSULTA ITEM */
                .mn-consulta {
                    display: flex; align-items: center; gap: 1rem; padding: 1rem;
                    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
                    border-radius: 12px; margin-bottom: 0.75rem; transition: border-color 0.2s;
                }
                .mn-consulta:last-child { margin-bottom: 0; }
                .mn-consulta:hover { border-color: rgba(13,148,136,0.3); }
                .mn-consulta-avatar {
                    width: 44px; height: 44px; border-radius: 12px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.2rem; flex-shrink: 0;
                }
                .mn-consulta-info { flex: 1; }
                .mn-consulta-medico { font-size: 0.92rem; font-weight: 600; }
                .mn-consulta-spec { font-size: 0.78rem; color: var(--gray); }
                .mn-consulta-right { text-align: right; }
                .mn-consulta-data { font-size: 0.82rem; font-weight: 600; }
                .mn-consulta-hora { font-size: 0.75rem; color: var(--teal-light); }
                .mn-badge-status {
                    display: inline-block; font-size: 0.65rem; font-weight: 700;
                    padding: 0.2rem 0.6rem; border-radius: 100px;
                    letter-spacing: 0.05em; text-transform: uppercase; margin-top: 0.25rem;
                }
                .mn-badge-status.confirmada { background: rgba(16,185,129,0.15); color: #10b981; border: 1px solid rgba(16,185,129,0.3); }
                .mn-badge-status.aguardando { background: rgba(245,158,11,0.15); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3); }

                /* HISTORICO */
                .mn-hist-item {
                    display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 0;
                    border-bottom: 1px solid var(--border);
                }
                .mn-hist-item:last-child { border-bottom: none; }
                .mn-hist-avatar {
                    width: 36px; height: 36px; border-radius: 10px;
                    background: rgba(255,255,255,0.05);
                    display: flex; align-items: center; justify-content: center; font-size: 1rem;
                }
                .mn-hist-info { flex: 1; }
                .mn-hist-medico { font-size: 0.85rem; font-weight: 600; }
                .mn-hist-spec { font-size: 0.72rem; color: var(--gray); }
                .mn-hist-right { text-align: right; }
                .mn-hist-data { font-size: 0.72rem; color: var(--gray); }
                .mn-stars { color: #f59e0b; font-size: 0.75rem; }

                /* AÇÕES RÁPIDAS */
                .mn-quick-actions { display: flex; flex-direction: column; gap: 0.75rem; }
                .mn-quick-btn {
                    display: flex; align-items: center; gap: 0.85rem;
                    background: rgba(255,255,255,0.03); border: 1px solid var(--border);
                    border-radius: 12px; padding: 1rem 1.25rem; text-decoration: none;
                    color: #fff; transition: border-color 0.2s, background 0.2s, transform 0.2s;
                }
                .mn-quick-btn:hover { border-color: rgba(13,148,136,0.4); background: rgba(13,148,136,0.05); transform: translateX(4px); }
                .mn-quick-icon {
                    width: 38px; height: 38px; border-radius: 10px;
                    background: var(--teal-glow, rgba(13,148,136,0.15));
                    display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;
                }
                .mn-quick-label { font-size: 0.88rem; font-weight: 600; }
                .mn-quick-sub { font-size: 0.72rem; color: var(--gray); }
                .mn-quick-arrow { margin-left: auto; color: var(--gray); font-size: 0.9rem; }

                /* EMPTY STATE */
                .mn-empty { text-align: center; padding: 2rem; color: var(--gray); font-size: 0.85rem; }
                .mn-empty-icon { font-size: 2rem; margin-bottom: 0.5rem; }

                @media (max-width: 900px) {
                    .mn-dash-grid { grid-template-columns: 1fr; }
                    .mn-stats { grid-template-columns: repeat(2, 1fr); }
                    .mn-dash-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
                }
            `}</style>

            <div className="mn-dash">
                <div className="mn-dash-inner">

                    {/* HEADER */}
                    <div className="mn-dash-header">
                        <div className="mn-dash-greeting">
                            <div className="mn-dash-greeting-sub">✦ Área do Paciente</div>
                            <h1>Olá, {user.name.split(' ')[0]}! 👋</h1>
                            <p>Bem-vindo de volta ao MedNew. Como podemos ajudar hoje?</p>
                        </div>
                        <div className="mn-dash-actions">
                            <a href="#" className="mn-btn-outline">📋 Meu perfil</a>
                            <a href="#" className="mn-btn-primary">✦ Agendar consulta</a>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className="mn-stats">
                        <div className="mn-stat-card">
                            <div className="mn-stat-card-icon">📅</div>
                            <div className="mn-stat-card-num">2</div>
                            <div className="mn-stat-card-label">Próximas consultas</div>
                        </div>
                        <div className="mn-stat-card">
                            <div className="mn-stat-card-icon">📁</div>
                            <div className="mn-stat-card-num">8</div>
                            <div className="mn-stat-card-label">Consultas realizadas</div>
                        </div>
                        <div className="mn-stat-card">
                            <div className="mn-stat-card-icon">📄</div>
                            <div className="mn-stat-card-num">3</div>
                            <div className="mn-stat-card-label">Prontuários disponíveis</div>
                        </div>
                        <div className="mn-stat-card">
                            <div className="mn-stat-card-icon">⭐</div>
                            <div className="mn-stat-card-num">4.8</div>
                            <div className="mn-stat-card-label">Sua avaliação média</div>
                        </div>
                    </div>

                    {/* MAIN GRID */}
                    <div className="mn-dash-grid">

                        {/* COLUNA ESQUERDA */}
                        <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>

                            {/* PRÓXIMAS CONSULTAS */}
                            <div className="mn-card">
                                <div className="mn-card-title">
                                    <span>📅 Próximas Consultas</span>
                                    <a href="#">Ver todas →</a>
                                </div>
                                {proximasConsultas.map((c) => (
                                    <div className="mn-consulta" key={c.id}>
                                        <div className="mn-consulta-avatar">👨‍⚕️</div>
                                        <div className="mn-consulta-info">
                                            <div className="mn-consulta-medico">{c.medico}</div>
                                            <div className="mn-consulta-spec">{c.especialidade}</div>
                                        </div>
                                        <div className="mn-consulta-right">
                                            <div className="mn-consulta-data">{c.data}</div>
                                            <div className="mn-consulta-hora">{c.hora}</div>
                                            <span className={`mn-badge-status ${c.status}`}>{c.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* HISTÓRICO */}
                            <div className="mn-card">
                                <div className="mn-card-title">
                                    <span>🕐 Consultas Anteriores</span>
                                    <a href="#">Ver histórico →</a>
                                </div>
                                {ultimasConsultas.map((c) => (
                                    <div className="mn-hist-item" key={c.id}>
                                        <div className="mn-hist-avatar">👨‍⚕️</div>
                                        <div className="mn-hist-info">
                                            <div className="mn-hist-medico">{c.medico}</div>
                                            <div className="mn-hist-spec">{c.especialidade}</div>
                                        </div>
                                        <div className="mn-hist-right">
                                            <div className="mn-hist-data">{c.data}</div>
                                            <div className="mn-stars">{'★'.repeat(c.avaliacao)}{'☆'.repeat(5 - c.avaliacao)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUNA DIREITA */}
                        <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>

                            {/* AÇÕES RÁPIDAS */}
                            <div className="mn-card">
                                <div className="mn-card-title"><span>⚡ Ações Rápidas</span></div>
                                <div className="mn-quick-actions">
                                    <a href="#" className="mn-quick-btn">
                                        <div className="mn-quick-icon">📅</div>
                                        <div>
                                            <div className="mn-quick-label">Agendar consulta</div>
                                            <div className="mn-quick-sub">Escolha médico e horário</div>
                                        </div>
                                        <span className="mn-quick-arrow">→</span>
                                    </a>
                                    <a href="#" className="mn-quick-btn">
                                        <div className="mn-quick-icon">📁</div>
                                        <div>
                                            <div className="mn-quick-label">Meus prontuários</div>
                                            <div className="mn-quick-sub">Ver histórico médico</div>
                                        </div>
                                        <span className="mn-quick-arrow">→</span>
                                    </a>
                                    <a href="#" className="mn-quick-btn">
                                        <div className="mn-quick-icon">📤</div>
                                        <div>
                                            <div className="mn-quick-label">Enviar exames</div>
                                            <div className="mn-quick-sub">Upload de documentos</div>
                                        </div>
                                        <span className="mn-quick-arrow">→</span>
                                    </a>
                                    <a href="#" className="mn-quick-btn">
                                        <div className="mn-quick-icon">💊</div>
                                        <div>
                                            <div className="mn-quick-label">Minhas receitas</div>
                                            <div className="mn-quick-sub">Receitas e atestados</div>
                                        </div>
                                        <span className="mn-quick-arrow">→</span>
                                    </a>
                                </div>
                            </div>

                            {/* PRÓXIMA CONSULTA DESTAQUE */}
                            <div className="mn-card" style={{background:'rgba(13,148,136,0.06)', borderColor:'rgba(13,148,136,0.2)'}}>
                                <div className="mn-card-title"><span>🎥 Próxima videochamada</span></div>
                                <div style={{textAlign:'center', padding:'1rem 0'}}>
                                    <div style={{fontSize:'2.5rem', marginBottom:'0.75rem'}}>👨‍⚕️</div>
                                    <div style={{fontWeight:600, marginBottom:'0.25rem'}}>Dr. Rafael Souza</div>
                                    <div style={{fontSize:'0.78rem', color:'var(--gray)', marginBottom:'1rem'}}>Cardiologia</div>
                                    <div style={{background:'rgba(13,148,136,0.1)', borderRadius:'10px', padding:'0.75rem', marginBottom:'1rem'}}>
                                        <div style={{fontSize:'1.4rem', fontWeight:700, color:'var(--teal-light)'}}>05 Mar • 14:30</div>
                                        <div style={{fontSize:'0.75rem', color:'var(--gray)'}}>em 5 dias</div>
                                    </div>
                                    <a href="#" className="mn-btn-primary" style={{display:'flex', justifyContent:'center'}}>
                                        🎥 Entrar na chamada
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}