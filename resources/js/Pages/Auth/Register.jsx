import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        cpf: '',
        telefone: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const formatCPF = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    };

    const formatTelefone = (value) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    return (
        <>
            <Head title="Criar conta — MedNew" />

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
                    position: relative; overflow: hidden; padding: 2rem 1rem;
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
                    padding: 2.5rem; width: 100%; max-width: 500px;
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
                .mn-auth-logo-text { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 700; }
                .mn-auth-logo-text span { color: var(--teal-light); }
                .mn-auth-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; text-align: center; margin-bottom: 0.5rem; }
                .mn-auth-sub { text-align: center; color: var(--gray); font-size: 0.88rem; margin-bottom: 2rem; font-weight: 300; }
                .mn-field { margin-bottom: 1.25rem; }
                .mn-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem; }
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
                .mn-divider-section {
                    font-size: 0.72rem; font-weight: 700; color: var(--teal-light);
                    letter-spacing: 0.1em; text-transform: uppercase;
                    margin: 1.5rem 0 1rem; display: flex; align-items: center; gap: 0.75rem;
                }
                .mn-divider-section::before, .mn-divider-section::after {
                    content: ''; flex: 1; height: 1px; background: var(--border);
                }
                .mn-btn {
                    width: 100%; padding: 0.85rem;
                    background: linear-gradient(135deg, var(--teal), var(--teal-light));
                    color: #fff; border: none; border-radius: 10px;
                    font-size: 0.95rem; font-weight: 600; cursor: pointer;
                    font-family: 'DM Sans', sans-serif;
                    box-shadow: 0 4px 20px rgba(13,148,136,0.35);
                    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
                    margin-top: 0.5rem;
                }
                .mn-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(13,148,136,0.5); }
                .mn-btn:disabled { opacity: 0.7; cursor: not-allowed; }
                .mn-auth-footer { text-align: center; margin-top: 1.5rem; font-size: 0.82rem; color: var(--gray); }
                .mn-auth-footer a { color: var(--teal-light); text-decoration: none; font-weight: 500; }
                .mn-auth-footer a:hover { text-decoration: underline; }
                .mn-divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; }
                .mn-divider::before, .mn-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
                .mn-divider span { font-size: 0.75rem; color: var(--gray); }
                .mn-back { display: flex; justify-content: center; margin-top: 1rem; }
                .mn-back a { font-size: 0.78rem; color: var(--gray); text-decoration: none; transition: color 0.2s; }
                .mn-back a:hover { color: #fff; }
                .mn-terms { font-size: 0.75rem; color: var(--gray); text-align: center; margin-top: 1rem; line-height: 1.5; }
                .mn-terms a { color: var(--teal-light); text-decoration: none; }
            `}</style>

            <div className="mn-auth-body">
                <div className="mn-auth-card">
                    <div className="mn-auth-logo">
                        <div className="mn-auth-logo-icon">✚</div>
                        <span className="mn-auth-logo-text">Med<span>New</span></span>
                    </div>

                    <h1 className="mn-auth-title">Criar sua conta</h1>
                    <p className="mn-auth-sub">Comece a cuidar da sua saúde hoje mesmo</p>

                    <form onSubmit={submit}>

                        <div className="mn-divider-section">Dados pessoais</div>

                        <div className="mn-field">
                            <label className="mn-label" htmlFor="name">Nome completo</label>
                            <input
                                id="name" type="text" className="mn-input"
                                placeholder="Seu nome completo"
                                value={data.name} autoComplete="name" autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mn-field-row">
                            <div>
                                <label className="mn-label" htmlFor="cpf">CPF</label>
                                <input
                                    id="cpf" type="text" className="mn-input"
                                    placeholder="000.000.000-00"
                                    value={data.cpf} maxLength={14}
                                    onChange={(e) => setData('cpf', formatCPF(e.target.value))}
                                    required
                                />
                                <InputError message={errors.cpf} className="mt-2" />
                            </div>
                            <div>
                                <label className="mn-label" htmlFor="telefone">Telefone</label>
                                <input
                                    id="telefone" type="text" className="mn-input"
                                    placeholder="(00) 00000-0000"
                                    value={data.telefone} maxLength={15}
                                    onChange={(e) => setData('telefone', formatTelefone(e.target.value))}
                                />
                                <InputError message={errors.telefone} className="mt-2" />
                            </div>
                        </div>

                        <div className="mn-divider-section">Acesso</div>

                        <div className="mn-field">
                            <label className="mn-label" htmlFor="email">E-mail</label>
                            <input
                                id="email" type="email" className="mn-input"
                                placeholder="seu@email.com"
                                value={data.email} autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mn-field-row">
                            <div>
                                <label className="mn-label" htmlFor="password">Senha</label>
                                <input
                                    id="password" type="password" className="mn-input"
                                    placeholder="••••••••"
                                    value={data.password} autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <label className="mn-label" htmlFor="password_confirmation">Confirmar senha</label>
                                <input
                                    id="password_confirmation" type="password" className="mn-input"
                                    placeholder="••••••••"
                                    value={data.password_confirmation} autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        <button className="mn-btn" disabled={processing}>
                            {processing ? 'Criando conta...' : '✦ Criar minha conta'}
                        </button>
                    </form>

                    <p className="mn-terms">
                        Ao criar uma conta, você concorda com nossa{' '}
                        <a href="#">Política de Privacidade</a> e{' '}
                        <a href="#">Termos de Uso</a> em conformidade com a LGPD.
                    </p>

                    <div className="mn-divider"><span>ou</span></div>

                    <div className="mn-auth-footer">
                        Já tem uma conta?{' '}
                        <Link href={route('login')}>Entrar</Link>
                    </div>

                    <div className="mn-back">
                        <Link href="/">← Voltar para o início</Link>
                    </div>
                </div>
            </div>
        </>
    );
}