import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    const styles = {
        body: {
            background: '#0a1628',
            color: '#ffffff',
            fontFamily: "'DM Sans', sans-serif",
            minHeight: '100vh',
            overflowX: 'hidden',
            position: 'relative',
        },
        bgGradient: {
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 70% -10%, rgba(13,148,136,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at -10% 80%, rgba(13,148,136,0.10) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
        },
        bgGrid: {
            position: 'fixed',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            pointerEvents: 'none',
            zIndex: 0,
        },
    };

    return (
        <>
            <Head title="MedNew — Telemedicina do Futuro" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

                * { margin: 0; padding: 0; box-sizing: border-box; }

                :root {
                    --navy: #0a1628;
                    --teal: #0d9488;
                    --teal-light: #14b8a6;
                    --teal-glow: rgba(13, 148, 136, 0.15);
                    --gray: #94a3b8;
                    --border: rgba(255,255,255,0.08);
                    --card-bg: rgba(255,255,255,0.04);
                }

                .mn-section { position: relative; z-index: 1; }

                /* NAV */
                .mn-nav {
                    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
                    padding: 1.25rem 5%;
                    display: flex; align-items: center; justify-content: space-between;
                    backdrop-filter: blur(20px);
                    background: rgba(10, 22, 40, 0.7);
                    border-bottom: 1px solid var(--border);
                }
                .mn-logo { display: flex; align-items: center; gap: 0.6rem; }
                .mn-logo-icon {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem;
                    box-shadow: 0 0 20px rgba(13,148,136,0.4);
                }
                .mn-logo-text {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.4rem; font-weight: 700;
                    letter-spacing: -0.02em; color: #fff;
                }
                .mn-logo-text span { color: var(--teal-light); }
                .mn-nav-links { display: flex; gap: 1.5rem; align-items: center; list-style: none; }
                .mn-nav-links a {
                    color: var(--gray); text-decoration: none;
                    font-size: 0.9rem; font-weight: 500;
                    transition: color 0.2s; letter-spacing: 0.02em;
                }
                .mn-nav-links a:hover { color: #fff; }
                .mn-btn-nav {
                    background: linear-gradient(135deg, var(--teal), var(--teal-light)) !important;
                    color: #fff !important; padding: 0.55rem 1.4rem;
                    border-radius: 8px; font-weight: 600 !important;
                    box-shadow: 0 0 20px rgba(13,148,136,0.3);
                    transition: opacity 0.2s, box-shadow 0.2s;
                }
                .mn-btn-nav:hover { opacity: 0.9; box-shadow: 0 0 30px rgba(13,148,136,0.5) !important; }

                /* HERO */
                .mn-hero {
                    min-height: 100vh; display: flex; align-items: center;
                    padding: 8rem 5% 5rem;
                }
                .mn-hero-inner {
                    max-width: 1200px; margin: 0 auto; width: 100%;
                    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
                }
                .mn-badge {
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    background: var(--teal-glow);
                    border: 1px solid rgba(13,148,136,0.3);
                    border-radius: 100px; padding: 0.35rem 0.9rem;
                    font-size: 0.78rem; font-weight: 600; color: var(--teal-light);
                    letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem;
                }
                .mn-badge-dot {
                    width: 6px; height: 6px; background: var(--teal-light);
                    border-radius: 50%; animation: mn-pulse 2s infinite;
                }
                @keyframes mn-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.3); }
                }
                .mn-h1 {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2.8rem, 5vw, 4.2rem); font-weight: 700;
                    line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 1.5rem;
                }
                .mn-h1 em {
                    font-style: normal; color: var(--teal-light); position: relative;
                }
                .mn-h1 em::after {
                    content: ''; position: absolute; bottom: 4px; left: 0; right: 0;
                    height: 3px; background: linear-gradient(90deg, var(--teal), transparent); border-radius: 2px;
                }
                .mn-hero-desc {
                    font-size: 1.05rem; color: var(--gray); line-height: 1.75;
                    margin-bottom: 2.5rem; max-width: 480px; font-weight: 300;
                }
                .mn-hero-cta { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
                .mn-btn-primary {
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; padding: 0.9rem 2rem; border-radius: 10px;
                    font-size: 0.95rem; font-weight: 600; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.5rem;
                    box-shadow: 0 4px 30px rgba(13,148,136,0.35);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .mn-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 40px rgba(13,148,136,0.5); }
                .mn-btn-secondary {
                    color: var(--gray); padding: 0.9rem 1.5rem;
                    font-size: 0.95rem; font-weight: 500; text-decoration: none;
                    display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.2s;
                }
                .mn-btn-secondary:hover { color: #fff; }
                .mn-hero-stats {
                    display: flex; gap: 2rem; margin-top: 3rem;
                    padding-top: 2rem; border-top: 1px solid var(--border);
                }
                .mn-stat-num {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.8rem; font-weight: 700; color: var(--teal-light);
                }
                .mn-stat-label { font-size: 0.78rem; color: var(--gray); font-weight: 500; }

                /* HERO VISUAL */
                .mn-hero-visual { position: relative; }
                .mn-hero-card {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid var(--border); border-radius: 20px;
                    padding: 1.5rem; backdrop-filter: blur(20px); position: relative; overflow: hidden;
                }
                .mn-hero-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                }
                .mn-card-header {
                    display: flex; align-items: center; gap: 0.75rem;
                    margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border);
                }
                .mn-doctor-avatar {
                    width: 44px; height: 44px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem;
                }
                .mn-doctor-name { font-weight: 600; font-size: 0.95rem; }
                .mn-doctor-spec { font-size: 0.78rem; color: var(--gray); }
                .mn-status-badge {
                    background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3);
                    color: #10b981; font-size: 0.7rem; font-weight: 600;
                    padding: 0.25rem 0.6rem; border-radius: 100px;
                }
                .mn-consult-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.25rem;
                }
                .mn-info-box {
                    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
                    border-radius: 10px; padding: 0.75rem;
                }
                .mn-info-label { font-size: 0.7rem; color: var(--gray); margin-bottom: 0.2rem; }
                .mn-info-val { font-size: 0.9rem; font-weight: 600; }
                .mn-info-val.teal { color: var(--teal-light); }
                .mn-video-preview {
                    background: #060f1e; border-radius: 12px; height: 120px;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; overflow: hidden; border: 1px solid var(--border);
                }
                .mn-video-icon {
                    width: 44px; height: 44px;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem; box-shadow: 0 0 25px rgba(13,148,136,0.5);
                    animation: mn-breathe 3s infinite;
                }
                @keyframes mn-breathe {
                    0%, 100% { box-shadow: 0 0 25px rgba(13,148,136,0.5); }
                    50% { box-shadow: 0 0 45px rgba(13,148,136,0.8); }
                }
                .mn-float-card {
                    position: absolute; background: rgba(10,22,40,0.9);
                    border: 1px solid var(--border); border-radius: 12px;
                    padding: 0.75rem 1rem; backdrop-filter: blur(20px);
                    font-size: 0.8rem; white-space: nowrap;
                }
                .mn-float-1 { top: -1.5rem; right: -2rem; animation: mn-float1 4s ease-in-out infinite; }
                .mn-float-2 { bottom: -1rem; left: -2rem; animation: mn-float2 4s 1s ease-in-out infinite; }
                @keyframes mn-float1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes mn-float2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
                .mn-float-row { display: flex; align-items: center; gap: 0.5rem; color: var(--gray); }
                .mn-float-row strong { color: #fff; display: block; font-size: 0.82rem; }

                /* SECTIONS */
                .mn-section-label {
                    text-align: center; font-size: 0.75rem; font-weight: 700;
                    letter-spacing: 0.15em; text-transform: uppercase;
                    color: var(--teal-light); margin-bottom: 1rem;
                }
                .mn-h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
                    text-align: center; line-height: 1.2; letter-spacing: -0.02em; margin-bottom: 1rem;
                }
                .mn-section-sub {
                    text-align: center; color: var(--gray); font-size: 1rem;
                    margin-bottom: 4rem; max-width: 500px;
                    margin-left: auto; margin-right: auto; line-height: 1.7; font-weight: 300;
                }

                /* FEATURES */
                .mn-features { padding: 6rem 5%; }
                .mn-features-grid {
                    max-width: 1100px; margin: 0 auto;
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
                }
                .mn-feat-card {
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 16px; padding: 2rem;
                    transition: transform 0.3s, border-color 0.3s, background 0.3s;
                    position: relative; overflow: hidden;
                }
                .mn-feat-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
                    background: transparent; transition: background 0.3s;
                }
                .mn-feat-card:hover { transform: translateY(-4px); border-color: rgba(13,148,136,0.3); background: rgba(13,148,136,0.05); }
                .mn-feat-card:hover::before { background: linear-gradient(90deg, transparent, var(--teal), transparent); }
                .mn-feat-card.large { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
                .mn-feat-icon {
                    width: 48px; height: 48px; background: var(--teal-glow);
                    border: 1px solid rgba(13,148,136,0.2); border-radius: 12px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.3rem; margin-bottom: 1.25rem;
                }
                .mn-feat-title { font-size: 1rem; font-weight: 600; margin-bottom: 0.6rem; }
                .mn-feat-desc { font-size: 0.85rem; color: var(--gray); line-height: 1.65; font-weight: 300; }
                .mn-feat-visual {
                    background: rgba(0,0,0,0.3); border-radius: 12px;
                    padding: 1.5rem; border: 1px solid var(--border);
                }
                .mn-spec-item {
                    background: rgba(13,148,136,0.1); border: 1px solid rgba(13,148,136,0.2);
                    border-radius: 8px; padding: 0.75rem;
                    display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;
                }
                .mn-spec-item.inactive { background: rgba(255,255,255,0.04); border-color: var(--border); }
                .mn-spec-name { font-size: 0.82rem; font-weight: 600; }
                .mn-spec-count { font-size: 0.72rem; color: var(--gray); }

                /* HOW IT WORKS */
                .mn-how {
                    padding: 6rem 5%;
                    background: rgba(255,255,255,0.015);
                    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
                }
                .mn-steps { max-width: 900px; margin: 0 auto; }
                .mn-step {
                    display: grid; grid-template-columns: 80px 1fr; gap: 2rem;
                    align-items: start; padding: 2.5rem 0; border-bottom: 1px solid var(--border);
                }
                .mn-step:last-child { border-bottom: none; }
                .mn-step-num {
                    font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 700;
                    color: rgba(13,148,136,0.2); line-height: 1; text-align: center;
                    transition: color 0.3s;
                }
                .mn-step:hover .mn-step-num { color: rgba(13,148,136,0.5); }
                .mn-step-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; }
                .mn-step-desc { font-size: 0.88rem; color: var(--gray); line-height: 1.65; font-weight: 300; }

                /* PROFILES */
                .mn-profiles { padding: 6rem 5%; }
                .mn-profiles-grid {
                    max-width: 1100px; margin: 0 auto;
                    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;
                }
                .mn-profile-card {
                    border-radius: 20px; padding: 2.5rem 2rem;
                    position: relative; overflow: hidden; border: 1px solid var(--border);
                }
                .mn-profile-card.patient { background: linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.02)); }
                .mn-profile-card.doctor { background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.02)); border-color: rgba(99,102,241,0.15); }
                .mn-profile-card.admin { background: linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02)); border-color: rgba(245,158,11,0.15); }
                .mn-profile-icon { font-size: 2.5rem; margin-bottom: 1.25rem; display: block; }
                .mn-profile-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; margin-bottom: 0.75rem; }
                .mn-profile-desc { font-size: 0.85rem; color: var(--gray); line-height: 1.65; margin-bottom: 1.5rem; font-weight: 300; }
                .mn-profile-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
                .mn-profile-list li { font-size: 0.82rem; color: var(--gray); display: flex; align-items: center; gap: 0.5rem; }
                .mn-profile-list li::before { content: '→'; color: var(--teal-light); font-weight: 700; }
                .mn-profile-card.doctor .mn-profile-list li::before { color: #818cf8; }
                .mn-profile-card.admin .mn-profile-list li::before { color: #fbbf24; }

                /* TECH */
                .mn-tech {
                    padding: 5rem 5%;
                    background: rgba(255,255,255,0.015);
                    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
                }
                .mn-tech-pills {
                    max-width: 800px; margin: 0 auto;
                    display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center;
                }
                .mn-tech-pill {
                    display: flex; align-items: center; gap: 0.5rem;
                    background: var(--card-bg); border: 1px solid var(--border);
                    border-radius: 100px; padding: 0.5rem 1.1rem;
                    font-size: 0.82rem; font-weight: 500; transition: border-color 0.2s, background 0.2s;
                }
                .mn-tech-pill:hover { border-color: rgba(13,148,136,0.3); background: rgba(13,148,136,0.05); }

                /* CTA */
                .mn-cta { padding: 7rem 5%; text-align: center; }
                .mn-cta-inner { max-width: 600px; margin: 0 auto; }
                .mn-cta p { color: var(--gray); font-size: 1rem; font-weight: 300; margin-bottom: 2.5rem; line-height: 1.7; }

                /* FOOTER */
                .mn-footer {
                    border-top: 1px solid var(--border); padding: 2rem 5%;
                    display: flex; align-items: center; justify-content: space-between;
                    position: relative; z-index: 1;
                }
                .mn-footer-logo { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; }
                .mn-footer-logo span { color: var(--teal-light); }
                .mn-footer-text { font-size: 0.78rem; color: var(--gray); }
                .mn-footer-links { display: flex; gap: 1.5rem; }
                .mn-footer-links a { font-size: 0.78rem; color: var(--gray); text-decoration: none; transition: color 0.2s; }
                .mn-footer-links a:hover { color: #fff; }

                .mn-glow-line { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, var(--teal), transparent); }

                @media (max-width: 900px) {
                    .mn-hero-inner { grid-template-columns: 1fr; }
                    .mn-hero-visual { display: none; }
                    .mn-features-grid { grid-template-columns: 1fr 1fr; }
                    .mn-feat-card.large { grid-column: span 2; grid-template-columns: 1fr; }
                    .mn-profiles-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 600px) {
                    .mn-features-grid { grid-template-columns: 1fr; }
                    .mn-feat-card.large { grid-column: span 1; }
                    .mn-nav-links { display: none; }
                    .mn-footer { flex-direction: column; gap: 1rem; text-align: center; }
                }
            `}</style>

            <div style={styles.body}>
                <div style={styles.bgGradient} />
                <div style={styles.bgGrid} />

                {/* NAV */}
                <nav className="mn-nav">
                    <div className="mn-logo">
                        <div className="mn-logo-icon">✚</div>
                        <span className="mn-logo-text">Med<span>New</span></span>
                    </div>
                    <ul className="mn-nav-links">
                        <li><a href="#features">Funcionalidades</a></li>
                        <li><a href="#como-funciona">Como funciona</a></li>
                        <li><a href="#perfis">Perfis</a></li>
                        {auth.user ? (
                            <li>
                                <Link href={route('dashboard')} className="mn-btn-nav">
                                    Dashboard
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li><Link href={route('login')} style={{color:'var(--gray)'}}>Entrar</Link></li>
                                <li>
                                    <Link href={route('register')} className="mn-btn-nav">
                                        Agendar consulta
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                {/* HERO */}
                <section className="mn-section mn-hero">
                    <div className="mn-hero-inner">
                        <div>
                            <div className="mn-badge">
                                <span className="mn-badge-dot" />
                                Telemedicina • Plataforma MVP 2026
                            </div>
                            <h1 className="mn-h1">
                                Saúde de qualidade<br />
                                onde quer que<br />
                                <em>você esteja</em>
                            </h1>
                            <p className="mn-hero-desc">
                                Consulte médicos especialistas de forma remota, segura e eficiente.
                                Agendamento online, videochamada integrada e prontuário digital — tudo em um só lugar.
                            </p>
                            <div className="mn-hero-cta">
                                <Link href={route('register')} className="mn-btn-primary">
                                    ✦ Agendar consulta
                                </Link>
                                <a href="#como-funciona" className="mn-btn-secondary">
                                    Saiba como funciona →
                                </a>
                            </div>
                            <div className="mn-hero-stats">
                                <div>
                                    <div className="mn-stat-num">24/7</div>
                                    <div className="mn-stat-label">Disponibilidade</div>
                                </div>
                                <div>
                                    <div className="mn-stat-num">+50</div>
                                    <div className="mn-stat-label">Especialidades</div>
                                </div>
                                <div>
                                    <div className="mn-stat-num">100%</div>
                                    <div className="mn-stat-label">Online & Seguro</div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Visual */}
                        <div className="mn-hero-visual">
                            <div className="mn-float-card mn-float-1">
                                <div className="mn-float-row">
                                    <span>📅</span>
                                    <div>
                                        <strong>Próxima consulta</strong>
                                        Hoje às 14h30
                                    </div>
                                </div>
                            </div>
                            <div className="mn-hero-card">
                                <div className="mn-card-header">
                                    <div className="mn-doctor-avatar">👨‍⚕️</div>
                                    <div style={{flex:1}}>
                                        <div className="mn-doctor-name">Dr. Rafael Souza</div>
                                        <div className="mn-doctor-spec">Cardiologia · CRM 12345</div>
                                    </div>
                                    <div className="mn-status-badge">● Online</div>
                                </div>
                                <div className="mn-consult-grid">
                                    <div className="mn-info-box">
                                        <div className="mn-info-label">Data</div>
                                        <div className="mn-info-val">27 Fev, 2026</div>
                                    </div>
                                    <div className="mn-info-box">
                                        <div className="mn-info-label">Horário</div>
                                        <div className="mn-info-val teal">14:30</div>
                                    </div>
                                    <div className="mn-info-box">
                                        <div className="mn-info-label">Pagamento</div>
                                        <div className="mn-info-val">Pix ✓</div>
                                    </div>
                                    <div className="mn-info-box">
                                        <div className="mn-info-label">Plataforma</div>
                                        <div className="mn-info-val">Google Meet</div>
                                    </div>
                                </div>
                                <div className="mn-video-preview">
                                    <div className="mn-video-icon">▶</div>
                                    <span style={{position:'absolute',bottom:8,right:10,fontSize:'0.65rem',color:'var(--gray)'}}>🎥 Google Meet · HD</span>
                                </div>
                            </div>
                            <div className="mn-float-card mn-float-2">
                                <div className="mn-float-row">
                                    <span>✅</span>
                                    <div>
                                        <strong>Pagamento confirmado</strong>
                                        via Pix • R$ 180,00
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mn-glow-line" />

                {/* FEATURES */}
                <section className="mn-section mn-features" id="features">
                    <p className="mn-section-label">Funcionalidades</p>
                    <h2 className="mn-h2">Tudo que você precisa,<br />em uma plataforma</h2>
                    <p className="mn-section-sub">Do agendamento à receita digital, o MedNew cobre todo o fluxo da consulta médica remota.</p>
                    <div className="mn-features-grid">
                        <div className="mn-feat-card large">
                            <div>
                                <div className="mn-feat-icon">📅</div>
                                <div className="mn-feat-title">Agendamento Inteligente</div>
                                <p className="mn-feat-desc">Escolha a especialidade, o médico e o horário em poucos cliques. O sistema gera automaticamente o link do Google Meet e envia confirmação por e-mail.</p>
                            </div>
                            <div className="mn-feat-visual">
                                <div className="mn-spec-item"><span>🩺</span><div><div className="mn-spec-name">Cardiologia</div><div className="mn-spec-count">3 médicos disponíveis</div></div></div>
                                <div className="mn-spec-item inactive"><span>🧠</span><div><div className="mn-spec-name">Neurologia</div><div className="mn-spec-count">5 médicos disponíveis</div></div></div>
                                <div className="mn-spec-item inactive"><span>🦴</span><div><div className="mn-spec-name">Ortopedia</div><div className="mn-spec-count">2 médicos disponíveis</div></div></div>
                            </div>
                        </div>
                        <div className="mn-feat-card"><div className="mn-feat-icon">🎥</div><div className="mn-feat-title">Videochamada via Google Meet</div><p className="mn-feat-desc">Sala criada automaticamente pela Google Calendar API ao confirmar o agendamento. Sem instalação adicional.</p></div>
                        <div className="mn-feat-card"><div className="mn-feat-icon">💊</div><div className="mn-feat-title">Prontuário Eletrônico</div><p className="mn-feat-desc">Médico registra diagnóstico, prescrições e observações. Paciente visualiza o histórico completo de consultas.</p></div>
                        <div className="mn-feat-card"><div className="mn-feat-icon">📄</div><div className="mn-feat-title">Receita Digital</div><p className="mn-feat-desc">Emissão de receitas e atestados digitais ao final da consulta, diretamente pelo médico.</p></div>
                        <div className="mn-feat-card"><div className="mn-feat-icon">💳</div><div className="mn-feat-title">Pagamento Mercado Pago</div><p className="mn-feat-desc">Pix, cartão de crédito e débito. Pagamento processado antes da confirmação da consulta.</p></div>
                        <div className="mn-feat-card"><div className="mn-feat-icon">🔔</div><div className="mn-feat-title">Lembretes Automáticos</div><p className="mn-feat-desc">E-mails automáticos 24h e 1h antes da consulta para paciente e médico. Nunca mais esqueça um compromisso.</p></div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="mn-section mn-how" id="como-funciona">
                    <p className="mn-section-label">Como funciona</p>
                    <h2 className="mn-h2">Simples do início ao fim</h2>
                    <p className="mn-section-sub">Em poucos passos, você já está conectado com o seu médico.</p>
                    <div className="mn-steps">
                        {[
                            { n: '01', title: 'Crie sua conta e faça login', desc: 'Cadastre-se como paciente informando nome, CPF, e-mail e telefone. O sistema redireciona você automaticamente para a área correta do seu perfil.' },
                            { n: '02', title: 'Escolha especialidade, médico e horário', desc: 'Navegue pelas especialidades disponíveis, veja a disponibilidade de cada médico e selecione o horário mais conveniente para você.' },
                            { n: '03', title: 'Realize o pagamento', desc: 'Pague via Pix, crédito ou débito através do Mercado Pago. Após a confirmação, a consulta é automaticamente agendada.' },
                            { n: '04', title: 'Receba o link do Google Meet por e-mail', desc: 'Um e-mail de confirmação com o link da videochamada é enviado para você e para o médico. Lembretes automáticos chegam 24h e 1h antes.' },
                            { n: '05', title: 'Consulte e receba seu prontuário', desc: 'Realize a consulta pelo Google Meet. Ao final, o médico registra o prontuário, emite receitas digitais e você avalia o atendimento.' },
                        ].map((step) => (
                            <div className="mn-step" key={step.n}>
                                <div className="mn-step-num">{step.n}</div>
                                <div>
                                    <div className="mn-step-title">{step.title}</div>
                                    <p className="mn-step-desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROFILES */}
                <section className="mn-section mn-profiles" id="perfis">
                    <p className="mn-section-label">Perfis de usuário</p>
                    <h2 className="mn-h2">Uma plataforma,<br />três experiências</h2>
                    <p className="mn-section-sub">Cada perfil tem uma área personalizada com tudo que precisa.</p>
                    <div className="mn-profiles-grid">
                        <div className="mn-profile-card patient">
                            <span className="mn-profile-icon">🧑‍💼</span>
                            <div className="mn-profile-title">Paciente</div>
                            <p className="mn-profile-desc">Acesse cuidados médicos de qualidade sem sair de casa.</p>
                            <ul className="mn-profile-list">
                                <li>Agendar e cancelar consultas</li>
                                <li>Pagar via Pix, crédito ou débito</li>
                                <li>Acessar histórico e prontuários</li>
                                <li>Upload de exames e documentos</li>
                                <li>Avaliar médicos após consulta</li>
                            </ul>
                        </div>
                        <div className="mn-profile-card doctor">
                            <span className="mn-profile-icon">👨‍⚕️</span>
                            <div className="mn-profile-title">Médico</div>
                            <p className="mn-profile-desc">Gerencie sua agenda e atenda pacientes de onde estiver.</p>
                            <ul className="mn-profile-list">
                                <li>Gerenciar horários de disponibilidade</li>
                                <li>Conduzir consultas via Google Meet</li>
                                <li>Preencher prontuário eletrônico</li>
                                <li>Emitir receitas e atestados digitais</li>
                                <li>Visualizar histórico de pacientes</li>
                            </ul>
                        </div>
                        <div className="mn-profile-card admin">
                            <span className="mn-profile-icon">⚙️</span>
                            <div className="mn-profile-title">Administrador</div>
                            <p className="mn-profile-desc">Controle total da plataforma com métricas e relatórios.</p>
                            <ul className="mn-profile-list">
                                <li>Gerenciar usuários e médicos</li>
                                <li>Visualizar métricas e relatórios</li>
                                <li>Controle financeiro da plataforma</li>
                                <li>Gestão de horários e especialidades</li>
                                <li>Monitoramento geral do sistema</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* TECH STACK */}
                <section className="mn-section mn-tech">
                    <p className="mn-section-label">Stack Tecnológica</p>
                    <h2 className="mn-h2">Construído com tecnologias modernas</h2>
                    <p className="mn-section-sub" style={{marginBottom:'2.5rem'}}>Stack selecionada para máxima eficiência no desenvolvimento.</p>
                    <div className="mn-tech-pills">
                        {[
                            ['🐘','Laravel 11'],['⚛️','React'],['🔗','Inertia.js'],['🎨','Tailwind CSS'],
                            ['🐘','PostgreSQL'],['🎥','Google Meet API'],['💳','Mercado Pago'],
                            ['📧','Mailgun'],['🔒','Laravel Breeze'],['🧪','Pest PHP'],
                            ['🐙','GitHub'],['☁️','Railway Deploy'],
                        ].map(([icon, label]) => (
                            <div className="mn-tech-pill" key={label}>
                                <span>{icon}</span> {label}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mn-section mn-cta">
                    <div className="mn-cta-inner">
                        <p className="mn-section-label">MedNew 2026</p>
                        <h2 className="mn-h2">Sua saúde não pode esperar</h2>
                        <p>Agende sua consulta agora e tenha acesso a médicos especialistas em minutos, de qualquer lugar do Brasil.</p>
                        <Link href={route('register')} className="mn-btn-primary">
                            ✦ Começar agora
                        </Link>
                    </div>
                </section>

                <div className="mn-glow-line" />

                {/* FOOTER */}
                <footer className="mn-footer">
                    <div className="mn-footer-logo">Med<span>New</span></div>
                    <div className="mn-footer-text">© 2026 MedNew • Imersão Profissional: Fábrica de Software</div>
                    <div className="mn-footer-links">
                        <a href="#">Privacidade</a>
                        <a href="#">LGPD</a>
                        <a href="#">Termos</a>
                    </div>
                </footer>
            </div>
        </>
    );
}