// import React from "react";
// import Layout from "../../component/Layout";
// import { Link } from "react-router-dom";
// export default function Addproduct() {


//     return (
//         <>
//              <Layout>
//                 <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
//                     <div>
//                         <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Add Product</h3>
//                     </div>
//                 </div>
//                 <div className="bg-white">
//                     <div className="p-4 rounded-lg dark:border-gray-700 ">
//                         <div className="">
//                             <div className="w-full ">
                            
//                                 <form action="/" method="post">
//                                     <div className="mb-4">
//                                         <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
//                                             Product Name
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="firstName"
//                                             type="text"
//                                             placeholder="Product Name"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
//                                             Product Image
//                                         </label>
//                                          <div className="flex items-center justify-center w-full">
//                                             <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                                                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                                     <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                                                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
//                                                     </svg>
//                                                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                                                     <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//                                                 </div>
//                                                 <input id="dropzone-file" type="file" className="hidden" />
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
//                                             Description
//                                         </label>
//                                         <textarea
//                                             placeholder="Description"
//                                             className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label className="block mb-2 text-sm font-medium text-gray-700 text-left" for="firstName">
//                                             Price
//                                         </label>
//                                         <input
//                                             className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
//                                             id="price"
//                                             type="text"
//                                             placeholder="Price"/>
//                                     </div>
//                                     <div className='flex justify-between'>
//                                         <Link to="/Product" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
//                                             Back
//                                         </Link>
//                                         <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
//                                             Submit
//                                         </button>
//                                     </div>
//                                 </form>

//                             </div>
//                         </div>

//                     </div>
//                 </div>
//        </Layout>
//         </>
//     )
// }

import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";

export default function Addproduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
        setError("Not authenticated");
        return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
        const res = await fetch("https://reactinterviewtask.codetentaclestechnologies.in/api/api/add-product", {
            method: "POST",
            headers: {
                "Authorization": token,
            },
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            // Save product to localStorage
            const newProduct = {
                name,
                description,
                Price: price,
                productimg: image ? URL.createObjectURL(image) : "",
                srno: Date.now(), // unique id
            };
            const products = JSON.parse(localStorage.getItem("products") || "[]");
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));
            navigate("/Product");
        } else {
            setError(data.message || "Failed to add product");
        }
    } catch {
        setError("Network error");
    }
};

    return (
        <>
            <Layout>
                <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
                    <div>
                        <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">Add Product</h3>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="p-4 rounded-lg dark:border-gray-700 ">
                        <div className="w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="name">
                                        Product Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="name"
                                        type="text"
                                        placeholder="Product Name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="image">
                                        Product Image
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => setImage(e.target.files[0])}
                                        className="w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        placeholder="Description"
                                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="price">
                                        Price
                                    </label>
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="price"
                                        type="number"
                                        placeholder="Price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                                <div className='flex justify-between'>
                                    <Link to="/Product" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                        Back
                                    </Link>
                                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}