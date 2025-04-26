import { useState } from 'react'
import InputField from '../components/InputField'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  const [errors, setErrors] = useState({})
  const apiBase = import.meta.env.VITE_API_URL;;

  const[tc, setTC] = useState(false)
  const [showModal, setShowModal] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const newErrors = {}
  
    if (!username) {
      newErrors.username = "Username is required"}

    if (!email) {
      newErrors.email = "Email is required"}

    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors.email = "Enter a valid email address"
    }
  
    if (!password){ 
      newErrors.password = "Password is required"
    }
    else if (!strongPassword.test(password)) {
      newErrors.password = "Password must be 8+ chars, include upper/lowercase and a number"
    }
  
    if (!password2) newErrors.password2 = "Confirm your password"
    else if (password !== password2) {
      newErrors.password2 = "Passwords do not match"
    }
  
    setErrors(newErrors)
  
    if (Object.keys(newErrors).length > 0) return // Stop if there are errors

    if (!tc){
      alert("Plese accept the terms and conditions");
      return;
    }
  
    try  {

      const response = await axios.post(`${apiBase}/register/`, {
        email,
        name : username,
        password,
        tc
      })
  
      // Success: store token and clear fields
      alert(`Welcome, ${response.data.data.message}`)
      setEmail('')
      setUsername('')
      setPassword('')
      setPassword2('')
      setTC(false)
      setShowModal(false)

    }catch (error){

      if (error.response && error.response.data) {
        
        const errorData = error.response.data.data;

        // const firstErrorKey = Object.keys(errorData)[0];  // e.g., "email" or "tc"
        // const firstErrorMessage = errorData[firstErrorKey][0];  // Get the first message in the list

        // alert(firstErrorMessage);  // Show the first error message

        const messages = Object.values(errorData)
        .map(fieldErrors => fieldErrors[0])
        .join('\n');

        alert(messages);

      }
      else{
        alert("Something went wrong. Try again");
      }

    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded-2xl shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        <InputField label="Username" value={username} onChange={e => setUsername(e.target.value)}error={errors.username} />

        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}error={errors.email} />

        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}error={errors.password} />

        <InputField label="Confirm Password" type="password" value={password2} onChange={e => setPassword2(e.target.value)}error={errors.password2} />

        
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={tc}
              onChange={(e) => setTC(e.target.checked)}
            />
            <span> 
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                Terms and Conditions
              </span>
            </span>
          </label>
        </div>


        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-xl hover:bg-green-600">
          Sign Up
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>


      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
            <p className="mb-4">
              By signing up, you agree to our Terms and Conditions. Please read them carefully before proceeding.
              <br /><br />  
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
              <br /><br />
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
