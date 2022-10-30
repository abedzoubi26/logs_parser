<?php


namespace App\Repositories;

use App\Models\LogparserLog;
use Illuminate\Support\Collection;
use App\Repositories\Contracts\LogRepositoryInterface;
use App\Services\LogsHandler;

class LogRepository implements LogRepositoryInterface
{
    private $logService;

    /**
     * AuthRepository constructor.
     * @param AuthServiceInterface $authService
     */
    public function __construct(LogsHandler $logService)
    {
        $this->logService = $logService;
    }
    /**
     * @return Collection
     */
    public function create($data)
    {
        return $this->logService->create($data);
    }
    /**
     * @return Collection
     */
    public function list()
    {
        return LogparserLog::paginate();
    }
}
