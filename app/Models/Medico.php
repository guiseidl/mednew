<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medico extends Model
{
    protected $fillable = [
        'user_id',
        'crm',
        'especialidade',
        'valor_consulta',
    ];

    // Relacionamento: médico pertence a um usuário
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relacionamento: médico tem muitas consultas
    public function consultas()
    {
        return $this->hasMany(Consulta::class, 'medico_id');
    }
}