<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pagamento extends Model
{
    protected $fillable = [
        'consulta_id',
        'paciente_id',
        'valor',
        'metodo',
        'status',
        'transaction_id',
        'pago_em',
    ];

    // Pagamento pertence a uma consulta
    public function consulta()
    {
        return $this->belongsTo(Consulta::class);
    }

    // Pagamento pertence a um paciente
    public function paciente()
    {
        return $this->belongsTo(User::class, 'paciente_id');
    }
}