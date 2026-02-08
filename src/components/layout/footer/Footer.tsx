import Container from "@/components/Container/Container";


const Footer = () => {
  return (
    <footer className="relative">
      {/* Линия сверху футера */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100%] border-t border-gray-400"></div>

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


