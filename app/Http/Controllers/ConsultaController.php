<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use App\Models\Medico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ConsultaController extends Controller
{
    /**
     * Página de agendamento — lista médicos disponíveis
     */
    public function create()
    {
        $medicos = Medico::with('user')
            ->get()
            ->map(fn($m) => [
                'id'             => $m->id,
                'user_id'        => $m->user_id,
                'nome'           => $m->user->name,
                'especialidade'  => $m->especialidade,
                'crm'            => $m->crm,
                'valor_consulta' => $m->valor_consulta,
            ]);

        return Inertia::render('Paciente/Agendar', [
            'medicos' => $medicos,
        ]);
    }

    /**
     * Retorna horários disponíveis de um médico em uma data
     */
    public function horariosDisponiveis(Request $request)
    {
        $request->validate([
            'medico_id' => 'required|exists:medicos,id',
            'data'      => 'required|date|after_or_equal:today',
        ]);

        $medico = Medico::findOrFail($request->medico_id);

        // Horários padrão de atendimento
        $horariosPadrao = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
            '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
            '16:00', '16:30', '17:00', '17:30',
        ];

        // Horários já ocupados nessa data
        $ocupados = Consulta::where('medico_id', $medico->user_id)
            ->where('data', $request->data)
            ->whereIn('status', ['agendada', 'concluida'])
            ->pluck('hora')
            ->map(fn($h) => substr($h, 0, 5))
            ->toArray();

        $disponiveis = array_values(array_filter(
            $horariosPadrao,
            fn($h) => !in_array($h, $ocupados)
        ));

        return response()->json($disponiveis);
    }

    /**
     * Salva a consulta no banco
     */
    public function store(Request $request)
    {
        $request->validate([
            'medico_id' => 'required|exists:medicos,id',
            'data'      => 'required|date|after_or_equal:today',
            'hora'      => 'required|string',
        ]);

        $medico = Medico::findOrFail($request->medico_id);

        // Verifica se o horário ainda está disponível
        $conflito = Consulta::where('medico_id', $medico->user_id)
            ->where('data', $request->data)
            ->where('hora', $request->hora)
            ->whereIn('status', ['agendada', 'concluida'])
            ->exists();

        if ($conflito) {
            return back()->withErrors(['hora' => 'Este horário não está mais disponível.']);
        }

        Consulta::create([
            'paciente_id' => Auth::id(),
            'medico_id'   => $medico->user_id,
            'data'        => $request->data,
            'hora'        => $request->hora,
            'status'      => 'agendada',
            'valor'       => $medico->valor_consulta,
        ]);

        return redirect()->route('dashboard')->with('success', 'Consulta agendada com sucesso!');
    }

    /**
     * Lista consultas do paciente logado
     */
    public function index()
    {
        $consultas = Consulta::with(['medico', 'medico.medico'])
            ->where('paciente_id', Auth::id())
            ->orderBy('data', 'desc')
            ->orderBy('hora', 'desc')
            ->get()
            ->map(fn($c) => [
                'id'            => $c->id,
                'medico_nome'   => $c->medico->name,
                'especialidade' => $c->medico->medico?->especialidade ?? '—',
                'data'          => $c->data,
                'hora'          => substr($c->hora, 0, 5),
                'status'        => $c->status,
                'valor'         => $c->valor,
                'link_meet'     => $c->link_meet,
            ]);

        return Inertia::render('Paciente/Consultas', [
            'consultas' => $consultas,
        ]);
    }

    /**
     * Cancelar consulta (mínimo 2h de antecedência — RF09)
     */
    public function cancelar(Consulta $consulta)
    {
        if ($consulta->paciente_id !== Auth::id()) {
            abort(403);
        }

        $dataHora = \Carbon\Carbon::parse($consulta->data . ' ' . $consulta->hora);
        if (now()->diffInHours($dataHora, false) < 2) {
            return back()->withErrors(['cancelar' => 'Cancelamento deve ser feito com no mínimo 2h de antecedência.']);
        }

        $consulta->update(['status' => 'cancelada']);

        return back()->with('success', 'Consulta cancelada com sucesso.');
    }
}