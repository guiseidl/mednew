<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
   protected $fillable = [
    'name',
    'email',
    'password',
    'cpf',
    'telefone',
    'tipo',
];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function medico()
{
    return $this->hasOne(Medico::class);
}

// Usuário tem muitas consultas como paciente
public function consultasPaciente()
{
    return $this->hasMany(Consulta::class, 'paciente_id');
}

// Usuário tem muitas consultas como médico
public function consultasMedico()
{
    return $this->hasMany(Consulta::class, 'medico_id');
}

// Usuário tem muitos prontuários como paciente
public function prontuarios()
{
    return $this->hasMany(Prontuario::class, 'paciente_id');
}

// Usuário tem muitos pagamentos
public function pagamentos()
{
    return $this->hasMany(Pagamento::class, 'paciente_id');
}
}
