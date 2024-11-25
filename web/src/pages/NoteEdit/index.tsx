/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BiEdit, BiSolidCategory } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { PiPlus } from "react-icons/pi";
import { Editor } from "primereact/editor";

import type { CategoryType, NoteType } from "../../types/DatasTypes";
import api from "../../services/api";
import { useAuth } from "../../contexts/auth.context";

import Header from "../../components/Header"
import Loading from "../../components/Loading";
import { FaCheck, FaRegTrashAlt } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UpdateNoteData = {
	title?: string;
	content?: string | null;
	categoryId?: string;
}

export default function NoteEdit() {
	const [title, setTitle] = useState<string | null>(null)
	const [content, setContent] = useState<string>("")
	const [categorySelected, setCategorySelected] = useState<CategoryType | null>(null)

	const defaultTitle = "Sem título"

	const [newCategoryName, setNewCategoryName] = useState("")

	const [isShowCategoryList, setIsShowCategoryList] = useState(false)
	const [isEditingCategory, setIsEditingCategory] = useState(false)

	const { user } = useAuth()
	const { id } = useParams()
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	async function updateNote({ title, content, categoryId }: UpdateNoteData) {
		try {
			let data = {}
			if (title) data = { ...data, title }
			if (content) data = { ...data, content }
			if (categoryId) data = { ...data, categoryId }

			await api.put(`/update-note/${id}`, data)
		} catch (error) {
			// console.error(error)
		}
	}

	const { mutateAsync: createCategory } = useMutation({
		mutationKey: ["create-category"],
		mutationFn: async () => {
			const { data } = await api.post<CategoryType>(`/create-category/${user?.id}`, { name: newCategoryName })
			return data
		}
	})

	async function handleCreateCategory() {
		try {
			const category = await createCategory()
			queryClient.setQueryData<CategoryType[]>(["categories"], (oldData) => {
				return oldData ? [...oldData, category] : [category]
			});
			setNewCategoryName("")
		} catch (error) {
			console.log(error)
		}
	}

	async function handleDeleteCategory(categoryId: string) {
		try {
			await api.delete(`/delete-category/${categoryId}`)
			queryClient.setQueryData<CategoryType[]>(["categories"], (oldData) => {
				return oldData?.filter(category => category.id !== categoryId)
			});
			if (categorySelected?.id === categoryId) {
				setCategorySelected(null)
			}
		} catch (error) {
			console.log(error)
		}
	}

	function handleBack() {
		return navigate("/")
	}

	async function handleSelectedCategory(category: CategoryType) {
		await updateNote({ categoryId: category.id })
		setCategorySelected(category)
		setIsShowCategoryList(false)
	}

	document.addEventListener("click", (e) => {
		const target = e.target as HTMLElement
		if (
			!target.closest(".container-category-list") &&
			!target.closest(".btn-add-category")
		) {
			setIsShowCategoryList(false)
		}
	})

	function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
		if (e.target.value === "") {
			setTitle(defaultTitle)
			updateNote({ title: defaultTitle })
		}
	}

	const { data: note, isLoading } = useQuery({
		queryKey: ["note"],
		queryFn: async () => {
			const { data } = await api.get<NoteType>(`/get-note/${id}`)
			setContent(data.content)
			setTitle(data.title)
			setCategorySelected(data.category)
			return data
		}
	})

	const {
		data: categories,
	} = useQuery({
		queryKey: ["categories"], queryFn: async () => {
			const { data: categories } = await api.get<CategoryType[]>(`/get-categories/${user?.id}`);
			return categories;
		}
	})

	return (
		<div className="note-edit-container">
			<Header onBack={() => handleBack()} />

			{isLoading ? <Loading /> : note && (
				<main>
					<form>
						<input
							id="title-note-input"
							name="title-note-input"
							// biome-ignore lint/a11y/noAutofocus: <explanation>
							autoFocus
							className="title-note-input"
							type="text"
							value={title === null ? defaultTitle : title}
							onChange={(e) => {
								setTitle(e.target.value)
								updateNote({ title: e.target.value })
							}}
							onBlur={(e) => handleBlur(e)}
							enterKeyHint={"go"}
							onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
						/>

						<div className="header-note-edit">
							<div className="container-sub-header">
								<div className="container-create-date">
									<BsFillClockFill size={16} color="#3471FF" />
									<span>{new Date(note.createdAt).toLocaleString()}</span>
								</div>

								<div className="container-category">
									<BiSolidCategory size={16} color="#3471FF" />
									<span>{categorySelected ? categorySelected.name : "Sem categoria"}</span>

									<button
										onClick={() => setIsShowCategoryList(!isShowCategoryList)}
										type="button"
										className="btn-add-category"
									>
										{categorySelected ?
											<>
												<BiEdit className="icon" size={16} color="#ffffff" />
												<span>Editar categoria</span>
											</>
											: <>
												<PiPlus className="icon" size={16} color="#ffffff" />
												<span>Adicionar categoria</span>
											</>
										}
									</button>

									<div
										style={{ display: isShowCategoryList ? "block" : "none" }}
										className="container-category-list"
									>
										<div className="input-container-dropdown">
											<input
												type="text"
												placeholder="Adicionar categoria"
												value={newCategoryName}
												onChange={(e) => setNewCategoryName(e.target.value)}
												onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()}
											/>
											<button
												type="button"
												onClick={handleCreateCategory}
											>
												<PiPlus className="icon" size={16} color="#ffffff" />
											</button>
										</div>
										<span className="text-header-category-container">categorias</span>
										<ul>
											{categories?.length === 0 ? <span>Nenhuma categoria cadastrada</span>
												: categories?.map((category) => (
													<li key={category.id}>
														{isEditingCategory ?
															<input
																className="input-edit-category"
																placeholder="Editar categoria"
															/>
															: <button
																type="button"
																onClick={() => handleSelectedCategory(category)}
																className="btn-category-list-item"
															>
																{category.name}
															</button>
														}
														<div className="btn-edit-delete-container">
															{isEditingCategory ? (
																<button
																	type="button"
																	className="btn-edit-delete-category-container btn-check"
																	onClick={() => setIsEditingCategory(false)}
																>
																	<FaCheck size={14} color="#3471FF" />
																</button>
															)
																: <>
																	{/* <button
																		type="button"
																		className="btn-edit-delete-category-container btn-edit"
																		onClick={() => setIsEditingCategory(true)}
																	>
																		<FaEdit size={14} color="#3471FF" />
																	</button> */}
																	<button
																		onClick={() => { handleDeleteCategory(category.id) }}
																		className="btn-edit-delete-category-container btn-delete"
																		type="button"
																	>
																		<FaRegTrashAlt size={14} color="#CB1919" />
																	</button>
																</>
															}
														</div>
													</li>
												))}
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="content-note-edit">
							<Editor
								className="editor"
								value={content}
								onTextChange={(e) => {
									if (e.htmlValue) {
										setContent(e.htmlValue)
										updateNote({ content: e.htmlValue })
									}
								}}
							/>
						</div>
					</form>
				</main>
			)}
		</div>
	)
}