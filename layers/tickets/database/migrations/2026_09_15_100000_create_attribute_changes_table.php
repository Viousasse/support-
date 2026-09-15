<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attribute_changes', function (Blueprint $table): void {
            $table->id();

            $table->morphs('recordable');

            $table->foreignId('author_id')
                ->nullable()
                ->constrained('users')
                ->restrictOnDelete();

            $table->string('attribute')->index();
            $table->string('old_value')->nullable();
            $table->string('new_value')->nullable();

            $table->timestamps();

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attribute_changes');
    }
};
