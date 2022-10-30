<?php


namespace App\Services\Handlers\Contracts;

use App\Models\LogparserLog;

abstract class FileHandlerBase
{
    public $logs_data = [];

    abstract protected function fetchData($request);

    public function saveData()
    {
        if (!isset($this->logs_data)) {
            return response()->json([
                'status' => false,
                'data' => 'Oops! something went wrong',
            ]);
        }

        LogparserLog::insert($this->logs_data);
        return response()->json([
            'status' => true,
            'data' => ['read' => count($this->logs_data)],
        ]);
    }
}
