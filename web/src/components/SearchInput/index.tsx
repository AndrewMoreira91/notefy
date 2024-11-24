import type { NoteType } from "src/types/DatasTypes";
import "./style.css";
import { useState, type InputHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export default function SearchInput({ ...rest }: SearchInputProps) {
	const [searchValue, setSearchValue] = useState("");

	const navigate = useNavigate();

	const queryClient = useQueryClient();

	const notesList = queryClient.getQueryData<NoteType[]>(["notes"]);

	function handleClickSearch(noteId: string) {
		setSearchValue("");
		return navigate(`/note/${noteId}`);
	}

	return (
		<div className="input-search-container">
			<input
				{...rest}
				className="search-input"
				type="text"
				placeholder="Pesquisar..."
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase().trim())}
			/>

			<div className="dropdown-search-input">
				<ul>
					{notesList?.map((note) => {
						if (searchValue &&
							(
								note.title.toLowerCase().trim().includes(searchValue) ||
								note.content.toLowerCase().trim().includes(searchValue) ||
								note.category.name.toLowerCase().trim().includes(searchValue)
							)
						) {
							return (
								<button
									key={note.id}
									type="button"
									onClick={() => handleClickSearch(note.id)}
								>
									<li>{note.title}</li>
								</button>
							)
						}
					})}
				</ul>
			</div>
		</div >
	)
}