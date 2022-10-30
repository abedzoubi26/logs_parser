<?php

namespace App\Services;


class LogsHandler
{

    public $handler;

    public function __construct()
    {
        $this->handler = $this->mountDriver();
    }

    public function mountDriver()
    {
        $handlerName = config('log-reader.default');
        $className = __NAMESPACE__ . '\\Handlers\\' . ucfirst($handlerName) . 'fileHandler';
        return new $className;
    }

    public function create($request)
    {
        try {
            return $this->handler->fetchData($request)->saveData();
        } catch (\Exception $ex) {
            return response()->json([
                'status' => false,
                'data' => 'Oops! something went wrong',
            ]);
        }
    }
}
