import './LoginPage.css'


function LoginPage() {
    
    return (
        <div>
            <form>
                <input type= "email" name = 'useremail' placeholder='Enter your email'/>
                <input type= "password" name = 'userpassword' placeholder='Enter your email'/>
                <input type= "submit"/>
            </form>
        </div>
    )
    }

export default LoginPage
