<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('requester_id')
    ->constrained('users')
    ->restrictOnDelete();

            $table->foreignId('assigned_technician_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('title')->index();
            $table->text('description');

            $table->string('status')
                ->default('open')
                ->index();

            $table->string('priority')
                ->default('normal')
                ->index();

            $table->timestamp('resolved_at')
                ->nullable()
                ->index();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};