function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 h-20 py-4 px-8 flex flex-col justify-center">
      <p>&#169; Copyright {date}</p>
    </footer>
  );
}

export default Footer;
