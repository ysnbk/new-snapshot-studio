<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:users',
            'password' => [
                'required', 'min:8',
                // 'regex:/[a-z]/',
                // 'regex:/[A-Z]/',
                // 'regex:/[0-9]/',
                // 'regex:/[!:;,@&#.]/'
            ],
            'confirm_password' => 'required|same:password'
        ]);
        
        $user = new User();
        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->crypted_email = crypt($user->email,'$2a$07$usesomesillystringforsalt$');
        $user->password = Hash::make($request->password);

        $color=sprintf('%06X',mt_rand(0,0xFFFFFF));
        $profile="https://ui-avatars.com/api/?background=".$color."&color=fff&name=".$user->name."+".$user->lastname."&rounded=true";
        $user->profile = $profile;

        
        $res = $user->save();
        if ($res) {
            return response()->json([
                'success' => 'registred successfuly'
            ]);
        } else {
            return response()->json([
                'fail'=> 'Something wrong'
            ]);
        }
    }

    public function login(Request $request){
        $request->validate([
            
            'email'=> 'required|email',
            'password'=> [
                'required','min:6',
            ]
            
        ]);
        $user = User::where('email','=',$request->email)->first();
        if ($user) {
            if (Hash::check($request->password,$user->password)) {
                return response()->json([
                    'ip'=>$request->ips(),
                    'user'=> $user,
                    'email'=>$user->email,
                    'email_crypted'=>$user->crypted_email
                ]); 
                
            }else{
                return response()->json([
                        'error'=>['password'=>['the password is incorrect']],
                        'message'=>'Your password is incorrect'
                    
                    
                ]);
            }
            
        }else{
            return response()->json(['error'=>['email'=>['the email is not  registered']],
            'message'=>'the email is not  registered']);
        }
        
        
    }

    public function dashboard(Request $request){
        $user = User::where('crypted_email','=',$request->cookie)->first();
        return response()->json([
            'user'=>$user,
            'cookie'=>$request->cookie
        ]);
    }
    public function changeProfile(Request $request){
        $user = User::where('crypted_email','=',$_COOKIE['user'])->first();
        
        if(file_exists($user->profile))
            unlink($user->profile);
        // making image from data URL
        $uri = substr($request->profile,strpos($request->profile,",")+1);
        $data = base64_decode($uri);
        $strpos = strpos($request->profile, ";");
        $sub = substr($request->profile, 0, $strpos);
        $ext =explode('/',$sub)[1];
        $filename=$user->id."-".time().".".$ext;
        $user->profile = "profiles/".$filename;
        $user->update();
        file_put_contents('profiles/'.$filename,$data);
        return response()->json([]); 
    }
}
