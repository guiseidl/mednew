import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ children }) {
    const user = usePage().props.auth.user;
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
                :root {
                    --navy: #0a1628; --teal: #0d9488; --teal-light: #14b8a6;
                    --gray: #94a3b8; --border: rgba(255,255,255,0.08);
                }
                * { box-sizing: border-box; }
                body { margin: 0; background: var(--navy); font-family: 'DM Sans', sans-serif; }

                .mn-layout { min-height: 100vh; background: var(--navy); }

                /* NAVBAR */
                .mn-navbar {
                    position: sticky; top: 0; z-index: 100;
                    background: rgba(10,22,40,0.85);
                    border-bottom: 1px solid var(--border);
                    backdrop-filter: blur(20px);
                }
                .mn-navbar-inner {
                    max-width: 1280px; margin: 0 auto;
                    padding: 0 2rem;
                    display: flex; align-items: center; justify-content: space-between;
                    height: 64px;
                }

                /* LOGO */
                .mn-nav-logo { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
                .mn-nav-logo-icon {
                    width: 34px; height: 34px;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    border-radius: 9px; display: flex; align-items: center; justify-content: center;
                    font-size: 1rem; box-shadow: 0 0 16px rgba(13,148,136,0.4);
                }
                .mn-nav-logo-text {
                    font-family: 'Playfair Display', serif; font-size: 1.3rem;
                    font-weight: 700; color: #fff; letter-spacing: -0.02em;
                }
                .mn-nav-logo-text span { color: var(--teal-light); }

                /* NAV LINKS */
                .mn-nav-links {
                    display: flex; align-items: center; gap: 0.25rem; list-style: none;
                    margin: 0; padding: 0;
                }
                .mn-nav-links a {
                    color: var(--gray); text-decoration: none; font-size: 0.88rem;
                    font-weight: 500; padding: 0.5rem 0.85rem; border-radius: 8px;
                    transition: color 0.2s, background 0.2s; display: flex; align-items: center; gap: 0.4rem;
                }
                .mn-nav-links a:hover { color: #fff; background: rgba(255,255,255,0.05); }
                .mn-nav-links a.active { color: var(--teal-light); background: rgba(13,148,136,0.1); }

                /* USER DROPDOWN */
                .mn-nav-right { display: flex; align-items: center; gap: 1rem; position: relative; }
                .mn-user-btn {
                    display: flex; align-items: center; gap: 0.6rem;
                    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
                    border-radius: 10px; padding: 0.45rem 0.85rem;
                    cursor: pointer; transition: border-color 0.2s, background 0.2s;
                    color: #fff; font-family: 'DM Sans', sans-serif; font-size: 0.88rem; font-weight: 500;
                }
                .mn-user-btn:hover { border-color: rgba(13,148,136,0.3); background: rgba(13,148,136,0.05); }
                .mn-user-avatar {
                    width: 28px; height: 28px; border-radius: 8px;
                    background: linear-gradient(135deg, var(--teal), #0f7065);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 0.75rem; font-weight: 700; color: #fff;
                }
                .mn-user-name { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .mn-chevron { color: var(--gray); font-size: 0.7rem; transition: transform 0.2s; }
                .mn-chevron.open { transform: rotate(180deg); }

                /* DROPDOWN MENU */
                .mn-dropdown {
                    position: absolute; top: calc(100% + 0.5rem); right: 0;
                    background: #0f1e35; border: 1px solid var(--border);
                    border-radius: 12px; min-width: 200px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    overflow: hidden; z-index: 200;
                    animation: mn-dropdown-in 0.15s ease;
                }
                @keyframes mn-dropdown-in {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .mn-dropdown-header {
                    padding: 1rem; border-bottom: 1px solid var(--border);
                }
                .mn-dropdown-name { font-size: 0.88rem; font-weight: 600; color: #fff; }
                .mn-dropdown-email { font-size: 0.75rem; color: var(--gray); margin-top: 0.1rem; }
                .mn-dropdown-tipo {
                    display: inline-block; margin-top: 0.4rem;
                    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em;
                    text-transform: uppercase; color: var(--teal-light);
                    background: rgba(13,148,136,0.1); border: 1px solid rgba(13,148,136,0.2);
                    padding: 0.15rem 0.5rem; border-radius: 100px;
                }
                .mn-dropdown-item {
                    display: flex; align-items: center; gap: 0.6rem;
                    padding: 0.75rem 1rem; color: var(--gray); text-decoration: none;
                    font-size: 0.85rem; transition: background 0.15s, color 0.15s;
                    border: none; background: none; width: 100%; cursor: pointer;
                    font-family: 'DM Sans', sans-serif; text-align: left;
                }
                .mn-dropdown-item:hover { background: rgba(255,255,255,0.04); color: #fff; }
                .mn-dropdown-item.danger:hover { background: rgba(239,68,68,0.08); color: #ef4444; }
                .mn-dropdown-divider { height: 1px; background: var(--border); }

                /* MOBILE MENU BUTTON */
                .mn-mobile-btn {
                    display: none; background: none; border: none;
                    color: var(--gray); cursor: pointer; padding: 0.4rem;
                    border-radius: 8px; transition: color 0.2s;
                }
                .mn-mobile-btn:hover { color: #fff; }

                /* MOBILE MENU */
                .mn-mobile-menu {
                    display: none; background: #0f1e35;
                    border-top: 1px solid var(--border); padding: 1rem;
                }
                .mn-mobile-menu.open { display: block; }
                .mn-mobile-link {
                    display: flex; align-items: center; gap: 0.5rem;
                    color: var(--gray); text-decoration: none; font-size: 0.9rem;
                    padding: 0.75rem 0.5rem; border-bottom: 1px solid var(--border);
                    transition: color 0.2s;
                }
                .mn-mobile-link:last-child { border-bottom: none; }
                .mn-mobile-link:hover { color: #fff; }

                /* MAIN */
                .mn-main { min-height: calc(100vh - 64px); }

                @media (max-width: 768px) {
                    .mn-nav-links { display: none; }
                    .mn-mobile-btn { display: flex; }
                    .mn-user-name { display: none; }
                }
            `}</style>

            <div className="mn-layout">
                {/* NAVBAR */}
                <nav className="mn-navbar">
                    <div className="mn-navbar-inner">
                        {/* Logo */}
                        <Link href="/dashboard" className="mn-nav-logo">
                            <div className="mn-nav-logo-icon">✚</div>
                            <span className="mn-nav-logo-text">Med<span>New</span></span>
                        </Link>

                        {/* Links de navegação */}
                        <ul className="mn-nav-links">
                            <li>
                                <Link href={route('dashboard')} className={route().current('dashboard') ? 'active' : ''}>
                                    📅 Dashboard
                                </Link>
                            </li>
                            <li>
                                <a href="#">📋 Consultas</a>
                            </li>
                            <li>
                                <a href="#">📁 Prontuários</a>
                            </li>
                            <li>
                                <a href="#">💊 Receitas</a>
                            </li>
                        </ul>

                        {/* Lado direito */}
                        <div className="mn-nav-right">
                            {/* User dropdown */}
                            <div style={{position:'relative'}}>
                                <button
                                    className="mn-user-btn"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="mn-user-avatar">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="mn-user-name">{user.name}</span>
                                    <span className={`mn-chevron ${dropdownOpen ? 'open' : ''}`}>▼</span>
                                </button>

                                {dropdownOpen && (
                                    <>
                                        {/* Overlay para fechar */}
                                        <div
                                            style={{position:'fixed',inset:0,zIndex:150}}
                                            onClick={() => setDropdownOpen(false)}
                                        />
                                        <div className="mn-dropdown">
                                            <div className="mn-dropdown-header">
                                                <div className="mn-dropdown-name">{user.name}</div>
                                                <div className="mn-dropdown-email">{user.email}</div>
                                                <span className="mn-dropdown-tipo">{user.tipo || 'paciente'}</span>
                                            </div>
                                            <Link
                                                href={route('profile.edit')}
                                                className="mn-dropdown-item"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                👤 Meu perfil
                                            </Link>
                                            <Link
                                                href="#"
                                                className="mn-dropdown-item"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                ⚙️ Configurações
                                            </Link>
                                            <div className="mn-dropdown-divider" />
                                            <Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="mn-dropdown-item danger"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                🚪 Sair
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                className="mn-mobile-btn"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                {menuOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu */}
                    <div className={`mn-mobile-menu ${menuOpen ? 'open' : ''}`}>
                        <Link href={route('dashboard')} className="mn-mobile-link" onClick={() => setMenuOpen(false)}>📅 Dashboard</Link>
                        <a href="#" className="mn-mobile-link">📋 Consultas</a>
                        <a href="#" className="mn-mobile-link">📁 Prontuários</a>
                        <a href="#" className="mn-mobile-link">💊 Receitas</a>
                        <Link href={route('profile.edit')} className="mn-mobile-link" onClick={() => setMenuOpen(false)}>👤 Meu perfil</Link>
                        <Link href={route('logout')} method="post" as="button" className="mn-mobile-link" style={{color:'#ef4444'}}>🚪 Sair</Link>
                    </div>
                </nav>

                {/* CONTEÚDO */}
                <main className="mn-main">
                    {children}
                </main>
            </div>
        </>
    );
}