<?php

use App\Rest\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Layers\Tickets\Controllers\TicketExportController;
use Lomkit\Rest\Facades\Rest;

Route::middleware('auth:sanctum')
    ->prefix('v1')
    ->group(function (): void {
        Rest::resource('tickets', TicketController::class)->withSoftDeletes();

        Route::get('/tickets/export', TicketExportController::class);
    });