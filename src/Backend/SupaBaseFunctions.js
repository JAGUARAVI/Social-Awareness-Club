import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

export async function SignIn({email, password}) {  
    if(checkCookies({email, password}) === true) {
        return true;
    }
    return await supabase.auth.signIn({
        email: email,
        password: password,
    }).then(({ user, error }) => {
        if (error) {
            console.log(error.message);
            return false;
        } else { 
            localStorage.setItem(email, password)
            localStorage.setItem("logged_in", "true")
            return true;
        }
    })
}

export function checkCookies({email, password}) {
    if(localStorage.getItem(email) === password) {
        return true;
    }
    return false;
}

export async function logout() {
    return (await supabase.auth.signOut())
}