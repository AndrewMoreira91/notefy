import "./style.css";
import { FaFilter } from "react-icons/fa";

import Header from "../../components/Header";
import CategoryItem from "../../components/CategoryItem";
import Card from "../../components/Card";
import type { CategoryType, NoteType } from "src/types/DatasTypes";
import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth.context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import DotsLoading from "../../components/DotsLoading";

export const Dashboard = () => {
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>([]);

  const location = window.location.pathname;
  if (location !== "/") {
    window.location.href = "/";
  }

  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { mutateAsync: deleteNote } = useMutation({
    mutationKey: ["delete-note"],
    mutationFn: async (id: string) => {
      await api.delete(`/delete-note/${id}`);
    }
  });

  async function handleDeleteCard(id: string) {
    try {
      await deleteNote(id);

      queryClient.setQueryData<NoteType[]>(["notes"], (oldData) => {
        return oldData?.filter(note => note.id !== id);
      });

    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectCategory(id: string) {
    setCategoriesSelected(revState => {
      if (revState.includes(id)) {
        return revState.filter(item => item !== id);
      }
      return [...revState, id];
    });
  }

  const { data: notes, isError, isLoading } = useQuery({
    queryKey: ["notes"], queryFn: async () => {
      const { data: notes } = await api.get<NoteType[]>(`/get-notes/${user?.id}`);
      return notes;
    }
  })

  const {
    data: categories,
    isError: isErrorInCategories,
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ["categories"], queryFn: async () => {
      const { data: categories } = await api.get<CategoryType[]>(`/get-categories/${user?.id}`);
      return categories;
    }
  })

  return (
    <div className="dashboard-container">
      <Header
        isShowBtnBack={false}
      />
      <main>
        <h1 className="title-main">Suas Notas</h1>

        <div>
          <div className="categories-header">
            <FaFilter />
            <span>Categorias</span>
          </div>
          <div className="categories">
            {isLoadingCategories ? <h3>carregando categorias<DotsLoading /></h3> : (
              isErrorInCategories ? <h3>Erro ao carregar as categorias</h3> : (
                <>
                  <CategoryItem
                    category="Todas"
                    isSelected={categoriesSelected.length === 0}
                    onClick={() => setCategoriesSelected([])}
                  />
                  {categories?.map(category => (
                    <CategoryItem
                      key={category.id}
                      category={category.name}
                      onClick={() => handleSelectCategory(category.id)}
                      isSelected={categoriesSelected.includes(category.id)}
                    />
                  ))}
                </>
              )
            )}
          </div>
        </div>

        {isLoading && <Loading />}
        {isError && <h3>Erro ao carregar as notas, tente recarregar a página</h3>}
        <div className="container-cads">
          {notes && notes.length === 0 ? <h3>Você não tem nenhuma nota :(</h3>
            : notes?.map(note => {
              if (categoriesSelected.length > 0 && !categoriesSelected.includes(note.category?.id)) {
                return null;
              }
              return (
                <Card
                  key={note.id}
                  title={note.title}
                  content={note.content}
                  dateCreated={note.createdAt}
                  path={`/note/${note.id}`}
                  onDeleteClick={() => handleDeleteCard(note.id)}
                />
              )
            })}
        </div>
      </main>
    </div>
  );
};
