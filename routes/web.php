<?php

use App\Http\Controllers\LogoutController;
use App\Livewire\Auth\Login;
use App\Livewire\Tickets\TicketForm;
use App\Livewire\Tickets\TicketImportForm;
use App\Livewire\Tickets\TicketList;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/tickets');

Route::middleware('guest')->group(function (): void {
    Route::livewire('/login', Login::class)->name('login');
});

Route::middleware('auth')->group(function (): void {
    Route::post('/logout', LogoutController::class)->name('logout');

    Route::livewire('/tickets', TicketList::class)->name('tickets.index');
    Route::livewire('/tickets/create', TicketForm::class)->name('tickets.create');
    Route::livewire('/tickets/import', TicketImportForm::class)->name('tickets.import');
    Route::livewire('/tickets/{ticket}/edit', TicketForm::class)->name('tickets.edit');
});
