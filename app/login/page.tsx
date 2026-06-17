export default function Login() {
    return (
        <div className="auth-page">

           <form className="auth-card">
             <h1> LOGIN </h1>
             <input placeholder="Email"/>
             <input placeholder="Password" type="password"/>
             <button> Login </button>
           
           </form>
        </div>

    );
}