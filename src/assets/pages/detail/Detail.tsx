import { MdArrowBack } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"

interface IDetail {
    id: string,
    productsName: string,
    categoryId: string,
    price: number,
    description: string,
    createdAt: Date,
    updatedAt: Date
}

function Detail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const item = JSON.parse(localStorage.getItem("storagerProducts") || "ishlamayapti") as IDetail[]

    const fintItem = item.filter((el: IDetail) => el.id === id)


    return (
        <div className="border relative w-full mx-auto cursor-pointer min-h-screen p-10 h-auto">
            <h1 className=" text-[30px] border p-3 " >{fintItem[0]?.productsName}</h1>
            <p className=" text-[15px] h-40 border p-3" >{fintItem[0]?.description}</p>
            <h4 className=" text-[15px] text-white/50  border p-3" >{fintItem[0]?.price.toFixed(2)} $ </h4>


            <button onClick={() => navigate('/products')} className="w-33 fixed bottom-20 p-3 rounded-sm  flex items-center justify-center gap-3 cursor-pointer left-20 bg-green-500 hover:bg-green-400 " ><MdArrowBack size={20} /> ortga </button>
        </div>
    )
}

export default Detail