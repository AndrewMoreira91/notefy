import "./style.css";
import { type InputHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners"
import { FaArrowLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import api from "../../services/api";
import { useAuth } from "../../contexts/auth.context";
import type { NoteType } from "../../types/DatasTypes";

import Button from "../Button";
import { BiUser } from "react-icons/bi";
import SearchInput from "../SearchInput";

type HeaderProps = InputHTMLAttributes<HTMLInputElement> & {
	isShowBtnBack?: boolean;
	onBack?: () => void;
}

export default function Header({ isShowBtnBack = true, onBack, ...rest }: HeaderProps) {
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();
	const { user, signOut } = useAuth();

	async function handleClickNewNote() {
		setIsLoading(true);
		try {
			const response = await api.post<NoteType>(`create-note/${user?.id}`, {
				title: "Nova Nota",
				content: "",
			})

			setIsLoading(false);
			return navigate(`/note/${response.data.id}`);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	const [searchValue, setSearchValue] = useState("");

	return (
		<header className="header-container">
			<div className="header-start-part">
				{isShowBtnBack && (
					<button type="button" className="btn-header" onClick={onBack} >
						<FaArrowLeft size={16} color="#ffffff" />
						<span>Dashboard</span>
					</button>
				)}

				<SearchInput
					{...rest}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>

				<Button type="button" style={{ width: "auto" }} onClick={handleClickNewNote}>
					{isLoading ? <DotLoader color="#a2b8ff" size={22} loading={isLoading} />
						: (<><span>Nova nota</span><FaPlus size={16} color="#ffffff" /></>)
					}
				</Button>
			</div>

			<div className="avatar-container-master">
				<div className="avatar-container">
					<BiUser size={30} color="#ffffff" />
				</div>

				<div className="user-info">
					<ul>
						<li>
							<span>{user?.name}</span>
						</li>
						<li>
							<button type="button" onClick={() => {
								signOut();
								navigate("/");
							}}>Sair</button>
						</li>
					</ul>
				</div>
			</div>


		</header>
	)
}