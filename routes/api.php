<?php

use App\Http\Controllers\FilterController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::get('dashboard',[UserController::class,'dashboard']);
Route::post('changeProfile',[UserController::class,'changeProfile']);
Route::post('saveImage',[PhotoController::class,'saveImage']);
Route::get('getImages',[PhotoController::class,'getImages']);
Route::post('saveFilter',[FilterController::class,'saveFilter']);
Route::get('getEffects',[FilterController::class,'getEffects']);
