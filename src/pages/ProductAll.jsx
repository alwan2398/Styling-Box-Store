import { client } from '@/client';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const ProductAll = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = `*[_type == "product"] | order(_createdAt desc) {
      _id,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      "imageUrl": images[0].asset->url,
      discount,
      rating
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
        <div className="flex justify-between items-center mt-4 md:mt-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Semua Product</h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product._id} className="group relative p-4 border rounded-lg shadow-sm hover:shadow-md">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                <img
                  src={product.imageUrl}
                  width={300}
                  height={300}
                  alt={`Product Image of ${product.name}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.categoryName}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">RP {product.price}.000</p>
              </div>
              <div className="mt-2 flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">({product.rating})</span>
              </div>
              {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductAll;
