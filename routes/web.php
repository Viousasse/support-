<?php

use Illuminate\Support\Facades\Route;
use App\Livewire\TicketList;
use App\Livewire\SimpleTest;

Route::get('/test', fn () => 'OK');

Route::get('/tickets', TicketList::class);
Route::get('/debug', fn () => 'HELLO');
Route::get('/test-view', fn () => view('test-view'));
Route::get('/livewire-test', SimpleTest::class);
