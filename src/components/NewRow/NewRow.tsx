import img from "/src/assets/img/pencil.png"

interface RowProps {
    date: string, 
    distance: number,
    onDelete: () => void,
    onEdit: () => void;
}

export const NewRow:React.FC<RowProps> = ({date, distance, onDelete, onEdit}) => {
    return (
        <div className="row">
            <div>{date}</div>
            <div>{distance}</div>
            <div className="edit-buttons">
                <button type="button" className="pencil" onClick={onEdit}><img src={img} alt="Edit" /></button>
                <button type="button" className="cross" onClick={onDelete}>✘</button>
            </div>
        </div>
    )
}