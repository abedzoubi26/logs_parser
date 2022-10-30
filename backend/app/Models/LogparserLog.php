<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogparserLog extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $appends = ['is_high_cpu', 'is_high_ram'];

    public function getIsHighCpuAttribute()
    {
        return $this->cpu_usage > config('log-reader.max_cpu_threshold');
    }

    public function getIsHighRamAttribute()
    {
        return $this->ram_usage > config('log-reader.max_ram_threshold');
    }
}
