import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Agendar({ medicos }) {
    const [etapa, setEtapa] = useState(1); // 1: médico, 2: data/hora, 3: confirmação
    const [filtroEspec, setFiltroEspec] = useState('');
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const [loadingHorarios, setLoadingHorarios] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [erros, setErros] = useState({});

    // Especialidades únicas para filtro
    const especialidades = [...new Set(medicos.map(m => m.especialidade))].sort();

    const medicosFiltrados = filtroEspec
        ? medicos.filter(m => m.especialidade === filtroEspec)
        : medicos;

    // Busca horários disponíveis
    const buscarHorarios = async (medicoId, data) => {
        if (!medicoId || !data) return;
        setLoadingHorarios(true);
        setHorarios([]);
        setHorarioSelecionado('');
        try {
            const res = await fetch(`/agendar/horarios?medico_id=${medicoId}&data=${data}`);
            const data2 = await res.json();
            setHorarios(data2);
        } catch {
            setHorarios([]);
        }
        setLoadingHorarios(false);
    };

    const selecionarMedico = (medico) => {
        setMedicoSelecionado(medico);
        setEtapa(2);
        setDataSelecionada('');
        setHorarios([]);
        setHorarioSelecionado('');
    };

    const handleDataChange = (e) => {
        setDataSelecionada(e.target.value);
        buscarHorarios(medicoSelecionado.id, e.target.value);
    };

    const confirmar = () => {
        setEnviando(true);
        router.post(route('consultas.store'), {
            medico_id: medicoSelecionado.id,
            data: dataSelecionada,
            hora: horarioSelecionado,
        }, {
            onError: (e) => { setErros(e); setEnviando(false); },
            onFinish: () => setEnviando(false),
        });
    };

    // Data mínima = hoje
    const hoje = new Date().toISOString().split('T')[0];

    const formatarData = (d) => {
        if (!d) return '';
        const [y, m, day] = d.split('-');
        return `${day}/${m}/${y}`;
    };

    const formatarValor = (v) => `R$ ${parseFloat(v).toFixed(2).replace('.', ',')}`;

    return (
        <AuthenticatedLayout>
            <Head title="Agendar Consulta — MedNew" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
                :root {
                    --navy: #0a1628; --teal: #0d9488; --teal-light: #14b8a6;
                    --gray: #94a3b8; --border: rgba(255,255,255,0.08); --card: rgba(255,255,255,0.04);
                }
                .ag-wrap {
                    min-height: 100vh; background: var(--navy);
                    font-family: 'DM Sans', sans-serif; color: #fff;
                    padding: 2rem 5%; position: relative;
                }
                .ag-wrap::before {
                    content: ''; position: fixed; inset: 0; pointer-events: none;
                    background: radial-gradient(ellipse 70% 50% at 80% 0%, rgba(13,148,136,0.12) 0%, transparent 60%);
                }
                .ag-wrap::after {
                    content: ''; position: fixed; inset: 0; pointer-events: none;
                    background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 60px 60px;
                }
                .ag-inner { position: relative; z-index: 1; max-width: 1000px; margin: 0 auto; }

                /* HEADER */
                .ag-header { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
                .ag-header-sub { font-size: 0.78rem; font-weight: 700; color: var(--teal-light); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; }
                .ag-header h1 { font-family: 'Playfair Display', serif; font-size: 1.9rem; font-weight: 700; }
                .ag-header p { font-size: 0.88rem; color: var(--gray); margin-top: 0.25rem; }

                /* STEPS */
                .ag-steps { display: flex; align-items: center; gap: 0; margin-bottom: 2.5rem; }
                .ag-step { display: flex; align-items: center; gap: 0.6rem; }
                .ag-step-num {
                    width: 32px; height: 32px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.82rem; font-weight: 700; flex-shrink: 0;
                    transition: all 0.3s;
                }
                .ag-step-num.active { background: linear-gradient(135deg, var(--teal), var(--teal-light)); color: #fff; box-shadow: 0 0 16px rgba(13,148,136,0.5); }
                .ag-step-num.done { background: rgba(13,148,136,0.2); color: var(--teal-light); border: 1px solid rgba(13,148,136,0.4); }
                .ag-step-num.pending { background: rgba(255,255,255,0.05); color: var(--gray); border: 1px solid var(--border); }
                .ag-step-label { font-size: 0.82rem; font-weight: 600; color: var(--gray); }
                .ag-step-label.active { color: #fff; }
                .ag-step-label.done { color: var(--teal-light); }
                .ag-step-line { flex: 1; height: 1px; background: var(--border); margin: 0 1rem; }
                .ag-step-line.done { background: rgba(13,148,136,0.4); }

                /* FILTRO */
                .ag-filtro { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
                .ag-filtro-btn {
                    padding: 0.45rem 1rem; border-radius: 100px; font-size: 0.8rem; font-weight: 600;
                    border: 1px solid var(--border); background: var(--card); color: var(--gray);
                    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s;
                }
                .ag-filtro-btn:hover { border-color: rgba(13,148,136,0.4); color: #fff; }
                .ag-filtro-btn.active { background: rgba(13,148,136,0.15); border-color: rgba(13,148,136,0.4); color: var(--teal-light); }

                /* GRID MÉDICOS */
                .ag-medicos { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
                .ag-medico-card {
                    background: var(--card); border: 1px solid var(--border); border-radius: 16px;
                    padding: 1.5rem; cursor: pointer; transition: all 0.2s;
                }
                .ag-medico-card:hover { border-color: rgba(13,148,136,0.4); transform: translateY(-3px); box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
                .ag-medico-avatar {
                    width: 56px; height: 56px; border-radius: 14px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4rem; margin-bottom: 1rem;
                }
                .ag-medico-nome { font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem; }
                .ag-medico-espec { font-size: 0.78rem; color: var(--teal-light); font-weight: 600; margin-bottom: 0.6rem; }
                .ag-medico-crm { font-size: 0.72rem; color: var(--gray); margin-bottom: 1rem; }
                .ag-medico-footer { display: flex; justify-content: space-between; align-items: center; }
                .ag-medico-valor { font-size: 1rem; font-weight: 700; color: #fff; }
                .ag-medico-valor span { font-size: 0.72rem; color: var(--gray); font-weight: 400; }
                .ag-medico-btn {
                    background: rgba(13,148,136,0.15); border: 1px solid rgba(13,148,136,0.3);
                    color: var(--teal-light); padding: 0.4rem 0.9rem; border-radius: 8px;
                    font-size: 0.8rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
                    cursor: pointer; transition: all 0.2s;
                }
                .ag-medico-btn:hover { background: rgba(13,148,136,0.25); }

                /* ETAPA 2 */
                .ag-etapa2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
                .ag-card {
                    background: var(--card); border: 1px solid var(--border);
                    border-radius: 20px; padding: 1.5rem; position: relative; overflow: hidden;
                }
                .ag-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                }
                .ag-card-title { font-size: 0.95rem; font-weight: 600; margin-bottom: 1.25rem; }
                .ag-label { display: block; font-size: 0.78rem; font-weight: 600; color: var(--gray); margin-bottom: 0.5rem; letter-spacing: 0.03em; }
                .ag-input {
                    width: 100%; padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
                    border-radius: 10px; color: #fff; font-size: 0.92rem;
                    font-family: 'DM Sans', sans-serif; outline: none;
                    transition: border-color 0.2s;
                }
                .ag-input:focus { border-color: var(--teal); }
                .ag-input::-webkit-calendar-picker-indicator { filter: invert(1); opacity: 0.5; }
                .ag-horarios { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 1rem; }
                .ag-horario {
                    padding: 0.6rem; text-align: center; border-radius: 9px;
                    border: 1px solid var(--border); background: rgba(255,255,255,0.03);
                    font-size: 0.85rem; font-weight: 600; cursor: pointer;
                    transition: all 0.2s; color: #fff; font-family: 'DM Sans', sans-serif;
                }
                .ag-horario:hover { border-color: var(--teal); color: var(--teal-light); }
                .ag-horario.selected { background: rgba(13,148,136,0.2); border-color: var(--teal-light); color: var(--teal-light); }
                .ag-empty { text-align: center; color: var(--gray); font-size: 0.85rem; padding: 1.5rem; }

                /* MÉDICO SELECIONADO */
                .ag-medico-sel {
                    display: flex; align-items: center; gap: 1rem;
                    background: rgba(13,148,136,0.06); border: 1px solid rgba(13,148,136,0.2);
                    border-radius: 12px; padding: 1rem; margin-bottom: 1.5rem;
                }
                .ag-medico-sel-avatar {
                    width: 44px; height: 44px; border-radius: 11px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
                }
                .ag-medico-sel-nome { font-weight: 700; font-size: 0.95rem; }
                .ag-medico-sel-espec { font-size: 0.75rem; color: var(--teal-light); }
                .ag-btn-voltar {
                    background: none; border: 1px solid var(--border); color: var(--gray);
                    padding: 0.45rem 0.9rem; border-radius: 8px; font-size: 0.82rem;
                    cursor: pointer; font-family: 'DM Sans', sans-serif; margin-left: auto;
                    transition: all 0.2s;
                }
                .ag-btn-voltar:hover { border-color: rgba(255,255,255,0.2); color: #fff; }

                /* CONFIRMAÇÃO */
                .ag-confirm-card {
                    background: var(--card); border: 1px solid var(--border);
                    border-radius: 20px; padding: 2rem; max-width: 500px; margin: 0 auto;
                    position: relative; overflow: hidden;
                }
                .ag-confirm-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                }
                .ag-confirm-row {
                    display: flex; justify-content: space-between; align-items: center;
                    padding: 0.85rem 0; border-bottom: 1px solid var(--border); font-size: 0.88rem;
                }
                .ag-confirm-row:last-of-type { border-bottom: none; }
                .ag-confirm-row span:first-child { color: var(--gray); }
                .ag-confirm-row span:last-child { font-weight: 600; }
                .ag-btn-confirmar {
                    width: 100%; padding: 0.9rem;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; border: none; border-radius: 12px;
                    font-size: 1rem; font-weight: 700; cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                    margin-top: 1.5rem;
                }
                .ag-btn-confirmar:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }
                .ag-btn-confirmar:disabled { opacity: 0.7; cursor: not-allowed; }
                .ag-erro { color: #f87171; font-size: 0.78rem; margin-top: 0.5rem; }

                @media (max-width: 700px) {
                    .ag-etapa2 { grid-template-columns: 1fr; }
                    .ag-horarios { grid-template-columns: repeat(3, 1fr); }
                }
            `}</style>

            <div className="ag-wrap">
                <div className="ag-inner">

                    {/* HEADER */}
                    <div className="ag-header">
                        <div className="ag-header-sub">✦ Agendamento</div>
                        <h1>Agendar Consulta</h1>
                        <p>Escolha o médico, data e horário para sua consulta</p>
                    </div>

                    {/* STEPS */}
                    <div className="ag-steps">
                        <div className="ag-step">
                            <div className={`ag-step-num ${etapa === 1 ? 'active' : 'done'}`}>
                                {etapa > 1 ? '✓' : '1'}
                            </div>
                            <span className={`ag-step-label ${etapa === 1 ? 'active' : 'done'}`}>Escolher médico</span>
                        </div>
                        <div className={`ag-step-line ${etapa > 1 ? 'done' : ''}`} />
                        <div className="ag-step">
                            <div className={`ag-step-num ${etapa === 2 ? 'active' : etapa > 2 ? 'done' : 'pending'}`}>
                                {etapa > 2 ? '✓' : '2'}
                            </div>
                            <span className={`ag-step-label ${etapa === 2 ? 'active' : etapa > 2 ? 'done' : ''}`}>Data e horário</span>
                        </div>
                        <div className={`ag-step-line ${etapa > 2 ? 'done' : ''}`} />
                        <div className="ag-step">
                            <div className={`ag-step-num ${etapa === 3 ? 'active' : 'pending'}`}>3</div>
                            <span className={`ag-step-label ${etapa === 3 ? 'active' : ''}`}>Confirmação</span>
                        </div>
                    </div>

                    {/* ── ETAPA 1: ESCOLHER MÉDICO ── */}
                    {etapa === 1 && (
                        <>
                            <div className="ag-filtro">
                                <button
                                    className={`ag-filtro-btn ${filtroEspec === '' ? 'active' : ''}`}
                                    onClick={() => setFiltroEspec('')}
                                >
                                    Todas as especialidades
                                </button>
                                {especialidades.map(e => (
                                    <button
                                        key={e}
                                        className={`ag-filtro-btn ${filtroEspec === e ? 'active' : ''}`}
                                        onClick={() => setFiltroEspec(e)}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>

                            {medicosFiltrados.length === 0 ? (
                                <div className="ag-empty">
                                    <div style={{fontSize:'2rem', marginBottom:'0.5rem'}}>🔍</div>
                                    Nenhum médico disponível nessa especialidade.
                                </div>
                            ) : (
                                <div className="ag-medicos">
                                    {medicosFiltrados.map(m => (
                                        <div className="ag-medico-card" key={m.id}>
                                            <div className="ag-medico-avatar">👨‍⚕️</div>
                                            <div className="ag-medico-nome">{m.nome}</div>
                                            <div className="ag-medico-espec">{m.especialidade}</div>
                                            <div className="ag-medico-crm">CRM: {m.crm}</div>
                                            <div className="ag-medico-footer">
                                                <div className="ag-medico-valor">
                                                    {formatarValor(m.valor_consulta)}
                                                    <span> / consulta</span>
                                                </div>
                                                <button
                                                    className="ag-medico-btn"
                                                    onClick={() => selecionarMedico(m)}
                                                >
                                                    Agendar →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── ETAPA 2: DATA E HORÁRIO ── */}
                    {etapa === 2 && (
                        <>
                            <div className="ag-medico-sel">
                                <div className="ag-medico-sel-avatar">👨‍⚕️</div>
                                <div>
                                    <div className="ag-medico-sel-nome">{medicoSelecionado.nome}</div>
                                    <div className="ag-medico-sel-espec">{medicoSelecionado.especialidade}</div>
                                </div>
                                <button className="ag-btn-voltar" onClick={() => setEtapa(1)}>
                                    ← Trocar médico
                                </button>
                            </div>

                            <div className="ag-etapa2">
                                <div className="ag-card">
                                    <div className="ag-card-title">📅 Escolha a data</div>
                                    <label className="ag-label">Data da consulta</label>
                                    <input
                                        type="date"
                                        className="ag-input"
                                        min={hoje}
                                        value={dataSelecionada}
                                        onChange={handleDataChange}
                                    />
                                </div>

                                <div className="ag-card">
                                    <div className="ag-card-title">🕐 Escolha o horário</div>
                                    {!dataSelecionada && (
                                        <div className="ag-empty">Selecione uma data primeiro</div>
                                    )}
                                    {dataSelecionada && loadingHorarios && (
                                        <div className="ag-empty">Buscando horários...</div>
                                    )}
                                    {dataSelecionada && !loadingHorarios && horarios.length === 0 && (
                                        <div className="ag-empty">Sem horários disponíveis nessa data</div>
                                    )}
                                    {horarios.length > 0 && (
                                        <div className="ag-horarios">
                                            {horarios.map(h => (
                                                <button
                                                    key={h}
                                                    className={`ag-horario ${horarioSelecionado === h ? 'selected' : ''}`}
                                                    onClick={() => setHorarioSelecionado(h)}
                                                >
                                                    {h}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {erros.hora && <div className="ag-erro">{erros.hora}</div>}
                                </div>
                            </div>

                            <div style={{display:'flex', justifyContent:'flex-end', marginTop:'1.5rem'}}>
                                <button
                                    className="ag-btn-confirmar"
                                    style={{width:'auto', padding:'0.75rem 2rem'}}
                                    disabled={!dataSelecionada || !horarioSelecionado}
                                    onClick={() => setEtapa(3)}
                                >
                                    Continuar →
                                </button>
                            </div>
                        </>
                    )}

                    {/* ── ETAPA 3: CONFIRMAÇÃO ── */}
                    {etapa === 3 && (
                        <>
                            <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
                                <div style={{fontSize:'3rem', marginBottom:'0.5rem'}}>✅</div>
                                <div style={{fontFamily:"'Playfair Display', serif", fontSize:'1.5rem', fontWeight:700}}>Confirme seu agendamento</div>
                                <div style={{color:'var(--gray)', fontSize:'0.88rem', marginTop:'0.25rem'}}>Revise os detalhes antes de confirmar</div>
                            </div>

                            <div className="ag-confirm-card">
                                <div className="ag-confirm-row">
                                    <span>Médico</span>
                                    <span>{medicoSelecionado.nome}</span>
                                </div>
                                <div className="ag-confirm-row">
                                    <span>Especialidade</span>
                                    <span>{medicoSelecionado.especialidade}</span>
                                </div>
                                <div className="ag-confirm-row">
                                    <span>Data</span>
                                    <span>{formatarData(dataSelecionada)}</span>
                                </div>
                                <div className="ag-confirm-row">
                                    <span>Horário</span>
                                    <span style={{color:'var(--teal-light)'}}>{horarioSelecionado}</span>
                                </div>
                                <div className="ag-confirm-row">
                                    <span>Valor</span>
                                    <span style={{color:'var(--teal-light)', fontSize:'1.1rem'}}>
                                        {formatarValor(medicoSelecionado.valor_consulta)}
                                    </span>
                                </div>
                                <div className="ag-confirm-row">
                                    <span>Modalidade</span>
                                    <span>🎥 Videochamada (Google Meet)</span>
                                </div>

                                {erros.hora && <div className="ag-erro" style={{marginTop:'1rem'}}>{erros.hora}</div>}

                                <button
                                    className="ag-btn-confirmar"
                                    onClick={confirmar}
                                    disabled={enviando}
                                >
                                    {enviando ? 'Agendando...' : '✦ Confirmar agendamento'}
                                </button>

                                <div style={{textAlign:'center', marginTop:'1rem'}}>
                                    <button
                                        style={{background:'none', border:'none', color:'var(--gray)', fontSize:'0.82rem', cursor:'pointer', fontFamily:"'DM Sans', sans-serif"}}
                                        onClick={() => setEtapa(2)}
                                    >
                                        ← Voltar e editar
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}