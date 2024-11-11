const username = document.querySelector(".user_text")
const password = document.querySelector(".pass_text")
const h2 = document.querySelector(".login_status")
const btn = document.querySelector(".btn_login")
const  userList = JSON.parse(localStorage.getItem("userList")) || []

btn.addEventListener ("click",(ev)=>{
    validateUser(username.value,password.value)
    console.log(username.value,password.value)
    ev.preventDefault()
})

const validateUser = async (username,password)=>{
    console.log("Entrando a validate user con",username," y ",password)
    const userList = await getUserList()
    let userFounder =false
    console.log("La lista obtenida es :",userList)

    for (const user of userList){
        console.log("Revisando usuario ",user)
        console.log("El username del usuario es ",user.username)

        if (user.username === username && user.password === password){
           console.log("Usuario encontrado ",user.username)
           h2.innerHTML=`Welcome:${user.username}`
            userFounder = true
            setTimeout(()=>{
                window.location.href = "http://127.0.0.1:8080/RepositorioDavid/index.html"
                },100)

            break
        }
    }
    if(!userFounder){
        console.log("Usuario no encontrado")
        h2.style.color="red"
        h2.innerHTML="Check that the username or password is correct "
    }

}

const getUserList = ()=>{
    return new Promise((resolve)=>{
        h2.style.color="green"
        h2.innerHTML="Verifying..."
        setTimeout(()=>{

            resolve (JSON.parse(localStorage.getItem("userList")) || [])
        },5000)
    })
}

