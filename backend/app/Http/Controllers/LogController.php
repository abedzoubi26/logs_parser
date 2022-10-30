<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadLogsRequest;
use App\Repositories\LogRepository;

class LogController extends Controller
{

    /**
     * Create a new class instance.
     *
     * @param OrdersRepository $repo
     */
    public function __construct(LogRepository $repo)
    {
        $this->middleware('auth:api', ['except' => ['login']]);
        $this->repo = $repo;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->repo->list();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UploadLogsRequest $request)
    {
        return $this->repo->create($request);
    }

}
