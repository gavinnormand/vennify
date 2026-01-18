function Footer() {
  return (
    <footer>
      <div className="bg-secondary flex items-center justify-between px-12 py-4">
        <p>© 2025 Gavin Normand</p>
        <p>
          <a
            href="https://www.gavinnormand.com/"
            className="hover:text-accent active:text-accent flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.gavinnormand.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;