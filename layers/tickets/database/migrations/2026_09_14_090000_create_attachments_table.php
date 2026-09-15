<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attachments', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('ticket_id')
                ->constrained('tickets')
                ->restrictOnDelete();

            $table->foreignId('uploaded_by_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('disk');
            $table->string('path');
            $table->string('name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
