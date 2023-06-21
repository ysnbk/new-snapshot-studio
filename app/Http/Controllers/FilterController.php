<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filter;

class FilterController extends Controller
{
    public function saveFilter(Request $request){
        return response()->json([
            'dataTest'=>$request->all()
        ]);
    }
    public function getEffects(){
        $effects= Filter::all();
        return response()->json([
            'effects'=>$effects
        ]);
    }
}
