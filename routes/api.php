<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);


    // Define the API resource routes for products
    // This will automatically create routes for index, store, show, update, and destroy methods
    Route::apiResource('/products', ProductController::class);
});
Route::post('login', [AuthController::class, 'login']);