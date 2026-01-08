import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

function LogoutButton() {
  return (
    <button onClick={() => signOut(auth)}>
      Cerrar sesión
    </button>
  )
}
