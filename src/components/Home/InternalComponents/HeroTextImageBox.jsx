const HeroTextImageBox = ({ src }) => {
  return (
    <div className={`bg-white h-[50px] w-[100px] rounded-full translate-y-2.5 inline-block bg-cover bg-center lg:hidden`} style={{ backgroundImage: `url(${src})` }}></div>
  )
}

export default HeroTextImageBox