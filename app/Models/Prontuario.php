<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prontuario extends Model
{
    protected $fillable = [
        'consulta_id',
        'medico_id',
        'paciente_id',
        'diagnostico',
        'prescricao',
        'observacoes',
        'arquivo_exame',
    ];

    // Prontuário pertence a uma consulta
    public function consulta()
    {
        return $this->belongsTo(Consulta::class);
    }

    // Prontuário pertence a um paciente
    public function paciente()
    {
        return $this->belongsTo(User::class, 'paciente_id');
    }

    // Prontuário pertence a um médico
    public function medico()
    {
        return $this->belongsTo(User::class, 'medico_id');
    }
}