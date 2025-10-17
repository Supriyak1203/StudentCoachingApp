import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // ------------------ SIGNUP ------------------
  const signup = async (formData) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data;
    try { data = await response.json(); } catch { data = null; }

    if (!response.ok) throw new Error(data?.message || "Signup failed");

    alert("✅ Registration successful! Please sign in.");
    navigate("/signin");
    return data;
  };

  // ------------------ SIGNIN ------------------
  const signin = async (formData) => {
    const response = await fetch("http://localhost:8080/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data;
    try { data = await response.json(); } catch { data = null; }

    if (!response.ok) throw new Error(data?.message || "Signin failed");

    const loggedInUser = {
      email: formData.email,
      role: data.role,
      token: data.token,
      name: data.name,
    };

    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    alert("✅ Signin successful!");

    if (data.role === "ROLE_ADMIN") navigate("/admin-dashboard");
    else navigate("/user-dashboard");

    return loggedInUser;
  };

  // ------------------ RESET PASSWORD ------------------
  const resetPassword = async (email, newPassword) => {
    const response = await fetch("http://localhost:8080/auth/resetpassword", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    let data;
    try { data = await response.json(); } catch { data = null; }

    if (!response.ok) throw new Error(data?.message || "Password reset failed");

    alert("✅ Password reset successful! Please sign in.");
    navigate("/signin");
    return data;
  };

  // ------------------ LOGOUT ------------------
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, token: user?.token, signup, signin, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
