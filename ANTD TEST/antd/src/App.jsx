import { useState, useEffect } from "react";

function App() {
  const [customers, setCustomers] = useState();
  const Data = async () => {
    const results = await fetch("http://localhost:5001/client/customers", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });
    const data = await results.json(); // parses JSON response into native JavaScript objects
    setCustomers(data);
  };

  useEffect(() => {
    Data();
  });

  return (
  );
}

export default App;
