<?php

use App\Rest\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Layers\Tickets\Controllers\TicketExportController;
use Lomkit\Rest\Facades\Rest;
use App\Http\Controllers\TicketTransitionController;
Route::middleware('auth:sanctum')
    ->prefix('v1')
    ->group(function (): void {
        Rest::resource('tickets', TicketController::class)->withSoftDeletes();
        Route::post('/tickets/{ticket}/assign/{technician}', [TicketTransitionController::class, 'assign']);
        Route::post('/tickets/{ticket}/start-work', [TicketTransitionController::class, 'startWork']);
        Route::post('/tickets/{ticket}/unassign', [TicketTransitionController::class, 'unassign']);
        Route::post('/tickets/{ticket}/resolve', [TicketTransitionController::class, 'resolve']);
        Route::post('/tickets/{ticket}/close', [TicketTransitionController::class, 'close']);
        Route::get('/tickets/export', TicketExportController::class);
    });