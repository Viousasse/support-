<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;

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
                ->default(TicketStatus::Open->value)
                ->index();

            $table->string('priority')
                ->default(TicketPriority::Normal->value)
                ->index();

            $table->timestamp('resolved_at')
                ->nullable()
                ->index();

            $table->timestamps();
            $table->softDeletes();

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
