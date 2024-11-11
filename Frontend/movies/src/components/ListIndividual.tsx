interface ListIndividualProps {
    list: { id: number; name: string };
}

const ListIndividual : React.FC<ListIndividualProps> = ({list}) => {

    
    return (
        <div className="">
            <p>{list.name}</p>
        </div>
    )
}

export default ListIndividual;