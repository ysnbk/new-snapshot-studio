<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    public function saveImage(Request $request){
        $user= User::where('crypted_email','=',$request->user)->first();

        $photo = new Photo();
        $photo->user_id = $user->id;
        $currentDate = Carbon::now();
        $photo->name = "SnapShot_".$user->id."_".$currentDate->format('Ymdhis');
        // making image from data URL
        $uri = substr($request->photo,strpos($request->photo,",")+1);
        $data = base64_decode($uri);
        $strpos = strpos($request->photo, ";");
        $sub = substr($request->photo, 0, $strpos);
        $ext =explode('/',$sub)[1];
        if (!file_exists(public_path($user->email))) {
            mkdir($user->email,0777,true);
        }
        $filename=$photo->name.".".$ext;
        $photo->path = $user->email."/".$filename;
        $photo->save();
        file_put_contents($user->email."/".$filename,$data);
        return response()->json([
            'image_name'=>$filename,
        ]);
    }

    public function getImages(Request $request){
        $user = User::where('crypted_email','=',$request->user)->first();
        $images = Photo::where('user_id','=',$user->id)->orderBy('created_at','desc')->get();
        return response()->json([
            'data'=>$images,
            'user'=>$user
        ]);
    }
}
