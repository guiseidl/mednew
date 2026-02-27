<?php

namespace App\Http\Controllers;

class PaginaController extends Controller
{
    public function inicio()
    {
        $dados = [
            'nome' => 'MedNew',
            'descricao' => 'Plataforma de Telemedicina'
        ];

        return view('welcome', $dados);
    }
}