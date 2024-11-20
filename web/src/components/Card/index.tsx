import "./style.css";
import { HiDotsVertical } from "react-icons/hi";
import { FaEraser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import TextareaAutosize from 'react-textarea-autosize';

type CardProps = {
	title: string;
	content: string;
	dateCreated: Date;
	path: string;
	onDeleteClick?: () => void;
}

export default function Card({
	title,
	content,
	dateCreated,
	path,
	onDeleteClick
}: CardProps) {

	return (
		<div className="card">
			<div className="content-card">
				<div className="header-card">
					<h2>{title}</h2>
					<span>Criado em:{"  "}
						<strong>
							{`${new Date(dateCreated).toLocaleDateString()} `}
						</strong>
						ás
						<strong>
							{` ${new Date(dateCreated).toLocaleTimeString()}`}
						</strong>
					</span>
				</div>

				<TextareaAutosize
					className="content-textarea-card"
					value={content}
				/>
			</div>

			<div className="line-footer-card" />
			<div className="footer-card">
				<Link to={path}>
					<span className="see-more-text">
						Ver mais
					</span>
				</Link>

				<div className="btn-dropdown-container">
					<button type="button" className="btn-show-dropdown">
						<HiDotsVertical size={22} />
					</button>
					<div className="dropdown-content">
						<ul>
							<li>
								<Link className="btn-dropdown" to={path}>
									<FaEdit size={16} color="#3471FF" />
									atualizar
								</Link>
							</li>
							<li>
								<button className="btn-dropdown" type="button" onClick={onDeleteClick}>
									<FaEraser size={16} color="#CB1919" />
									deletar
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
