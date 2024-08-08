function Menu() {
  return (
    <div>
      <button onClick={() => (window.location.href = "/")}>Home Page</button>
      <button onClick={() => (window.location.href = "/report")}>
        View Report
      </button>
    </div>
  );
}

export default Menu;
