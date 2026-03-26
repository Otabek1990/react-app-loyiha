import { useState, useEffect, type ChangeEvent } from "react";
import { toast } from "react-toastify";
import CardMaps from "../../components/maps/CardMaps";
import { nanoid } from "nanoid";
import Modal from "../../components/modal/Modal";
import { CiSearch } from "react-icons/ci";

export interface IProducts {
    id: string;
    productsName: string;
    categoryId: string;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

function Products() {
    const [nomi, setNomi] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");
    const [updatedAt, setUpdatedAt] = useState<string>("");
    const [showModal, setSHowmodal] = useState<boolean>(false)
    const [products, setProducts] = useState<IProducts[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>("")
    const [modalCardId, setCardModalId] = useState<string>("")
    const [sortItem, setSortItem] = useState<any>(null)

    const searchItem = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const sorted = (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        setSortItem(data);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const dataObj: IProducts = {
            id: nanoid(),
            productsName: nomi,
            categoryId: categoryId,
            price: Number(price),
            description: description,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
        };

        const updatedProducts = [...products, dataObj];
        setProducts(updatedProducts);
        localStorage.setItem("storagerProducts", JSON.stringify(updatedProducts));
        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");

        setNomi(""); setCategoryId(""); setPrice(0); setDescription("");
        event.currentTarget.reset();
    };

    const handlerDelete = (id: string) => {
        const updated = products.filter((item: IProducts) => item.id !== id);
        setProducts(updated);
        localStorage.setItem("storagerProducts", JSON.stringify(updated));
        toast.info("Mahsulot o'chirildi");
    }

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("storagerProducts") || "[]");
        setProducts(saved);
    }, []);

    let displayProducts = products.filter((item) =>
        item.productsName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortItem) {
        if (sortItem.productsName) {
            displayProducts = displayProducts.filter(i => i.productsName.toLowerCase().includes(sortItem.productsName.toLowerCase()));
        }
        if (sortItem.price) {
            displayProducts = displayProducts.filter(i => i.price >= Number(sortItem.price));
        }
        if (sortItem.createdAt) {
            displayProducts = displayProducts.filter(i => new Date(i.createdAt).toDateString() === new Date(sortItem.createdAt).toDateString());
        }
        if (sortItem.updatedAt) {
            displayProducts = displayProducts.filter(i => new Date(i.updatedAt).toDateString() === new Date(sortItem.updatedAt).toDateString());
        }
    }

    return (
        <div className="w-full mx-auto min-h-screen p-10 h-auto">
            {showModal && <Modal setProducts={setProducts} modalCardId={modalCardId} setSHowmodal={setSHowmodal} />}

            <form onSubmit={handleSubmit} className="*:hover:bg-white/20 bg-white/10 *:duration-120 *:rounded-sm *:p-1 w-[35%] mx-auto flex flex-col gap-4 p-5 rounded-md mb-10 shadow-lg">
                <label>Nomi: <input value={nomi} onChange={(e) => setNomi(e.target.value)} className="w-full p-1 bg-transparent border-b outline-none" type="text" required name="nomi" /></label>
                <label>Kategoriya: <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-1 bg-transparent border-b outline-none" type="text" required name="categoryId" /></label>
                <label>Narx: <input value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-1 bg-transparent border-b outline-none" type="number" required min={0} name="price" /></label>
                <label>Tavsif: <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-w-full max-w-full min-h-20 max-h-20 w-full p-1 bg-transparent border-b outline-none" required name="description" /></label>
                <label>Yaratilgan vaqti: <input value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} className="w-full p-1 bg-transparent border-b outline-none" type="date" required name="createdAt" /></label>
                <label>Yangilangan vaqti: <input value={updatedAt} onChange={(e) => setUpdatedAt(e.target.value)} className="w-full p-1 bg-transparent border-b outline-none" type="date" required name="updatedAt" /></label>
                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">Kiritish</button>
            </form>

            <div className="w-full flex items-center mx-auto rounded-sm duration-120 hover:bg-white/20 cursor-pointer h-14 px-10 justify-end gap-2 mb-5">
                <input onChange={searchItem} type="text" placeholder="search..." className="w-full px-2 py-2 outline-0 bg-transparent" />
                <button className="p-1"><CiSearch size={25} /></button>
            </div>

            <div className="w-auto mx-auto flex items-center rounded-sm duration-120 hover:bg-white/20 cursor-pointer h-14 px-10 justify-center gap-2 mb-5">
                <form onSubmit={sorted} className="flex items-center gap-4">
                    <input type="text" placeholder="name" name="productsName" className="w-32 px-2 py-2 outline-0 bg-transparent border-b border-white/30" />
                    <input type="number" min={0} placeholder="price" name="price" className="w-24 px-2 py-2 outline-0 bg-transparent border-b border-white/30" />
                    <input type="date" title="Created At" name="createdAt" className="w-32 px-2 py-2 outline-0 bg-transparent border-b border-white/30" />
                    <input type="date" title="Updated At" name="updatedAt" className="w-32 px-2 py-2 outline-0 bg-transparent border-b border-white/30" />
                    <button className="px-8 rounded-sm bg-green-600 hover:bg-green-500 p-1 text-white">sort</button>
                    <button type="button" onClick={() => setSortItem(null)} className="px-4 rounded-sm bg-red-600 hover:bg-red-500 p-1 text-white text-xs">reset</button>
                </form>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayProducts.length === 0 ? (
                    <h1 className="text-center col-span-full">Mahsulotlar topilmadi...</h1>
                ) : (
                    displayProducts.map((item) => (
                        <CardMaps 
                            setCardModalId={setCardModalId} 
                            setSHowmodal={setSHowmodal} 
                            handlerDelete={handlerDelete} 
                            key={item.id} 
                            item={item} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Products;