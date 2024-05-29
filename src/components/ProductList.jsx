import { client } from '@/client';
import { useEffect, useState } from 'react';
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
            _id,
            price,
            name,
            "slug": slug.current,
            "categoryName": category->name,
            "imageUrl": images[0].asset->url
        }`;

        client.fetch(query)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
<div className="bg-white">
  <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="flex justify-between items-center mt-6 md:mt-0">
      <h2 className="text-xl md:text-2xl mt-4 font-bold tracking-tight text-gray-900">Produk Baru Kami</h2>
      <Link to={'/ProductAll'} className="text-gray-700 flex mt-4 items-center gap-x-1 font-medium">
        Lihat Semua
        <span>
          <RiArrowRightLine />
        </span>
      </Link>
    </div>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <div key={product._id} className="group relative p-4 border rounded-lg shadow-sm hover:shadow-md">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.imageUrl}
                width={300}
                height={300}
                alt={`Gambar Produk ${product.name}`}
                className="w-full h-full object-cover object-center"
              />
            </Link>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product/${product.slug}`} className="font-bold text-gray-900">
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">RP {product.price}.000</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

    );
};

export default ProductList;
