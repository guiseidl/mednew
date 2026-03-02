<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ConsultaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// ─── PACIENTE ────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Paciente/Dashboard');
    })->name('dashboard');

    // Agendamento
    Route::get('/agendar', [ConsultaController::class, 'create'])->name('consultas.create');
    Route::post('/agendar', [ConsultaController::class, 'store'])->name('consultas.store');
    Route::get('/agendar/horarios', [ConsultaController::class, 'horariosDisponiveis'])->name('consultas.horarios');

    // Consultas
    Route::get('/consultas', [ConsultaController::class, 'index'])->name('consultas.index');
    Route::patch('/consultas/{consulta}/cancelar', [ConsultaController::class, 'cancelar'])->name('consultas.cancelar');
});

// ─── MÉDICO ──────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->prefix('medico')->name('medico.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Medico/Dashboard');
    })->name('dashboard');
});

// ─── ADMIN ───────────────────────────────────────────────────
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
});

// ─── PERFIL ──────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';