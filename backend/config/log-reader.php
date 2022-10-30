<?php


return [


    'default' => env('LOG_HANDLER', 'txt'),
    'handlers' => [
        'txt',
        'csv',
    ],
    'max_cpu_threshold' => 90,
    'max_ram_threshold' => 3.5,

];
