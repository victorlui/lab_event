import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isLesson = isPast(props.availableAt);
  const dataFormat = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActive = slug === props.slug;

  return (
    <Link  to={isLesson && `/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{dataFormat}</span>

      <div
        className={`rounded border border-gray-500 p-4 mt-2  ${
          isActive ? "bg-green-500 group-hover:border-green-500" : ""
        }`}
      >
        <header className="flex items-center justify-between">
          {isLesson ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-gray-300 font-bold">
            {props.type === "live" ? "AO VIVO" : "Aula Prática"}
          </span>
        </header>

        <strong
          className={`mt-5 block ${isActive ? "text-white" : "text-gray-200"} `}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}
