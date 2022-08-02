import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai"

const Footer = () => {
  return (
    <div className=" w-full flex justify-evenly items-center md:w-[85%] mt-[0.5rem] mb-[0.5rem]">
      <h1 className="text-white text-[1.3rem] font-bold">
        # Built by Sebastian Semeniuc
      </h1>
      <div className="flex items-center">
        <a
          href="https://twitter.com/sebyss7"
          target="_blank"
          className="text-white"
        >
          {" "}
          <AiFillTwitterCircle size={33} />{" "}
        </a>

        <a
          href="https://github.com/sebi75"
          target="_blank"
          className="text-white ml-[1rem]"
        >
          <AiFillGithub size={33} />{" "}
        </a>
      </div>
    </div>
  )
}

export default Footer
