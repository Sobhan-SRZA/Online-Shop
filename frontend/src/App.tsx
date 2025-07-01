import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { email, password });
      setToken(response.data.access_token);
      alert("ورود با موفقیت انجام شد!");
    } catch (error) {
      console.error("خطا در ورود:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {token ? (
        <div>
          <h1 className="text-2xl">خوش آمدی!</h1>
          <button onClick={() => setToken(null)} className="bg-red-500 text-white p-2 mt-4">خروج</button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl mb-4">ورود</h2>
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">ورود</button>
        </div>
      )}
    </div>
  );
};

export default App;