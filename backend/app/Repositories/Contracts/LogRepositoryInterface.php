<?php


namespace App\Repositories\Contracts;

interface LogRepositoryInterface
{
    public function create($data);
    
    public function list();
}