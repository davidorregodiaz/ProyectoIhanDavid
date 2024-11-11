const username = document.querySelector(".user_text")
const email = document.querySelector(".email_text")
const  password = document.querySelector(".pass_text")
const h2 = document.querySelector(".signIn_status")
const btnSignIn = document.querySelector(".btn_login")
const userList = JSON.parse(localStorage.getItem("userList")) || [];


btnSignIn.addEventListener("click",(ev)=>{
    console.log(`Iniciando valores actuales : usuario:${username.value}, email:${email.value}, pass:${password.value}`)
    registerNewUser(username.value,email.value,password.value)
    ev.preventDefault()
    console.log("El array ahora tiene ",userList.length)
})

const registerNewUser= (username,email,password)=>{
    let newUser = {
        username : username,
        email : email.toLowerCase(),
        password : password
    };

    exist(username,email,password).then((resultado)=>{
        console.log("Ahora tengo el resultado ",resultado)

        if (!resultado) {
            console.log("usaurio usado")
            h2.style.color="red"
            h2.innerText="El usuario o email ya estan siendo usados"
        }

        else {
            console.log("Usuario no encontrado porque resuldtadp dice" ,resultado)
            h2.style.color="green"
            userList.push(newUser)
            h2.innerHTML="Se registro correctamente"
            localStorage.setItem("userList",JSON.stringify(userList));
            console.log(`El array tiene : ${userList.length}`)
        }

    })
}

const validate = (username,email,password)=>{
   let usernameTemp = username.value.toString();
   let emailTemp = email.value.toString();
   let passwordTemp=password.value.toString();

   if (usernameTemp.trim().length<3 && usernameTemp.trim().length>20 ) return false
   else if ( !emailTemp.includes("@gmail.com")) return "Formato de email no valido"
   else if (  passwordTemp.length<=5) return "La clave debe ser de mas de 5 digitos"
}


const getUserList = ()=>{
   return new Promise((resolve)=>{
       h2.style.color="green"
       h2.innerHTML="Loading..."
       setTimeout(()=>{

           resolve (JSON.parse(localStorage.getItem("userList")) || [])
       },5000)

   })
}

const exist =async (username,email,password) =>{
    console.log("El neuevo usuario tiene valores de ",username ," y  ",email," y ",password)

    for (user of await getUserList()) {

        console.log(`El elemento tiene ${user.username},${user.email},${user.password}`)

        if (user.username === username || user.email === email)  return false
    }
    return true
}



