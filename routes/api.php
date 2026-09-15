<?php

use App\Rest\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Layers\Tickets\Controllers\TicketExportController;
use Layers\Tickets\Controllers\TicketTransitionController;
use Layers\Tickets\Enums\TicketPermission;
use Lomkit\Rest\Facades\Rest;

Route::middleware('auth:sanctum')
    ->prefix('v1')
    ->group(function (): void {
        Route::get('tickets/export', TicketExportController::class)->name('tickets.export');

        Rest::resource('tickets', TicketController::class)->withSoftDeletes();

        Route::post('tickets/{ticket}/start-work', [TicketTransitionController::class, 'startWork'])
            ->name('tickets.start-work');

        Route::post('tickets/{ticket}/resolve', [TicketTransitionController::class, 'resolve'])
            ->name('tickets.resolve');

        Route::middleware('can:'.TicketPermission::Assign->value)->group(function (): void {
            Route::post('tickets/{ticket}/assign/{technician}', [TicketTransitionController::class, 'assign'])
                ->name('tickets.assign');

            Route::post('tickets/{ticket}/unassign', [TicketTransitionController::class, 'unassign'])
                ->name('tickets.unassign');
        });

        Route::post('tickets/{ticket}/close', [TicketTransitionController::class, 'close'])
            ->middleware('can:'.TicketPermission::Close->value)
            ->name('tickets.close');
    });
