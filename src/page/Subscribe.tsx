import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Code from "../assets/code.png";
import { useCreateSubscribeMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscribeMutation();

  async function handleSubscribe(event: FormEvent) {
    event?.preventDefault();
    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto mobile:flex-col laptop:flex-row desktop:flex-row">
        <div className="max-w-[640px] mobile:w-[90%] laptop:max-w-[640px]  desktop:max-w-[640px]  flex flex-col">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tinght mobile:text-center laptop:text-start desktop:text-start">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React JS</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed mobile:text-center laptop:text-start desktop:text-start">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className="p-8 bg-gray-700 border border-gray-500 rounded mobile:w-[100%] laptop:w-[400px] desktop:w-[400px]">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-2 w-full"
          >
            <input
              type="text"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Seu nome completo"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              type="email"
              className="bg-gray-900 rounded px-5 h-14"
              placeholder="Digite seu e-mail"
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src={Code} alt="" className="mt-10" />
    </div>
  );
}
