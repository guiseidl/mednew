import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Entrar — MedNew" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
                * { margin: 0; padding: 0; box-sizing: border-box; }
                :root {
                    --navy: #0a1628; --teal: #0d9488; --teal-light: #14b8a6;
                    --gray: #94a3b8; --border: rgba(255,255,255,0.08);
                }
                .mn-auth-body {
                    min-height: 100vh; background: var(--navy);
                    font-family: 'DM Sans', sans-serif; color: #fff;
                    display: flex; align-items: center; justify-content: center;
                    position: relative; overflow: hidden;
                }
                .mn-auth-body::before {
                    content: ''; position: fixed; inset: 0;
                    background: radial-gradient(ellipse 80% 60% at 70% -10%, rgba(13,148,136,0.18) 0%, transparent 60%),
                                radial-gradient(ellipse 60% 50% at -10% 80%, rgba(13,148,136,0.10) 0%, transparent 60%);
                    pointer-events: none;
                }
                .mn-auth-body::after {
                    content: ''; position: fixed; inset: 0;
                    background-image: linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
                    background-size: 60px 60px; pointer-events: none;
                }
                .mn-auth-card {
                    position: relative; z-index: 1;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid var(--border); border-radius: 24px;
                    padding: 2.5rem; width: 100%; max-width: 440px;
                    backdrop-filter: blur(20px);
                    box-shadow: 0 25px 60px rgba(0,0,0,0.4);
                }
                .mn-auth-card::before {
                    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
                    background: linear-gradient(90deg, transparent, var(--teal), transparent);
                    border-radius: 24px 24px 0 0;
                }
                .mn-auth-logo { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem; justify-content: center; }
                .mn-auth-logo-icon {
                    width: 36px; height: 36px;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    border-radius: 10px; display: flex; align-items: center; justify-content: center;
                    font-size: 1.1rem; box-shadow: 0 0 20px rgba(13,148,136,0.4);
                }
                .mn-auth-logo-text {
                    font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700;
                }
                .mn-auth-logo-text span { color: var(--teal-light); }
                .mn-auth-title {
                    font-family: 'Playfair Display', serif; font-size: 1.8rem;
                    font-weight: 700; text-align: center; margin-bottom: 0.5rem;
                }
                .mn-auth-sub { text-align: center; color: var(--gray); font-size: 0.88rem; margin-bottom: 2rem; font-weight: 300; }
                .mn-field { margin-bottom: 1.25rem; }
                .mn-label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--gray); margin-bottom: 0.5rem; letter-spacing: 0.03em; }
                .mn-input {
                    width: 100%; padding: 0.75rem 1rem;
                    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
                    border-radius: 10px; color: #fff; font-size: 0.92rem;
                    font-family: 'DM Sans', sans-serif; transition: border-color 0.2s, background 0.2s;
                    outline: none;
                }
                .mn-input:focus { border-color: var(--teal); background: rgba(13,148,136,0.05); }
                .mn-input::placeholder { color: rgba(148,163,184,0.5); }
                .mn-remember { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
                .mn-remember span { font-size: 0.82rem; color: var(--gray); }
                .mn-btn {
                    width: 100%; padding: 0.85rem;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; border: none; border-radius: 10px;
                    font-size: 0.95rem; font-weight: 600; cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.35);
                    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
                }
                .mn-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }
                .mn-btn:disabled { opacity: 0.7; cursor: not-allowed; }
                .mn-auth-footer { text-align: center; margin-top: 1.5rem; font-size: 0.82rem; color: var(--gray); }
                .mn-auth-footer a { color: var(--teal-light); text-decoration: none; font-weight: 500; }
                .mn-auth-footer a:hover { text-decoration: underline; }
                .mn-status { background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #10b981; border-radius: 8px; padding: 0.75rem 1rem; font-size: 0.82rem; margin-bottom: 1.25rem; }
                .mn-forgot { font-size: 0.8rem; color: var(--gray); text-decoration: none; display: block; text-align: right; margin-top: 0.4rem; }
                .mn-forgot:hover { color: var(--teal-light); }
                .mn-divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; }
                .mn-divider::before, .mn-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
                .mn-divider span { font-size: 0.75rem; color: var(--gray); }
                .mn-back { display: flex; justify-content: center; margin-top: 1rem; }
                .mn-back a { font-size: 0.78rem; color: var(--gray); text-decoration: none; display: flex; align-items: center; gap: 0.3rem; transition: color 0.2s; }
                .mn-back a:hover { color: #fff; }
            `}</style>

            <div className="mn-auth-body">
                <div className="mn-auth-card">
                    <div className="mn-auth-logo">
                        <div className="mn-auth-logo-icon">✚</div>
                        <span className="mn-auth-logo-text">Med<span>New</span></span>
                    </div>

                    <h1 className="mn-auth-title">Bem-vindo de volta</h1>
                    <p className="mn-auth-sub">Acesse sua conta para continuar</p>

                    {status && <div className="mn-status">{status}</div>}

                    <form onSubmit={submit}>
                        <div className="mn-field">
                            <label className="mn-label" htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="email"
                                className="mn-input"
                                placeholder="seu@email.com"
                                value={data.email}
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mn-field">
                            <label className="mn-label" htmlFor="password">Senha</label>
                            <input
                                id="password"
                                type="password"
                                className="mn-input"
                                placeholder="••••••••"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {canResetPassword && (
                                <Link href={route('password.request')} className="mn-forgot">
                                    Esqueceu a senha?
                                </Link>
                            )}
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mn-remember">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span>Lembrar de mim</span>
                        </div>

                        <button className="mn-btn" disabled={processing}>
                            {processing ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mn-divider"><span>ou</span></div>

                    <div className="mn-auth-footer">
                        Não tem uma conta?{' '}
                        <Link href={route('register')}>Criar conta grátis</Link>
                    </div>

                    <div className="mn-back">
                        <Link href="/">← Voltar para o início</Link>
                    </div>
                </div>
            </div>
        </>
    );
}