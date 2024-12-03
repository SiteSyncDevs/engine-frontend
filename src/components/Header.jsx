export default function Heder({onClick}) {

  return (
    <div className="bg-[#008080] h-16 w-screen">
      <h1>SiteSync Engine</h1>
      <button onClick={onClick} >Logout</button>
    </div>
  );
}
