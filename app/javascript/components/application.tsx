import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@/components/ui/button"

interface AppProps {
  arg: string;
}

const App = ({ arg }: AppProps) => {
  return (
    <>
      <Button variant="outline">Button</Button>
      <div>Hello {arg}!</div>
    </>
  )
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  createRoot(rootEl).render(<App arg="Rails 7 with Webpack" />);
});
