<?php

namespace App\Providers;


use App\Http\Controllers\LogController;
use App\Repositories\{ LogRepository };
use App\Repositories\Contracts\LogRepositoryInterface;
use App\Services\Contracts\LogServiceInterface;
use App\Services\LogService;
use Illuminate\Support\ServiceProvider;

class BindingServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when(LogController::class)->needs(LogRepositoryInterface::class)->give(LogRepository::class);
        $this->app->when(LogRepository::class)->needs(LogServiceInterface::class)->give(LogService::class);
          
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}