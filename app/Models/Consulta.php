<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    protected $fillable = [
        'paciente_id',
        'medico_id',
        'data',
        'hora',
        'status',
        'link_meet',
        'valor',
    ];

    // Consulta pertence a um paciente (usuário)
    public function paciente()
    {
        return $this->belongsTo(User::class, 'paciente_id');
    }

    // Consulta pertence a um médico (usuário)
    public function medico()
    {
        return $this->belongsTo(User::class, 'medico_id');
    }

    // Consulta tem um prontuário
    public function prontuario()
    {
        return $this->hasOne(Prontuario::class);
    }

    // Consulta tem um pagamento
    public function pagamento()
    {
        return $this->hasOne(Pagamento::class);
    }
}