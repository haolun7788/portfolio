export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer>
      <p>© {year} Hao Lun Li</p>
      <p>
        <a href="#top">Back to top ↑</a>
      </p>
    </footer>
  )
}