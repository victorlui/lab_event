import React from "react";
import { useGetLessionsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

const Sidebar: React.FC = () => {
  const { data } = useGetLessionsQuery();
  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600 mobile:hidden laptop:block desktop:block">
      <span className="font-bold text-2l pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
