<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_imports', function (Blueprint $table): void {
            $table->id();

            $table->foreignId('uploaded_by_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('disk');
            $table->string('path');
            $table->unsignedInteger('rows_read')->default(0);
            $table->unsignedInteger('rows_created')->default(0);
            $table->json('rejections')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_imports');
    }
};
