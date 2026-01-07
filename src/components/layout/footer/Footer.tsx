import Container from "@/components/Container/Container";


const Footer = () => {
  return (
    <footer>
      <Container>
      <div className="max-w-[1600px] mx-auto px-4 py-4 text-sm text-gray-500 flex justify-between">
        <span>© {new Date().getFullYear()} CITADEL</span>
        <span>Magic: The Gathering is © Wizards of the Coast.</span>
      </div>
      </Container>
    </footer>
  )
}

export default Footer;


