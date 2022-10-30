<?php

namespace App\Services\Handlers;

use App\Services\Handlers\Contracts\FileHandlerBase;

class TxtfileHandler extends FileHandlerBase
{

    public function fetchData($request)
    {
        $summaryText = file_get_contents($request->file('log'));

        $summaryText = explode(PHP_EOL, trim($summaryText));
        $readed = [];
        foreach ($summaryText as $line) {
            $line = explode(' ', $line);
            $readed[] = [
                'created_at' =>  $line[0] . ' ' .  $line[1],
                'server_name' =>  $line[3],
                'cpu_usage' =>   $line[6],
                'ram_usage' =>  $line[9],
            ];
        }

        $this->logs_data = $readed;

        return $this;
    }
}
