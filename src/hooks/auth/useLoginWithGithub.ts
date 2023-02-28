import { useNavigate } from 'react-router-dom';
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useCallback, useState } from "react";

export const useLoginWithGithub = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate()

  const loginWithGithub = useCallback(async () => {
    setError("");
    setIsPending(true);
    const provider = new GithubAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
        console.log(res);
        if(!res.user){
            throw new Error("No user found");
        }
        const user = res.user
        console.log(user)
        setIsPending(false);
        navigate("/");
    } catch (err:  any) {
        console.log(err)
        setError(err.message);
        setIsPending(false);
    }
  }, [navigate ]);

  return { loginWithGithub
    , error, isPending };
};
