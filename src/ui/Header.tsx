import { memo } from "react";

const Header = memo(() => {
  console.log("Header rerender");
  return (
    <header>
      <button
        id="minimize"
        onClick={() => window.electron.sendHeaderAction("MINIMIZE")}
      />
      <button
        id="maximize"
        onClick={() => window.electron.sendHeaderAction("MAXIMIZE")}
      />
      <button
        id="close"
        onClick={() => window.electron.sendHeaderAction("CLOSE")}
      />
    </header>
  );
});

export default Header;
